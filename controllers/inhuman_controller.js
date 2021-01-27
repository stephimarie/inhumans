const db = require("../models");

module.exports = (app) => {
  // GET route for getting all of the actors
  app.get("/api/actors", (req, res) => {
    // Find all actors, and return them to the user with res.json
    db.Actor.findAll({}).then((inhumans_db) => {
      let actorsArray = [];
      for (let i = 0; i < inhumans_db.length; i++) {
        let actor = {
          id: inhumans_db[i].id,
          firstName: inhumans_db[i].firstName,
          lastName: inhumans_db[i].lastName,
        };
        actorsArray.push(actor);
      }
      console.log("Array of actors", actorsArray);

      res.render("partials/actors/actors-block", {
        actors: actorsArray,
      });

      // res.json(inhumans_db);
    });
  });

  // GET route for getting all of the Actors
  app.get("/api/actors", (req, res) => {
    // Find all Actors, and return them to the user with res.json
    db.Actor.findAll({}).then((inhumans_db) => {
      res.json(inhumans_db);
    });
  });

  // POST route for saving a new Actor. You can create a Actor using the data on req.body
  app.post("/api/actors", (req, res) => {
    console.log(req.body);
    db.Actor.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }).then((inhumans_db) => {
      res.json(inhumans_db);
    });
  });

  // DELETE route for deleting Actors. You can access the Actor's id in req.params.id
  app.delete("/api/actors/:id", (req, res) => {
    db.Actor.destroy({
      where: {
        id: req.params.id,
      },
    }).then((inhumans_db) => {
      res.json(inhumans_db);
    });
  });

  // PUT route for updating actors. The updated actor will be available in req.body
  app.put("/api/actors/:id", (req, res) => {
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
