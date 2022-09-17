import express from 'express';
import { client } from '../main'


export const chatRoutes = express.Router();


chatRoutes.get('/getRoomInfo', async (req, res) => {
    try {
        const userA = req.query.userA
        const userB = req.query.userB
        const roomId = req.query.roomId
        const currentUser = req.session['user'].id

        const userA_info = await client.query(`SELECT * from users where id = $1`, [userA])
        const userB_info = await client.query(`SELECT * from users where id = $1`, [userB])
        const roomInfo = {
            userA_info,
            userB_info,
            currentUser,
            roomId
        }

        res.status(200).json(roomInfo)
    } catch (err) {

        res.status(400).json({
            message: err
        })

    }

})