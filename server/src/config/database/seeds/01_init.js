const bcryptjs = require("bcryptjs");

exports.seed = async (knex) => {
  try {
    await knex.transaction(async (trx) => {

      await trx("role").del();
      await trx("role_user").del(); // clear table role user
      await trx("permission_role").del(); // clear table role user
      await trx("permission").del(); // clear table roles
      await trx("person").del(); // clear table roles
      await trx("realm").del(); // clear table roles
      await trx("user").del(); // clear table roles
      await trx("address").del(); // clear table roles
      await trx("preference").del(); // clear table roles
      await trx("item_menu").del(); // clear table roles
      await trx("menu").del();


      // criando permissoes
      let permissions_roles = []
      await trx("permission").insert([
        { description: "Visualizar usuarios", slug: "view-users" },
        { description: "Editar usuarios", slug: "edit-users" },
        { description: "Criar usuarios", slug: "create-users" },
        { description: "Delete usuarios", slug: "delete-users" },
        { description: "Visualizar papeis", slug: "view-roles" },
        { description: "Editar papeis", slug: "edit-roles" },
        { description: "Criar papeis", slug: "create-roles" },
        { description: "Delete papeis", slug: "delete-roles" },
        { description: "Visualizar permissões", slug: "view-permissions" },
        { description: "Editar permissões", slug: "edit-permissions" },
        { description: "Criar permissões", slug: "create-permissions" },
        { description: "Delete permissões", slug: "delete-permissions" },
      ]);
      /*==================================================================*/

      
      const permissions = await trx('permission').select('id')
      const role_admin_id = await trx("role").insert([
        { description: "Administrador", slug: "admin" }, // acesso total
      ]);

      if (permissions.length > 0) {
        permissions.forEach(async element => {
          permissions_roles.push({ role_id: parseInt(role_admin_id), permission_id: element.id })
        });
        await trx('permission_role').insert(permissions_roles)
      }

      const role_register_id = await trx("role").insert([
        { description: "Registrado", slug: "registered" }, // acesso total
      ]);

      const permision_view_user = await trx("permission").where('slug', 'view-users').first()

      await trx('permission_role').insert({ role_id: parseInt(role_register_id), permission_id: permision_view_user.id })

      const permission_menu_user = await trx("permission").where('slug', 'view-users').first()
      const permission_menu_role = await trx("permission").where('slug', 'view-roles').first()
      const permission_menu_permission = await trx("permission").where('slug', 'view-permissions').first()

      const menu_id = await trx("menu").insert([
        { label: "Menu Principal", description: "Menu principal do sistema", slug: "main-menu" },
      ]);

      await trx('item_menu').insert({ label: 'Usuarios', type: 'route', menu_id: parseInt(menu_id), icon: 'mdi-account', path: '/users', permission_id: parseInt(permission_menu_user.id) });
      await trx('item_menu').insert({ label: 'Papeis', type: 'route', menu_id: parseInt(menu_id), icon: 'mdi-badge-account-outline', path: '/roles', permission_id: parseInt(permission_menu_role.id) });
      await trx('item_menu').insert({ label: 'Permissões', type: 'route', menu_id: parseInt(menu_id), icon: 'mdi-card-account-details-outline', path: '/permissions', permission_id: parseInt(permission_menu_permission.id) });


      const legal_person_id = await trx('person').insert({ type: 'l', email: 'roostec@gmail.com', phone: '2133547816' });
      await trx('legal_person').insert({ person_id: parseInt(legal_person_id), company_name: 'roostec' });

      const private_person_id = await trx('person').insert({ type: 'p', email: 'rflaraujodev@gmail.com', phone: '21982222393' });
      await trx('private_person').insert({ person_id: parseInt(private_person_id), name: 'Rafael', last_name: 'Araujo' });

      const realm_id = await trx('realm').insert({ person_id: parseInt(legal_person_id), slug: 'roostec' });

      const user_id = await trx('user').insert({ realm_id, person_id: parseInt(private_person_id), password_hash: await bcryptjs.hash("123456", 10) });

      const role = await trx('role').select().where({ slug: 'admin' }).first()

      await trx('address').insert({ person_id: parseInt(private_person_id) });
      await trx('preference').insert({ user_id: parseInt(user_id) });
      await trx('role_user').insert({ role_id: role.id, user_id: parseInt(user_id) });

    });
    // create roles
  } catch (error) {
    console.log(error);
  }
};
