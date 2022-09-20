import grant from "grant";

export const grantExpress = grant.express({
  defaults: {
    origin: "http://localhost:8080",
    transport: "session",
    state: true,
  },
  google: {
    key: process.env.GOOGLE_CLIENT_ID || "",
    secret: process.env.GOOGLE_CLIENT_SECRET || "",
    scope: ["profile", "email"],
    callback: "/user/login/google",
  },
  facebook: {
    key: process.env.FACEBOOK_CLIENT_ID || "",
    secret: process.env.FACEBOOK_CLIENT_SECRET || "",
    scope: ["public_profile", "email"],
    callback: "/user/login/facebook",
    redirect_uri: "http://localhost:8080/connect/facebook/callback",
  },
  instagram: {
    key: process.env.INSTAGRAM_CLIENT_ID || "",
    secret: process.env.INSTAGRAM_CLIENT_SECRET || "",
    scope: ["user_profile", "user_media"],
    callback: "/user/login/instagram",
    redirect_uri: "https://google.com/",
  },
});
