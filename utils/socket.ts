import express from 'express'
import { Server as SocketIO } from 'socket.io'
import { server, sessionMiddleware } from '../main'
export const io = new SocketIO(server)
export const initialSocket = async () => {
        // console.log("io 4: ", server)
        // console.log("io 4: ", io)

        io.use((socket, next) => {
                let req = socket.request as express.Request
                let res = req.res as express.Response
                sessionMiddleware(req, res, next as express.NextFunction)
        });
}
        // io.on('connection', function (socket) {
        //         const socketId = socket.id
        //         console.log("socketId: " + socketId)
        //         socket.emit('connection', socketId)
        //         const req = socket.request as express.Request;
        //         const user_id = req.session?.user?.id
        //         const roomInfomation = req.session?.roomInfomation!
        //         const roomId = roomInfomation ? roomInfomation.roomId! : null


        // if (roomId) {
        //         console.log({ user_id })
        //         console.log({ roomId })
        //         socket.join(roomId)

        //         io.sockets.to(roomId).emit('roomInfomation', roomInfomation)

        //         socket.on("sendMessage", (data) => {
        //                 io.to(roomId).emit('getMessage', data)
        //         })
        // }
// })
// }
// socket.on('createRoom', () => {
//         // console.log("user_id: " + user_id)
// })

// socket.on('joinRoom', () => {
//         // console.log("user_id: " + user_id)
// })
// console.log("SocketId: " + socket.id)
// if (currentSessionInfo.id === currentUserId || currentSessionInfo.id === userId) {
//         console.log(`User id: ${currentSessionInfo.id} Username:${currentSessionInfo.name} connected`)
//         socket.join('1')

// }
