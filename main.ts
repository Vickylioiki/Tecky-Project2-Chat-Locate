
import { Client } from 'pg'
import express from 'express'
import expressSession from 'express-session'
import http from 'http'
import grant from 'grant'
import { userRoutes } from './routes/userRoute'
import { matchRoutes } from './routes/matchRoute'
import { chatRoutes } from './routes/chatRoute'
// import { initialSocket } from './utils/socket'
import { Server as SocketIO } from 'socket.io';

import dotenv from 'dotenv'
export let chatRooms = {}

dotenv.config()

export interface RoomInfomation {
  userIdA: number,
  userIdB: number,
  roomId: string
}

declare module 'express-session' {
  interface SessionData {
    name?: string
    isloggedin?: boolean
    location?: any
    user?: any
    roomInfomation?: any

  }
}

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// import { initialSocket } from './utils/socket'
export let a = "James"
export const server = new http.Server(app)
export const io = new SocketIO(server); //io and server connect

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
})


client.connect()

//Session
export const sessionMiddleware = expressSession({
  secret: 'Tecky Academy teaches typescript',
  resave: true, //Auto save session 
  saveUninitialized: true,
  // cookies: {secure : false}
})

app.use(
  sessionMiddleware
)

app.use('/user', (req, res, next)=>{
  console.log('path match , ', req.path, req.method)
  next()
}, userRoutes)
app.use('/match', matchRoutes)
app.use('/chat', chatRoutes)
app.use(express.static('public'))


// app.use(express.static("public"))

// declare module 'express-session' {
//   interface SessionData {
//     name?: string

//   }
// }


const grantExpress = grant.express({
  defaults: {
    origin: 'http://localhost:8080',
    transport: 'session',
    state: true
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || '',
    secret: process.env.GOOGLE_CLIENT_SECRET || '',
    scope: ['profile', 'email'],
    callback: '/user/login/google'
  },
  facebook: {

    key: process.env.FACEBOOK_CLIENT_ID || '',
    secret: process.env.FACEBOOK_CLIENT_SECRET || '',
    scope: ['public_profile', 'email'],
    callback: '/user/login/facebook',
    redirect_uri: 'http://localhost:8080/connect/facebook/callback'
  },
  instagram: {
    key: process.env.INSTAGRAM_CLIENT_ID || '',
    secret: process.env.INSTAGRAM_CLIENT_SECRET || '',
    scope: ['user_profile', 'user_media'],
    callback: '/user/login/instagram',
    redirect_uri: 'https://google.com/'
  }

}
)

app.use(grantExpress as express.RequestHandler)





server.listen(8080, () => {
  a = "Tom"

  console.log('Server is listening http://localhost:8080');
  // initialSocket()

})