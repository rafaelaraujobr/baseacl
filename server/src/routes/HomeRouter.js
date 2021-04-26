const { Router } = require("express");
const router = new Router();

router.get("/index", (req, res) => {
    console.time("runtime");
    res.status(200).send('Serviço Rodando').end();
    console.timeEnd("runtime");
    console.count(req.originalUrl);
})

module.exports = router;