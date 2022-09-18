console.log("match Route 1")
import { v4 as uuid } from 'uuid';
import express from 'express'
console.log("match Route 2")
import { io } from '../main';
import { DistanceMatrixService } from "distance-matrix-2";

console.log("match Route 3")
const service = new DistanceMatrixService(process.env.GOOGLE_MATRIX_API_KEY);

service.setKey('AIzaSyBLLtLmB3NIKUrPq6vwFSz7IRrdL8pVUNA');

// import { client } from '../main's

let readyUsers: any = [{ userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }];
// { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }, { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } }, { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665 } }
// { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } }, { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665} }, { userId: 3, location: { lat: 22.28601222944395, lng: 114.14757727141927 } }, { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }
//     // const x = [22.30933514419831, 114.23787345976665] // Lam Tin 
//     // const y = [22.2836612609074, 114.15163536268929] // 元創方 (H211 Block B PMQ, 35 Aberdeen St, Central, Hong Kong)
//     // const y = [22.28601222944395, 114.14757727141927] // 荷李活道公園 (Hong Kong, Tai Ping Shan, 荷李活道228號B)
//     // const y = [22.286290196846565, 114.14976595398261] 上環文娛中心 (345 Queen's Road Central, Sheung Wan, Hong Kong)

export const matchRoutes = express.Router();


//Matched Users
// matchRoutes.post('/startChat', (req, res) => {
//     try {
//         const currentUserId = req.body.currentUserId;
//         const userId = req.body.userId
//         console.log(`startChat:${currentUserId}, ${userId} `)

//         //delete from ready users

//         console.log('rd_m:', readyUsers)

//         const currentSessionInfo = req.session['user']

//         const roomId: string = uuid();

//         const roomInfomation: RoomInfomation = {
//             userIdA: currentUserId,
//             userIdB: userId,
//             roomId
//         }

//         createdRooms.push(roomInfomation)
//         console.log({ roomInfomation })


//         io.sockets.socketsJoin(roomId)

//         io.in(roomId).emit('getMessage', `${currentSessionInfo.name} has joined the chat.`)


//         // io.to("room_userIdA_userIdB").emit("getMessage")
//         req.session.roomInfomation = roomInfomation
//         console.log("roomInfomation: ", req.session.roomInfomation)

//         // const currentUser = readyUsers.findIndex((obj: { userId: any; }) => obj.userId == currentUserId);
//         // readyUsers.splice(currentUser, 1);
//         // const currentUser2 = readyUsers.findIndex((obj: { userId: any; }) => obj.userId == userId);
//         // readyUsers.splice(currentUser2, 1);

//         res.status(200).json({
//             roomInfomation
//         })
//     } catch (err) {
//         res.status(400).json('fail to update')
//     }


// })

//
matchRoutes.get('/geMe', async (req, res) => {
    try {
        res.status(200).json({
            userId: req.session['user']?.id || 10
        })
    } catch (err) {
        res.status(400).json('fail to get current user')
    }
})

//Update user location
matchRoutes.post('/', async (req, res) => {
    try {
        const userId = req.session['user']?.id || 10;
        if (!userId) {
            res.status(500).json('Please login in first')
            return;
        }
        const latitude = req.body.latitude;
        const longitude = req.body.longtitude;
        const location = { lat: latitude, lng: longitude }
        req.session['user'].location = location;
        const userLocation = { userId: userId, location: location }
        readyUsers.push(userLocation)

        //Current User Info from session
        const ownerId = req.session['user'].id
        const ownerName = req.session['user'].name
        const ownerLocation = req.session['user'].location

        console.log('readyUsers in server: ', readyUsers)
        console.log('ownerId: ', ownerId)
        console.log('ownerLocation: ', ownerLocation)

        let distances = [];
        for (let i = 0; i < readyUsers.length; i++) {
            if (readyUsers[i].userId == ownerId) {
                continue;
            }

            console.log("i :" + i);

            let destinationUser = readyUsers[i].location;
            const request = {
                origins: [ownerLocation],
                destinations: [destinationUser],

            }

            const response = await service.getDistanceMatrix(request)
            console.log(`response${i}`, response)
            distances.push({
                userId: readyUsers[i].userId,
                distance: response.rows[0].elements[0].distance.value


            })
        }
        if (distances.length == 0) {
            console.log('no user around')
            return
        }
        distances = distances.sort((a, b) => {
            return a.distance - b.distance
        })

        const pairUpResult = { 'CurrentUserId': ownerId, 'PairUpUserId': distances[0].userId }
        console.log(`Owner nearest user: `, distances)
        console.log(`Pair up result: `, pairUpResult)

        const roomId: string = uuid();
        const userIdA = ownerId;
        const userIdB = distances[0].userId

        const roomInfomation = {
            userIdA,
            userIdB,
            roomId

        }

        req.session['user'].roomInfomation = roomInfomation;

        console.log(req.session['user'].roomInfomation)

        let chatUrl = `../chatroom/chatroom.html?userA=${userIdA}&userB=${userIdB}&roomId=${roomId}`

        io.sockets.emit('toChatroom', chatUrl)


        res.status(200).json('match success')

    } catch (err) {
        console.log(err)
        res.status(400).json('fail to match')
    }
})

//get readyUsers Array
matchRoutes.get('/', async (req, res) => {
    try {
        // console.log('[Get] - /match : ', readyUsers)
        res.status(200).json(readyUsers)
    } catch (err) {
        console.log(err)
        res.status(400).json('fail to get data')
    }
})

//     let userResult = await client.query('select * from users')
//     const users = userResult.rows

//     let currentUser = users.map((user, index) => {
//         return {
//             ...user,
//             distance: calcCrow(lat, long, user.latitude, user.longitude)
//         }
//     })
//     // console.log("A最近既人s: ", A最近既人s)

//     currentUser = currentUser.filter((user, index) => {
//         return 1 > user.distance
//     })
//     currentUser = sorting(currentUser)

//     const A最近既人就係B = A最近既人s[1]

//     // console.log("A最近既人就係B: ", A最近既人就係B)
//     let B最近既人s = users.map((user, index) => {
//         return {
//             ...user,
//             distance: calcCrow(A最近既人就係B.latitude, A最近既人就係B.longitude, user.latitude, user.longitude)
//         }
//     })
//     console.log("B最近既人s: ", B最近既人s)

//     B最近既人s = B最近既人s.filter((user, index) => {
//         return 1 > user.distance
//     })
//     B最近既人s = sorting(B最近既人s)

//     // const B最近既人就係WHO = B最近既人s[1]
//     // const x = [22.2873374, 114.1481932] // tecky
//     // const y = [22.2864781, 114.1518819] // MTR
//     // const y = [22.2856939, 114.146828] // 東華醫院
//     // const y = [22.283593, 114.1328556] // U
//     // const d = calcCrow(x[0], x[1], y[0], y[1])
//     res.json({
//         A最近既人就係B,
//         B最近既人s
//     })
// })

// function sorting(u: any[]) {
//     let users = [...u]
//     users.sort((a, b) => {
//         return a.distance - b.distance
//     })
//     return users
// }
