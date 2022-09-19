let rooms = {
    'rmD': { userIdA: 2, userIdB: 1 },
    'rmC': { userIdA: 3, userIdB: 8 },
    'rmA': { userIdA: 4, userIdB: 7 },
    'rmB': { userIdA: 5, userIdB: 6 },

}

import moment from 'moment';
let myUserId = 2

export function getOpponentUserId() {

    for (let roomId in rooms) {
        let roomInfo = rooms[roomId]
        let opponentUserId = roomInfo.userIdA == myUserId ? roomInfo.userIdB : roomInfo.userIdA
        if (opponentUserId) {
            return opponentUserId
        }
    }
}
// console.log(getOpponentUserId())



export function parseDate() {
    let createdAt = new Date('2010-01-01T00:00:00')
    let result = moment(createdAt).format('hh:mm A | MMM M');
    console.log(result)
    // 12:00 PM | Aug 13

}

function getRoomIdByUserId(userId: number): string {


    return ''
}