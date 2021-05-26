const knex = require("../config/database/index");

class Menu {
    async findAll() {
        try {
            return await knex.transaction(async (trx) => {
                return await trx('menu').select(
                    "menu.id",
                    "menu.slug",
                    knex.raw(`(SELECT CASE WHEN item_menu.menu_id IS NOT NULL THEN 
                        JSON_ARRAYAGG(JSON_OBJECT('id',item_menu.id,'label', item_menu.label,
                        'description', item_menu.description, 'type', item_menu.type, 'path', item_menu.path, 'icon', item_menu.icon, 'parent', item_menu.parent_id, 'permission', item_menu.permission_id))
                         ELSE  JSON_ARRAY() END ) as menu_items`))
                    .leftJoin('item_menu', 'item_menu.menu_id', 'menu.id')
                    .groupBy('menu.id');
            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async findBySlugPermission(slug, permissions) {
        permissions = permissions.map(item => item.id)
        try {
            return await knex.transaction(async (trx) => {
                return await trx('menu').select(
                    "menu.id",
                    "menu.slug",
                    knex.raw(`(SELECT CASE WHEN item_menu.menu_id IS NOT NULL THEN 
                        JSON_ARRAYAGG(JSON_OBJECT('id',item_menu.id,'label', item_menu.label,
                        'description', item_menu.description, 'type', item_menu.type, 'path', item_menu.path, 'icon', item_menu.icon, 'parent', item_menu.parent_id, 'permission', item_menu.permission_id))
                         ELSE  JSON_ARRAY() END ) as menu_items`)
                )
                    .leftJoin('item_menu', 'item_menu.menu_id', 'menu.id')
                    // .where('menu.slug', slug)
                    .modify((queryBuilder) => {
                        if (permissions)
                            queryBuilder.whereIn('item_menu.permission_id', permissions);
                    })
                    .groupBy('menu.id')
                    .first();

            });
        } catch (error) {
            console.log(error);
            return error;
        }
    }


}

module.exports = new Menu();