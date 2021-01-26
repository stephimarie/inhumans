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
        occupants: [],
    },
    room2 = {
        id: 2,
        roomName: "Pit of the Dead",
        adjacentTo: [1,3,5],
        isMurderRoon: false,
        occupants: [],
    },
    room3 = {
        id: 3,
        roomName: "The Palace",
        adjacentTo: [1,2,4,5],
        isMurderRoon: false,
        occupants: [],
    },
    room4 = {
        id: 4,
        roomName: "Old Attilan Harbor",
        adjacentTo: [1,3,5],
        isMurderRoon: false,
        occupants: [],
    },
    room5 = {
        id: 5,
        roomName: "Terrigen Lab",
        adjacentTo: [2,3,4],
        isMurderRoon: false,
        occupants: [],
    }
];

const simStart = () => {
    const killer = actorsList[rng(0, actorsList.length)];
    const murderRoom = roomList[rng(0, roomList.length)];
    setKiller(killer);
    setMurderRoom(murderRoom);
    console.log(`${killer.firstName} ${killer.lastName} has commited a murder in ${murderRoom.roomName}!`)
    initialPlacement(murderRoom);
    roomStatus();
};

const setKiller = (killer) => {
    killer.isKiller = true;
};

const setMurderRoom = (murderRoom) => {
    murderRoom.isMurderRoom = true;
};

const initialPlacement = (murderRoom) => {
    //Basic function that randomly determines the initial placement of each actor.
    actorsList.forEach((val) => {
        if (val.isKiller == true) {
            roomList[roomList.indexOf(murderRoom)].occupants.push(val);
        } else {
            roomList[rng(0,roomList.length)].occupants.push(val);
        };
    });
};

const roomStatus = () => {
    roomList.forEach((val) => {
        if (val.occupants[0] == undefined) {
            console.log(`There is nobody inside ${val.roomName}.`);
        } else {
            Object.values(val.occupants).forEach(data => {
                console.log(`${data.firstName} is inside ${val.roomName}.`);
            });
        };
    });
};

const rng = (min, max) => {
    return Math.floor(Math.random()*max) + min;
};

simStart();