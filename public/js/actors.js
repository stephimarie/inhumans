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
  const updateActor = (id, actor) =>
    fetch(`/api/actors/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actor),
    });

  // ------------------------------------------------------------------------------------
  // READ
  // Set up the event listener for the view Actor buttons to open modal
  // and display the current values in the input fields
  const viewActorBtns = document.querySelectorAll(".view-actor");
  if (viewActorBtns) {
    viewActorBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const first_name = button.dataset.first_name;
        const last_name = button.dataset.last_name;
        const image = button.dataset.image;

        document.getElementById("view-actor-first-name").value = first_name;
        document.getElementById("view-actor-last-name").value = last_name;
        document.getElementById(
          "view-actor-image"
        ).src = `/images/uploads/tmp/${image}`;
        document.getElementById(
          "view-actor-image"
        ).alt = `${first_name} ${last_name}'s Profile`;
      });
    });
  }

  // ---------------------------------------------------------------------------
  // UPDATE
  const updateActorBtns = document.querySelectorAll(".update-actor");
  const updateActorForm = document.getElementById("update-actor-form");

  // Set up the event listener for the edit Actor buttons to open modal and display the current values in the input fields
  if (updateActorBtns) {
    updateActorBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        const first_name = button.dataset.first_name;
        const last_name = button.dataset.last_name;
        const image = button.dataset.image;

        document.getElementById("update-actor-id").value = id;
        document.getElementById("update-actor-first-name").value = first_name;
        document.getElementById("update-actor-last-name").value = last_name;
        document.getElementById(
          "update-actor-image"
        ).src = `/images/uploads/tmp/${image}`;
        document.getElementById(
          "update-actor-image"
        ).alt = `${first_name} ${last_name}'s Profile`;

        console.log("User has selected to update the actor with id:", id);
      });
    });
  }

  if (updateActorForm) {
    updateActorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const id = document.getElementById("update-actor-id").value;

      const updated_actor = {
        firstName: document
          .getElementById("update-actor-first-name")
          .value.trim(),
        lastName: document
          .getElementById("update-actor-last-name")
          .value.trim(),
      };

      // Send PUT request to update an existing actor in the database
      updateActor(id, updated_actor).then((response) => {
        if (response.ok) {
          console.log(`Updated Actor with ID: ${id}`);
          location.reload("/");
        } else {
          alert("something went wrong!");
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // DELETE
  const deleteActorBtns = document.querySelectorAll(".delete-actor");
  const deleteActorForm = document.querySelector("#delete-actor-form");

  // Set up the event listeners for each delete button, and modal body

  deleteActorBtns.forEach((button) => {
    button.addEventListener("click", () => {
      // Grabs the id of the element that goes by the name, "id"

      const id = button.dataset.id;
      const first_name = button.dataset.first_name;
      const last_name = button.dataset.last_name;

      console.log("User has selected to delete the actor with id:", id);

      document.getElementById("delete-modal-body").textContent =
        "Are you sure you want to delete this actor: " +
        first_name +
        " " +
        last_name +
        "?";

      document.getElementById("delete-actor-id").value = id;
    });
  });

  if (deleteActorForm) {
    deleteActorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const id = document.getElementById("delete-actor-id").value;

      // Send the delete request
      deleteActor(id).then((response) => {
        if (response.ok) {
          console.log(`Deleted Actor with ID: ${id}`);
          location.reload();
        } else {
          alert("Something went wrong");
        }
      });
    });
  }
});
