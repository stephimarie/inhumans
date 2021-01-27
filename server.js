// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const db = require("./models");
const PORT = 3012 || process.env.PORT;

global.__basedir = __dirname;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// LISTENER
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () =>
    console.log(`Listening on PORT ${PORT}. Live at http://localhost:${PORT}`)
  );
});
