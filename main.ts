import express from 'express';
import expressSession from 'express-session'


const app = express()
app.use(express.json());

//Session
app.use(
  expressSession({
    secret: 'Tecky Academy teaches typescript',
    resave: true, //Auto save session 
    saveUninitialized: true,
  }),
)




app.use(express.static("public"))

declare module 'express-session' {
  interface SessionData {
    name?: string
  }
}






app.listen(8080, () => {

  console.log('Server is listening http://localhost:8080');

})