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

  // GET route for getting all of the Actors
  app.get("/api/Actors", (req, res) => {
    // Find all Actors, and return them to the user with res.json
    db.Actors.findAll({}).then((inhumans_db) => {
      res.json(inhumans_db);
    });
  });
  // POST route for saving a new Actor. You can create a Actor using the data on req.body
  app.post("/api/Actors", (req, res) => {
    console.log(req.body);
    db.Actors.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((inhumans_db) => {
      res.json(inhumans_db)
    });
  });

  // DELETE route for deleting Actors. You can access the Actor's id in req.params.id
  app.delete("/api/Actors/:id", (req, res) => {
    db.Actors.destroy({
      where: {
        id: req.params.id,
      },
    }).then((inhumans_db) => {
      res.json(inhumans_db);
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
          id: req.params.id,
        },
      }
    ).then((inhumans_db) => res.json(inhumans_db));
  });
};
