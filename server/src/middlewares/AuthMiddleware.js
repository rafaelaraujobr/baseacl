const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const Permission = require('../models/Permission')

class AuthMiddleware {
  static async Auth(req, res, next) {
    const authToken = req.headers["authorization"];
    try {
      if (!authToken) throw 'toke nao informado'
      const bearer = authToken.split(" ");
      const token = bearer[1];
      if (!token) throw 'toke nao informado'
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      const { permissions } = await Permission.findByUser(decoded.user)
      req.body["user_id"] = decoded.user;
      req.body["realm_id"] = decoded.realm;
      req.body.permissions = permissions;
      const checkAuthentication = await Account.checkSession(decoded.user, token);
      if (!checkAuthentication) throw "middleware voce não esta autenticado 2"
      next();
    } catch (error) {
      console.log(error);
      res.status(403).send(error);
    }
  }

  static permissionAuth(permission) {
    return async (req, res, next) => {
      try {
        if (!req.body.permissions) throw 'You do not have permission for this operation'
        let userPermissions = req.body.permissions.find(item => item.slug == permission)
        if (!userPermissions) throw 'You do not have permission for this operation'
        next()
      } catch (error) {
        console.log(error)
        res.status(403).send(error);
      }
    }
  }

}

module.exports = AuthMiddleware;