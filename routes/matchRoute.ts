import express from 'express'
// import { client } from '../main'


let readyUsers: any = [];
// { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }, { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } }, { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665 } }
// { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } }, { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665} }, { userId: 3, location: { lat: 22.28601222944395, lng: 114.14757727141927 } }, { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }
//     // const x = [22.30933514419831, 114.23787345976665] // Lam Tin 
//     // const y = [22.2836612609074, 114.15163536268929] // 元創方 (H211 Block B PMQ, 35 Aberdeen St, Central, Hong Kong)
//     // const y = [22.28601222944395, 114.14757727141927] // 荷李活道公園 (Hong Kong, Tai Ping Shan, 荷李活道228號B)
//     // const y = [22.286290196846565, 114.14976595398261] 上環文娛中心 (345 Queen's Road Central, Sheung Wan, Hong Kong)

export const matchRoutes = express.Router()




//Matched Users
matchRoutes.post('/startChat', (req, res) => {
    try {
        const currentUserId = req.body.currentUserId;
        const userId = req.body.userId
        console.log(`startChat:${currentUserId}, ${userId} `)
        // res.json({ userId })[]

        //put users into room


        //delete from ready users
        const currentUser = readyUsers.findIndex((obj: { userId: any; }) => obj.userId == currentUserId);
        readyUsers.splice(currentUser, 1);
        const currentUser2 = readyUsers.findIndex((obj: { userId: any; }) => obj.userId == userId);
        readyUsers.splice(currentUser2, 1);

        console.log('rd_m:', readyUsers)
        res.status(200).json('updated array')
    } catch (err) {
        res.status(400).json('fail to update')
    }


})

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

        const userLocation = { userId: userId, location: location }



        readyUsers.push(userLocation)

        console.log(readyUsers)
        res.status(200).json('update successful')



    } catch (err) {
        console.log(err)
        res.status(400).json('fail to update')
    }
})

//get readyUsers Array
matchRoutes.get('/', async (req, res) => {
    try {
        console.log('ru: ', readyUsers)
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
// function calcCrow(x1: number, y1: number, x2: number, y2: number) {
//     console.log({ x1, y1 })
//     console.log({ x2, y2 })

//     let R = 6371; // km
//     let dLat = toRad(x2 - x1);
//     let dLon = toRad(y2 - y1);
//     let lat1 = toRad(x1);
//     let lat2 = toRad(x2);

//     let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
//     let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     let d = R * c;
//     return d;
// }

// function toRad(value: number) {
//     return value * Math.PI / 180;
// }