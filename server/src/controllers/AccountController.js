
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const User = require("../models/User");
const Account = require("../models/Account");
const { validateEmail } = require("../utils/servicesValidation");

class AccountController {
    static async create(req, res) {
        console.time("runtime");
        try {
            validateEmail(req.body.email, { msg: 'Invalid email', status: 403 })
            let userExist = await User.findByEmail(req.body.email);
            if (userExist) throw { msg: 'this email is already being used', status: 403 };
            if (req.body.company_name) req.body["slug"] = slugify(req.body.company_name, { lower: true });
            else throw { msg: 'company null', status: 403 };
            if (req.body.password.length < 6 || req.body.password.length == 0) throw { msg: 'Password must contain at least 6 characters', status: 403 }
            if (req.body.password) req.body["password_hash"] = await bcryptjs.hash(req.body.password, 8);
            else throw { msg: 'password null', status: 403 };
            const user = await Account.create(req.body)
            if (user) res.status(200).json({ user }).end();
        } catch (error) {
            console.log(error);
            res.status(403).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }

    static async login(req, res) {
        console.time("runtime");
        const { email, password } = req.body
        const { is_mobile, is_desktop, is_electron, source } = req.useragent
        try {
            validateEmail(email, { msg: 'Invalid email', status: 403 })
            if (password.length < 6) throw { msg: 'Incorrect password or email', status: 403 }
            let user = await User.findByEmail(email);
            if (!user) throw { msg: 'User not found!', status: 403 }
            if (!user.status) throw { msg: 'User disable!', status: 403 }
            delete user.status
            if (!(await bcryptjs.compare(password, user.password))) throw { msg: 'Incorrect password or email', status: 403 };
            delete user.password
            let token = jwt.sign({ user: user.id, realm: user.realm }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            if (!token) throw { msg: 'User not found!', status: 403 }
            const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
            let expires_in = new Date(decoded.exp * 1000)
            await Account.createSession({ token, user_id: user.id, created_at: decoded.iat, expires_in, is_mobile, is_desktop, is_electron, source });
            res.status(200).json({ user, token }).end();
        } catch (error) {
            console.log(error.message);
            res.status(error.status || 400).json(error.msg || error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }
    static async authorization(req, res) {
        const authToken = req.headers.authorization;
        try {
            const bearer = authToken.split(' ');
            const token = bearer[1];
            if (!token) throw { msg: 'toke nao informado', status: 403 }
            const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
            let checkSession = await Account.checkSession(decoded.user, token);
            if (!checkSession) throw { msg: 'voce não esta autenticado 2', status: 403 };
            delete checkSession.token
            res.status(200).json({ token, user: checkSession });
        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    }
    static async logout(req, res) {
        console.time("runtime");
        const authToken = req.headers["authorization"];
        const { user_id } = req.body;
        try {
            const bearer = authToken.split(' ');
            const token = bearer[1];
            if (!token) throw { msg: 'toke nao informado', status: 403 }
            await AccountModel.deleteSession({ token, user_id });
            res.status(200).json({ status: true, msg: "Deslogado" }).end();
        } catch (error) {
            console.log(error);
            res.status(406).json(error).end();
        }
        console.time("runtime");
        console.count(req.originalUrl);
    }

}

module.exports = AccountController