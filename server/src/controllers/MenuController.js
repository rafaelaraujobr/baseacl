const slugify = require("slugify");
const Menu = require("../models/Menu");

class MenuController {


    static async findAll(req, res) {
        console.time("runtime");
        try {
            let menus = await Menu.findAll();
            if (!menus) throw 'Menus already exists!'
            res.status(200).json(menus).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }
    static async findBySlugPermission(req, res) {
        console.time("runtime");
        try {
            let menus = await Menu.findBySlugPermission(req.body.slug, req.body.permissions);
            if (!menus) throw 'Menus already exists!'
            res.status(200).json(menus).end();
        } catch (error) {
            console.log(error);
            res.status(400).json(error).end();
        }
        console.timeEnd("runtime");
        console.log(req.method, req.url);
    }
}

module.exports = MenuController