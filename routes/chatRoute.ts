import express from 'express';
import { client } from '../main';



export const chatRoutes = express.Router();


chatRoutes.get('/getchatroom', async (req, res) => {
    try {
        const roomInfo = req.session['user'].roomInfomation
        const userIdA = roomInfo.userIdA
        const userIdB = roomInfo.userIdB
        const roomId = roomInfo.roomId
        const currentUser = req.session['user'].id

        const userA = (await client.query(`SELECT * from users where id = $1`, [userIdA])).rows[0]

        const userB = (await client.query(`SELECT * from users where id = $1`, [userIdB])).rows[0]

        const info = {
            userA,
            userB,
            roomId,
            currentUser
        }

        console.log('room: ', roomInfo)
        console.log('currentUser', currentUser)

        res.status(200).json(info)
    } catch (err) {

        res.status(400).json({
            message: err
        })

    }

})