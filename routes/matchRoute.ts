import express from 'express'
// import { client } from '../main'

let readyUsers: any = [{ userId: 1, location: { lat: 22.2873374, lng: 114.1481932 } }, { userId: 2, location: { lat: 22.2864781, lng: 114.1518819 } }, { userId: 3, location: { lat: 22.2856939, lng: 114.146828 } }, { userId: 4, location: { lat: 22.283593, lng: 114.1328556 } }];
//     // const x = [22.2873374, 114.1481932] // tecky
//     // const y = [22.2864781, 114.1518819] // MTR
//     // const y = [22.2856939, 114.146828] // 東華醫院
//     // const y = [22.283593, 114.1328556] // U

export const matchRoutes = express.Router()


matchRoutes.post('/', async (req, res) => {
    try {

        const userid = req.session['user'].id;
        const latitude = req.body.latitude;
        const longitude = req.body.longtitude;
        const location = { lat: latitude, lng: longitude }

        const userLocation = { userid: userid, location: location }
        readyUsers.push(userLocation)

        console.log(userLocation)
        res.status(200).json('update successful')



    } catch (err) {
        console.log(err)
        res.status(400).json('fail to update')
    }
})


matchRoutes.get('/', async (req, res) => {
    try {
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