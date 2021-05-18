const express = require('express')
const useragent = require('express-useragent');
const cors = require('cors')
const { resolve } = require("path");
const fs = require("fs");

class App {
    constructor() {
        this.app = express();
        this.middlewares()
        this.setRoutes()
        this.app.use(express.static(resolve(__dirname, "uploads")));
    }
    middlewares() {
        this.app.use(useragent.express())
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    setRoutes() {
        const routeDirectory = "./src/routes";
        try {
            const files = fs.readdirSync(routeDirectory, { encoding: "utf8" });
            files.forEach(file => {
                this.app.use("/", require(`${routeDirectory}/${file}`));
            });
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new App().app;