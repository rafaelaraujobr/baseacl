
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

class UserController {
    static async create(req, res) {
        try {
            if (req.body.password) req.body["password_hash"] = await bcryptjs.hash(req.body.password, 8)
            else throw 'password null';
            const user = await User.create(req.body)
            if (user) res.status(200).json({ user }).end();
        } catch (error) {

        }
    }
}

module.exports = UserController