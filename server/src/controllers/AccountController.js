
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const User = require("../models/User");
const Account = require("../models/Account");

class AccountController {
    static async create(req, res) {
        console.time("runtime");
        try {
            let userExist = await User.findByEmail(req.body.email);
            if (userExist) throw 'this email is already being used'
            if (req.body.company_name) req.body["slug"] = slugify(req.body.company_name, { lower: true });
            else throw 'company null';
            if (req.body.password) req.body["password_hash"] = await bcryptjs.hash(req.body.password, 8);
            else throw 'password null';
            const user = await Account.create(req.body)
            if (user) res.status(200).json({ user }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }

    static async login(req, res) {
        console.time("runtime");
        const { is_mobile, is_desktop, is_electron, is_smart_tv, source } = req.useragent
        console.log(req.useragent)
        const { email, password } = req.body
        try {
            let user = await User.findByEmail(email);
            if (!user) throw 'User not found!'
            if (!(await bcryptjs.compare(password, user.password))) throw 'Incorrect password or email';
            delete user['password']
            let token = jwt.sign({ user: user.id, realm: user.realm }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            if (!token) throw 'User not found!'
            if (!user.status) throw 'User disable!'
            await Account.createAuth({ token, user_id: user.id, is_mobile, is_desktop, is_electron, is_smart_tv, source });
            res.status(200).json({ user, token }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }
    static async authorization(req, res) {
        const authToken = req.headers.authorization;
        try {
            if (!authToken) throw 'toke nao informado'
            const bearer = authToken.split(" ");
            const token = bearer[1];
            const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
            const checkAuthentication = await Account.checkAuth(decoded.user, token);
            if (!checkAuthentication) throw "voce não esta autenticado 2"
            res.status(200).json(checkAuthentication);
        } catch (error) {
            console.log(error);
            res.status(403).send(error);
        }
    }
}

module.exports = AccountController