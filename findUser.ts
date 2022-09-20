let rooms = [
  { roomId: "rmD", userIdA: 2, userIdB: 1 },
  { roomId: "rmC", userIdA: 3, userIdB: 8 },
  { roomId: "rmA", userIdA: 4, userIdB: 7 },
  { roomId: "rmB", userIdA: 5, userIdB: 6 },
];

import moment from "moment";
let myUserId = 2;

// export function getOpponentUserId() {

//     for (let roomId in rooms) {
//         let roomInfo = rooms[roomId]
//         let opponentUserId = roomInfo.userIdA == myUserId ? roomInfo.userIdB : roomInfo.userIdA
//         if (opponentUserId) {
//             return opponentUserId
//         }
//     }
// }
// console.log(getOpponentUserId())

export function parseDate() {
  let createdAt = new Date("2010-01-01T00:00:00");
  let result = moment(createdAt).format("hh:mm A | MMM M");
  console.log(result);
  // 12:00 PM | Aug 13
}

// userId: number

// function getRoomIdByUserId(userId: number): any {
//   let room: any = rooms.find(
//     (room) => room.userIdA == userId || room.userIdB == userId
//   );
//   return room.roomId;
// }

// console.log("user", getRoomIdByUserId(8));

let readyUsers: any = [
  { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } },
  { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } },
  { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665 } },
];

for (let user of readyUsers) {
  const waitingUserId = user.userId;
  if (waitingUserId) waitingUserId;
}
