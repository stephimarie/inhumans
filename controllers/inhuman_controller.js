const db = require("../models");

module.exports = (app) => {
  // GET route for getting all of the actors
  app.get("/api/actors", (req, res) => {
    // Find all actors, and return them to the user with res.json
    db.Actor.findAll({}).then((inhumans_test_db) => {
      let actorsArray = [];
      for (let i = 0; i < inhumans_test_db.length; i++) {
        let actor = {
          id: inhumans_test_db[i].id,
          firstName: inhumans_test_db[i].firstName,
          lastName: inhumans_test_db[i].lastName,
        };
        actorsArray.push(actor);
      }
      console.log("Array of actors", actorsArray);

      res.render("partials/actors/actors-block", {
        actors: actorsArray,
      });

      // res.json(inhumans_test_db);
    });
  });

  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/actors", (req, res) => {
    db.Actor.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((inhumans_test_db) => res.json(inhumans_test_db));
  });

  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/actors/:id", (req, res) => {
    db.Actor.destroy({
      where: {
        id: req.params.id,
      },
    }).then((inhumans_test_db) => {
      res.json(inhumans_test_db);
    });
  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/actors", (req, res) => {
    db.Actor.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then((inhumans_test_db) => res.json(inhumans_test_db));
  });
};
