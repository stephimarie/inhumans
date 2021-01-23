// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const db = require("./models");
const PORT = 8000 || process.env.PORT;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ROUTES
require("./controllers/inhuman_controller")(app);
require("./controllers/html-routes")(app);

// LISTENER
db.sequelize.sync().then(() => {
  app.listen(PORT, () =>
    console.log(`Listening on PORT ${PORT}. Live at http://localhost:${PORT}`)
  );
});
