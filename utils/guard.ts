import express from "express";

declare module "express-session" {
  interface SessionData {
    name?: string
    isloggedin?: boolean
    location?: any
    user?: any
    gender?: string
    contact_no?: string
    aboutme?: string
    dateofbirth?: string
    occupation?: string
    hobby?: string
    country?: string
    icon?: string
  }
}


export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session.isloggedin) {
    next(); //要( )
    return;
  }
  res.status(401).json({ msg: "Please login first" });
  // res.redirect("/index.html");
  return;
};
