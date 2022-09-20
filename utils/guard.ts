import express from "express";

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session.isLoggedIn) {
    next(); //要( )
    return;
  }
  res.status(401).json({ msg: "Please login first" });
  // res.redirect("/index.html");
  return;
};
