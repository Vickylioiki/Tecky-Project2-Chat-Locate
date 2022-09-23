import express from "express";
import http from "http";
import { userRoutes } from "./routes/userRoute";
import { matchRoutes } from "./routes/matchRoute";
import { chatRoutes } from "./routes/chatRoute";
import { Server as SocketIO } from "socket.io";

import { setIO } from "./utils/socket";
import { grantExpress } from "./utils/grant";
import { connectDB } from "./utils/db";
import { isLoggedIn } from "./utils/guard";
import { sessionMiddleware } from "./utils/middleare";

declare module "express-session" {
    interface SessionData {
        name?: string;
        isloggedin?: boolean;
        location?: any;
        user?: any;
        gender?: string;
        contact_no?: string;
        aboutme?: string;
        dateofbirth?: string;
        occupation?: string;
        hobby?: string;
        country?: string;
        icon?: string;
    }
}

const app = express();
const server = new http.Server(app);
const io = new SocketIO(server); //io and server connect

app.use(express.json());
app.use(sessionMiddleware);

setIO(io);

app.use("/user", userRoutes);
app.use("/match", isLoggedIn, matchRoutes);
app.use("/chat", isLoggedIn, chatRoutes);
app.use("/upload", express.static("uploads"));
app.use(express.static("public"));

app.use(grantExpress as express.RequestHandler);

server.listen(8080, () => {
    console.log("Server is listening http://localhost:8080");
    connectDB();
});
