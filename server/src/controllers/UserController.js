
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

class UserController {
    static async create(req, res) {
        try {
            let userExist = await User.findByEmail(req.body.email);
            if (userExist) throw 'this email is already being used'
            if (req.body.password) req.body["password_hash"] = await bcryptjs.hash(req.body.password, 8);
            else throw 'password null';
            const user = await User.create(req.body)
            if (user) res.status(200).json({ user }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }

    static async findById(req, res) {
        try {
            let user = await User.findById(req.params.id)
            if (user) {
                delete user['password_hash']
                res.status(200).json({ user }).end();
            }
            else throw 'User does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }

    static async findByEmail(req, res) {
        try {
            let user = await User.findByEmail(req.body.email)
            if (user) {
                delete user['password_hash']
                res.status(200).json({ user }).end();
            }
            else throw 'User does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }

    static async update(req, res) {
        try {
            let user = await User.update(req.params.id, req.body);
            res.status(200).json({ user }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }

    static async delete(req, res) {
        try {
            let user = await User.delete(req.params.id);
            if (user) res.status(200).json({ user }).end();
            else throw 'User does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }
}

module.exports = UserController