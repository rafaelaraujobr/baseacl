const slugify = require("slugify");
const Permission = require("../models/Permission");
class PermissionController {

    static async create(req, res) {
        const { description } = req.body
        const slug = slugify(description, { lower: true });
        try {
            const existPermission = await Permission.findBySlug(slug);
            if (existPermission) throw 'Permission already exists!'

            const permission = await Permission.create({ slug, description })

            res.status(200).json(permission).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }
    static async findById(req, res) {
        try {
            const permission = await Permission.findById(req.params.id);
            if (!permission) throw 'Permission already exists!'
            res.status(200).json(permission).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }

    static async findAll(req, res) {
        try {
            const permissions = await Permission.findAll();
            if (!permissions) throw 'Permissions already exists!'
            res.status(200).json(permissions).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }
}

module.exports = PermissionController