const jwt = require("jsonwebtoken");
// const Account = require("../models/Account");

class AuthMiddleware {
  static async Auth(req, res, next) {
    const authToken = req.headers["authorization"];
    if (authToken != undefined) {
      const bearer = authToken.split(" ");
      const token = bearer[1];
      try {
        let decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decoded) return res.status(403).send("voce não esta autenticado 1");
        req.body["user_id"] = decoded["user"];
        req.body["realm_id"] = decoded["realm"];
        // let checkAuthentication = await Account.checkAuthentication(
        //   decoded.user,
        //   token
        // );
        // if (!checkAuthentication)
        //   return res.status(403).send("voce não esta autenticado 2");
        next();
      } catch (error) {
        console.log(error);
        res.status(403).send("voce não está autenticado 3");
      }
    } else {
      res.status(403).send("voce não enviou o token autenticado");
      return;
    }
  }
}

module.exports = AuthMiddleware;