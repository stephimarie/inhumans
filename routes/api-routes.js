const path = require("path");
const upload = require("../config/middleware/upload");
const fs = require("fs");
const db = require("../models");

module.exports = (app) => {
  // GET route for getting all of the actors
  app.get("/api/actors", (req, res) => {
    // Find all actors, and return them to the user with res.json
    db.Actor.findAll({})
      .then((inhumans_db) => {
        let actorsArray = [];
        for (let i = 0; i < inhumans_db.length; i++) {
          let actor = {
            id: inhumans_db[i].id,
            identity: inhumans_db[i].identity,
            image: inhumans_db[i].image,
          };
          actorsArray.push(actor);
        }
        console.log("Array of actors", actorsArray);

        res.render("actors-block", {
          actors: actorsArray,
        });
      })
      .catch((err) => {
        res.render("actors-block", {
          error: { err },
        });
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
  app.post("/api/actors", upload.single("file"), (req, res) => {
    console.log(req.body);
    try {
      console.log(req.file);

      // First we get and check file upload from req.file.
      if (req.file == undefined) {
        res.render("index", {
          error: "You must select a file.",
        });
      }

      // we use Sequelize model create() method to save an Image object (type, name, data) to MySQL database.
      // data is gotten from uploads folder (that middleware function stored the image).
      db.Actor.create({
        identity: req.body.identity,
        image: req.file.originalname,
        // To write data, we use fs.readFileSync('/path/to/file') functions of Node.js fs module
        imageData: fs.readFileSync(
          __basedir + "/public/images/uploads/" + req.file.filename
        ),
      })
        .then((image) => {
          // – If the process is successful, we save write the image data to tmp folder.
          // To write data, we use fs.writeFileSync('/path/to/file', image.data) functions of Node.js fs module
          fs.writeFileSync(
            __basedir + "/public/images/uploads/tmp/" + image.image,
            image.imageData
          );

          res.redirect("/api/actors");
        })
        .catch((error) => {
          console.log(error);
          return res.render("index", {
            error: `Error when trying upload images: ${error}`,
          });
        });
    } catch (error) {
      console.log(error);
      return res.render("index", {
        error: `Error when trying upload images: ${error}`,
      });
    }
  });

  // DELETE route for deleting Actors. You can access the Actor's id in req.params.id
  app.delete("/api/actors/:id", (req, res) => {
    // db.Actor.findByPk(req.params.id).then((res) => {
    //   let image = res.image;
    // });

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
        identity: req.body.identity,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then((inhumans_db) => res.json(inhumans_db));
  });
};
