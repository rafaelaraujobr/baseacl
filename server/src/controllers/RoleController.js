const slugify = require("slugify");
const Role = require("../models/Role");
const Permission = require("../models/Permission");
class RoleController {

    static async create(req, res) {
        console.time("runtime");
        let { description, permissions, slug } = req.body
        if (slug) slug = slugify(slug, { lower: true });
        else slug = slugify(description, { lower: true });
        try {
            const existRole = await Role.findBySlug(slug);
            if (existRole) throw 'Role already exists!'
            const existPermission = await Permission.findByIds(permissions)
            const role = await Role.create({ slug, description }, existPermission)
            res.status(200).json(role).end();
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
            let role = await Role.findById(req.params.id);
            if (!role) throw 'Role already exists!'
            //if (role.permissions == null) delete role.permissions;
            res.status(200).json(role).end();
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
            let roles = await Role.findAll();
            if (!roles) throw 'Roles already exists!'
            roles.forEach(role => { if (role.permissions == null) delete role.permissions });
            res.status(200).json(roles).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }
}

module.exports = RoleController