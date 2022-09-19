import express from 'express';
import { chatRooms, client } from '../main';
import moment from 'moment';
export const chatRoutes = express.Router();

function getOpponentUserId(myUserId: number) {

    for (let roomId in chatRooms) {
        let roomInfo = chatRooms[roomId]
        let opponentUserId = roomInfo.userIdA == myUserId ? roomInfo.userIdB : roomInfo.userIdA
        if (opponentUserId) {
            return opponentUserId
        }
    }
}
chatRoutes.get('/getchatroom', async (req, res) => {
    try {

        const userId = req.session['user'].id
        const opponentUserId = getOpponentUserId(userId)
        const opponentUserInfo = (await client.query(`SELECT * from users where id = $1`, [opponentUserId])).rows[0]
        // io.emit('chatroomData', opponentUserInfo)

        let returnObj = {
            opponentUserInfo,
            myUserInfo: req.session['user'],
            conversations: [
                {
                    from: userId,
                    content: "Hi I am Vicky from server demo",
                    createdAt: moment(new Date()).format('hh:mm A | MMM M')
                },
                {
                    from: opponentUserId,
                    content: "Cake or pie? I can tell a lot about you by which one you pick. It may seem silly, but cake people and pie people are really different.",
                    createdAt: moment(new Date()).format('hh:mm A | MMM M')
                }
                // 12:00 PM | Aug 13
            ]
        }
        res.json(returnObj)
    } catch (err) {
        console.log(err);

        res.status(400).json({
            message: err
        })

    }

})


