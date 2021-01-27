// const path = require("path");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/chartSelect", (req, res) => {
    res.render("chartSelect.handlebars");
  });

  app.get("/gameInfo", (req, res) => {
    res.render("game-info.handlebars");
  });
  app.get("/teamInfo", (req, res) => {
    res.render("team-info.handlebars");
  });
};
