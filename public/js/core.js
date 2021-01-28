// This is a global variable to keep track of the current turn counter.
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
// Due to time constraints, I may leave this in for the time being.
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

// All of the initial functions required to setup the sim.
const simStart = () => {
    //Randomly chooses a Killer from among available actors.
    setKiller();
    //Randomly chooses a Murder Room from among available rooms.
    setMurderRoom();
    console.log(`A Skrull has struck at the heart of the Inhumans!`)
    //Randomly places each actor inside a random room.
    initialPlacement();
    //Checks & Prints the placement of all actors.
    roomStatus();
    //Starts Turn 1.
    simTurn();
};

const setKiller = () => {
    //Randomly chooses an actor...
    const killer = actorsList[rng(0, actorsList.length)];
    //...and assigns them to be the killer.
    killer.isKiller = true;
};

const setMurderRoom = () => {
    //Randomly chooses a room...
    const murderRoom = roomList[rng(0, roomList.length)];
    //...and assigns them to be the killer.
    murderRoom.isMurderRoom = true;
};

const initialPlacement = () => {
    //Basic function that randomly determines the initial placement of each actor.
    actorsList.forEach((val) => {
        if (val.isKiller == true) {
            //If they are the killer, they are pushed to the Murder room.
            roomList[murderRoomCheck()].occupants.push(val);
        } else {
            //If they aren't the killer, they are pushed to rooms that aren't the murder room.
            roomList[rngExclusion(0,roomList.length,murderRoomCheck())].occupants.push(val);
        };
    });
};

const simTurn = () => {
    //Increase the turn counter by 1.
    turns.turn += 1
    //Print the start of the turn.
    console.log(`Turn ${turns.turn} begins.`)
    //Run a function to have actors move to adjacent rooms at random.
    actorsMove();
    //Run a function to print the current status of the rooms and trigger events.
    roomStatus();
    //Allows the actors to move next turn.
    refreshMoves();
    //Check to see if the end of game condition is met.
    endCheck();
};

const actorsMove = () => {
    //Look at each room.
    roomList.forEach((data) => {
        //If there's at least one person in the room...
        if (data.occupants.length > 0) {
            let queueArray = [];
            let hereArray = [];
            //Find each occupant and...
            data.occupants.forEach((val) => {
                //If they haven't moved yet, we're going to queue them up for a move.
                if (val.hasMoved == false) {
                    val.hasMoved = true;
                    queueArray.push(val);
                } else {
                    //otherwise, they are staying here.
                    hereArray.push(val);
                };
            });
            data.occupants = [];
            //For each person queued to move...
            queueArray.forEach((val) => {
                //Find a random adjacent room...
                num = isAdjacent(data);
                //Compare it to all of the possible rooms...
                roomList.forEach((data2) => {
                    if (data2.id == num) {
                        //and push the queued occupant into that adjacent room.
                        data2.occupants.push(val);
                    };
                });
            });
            //All occupants that already moved will stay in this room.
            hereArray.forEach((val) => {
                data.occupants.push(val);
            });
        };
    });
};

// A utility function that checks to see if the actor is in the murder room.
const investigateRoom = (room, actor) => {
    //If they're in the murder room and not the murderer...
    if (room.isMurderRoom == true && actor.isKiller == false) {
        //Set their respective property to the index of the murder room.
        actor.foundRoom = roomList.indexOf(room);
        console.log(`${actor.identity} has found the murder room!`);
    };
};

const investigatePerson = (val) => {
    let killerHere = false;
    let killerNum
    //For each occupant in the room...
    val.forEach((val2) => {
        //If one of them is the killer...
        if (val2.isKiller == true) {
            //We'll save that data in this function.
            killerHere = true;
            killerNum = killerCheck();
        };
        // If the killer is in this room, each other person will remember that.
        if (killerHere == true && val2.isKiller == false) {
            console.log(`${val2.identity} has found the murderer!`)
            val2.foundKiller = killerNum;
        };
    });
};

// A utility function that returns the index value of the murder room.
const murderRoomCheck = () => {
    let roomNum = 0;
    //Looks at every room.
    roomList.forEach((val) => {
        //If a room is labeled as the murder room...
        if (val.isMurderRoom == true) {
            //save its index number.
            roomNum = roomList.indexOf(val);
        };
    });
    return roomNum;
};

//Returns the index number of the current killer.
const killerCheck = () => {
    let killerNum = 0;
    //Looks at every actor.
    actorsList.forEach((val) => {
        //If an actor is labeled as the killer..
        if (val.isKiller == true) {
            //save its index number.
            killerNum = actorsList.indexOf(val);
        };
    });
    return killerNum;
};

// A major function that checks and prints the status of all actors.
const roomStatus = () => {
    // Look at each room...
    roomList.forEach((val) => {
        //If that room has nobody inside it...
        if (val.occupants.length == 0) {
            //Print this log.
            console.log(`There is nobody inside ${val.roomName}.`);
        //If that room has 1 or more people inside it...
        } else if (val.occupants.length > 1) {
            let allOcc = [];
            // We construct a grammatically correct sentence for each person inside the room.
            for (let i = 0; i < val.occupants.length; i++) {
                if (i == 0) {
                    allOcc.push(`${val.occupants[i].identity}`);
                } else if (i == val.occupants.length - 1) {
                    allOcc.push(` and ${val.occupants[i].identity}`);
                } else if (i < val.occupants.length) {
                    allOcc.push(`, ${val.occupants[i].identity}`);
                };
            };
            console.log(`${allOcc.join('')} are inside ${val.roomName}.`);
            //Then, we have each person investigate the room's occupants.
            investigatePerson(val.occupants);
        } else {
            //If a person is in a room alone...
            Object.values(val.occupants).forEach(data => {
                //Print that they are in that room and...
                console.log(`${data.identity} is inside ${val.roomName}.`);
                //They investigate that room.
                investigateRoom(val, data);
            });
        };
    });
};

const isAdjacent = (room) => {
    //Randomly chooses a room that's adjacent to this room.
    return room.adjacentTo[rng(0, room.adjacentTo.length)];
};

const refreshMoves = () => {
    //All actors have their movement re-enabled.
    actorsList.forEach((data) => {
        data.hasMoved = false;
    });
};

const endCheck = () => {
    let gameOver = false;
    //We check each actor...
    actorsList.forEach((data) => {
        //If they know who the murderer is and the correct room...
        if (data.foundRoom == murderRoomCheck() && data.foundKiller == killerCheck()) {
            //Print that the game's over.
            console.log(`The sim is over! ${data.identity} discovered that ${killerName()} had murdered an Inhuman at the ${mRoomName()}!`);
            gameOver = true;
        };
    });
    if (gameOver == false) {
        //If the game isn't over, start a new turn indefinitely.
        simTurn();
    };
};

//A small helper function that returns the name of the killer.
const killerName = () => {
    return actorsList[killerCheck()].identity;
};

//A small helper function that returns the name of the murder room.
const mRoomName = () => {
    return roomList[murderRoomCheck()].roomName;
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