const turns = {
    turn: 0,
}

// This is a placeholder array of objects that would normally be fetched from our DB.
const actorsList = [
    actor1 = {
        id: 1,
        identity: "Black Bolt",
        isKiller: false,
        foundKiller: 0,
        foundRoom: 0,
    },
    actor2 = {
        id: 2,
        identity: "Medusa",
        isKiller: false,
        foundKiller: 0,
        foundRoom: 0,
    },
    actor3 = {
        id: 3,
        identity: "Karnak the Shatterer",
        isKiller: false,
        foundKiller: 0,
        foundRoom: 0,
    },
    actor4 = {
        id: 4,
        identity: "Crystal",
        isKiller: false,
        foundKiller: 0,
        foundRoom: 0,
    },
    actor5 = {
        id: 5,
        identity: "Lockjaw",
        isKiller: false,
        foundKiller: 0,
        foundRoom: 0,
    }
];

// This is a placeholder array of objects that would normally be fetched from our DB.
const roomList = [
    room1 = {
        id: 1,
        roomName: "Agon's Tower",
        adjacentTo: [2,3,4],
        isMurderRoom: false,
        occupants: [],
    },
    room2 = {
        id: 2,
        roomName: "Pit of the Dead",
        adjacentTo: [1,3,5],
        isMurderRoom: false,
        occupants: [],
    },
    room3 = {
        id: 3,
        roomName: "The Palace",
        adjacentTo: [1,2,4,5],
        isMurderRoom: false,
        occupants: [],
    },
    room4 = {
        id: 4,
        roomName: "Old Attilan Harbor",
        adjacentTo: [1,3,5],
        isMurderRoom: false,
        occupants: [],
    },
    room5 = {
        id: 5,
        roomName: "Terrigen Lab",
        adjacentTo: [2,3,4],
        isMurderRoom: false,
        occupants: [],
    }
];

const simStart = () => {
    setKiller();
    setMurderRoom();
    console.log(`A Skrull has struck at the heart of the Inhumans!`)
    initialPlacement();
    roomStatus();
    simTurn();
};

const setKiller = () => {
    const killer = actorsList[rng(0, actorsList.length)];
    killer.isKiller = true;
};

const setMurderRoom = () => {
    const murderRoom = roomList[rng(0, roomList.length)];
    murderRoom.isMurderRoom = true;
};

const initialPlacement = () => {
    //Basic function that randomly determines the initial placement of each actor.
    actorsList.forEach((val) => {
        if (val.isKiller == true) {
            roomList[murderRoomCheck()].occupants.push(val);
        } else {
            roomList[rngExclusion(0,roomList.length,murderRoomCheck())].occupants.push(val);
        };
    });
};

const simTurn = () => {
    turns.turn += 1
    console.log(`Turn ${turns.turn} begins.`)
    // TODO: Setup movement.
    actorsMove();
};

// A utility function that checks to see if the actor is in the murder room.
const investigateRoom = (room, actor) => {
    if (room.isMurderRoom == true && actor.isKiller == false) {
        actor.foundRoom = room.id;
        console.log(`${actor.identity} has found the murder room!`);
    } else {
        return;
    };
};

// A utility function that returns the index value of the murder room.
const murderRoomCheck = () => {
    let roomNum = 0;
    roomList.forEach((val) => {
            if (val.isMurderRoom == true) {
                roomNum = roomList.indexOf(val)
            } else {
                return;
            };
    });
    return roomNum;
};

// A major function that checks and prints the status of all actors.
const roomStatus = () => {
    roomList.forEach((val) => {
        if (val.occupants.length == 0) {
            console.log(`There is nobody inside ${val.roomName}.`);
        } else if (val.occupants.length > 1) {
            let allOcc = [];
            for (let i = 0; i < val.occupants.length; i++) {
                if (i == 0) {
                    allOcc.push(`${val.occupants[i].identity}`);
                } else if (i == val.occupants.length - 1) {
                    allOcc.push(` and ${val.occupants[i].identity}`);
                } else if (i < val.occupants.length) {
                    allOcc.push(`, ${val.occupants[i].identity},`);
                };
            };
            console.log(`${allOcc.join('')} are inside ${val.roomName}.`);
        } else {
            Object.values(val.occupants).forEach(data => {
                console.log(`${data.identity} is inside ${val.roomName}.`);
                investigateRoom(val, data);
            });
        };
    });
};

// A minor utility function that allows for RNG rolls.
const rng = (min, max) => {
    return Math.floor(Math.random()*max) + min;
};

// A minor utility function that allows for RNG rolls that exclude 1 number.
const rngExclusion = (min, max, exc) => {
    let rangeArray = [];
    for (let i = min; i < max; i++) {
        if (i != exc) {
            rangeArray.push(i);
        };
    };
    return rangeArray[Math.floor(Math.random()*rangeArray.length)];
};

simStart();