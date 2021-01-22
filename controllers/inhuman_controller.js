const db = require("../models");

module.exports = (app) => {
  // GET route for getting all of the todos
  app.get("/api/todos", (req, res) => {
    // Find all todos, and return them to the user with res.json
    db.Todo.findAll({}).then((inhumans_test_db) => {
      res.json(inhumans_test_db);
    });
  });
  // POST route for saving a new todo. You can create a todo using the data on req.body
  app.post("/api/todos", (req, res) => {
    db.Todo.create({
      text: req.body.text,
      complete: req.body.complete,
    }).then((dbTodo) => res.json(dbTodo));
  });

  // DELETE route for deleting todos. You can access the todo's id in req.params.id
  app.delete("/api/todos/:id", (req, res) => {
    db.Todo.destroy({
      where: {
        id: req.params.id,
      },
    }).then((inhumans_test_db) => {
      res.json(inhumans_test_db);
    });
  });

  // PUT route for updating todos. The updated todo will be available in req.body
  app.put("/api/todos", (req, res) => {
    db.Todo.update(
      {
        text: req.body.text,
        complete: req.body.complete,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then((inhumans_test_db) => res.json(inhumans_test_db));
  });
};
