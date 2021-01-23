// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  // Function for getting all actors from the db
  const getActors = () =>
    fetch("/api/actors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

  // A function for saving a actor to the db
  const saveActor = (actor) =>
    fetch("/api/actors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actor),
    });

  // A function for deleting a actor from the db
  const deleteActor = (id) =>
    fetch(`/api/actors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

  // A function for editing a actor from the db
  const editActor = (id) =>
    fetch(`/api/actors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

  // CREATE
  const createActorForm = document.getElementById("create-actor-form");
  if (createActorForm) {
    createActorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // Grabs the value of the textarea in the input for firstName and lastName
      const newActor = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
      };

      // Send POST request to create a new actor
      saveActor(newActor).then(() => {
        // Empty the form
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";

        // Reload the page so the user can see the new actor
        console.log("Created a new actor!");
        location.reload();
      });
    });
  }

  // DELETE
  const deleteActorBtns = document.querySelectorAll("#deleteActor");

  // Set up the event listener for the delete actor buttons
  if (deleteActorBtns) {
    deleteActorBtns.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = event.target.getAttribute("data-id");

        deleteActor(id);

        // Reload the page so the user can see that the actor was deleted
        console.log("Deleted actor with id: " + id);
        location.reload();
      });
    });
  }

  // UPDATE
  const editActorBtns = document.querySelectorAll("#editActor");
  const updateActorForm = document.getElementById("update-actor-form");

  // Set up the event listener for the edit Actor buttons to open modal and display the current values in the input fields
  if (editActorBtns) {
    editActorBtns.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = event.target.getAttribute("data-id");
        const firstName = event.target.getAttribute("data-firstName");
        const lastName = event.target.getAttribute("data-lastName");

        document.getElementById("updatedFirstName").value = firstName;
        document.getElementById("updatedLastName").value = lastName;
      });
    });
  }

  if (updateActorForm) {
    updateActorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      $("#updateActorModal").modal("hide");

      // Grabs the value of the textarea in the input for firstName and lastName
      const updatedActor = {
        firstName: document.getElementById("updatedFirstName").value.trim(),
        lastName: document.getElementById("updatedLastName").value.trim(),
      };

      // Send POST request to create a new actor
      editActor(updatedActor).then((response) => {
        // Check that the response is all good
        // Reload the page so the user can see that the actor has been updated
        if (response.ok) {
          location.reload("/");
        } else {
          alert("something went wrong!");
        }
      });
    });
  }

  // READ
  // Set up the event listener for the view Actor buttons to open modal and display the current values in the input fields
  const viewActorBtns = document.querySelectorAll("#viewActor");
  if (viewActorBtns) {
    viewActorBtns.forEach((button) => {
      button.addEventListener("click", (event) => {
        // Grabs the id of the element that goes by the name, "id"
        const firstName = event.target.getAttribute("data-firstName");
        const lastName = event.target.getAttribute("data-lastName");

        document.getElementById("viewFirstName").value = firstName;
        document.getElementById("viewLastName").value = lastName;
      });
    });
  }
});

//       fetch("/api/actors", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         // Make sure to serialize the JSON body
//         body: JSON.stringify(newActor),
//       }).then(() => {
//         // Empty the form
//         document.getElementById("firstName").value = "";
//         document.getElementById("lastName").value = "";

//         // Reload the page so the user can see the new actor
//         console.log("Created a new actor!");
//         location.reload();
//       });
//     });
//   }
// });
