import expressSession from "express-session";

export const sessionMiddleware = expressSession({
    secret: "Tecky Academy teaches typescript",
    resave: true, //Auto save session
    saveUninitialized: true,
    // cookies: {secure : false}
});
