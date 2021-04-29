const slugify = require("slugify");
const Role = require("../models/Role");
const Permission = require("../models/Permission")
class RoleController {

    static async create(req, res) {
        const { description, permissions } = req.body
        const slug = slugify(description, { lower: true });
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
    }
    
    static async findById(req, res) {
        try {
            const role = await Role.findById(req.params.id);
            if (!role) throw 'Role already exists!'
            res.status(200).json(role).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }

    static async findAll(req, res) {
        try {
            const roles = await Role.findAll();
            if (!roles) throw 'Roles already exists!'
            res.status(200).json(roles).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }
}

module.exports = RoleController