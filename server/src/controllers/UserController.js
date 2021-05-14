
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

class UserController {
    static async create(req, res) {
        console.time("runtime");
        try {
            let userExist = await User.findByEmail(req.body.email);
            if (userExist) throw 'this email is already being used'
            if (req.body.password) req.body["password_hash"] = await bcryptjs.hash(req.body.password, 8);
            else throw 'password null';
            let user = await User.create(req.body)
            if (!user.phone) delete user.phone
            user.adresses.forEach((element) => {
                if (!element.state) delete element.state;
                if (!element.country) delete element.country;
                if (!element.number) delete element.number;
                if (!element.gps_lat) delete element.gps_lat;
                if (!element.gps_log) delete element.gps_log;
                if (!element.district) delete element.district;
                if (!element.zip_code) delete element.zip_code;
                if (!element.complement) delete element.complement;
                if (!element.public_place) delete element.public_place;
            });
            if (user) res.status(200).json({ user }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }


    static async findAll(req, res) {
        console.time("runtime");
        try {
            let users = await User.findAll(req.body.realm_id)
            if (users) {
                users.forEach((user, index) => {
                    if (!user.phone) delete user.phone
                    user.adresses.forEach((element) => {
                        if (!element.state) delete element.state;
                        if (!element.country) delete element.country;
                        if (!element.number) delete element.number;
                        if (!element.gps_lat) delete element.gps_lat;
                        if (!element.gps_log) delete element.gps_log;
                        if (!element.district) delete element.district;
                        if (!element.zip_code) delete element.zip_code;
                        if (!element.complement) delete element.complement;
                        if (!element.public_place) delete element.public_place;
                    });
                });
                res.status(200).json({ users }).end();
            }
            else throw 'Users does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }

    static async findById(req, res) {
        console.time("runtime");
        try {
            let user = await User.findById(req.params.id)
            if (user) {
                user.adresses.forEach((element) => {
                    if (!element.state) delete element.state;
                    if (!element.country) delete element.country;
                    if (!element.number) delete element.number;
                    if (!element.gps_lat) delete element.gps_lat;
                    if (!element.gps_log) delete element.gps_log;
                    if (!element.district) delete element.district;
                    if (!element.zip_code) delete element.zip_code;
                    if (!element.complement) delete element.complement;
                    if (!element.public_place) delete element.public_place;
                });

                res.status(200).json({ user }).end();
            }
            else throw 'User does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }

    static async findByEmail(req, res) {
        console.time("runtime");
        try {
            let user = await User.findByEmail(req.body.email, req.body.realm_id)
            if (user) {
                delete user['password']
                res.status(200).json({ user }).end();
            }
            else throw 'User does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }

    static async update(req, res) {
        console.time("runtime");
        try {
            let user = await User.update(req.params.id, req.body);
            res.status(200).json({ user }).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }

    static async delete(req, res) {
        console.time("runtime");
        try {
            let user = await User.delete(req.params.id);
            if (user) res.status(200).json({ user }).end();
            else throw 'User does not exist';
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }
}

module.exports = UserController