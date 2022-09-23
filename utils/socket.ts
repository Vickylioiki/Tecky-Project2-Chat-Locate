import express from "express";
import { Server as SocketIO } from "socket.io";
import { sessionMiddleware } from "./middleare";
export let io: SocketIO;
export function setIO(ioFromServer: SocketIO) {
    // console.log("io 4: ", io)
    io = ioFromServer;
    io.use((socket, next) => {
        let req = socket.request as express.Request;
        let res = req.res as express.Response;
        sessionMiddleware(req, res, next as express.NextFunction);
    });

    io.on("connection", function (socket) {
        const socketId = socket.id;
        console.log("socketId: ", socketId, " is connected");
        let user = socket.request["session"]["user"];
        if (user?.username) {
            socket.join(user.username);
            console.log(user.username, " room created");
        }
    });
}
