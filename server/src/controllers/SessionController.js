
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
class SessionController {

    static async create(req, res) {
        const { email, password } = req.body
        try {
            let user = await User.findByEmail(email);
            console.log('user =>', user)
            if (!user) throw 'User not found!'
            if (!(await bcryptjs.compare(password, user['password_hash']))) throw 'Incorrect password or email';
            delete user['password_hash']
            let token = jwt.sign({ subject: user.id }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            if (!token) throw 'User not found!'

            res.status(200).json({ user, token }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }
}

module.exports = SessionController