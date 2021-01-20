const express = require("express");
const app = express();
const db = require("./models");
const PORT = 8080 || process.env.PORT;
const routes = require("./controllers/inhuman_controller");

// app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});
