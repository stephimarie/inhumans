// This is a placeholder array of objects that would normally be fetched from our DB.
const actorsList = [
    actor1 = {
        id: 1,
        firstName: "Black",
        lastName: "Bolt",
        isKiller: false,
    },
    actor2 = {
        id: 2,
        firstName: "Medusa",
        lastName: "",
        isKiller: false,
    },
    actor3 = {
        id: 3,
        firstName: "Karnak",
        lastName: "the Shatterer",
        isKiller: false,
    },
    actor4 = {
        id: 4,
        firstName: "Crystal",
        lastName: "",
        isKiller: false,
    },
    actor5 = {
        id: 5,
        firstName: "Lockjaw",
        lastName: "",
        isKiller: false,
    }
];

// This is a placeholder array of objects that would normally be fetched from our DB.
const roomList = [
    room1 = {
        id: 1,
        roomName: "Agon's Tower",
        adjacentTo: [2,3,4],
        isMurderRoon: false,
    },
    room2 = {
        id: 2,
        roomName: "Pit of the Dead",
        adjacentTo: [1,3,5],
        isMurderRoon: false,
    },
    room3 = {
        id: 3,
        roomName: "The Palace",
        adjacentTo: [1,2,4,5],
        isMurderRoon: false,
    },
    room4 = {
        id: 4,
        roomName: "Old Attilan Harbor",
        adjacentTo: [1,3,5],
        isMurderRoon: false,
    },
    room5 = {
        id: 5,
        roomName: "Terrigen Lab",
        adjacentTo: [2,3,4],
        isMurderRoon: false,
    }
];

const roomHabitants = [
    room1 = [],
    room2 = [],
    room3 = [],
    room4 = [],
    room5 = [],
];

const simStart = () => {
    const killer = actorsList[rng(0, actorsList.length)];
    const murderRoom = roomList[rng(0, roomList.length)];
    setKiller(killer);
    setMurderRoom(murderRoom);
    console.log(`${killer.firstName} ${killer.lastName} has commited a murder in ${murderRoom.roomName}!`)
    initialPlacement(murderRoom, killer);
    roomStatus();
};

const setKiller = (killer) => {
    killer.isKiller = true;
};

const setMurderRoom = (murderRoom) => {
    murderRoom.isMurderRoom = true;
};

const initialPlacement = (murderRoom, killer) => {
    //Basic function that randomly determines the initial placement of each actor.
    actorsList.forEach((val) => {
        //We're pushing to roomHabitants array, each actor's object.
        roomHabitants[rng(0,roomList.length)].push(val);
    })
};

const roomStatus = () => {
    roomHabitants.forEach((val) => {
        const currentRoom = roomList[roomHabitants.indexOf(val)].roomName;
        if (val[0] == undefined) {
            console.log(`There is nobody inside ${currentRoom}.`);
        } else {
            Object.values(val).forEach(data => {
                console.log(`${data.firstName} is inside ${currentRoom}.`);
            });
        };
    });
};

const rng = (min, max) => {
    return Math.floor(Math.random()*max) + min;
};

simStart();