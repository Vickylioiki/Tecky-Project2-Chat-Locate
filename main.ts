import express from "express";
import expressSession from "express-session";
import http from "http";
import { userRoutes } from "./routes/userRoute";
import { matchRoutes } from "./routes/matchRoute";
import { chatRoutes } from "./routes/chatRoute";
// import { initialSocket } from './utils/socket'
import { Server as SocketIO } from "socket.io";

import { setIO } from "./utils/socket";
import { grantExpress } from "./utils/grant";
import { connectDB } from "./utils/db";

export interface RoomInfomation {
  userIdA: number;
  userIdB: number;
  roomId: string;
}

declare module "express-session" {
  interface SessionData {
    name?: string;
    isloggedin?: boolean;
    location?: any;
    user?: any;
    roomInfomation?: any;
  }
}

const app = express();
export const server = new http.Server(app);
export const io = new SocketIO(server); //io and server connect

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Session
export const sessionMiddleware = expressSession({
  secret: "Tecky Academy teaches typescript",
  resave: true, //Auto save session
  saveUninitialized: true,
  // cookies: {secure : false}
});

app.use(sessionMiddleware);

setIO(io);

app.use("/user", userRoutes);
app.use("/match", matchRoutes);
app.use("/chat", chatRoutes);
app.use("/upload", express.static("uploads"));
app.use(express.static("public"));

app.use(grantExpress as express.RequestHandler);

server.listen(8080, () => {
  console.log("Server is listening http://localhost:8080");
  connectDB();
});
