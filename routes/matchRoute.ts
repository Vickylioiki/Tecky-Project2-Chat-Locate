import { v4 as uuid } from "uuid";
import express from "express";
import { DistanceMatrixService } from "distance-matrix-2";
import { io } from "../utils/socket";
import { Chatroom } from "../class/Chatroom";
import { getUserById } from "../DAO/user-dao";
import { chatRooms } from "../utils/chatroom-helper";
import { sleep } from "../utils/timer";
import { RoomInfomation } from "../utils/model";

console.log("match Route 3");
const service = new DistanceMatrixService(process.env.GOOGLE_MATRIX_API_KEY);

service.setKey("AIzaSyBLLtLmB3NIKUrPq6vwFSz7IRrdL8pVUNA");

// import { client } from '../main's

const createdRooms: RoomInfomation[] = [];
let readyUsers: any = [{ userId: 4, location: { lat: 22.28601222944395, lng: 114.14757727141927 } }];
// { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }, { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } }, { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665 } }
// { userId: 1, location: { lat: 22.285170575820224, lng: 114.14665642394633 } }, { userId: 2, location: { lat: 22.30933514419831, lng: 114.23787345976665} }, { userId: 3, location: { lat: 22.28601222944395, lng: 114.14757727141927 } }, { userId: 4, location: { lat: 22.286290196846565, lng: 114.14976595398261 } }
//     // const x = [22.30933514419831, 114.23787345976665] // Lam Tin
//     // const y = [22.2836612609074, 114.15163536268929] // 元創方 (H211 Block B PMQ, 35 Aberdeen St, Central, Hong Kong)
//     // const y = [22.28601222944395, 114.14757727141927] // 荷李活道公園 (Hong Kong, Tai Ping Shan, 荷李活道228號B)
//     // const y = [22.286290196846565, 114.14976595398261] 上環文娛中心 (345 Queen's Road Central, Sheung Wan, Hong Kong)

export const matchRoutes = express.Router();

//
matchRoutes.get("/geMe", async (req, res) => {
    try {
        res.status(200).json({
            userId: req.session["user"]?.id || 10,
        });
    } catch (err) {
        res.status(400).json("fail to get current user");
    }
});

//Update user location
matchRoutes.post("/", async (req, res) => {
    try {
        const userId = req.session["user"]?.id || 10;
        if (!userId) {
            res.status(500).json("Please login in first");
            return;
        }
        const latitude = req.body.latitude;
        const longitude = req.body.longtitude;
        const location = { lat: latitude, lng: longitude };
        req.session["user"].location = location;
        const userLocation = { userId: userId, location: location };
        readyUsers.push(userLocation);

        //Current User Info from session
        const ownerId = req.session["user"].id;
        const ownerName = req.session["user"].name;
        const ownerLocation = req.session["user"].location;

        console.log("readyUsers in server: ", readyUsers);
        console.log("ownerId: ", ownerId);
        console.log("ownerLocation: ", ownerLocation);

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
            };

            const response = await service.getDistanceMatrix(request);
            console.log(`response${i}`, response);
            if (response.rows[0].elements[0].distance.value < 200) {
                distances.push({
                    userId: readyUsers[i].userId,
                    distance: response.rows[0].elements[0].distance.value,
                });
            }
        }
        // distances.push({
        //   userId: 1,
        //   distance: 1,
        // });

        if (distances.length == 0) {
            // throw new Error("no user around");
            await sleep(10000);
            const failedMatchUser = readyUsers.findIndex((obj: { userId: any }) => obj.userId == ownerId);
            readyUsers.splice(failedMatchUser, 1);
            console.log("no user around");
            res.status(400).json("fail");
            return;
        }

        distances = distances.sort((a, b) => {
            return a.distance - b.distance;
        });

        const pairUpResult = {
            CurrentUserId: ownerId,
            PairUpUserId: distances[0].userId,
        };
        console.log(`Owner nearest user: `, distances);
        console.log(`Pair up result: `, pairUpResult);

        const roomId: string = uuid();
        const userIdA = ownerId;
        const userIdB = distances[0].userId;

        const userA = await getUserById(userIdA);
        const userB = await getUserById(userIdB);

        let chatRoom: Chatroom = new Chatroom(roomId, userA, userB);
        chatRooms[roomId] = chatRoom;

        // userA and UserB are currently in the readyUsers
        for (let user of readyUsers) {
            console.log(user.userId);
            console.log(userIdB);
            const waitingUserId = user.userId;
            if (waitingUserId === userIdB) {
                io.to(userA.username).emit("to-chatroom");
                io.to(userB.username).emit("to-chatroom");

                console.log("readyUsersb4:", readyUsers);
                //splice users
                const currentUser = readyUsers.findIndex((obj: { userId: any }) => obj.userId == userIdA);
                readyUsers.splice(currentUser, 1);
                const currentUser2 = readyUsers.findIndex((obj: { userId: any }) => obj.userId == userIdB);
                readyUsers.splice(currentUser2, 1);

                console.log("readyUsers After:", readyUsers);
                res.json("Matched");
                return;
            }
        }

        const failedMatchUser = readyUsers.findIndex((obj: { userId: any }) => obj.userId == ownerId);
        readyUsers.splice(failedMatchUser, 1);
        res.status(400).json({ message: "match failed" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "match failed" });
    }

    //get readyUsers Array
    matchRoutes.get("/", async (req, res) => {
        try {
            // console.log('[Get] - /match : ', readyUsers)
            res.status(200).json(readyUsers);
        } catch (err) {
            console.log(err);
            res.status(400).json("fail to get data");
        }
    });
});

matchRoutes.delete("/stopMatching", async (req, res) => {
    try {
        const currentUser = req.session["user"].id;

        const FindcurrentUser = readyUsers.findIndex((obj: { userId: any }) => obj.userId == currentUser);

        readyUsers.splice(FindcurrentUser, 1);

        console.log("readyUsersDelete: ", readyUsers);
    } catch (err) {
        res.status(400).json("internal server");
    }
});

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
