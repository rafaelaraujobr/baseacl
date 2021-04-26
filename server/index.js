const app = require("./app");
const { viewRoutes } = require("./src/utils/servicesRouter");
require("dotenv").config({ encoding: "latin1" });



app.listen(process.env.APP_PORT || 3000, () => {
    viewRoutes(app, process.env.APP_PORT || 3000);
});