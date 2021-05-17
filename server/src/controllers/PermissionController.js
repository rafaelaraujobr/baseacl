const slugify = require("slugify");
const Permission = require("../models/Permission");
class PermissionController {
    /**
     * Controle de criação de permissoes
     * 
     * @static 
     * @method create
     * @param {object} req 
     * @param {object} res 
     */
    static async create(req, res) {
        let { slug, description } = req.body
        if (slug) slug = slugify(slug, { lower: true });
        else slug = slugify(description, { lower: true });

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
    /**
     * Controle de obtenção de permissão por id
     * 
     * @static 
     * @method findByid
     * @param {object} req 
     * @param {object} res 
     */
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
    /**
       * Controle de obtenção de permissoes por id do usuario
       * 
       * @static 
       * @method findByUser
       * @param {object} req 
       * @param {object} res 
       */
    static async findByUser(req, res) {
        try {
            const permission = await Permission.findByUser(req.params.id);
            if (!permission) throw 'Permission already exists!'
            res.status(200).json(permission).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
    }
    /**
      * Controle de obtenção das permissões
      * 
      * @static 
      * @method findAll
      * @param {object} req 
      * @param {object} res 
      */
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