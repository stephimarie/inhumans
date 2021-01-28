const turns = {
    turn: 0,
}

// This is a placeholder array of objects that would normally be fetched from our DB.
const actorsList = [
    actor1 = {
        id: 1,
        identity: "Black Bolt",
        isKiller: false,
        foundKiller: 10,
        foundRoom: 10,
        hasMoved: false,
    },
    actor2 = {
        id: 2,
        identity: "Medusa",
        isKiller: false,
        foundKiller: 10,
        foundRoom: 10,
        hasMoved: false,
    },
    actor3 = {
        id: 3,
        identity: "Karnak the Shatterer",
        isKiller: false,
        foundKiller: 10,
        foundRoom: 10,
        hasMoved: false,
    },
    actor4 = {
        id: 4,
        identity: "Crystal",
        isKiller: false,
        foundKiller: 10,
        foundRoom: 10,
        hasMoved: false,
    },
    actor5 = {
        id: 5,
        identity: "Lockjaw",
        isKiller: false,
        foundKiller: 10,
        foundRoom: 10,
        hasMoved: false,
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
    actorsMove();
    roomStatus();
    refreshMoves();
    endCheck();
};

const actorsMove = () => {
    roomList.forEach((data) => {
        if (data.occupants.length > 0) {
            let queueArray = [];
            let hereArray = [];
            data.occupants.forEach((val) => {
                if (val.hasMoved == false) {
                    val.hasMoved = true;
                    queueArray.push(val);
                } else {
                    hereArray.push(val);
                };
            });
            data.occupants = [];
            queueArray.forEach((val) => {
                num = isAdjacent(data);
                roomList.forEach((data2) => {
                    if (data2.id == num) {
                        data2.occupants.push(val);
                    };
                });
            });
            hereArray.forEach((val) => {
                data.occupants.push(val);
            });
        };
    });
};

// A utility function that checks to see if the actor is in the murder room.
const investigateRoom = (room, actor) => {
    if (room.isMurderRoom == true && actor.isKiller == false) {
        actor.foundRoom = roomList.indexOf(room);
        console.log(`${actor.identity} has found the murder room!`);
    } else {
        return;
    };
};

const investigatePerson = (val) => {
    let killerHere = false;
    let killerNum
    val.forEach((val2) => {
        if (val2.isKiller == true) {
            killerHere = true;
            killerNum = killerCheck();
        };
        if (killerHere == true && val2.isKiller == false) {
            val2.foundKiller = killerNum;
        };
    });
    console.log(val)
};

// A utility function that returns the index value of the murder room.
const murderRoomCheck = () => {
    let roomNum = 0;
    roomList.forEach((val) => {
        if (val.isMurderRoom == true) {
            roomNum = roomList.indexOf(val);
        };
    });
    return roomNum;
};

//Returns the index number of the current killer.
const killerCheck = () => {
    let killerNum = 0;
    actorsList.forEach((val) => {
        if (val.isKiller == true) {
            killerNum = actorsList.indexOf(val);
        };
    });
    return killerNum;
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
                    allOcc.push(`, ${val.occupants[i].identity}`);
                };
            };
            //TODO: Need to add investigate person function.
            console.log(`${allOcc.join('')} are inside ${val.roomName}.`);
            investigatePerson(val.occupants);
        } else {
            Object.values(val.occupants).forEach(data => {
                console.log(`${data.identity} is inside ${val.roomName}.`);
                investigateRoom(val, data);
            });
        };
    });
};

const isAdjacent = (room) => {
    return room.adjacentTo[rng(0, room.adjacentTo.length)];
};

const refreshMoves = () => {
    actorsList.forEach((data) => {
        data.hasMoved = false;
    });
};

const endCheck = () => {
    let gameOver = false;
    actorsList.forEach((data) => {
        //TODO: Add the condition for == killerCheck
        if (data.foundRoom == murderRoomCheck()) {
            console.log(`The sim is over! ${data.identity} has solved the case!`);
            gameOver = true;
        };
    });
    if (gameOver == false) {
        simTurn();
    };
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