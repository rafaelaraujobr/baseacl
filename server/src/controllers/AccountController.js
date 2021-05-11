
const bcryptjs = require("bcryptjs");
const slugify = require("slugify");
const User = require("../models/User");
const Account = require("../models/Account");

class AccountController {
    static async create(req, res) {
        console.time("runtime");
        try {
            let userExist = await User.findByEmail(req.body.email);
            if (userExist) throw 'this email is already being used'
            if (req.body.company) req.body["slug"] = slugify(req.body.company, { lower: true });
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
}

module.exports = AccountController