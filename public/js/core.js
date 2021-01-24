// This is a placeholder array of objects that would normally be fetched from our DB.
const actorsList = [
    actor1 = {
        id: 1,
        firstName: "Black",
        lastName: "Bolt",
    },
    actor2 = {
        id: 2,
        firstName: "Medusa",
        lastName: ""
    },
    actor3 = {
        id: 3,
        firstName: "Karnak",
        lastName: "the Shatterer"
    },
    actor4 = {
        id: 4,
        firstName: "Crystal",
        lastName: ""
    },
    actor5 = {
        id: 5,
        firstName: "Lockjaw",
        lastName: ""
    }
];

// This is a placeholder array of objects that would normally be fetched from our DB.
const actorsList = [
    actor1 = {
        id: 1,
        firstName: "Black",
        lastName: "Bolt",
    },
    actor2 = {
        id: 2,
        firstName: "Medusa",
        lastName: ""
    },
    actor3 = {
        id: 3,
        firstName: "Karnak",
        lastName: "the Shatterer"
    },
    actor4 = {
        id: 4,
        firstName: "Crystal",
        lastName: ""
    },
    actor5 = {
        id: 5,
        firstName: "Lockjaw",
        lastName: ""
    }
];

simStart();

const simStart = () => {
    const isKiller = actorsList[rng(0, actorsList.length)];
}

const rng = (min, max) => {
    return Math.floor(Math.random()*max) + min;
}