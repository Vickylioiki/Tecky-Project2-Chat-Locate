import express from "express";
import { checkPassword, hashPassword } from "../hash";
import fetch from "cross-fetch";
import crypto from "crypto";
import moment from "moment";
// import { request } from "http";
import { client } from "../utils/db";
// import { request } from 'http'

export const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  let userResult = await client.query("select * from users");
  res.json(userResult.rows);
});

userRoutes.get("/me", async (req, res) => {
  res.json(req.session["user"]);
});

userRoutes.get("/user-profile/:userId", async (req, res) => {
  const id = req.params.userId;
  console.log("id is " + id);
  let getUsers = await client.query("SELECT * FROM users WHERE id = $1", [id]);

  res.json(getUsers.rows[0]);
});

userRoutes.get("/friend-request", async (req, res) => {
  // let fromUserId = req.session['user'].id
  // let toUserId = req.body.toUserId
  // let userResult = await client.query('insert into friends ')
  // status = 'PENDING'
  res.json({
    message: "Friend request sent.",
  });
});

userRoutes.get("/notifications", async (req, res) => {
  let userId = req.session["user"]?.id;
  let limit = req.query.limit;
  console.log("/notifications req.session['user']", userId);
  if (!userId) {
    res.status(403).json({
      message: "You should login first",
    });
    return;
  }

  let result = await client.query(
    `select notifications.*, users.name from notifications 
         inner join users on users.id = notifications.opponent_user_id
         where notifications.user_id = $1 
        ORDER BY notifications.created_at DESC;
        `,
    [userId]
  );

  // console.log('result.rows:', result.rows)

  let notificationItems = result.rows.map((notification) => {
    return {
      ...notification,
      created_at: moment(notification.created_at).startOf("hour").fromNow(),
    };
  });
  console.log("notificationItems: ", notificationItems);
  res.json({
    data: notificationItems,
  });
});

userRoutes.post("/notifications", async (req, res) => {
  try {
    const { user_id, message, type } = req.body;
    console.log("req.body", req.body);
    if (!user_id || !message || !type) {
      res.status(400).json({
        message: "Invalid user_id or message or type",
      });
      return;
    }
    console.log("req.session: ", req.session["user"]);

    let currentUserId = req.session["user"]["id"];

    if (!currentUserId) {
      res.status(400).json({
        message: "Invalid login session, current user info not found",
      });
      return;
    }

    // if current user id exists, find its icon from db
    let selectResult = (
      await client.query(
        `
            select u.icon, fb.profile_pic as fb_profile_pic, ggl.profile_pic as ggl_profile_pic
            from users u
            left join facebook_profile fb on fb.user_id = u.id
            left join google_profile ggl on ggl.user_id = u.id
            where u.id = $1
            `,
        [currentUserId]
      )
    ).rows[0];

    console.log("user icon selectResult:", selectResult);

    // if user icon is null, use facebook icon, else use google icon
    let currentUserIcon =
      selectResult.icon ??
      selectResult.fb_profile_pic ??
      selectResult.ggl_profile_pic;

    // create notification record
    let insertResult = (
      await client.query(
        `INSERT INTO notifications (user_id, opponent_user_id, message, icon, status, type)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [user_id, currentUserId, message, currentUserIcon, "pending", type]
      )
    ).rows[0];

    console.log("insertResult: ", insertResult);

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRoutes.patch("/notifications", async (req, res) => {
  const notificationId = req.body.notificationId;
  console.log("patch /user/notifications notificationId: " + notificationId);

  // disable notifications, so that they will not display on login afterwards
  await client.query(`UPDATE notifications SET enabled = false WHERE id = ${notificationId}
    `);

  res.json({ status: "ok" });
});

userRoutes.post("/update-relation", async (req, res) => {
  try {
    let { notificationId, status } = req.body;

    // throw error if status is neither approved nor rejected
    if (["approved", "rejected"].indexOf(status) === -1) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    console.log("notificationId: ", [
      status,
      notificationId,
      "invitation",
      true,
    ]);

    // disable notification
    let updateResult = (
      await client.query(
        `update notifications set status = $1 where id = $2 returning *`,
        [status, notificationId]
      )
    ).rows[0];

    console.log("/update-relation updateResult: ", updateResult);
    // throw error if notification is currently not enabled, or not invitation
    if (!updateResult) {
      res.status(400).json({ message: "Invalid notification update" });
      return;
    }

    // throw error if identical user id for friend request
    if (updateResult.user_id === updateResult.opponent_user_id) {
      res
        .status(400)
        .json({ message: "Error: identical user friend add request" });
      return;
    }

    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Intertal error" });
  }
});

userRoutes.post("/update-relation", async (req, res) => {
  try {
    let { notificationId } = req.body;

    // throw error if status is neither approved nor rejected
    // if (['', 'approved', 'rejected'].indexOf(status) === -1) {
    //     res.status(400).json({ message: 'Invalid status 123' })
    //     return
    // }

    console.log("notificationId: ", notificationId);

    // disable notification
    let updateResult = (
      await client.query(
        `update notifications set enabled = false where id = $1 returning * `,
        [notificationId]
      )
    ).rows[0];

    console.log("/update-relation updateResult: ", updateResult);

    // throw error if notification is currently not enabled, or not invitation
    // if (!updateResult) {
    //     res.status(400).json({ message: 'Invalid notification update' })
    //     return
    // }

    // throw error if identical user id for friend request
    // if (updateResult.user_id === updateResult.opponent_user_id) {
    //     res.status(400).json({ message: 'Error: identical user friend add request' })
    //     return
    // }

    // check if friend relationship exists
    // let friendRelationship = (await client.query(`
    //     select * from friends_list
    //     where (from_user_id = $1 and to_user_id = $2)
    //     or (from_user_id = $2 and to_user_id = $1)
    //     `, [updateResult.user_id, updateResult.opponent_user_id])).rows;

    // if (status === 'approved' && friendRelationship.length == 0) {
    //     await client.query(`INSERT INTO friends_list (from_user_id, to_user_id)
    // VALUES ($1, $2)`,
    //         [updateResult.opponent_user_id, updateResult.user_id]);
    // }

    res.json({ status: updateResult });
  } catch (e) {
    res.status(400).json({ message: e });
  }

  res.json({ status: "ok" });
});

/**
            res.status(400).json({ message: 'Error: identical user friend add request' })
            return
        }

        // check if friend relationship exists
        let friendRelationship = (await client.query(`
            select * from friends_list
            where (from_user_id = $1 and to_user_id = $2)
            or (from_user_id = $2 and to_user_id = $1)
            `, [updateResult.user_id, updateResult.opponent_user_id])).rows;

        if (status === 'approved' && friendRelationship.length == 0) {
            await client.query(`INSERT INTO friends_list (from_user_id, to_user_id)
        VALUES ($1, $2)`,
                [updateResult.opponent_user_id, updateResult.user_id]);
        }

        // still need the opponent (friend)'s name
        let friendUser = (await client.query(`
            select * from users where id = ${updateResult.opponent_user_id}
        `)).rows[0];
        console.log('friendUser Name: ', friendUser.name);

        res.json({...updateResult, created_at: moment(updateResult.created_at).startOf('hour').fromNow(), friendName: friendUser.name})
    } catch (e) {
        res.status(400).json({ message: e })

    }
    
})
/** 
 * when current user click "Chat" button, trigger this API call
 * to save the opponent he/she is going to talk to, in request session
 * */
// userRoutes.post('/start-chat', async (req, res) => {
//     // the opponent user id
//     try {
//         let userId = req.body.userId;
//         // sql save/initiate chat history?

//         // save into request session
//         req.session['chat_user'] = userId;

//         console.log("/start-chat saved req.session['chat_user']", req.session['chat_user'])

//         // res.redirect('/chatroom/chatroom.html')
//         res.json({ status: "ok" })
//     }
//     catch (error) {
//         console.log(error)
//         res.status(500).json({ message: 'Internal server error' })
//     }

// })

/**
 * after enter chatroom, call this function to get chat opponent,
 * or chat history
 */
userRoutes.get("/get-chat", async (req, res) => {
  let opponent = req.session["chat_user"];

  // if opponent exists
  if (!opponent) {
    res.json({ message: "opponent not found" });
  }

  // sql query for chat history?

  res.json({ userId: opponent });
});

userRoutes.get("/show-all-activities", async (req, res) => {
  res.end("ok");
});

userRoutes.post("/register", async (req, res) => {
  try {
    const { username, password, name } = req.body;
    console.log("req.body", req.body);
    if (!username || !password || !name) {
      res.status(400).json({
        message: "Invalid username or password",
      });
      return;
    }
    console.log("username and password checking passed!!");

    let userResult = await client.query(
      `select * from users where username = $1`,
      [username]
    );

    if (userResult.rows.length > 0) {
      res.status(400).json({
        message: "username already exists",
      });
      return;
    }
    console.log("existing username checking passed!!");

    let hashedPassword = await hashPassword(password);
    console.log("hashedPassword", hashedPassword);
    await client.query(
      `insert into users (username, password, name) values ($1, $2, $3)`,
      [username, hashedPassword, name]
    );
    res.json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

userRoutes.post("/login", async (req: any, res: any) => {
  console.log("userRoutes - /login", req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({
      message: "Invalid username or password",
    });
    return;
  }
  console.log("/login-username and password checking passed!!");

  let userResult = await client.query(
    `select * from users where username = $1`,
    [username]
  );
  let dbUser = userResult.rows[0];

  if (!dbUser) {
    res.status(400).json({
      message: "Invalid username",
    });
    return;
  }
  console.log("/login-existing username checking passed!!");

  let isMatched = await checkPassword(password, dbUser.password);
  if (!isMatched) {
    res.status(400).json({
      message: "Invalid username or password",
    });
    return;
  }
  console.log("/login-valid password checking passed!!");

  let {
    password: dbUserPassword,
    created_at,
    updated_at,
    ...filterUserProfile
  } = dbUser;
  req.session["user"] = filterUserProfile;
  // req.session.save()

  // console.log(sessionUser)
  res.status(200).json({
    message: "Success login",
  });
  return;
});
//   console.log("/login-username and password checking passed!!");

// let userResult = await client.query(
//     `select * from users where username = $1`,
//     [username]
// );
// let dbUser = userResult.rows[0];

// if (!dbUser) {
//     res.status(400).json({
//         message: "Invalid username",
//     });
//     return;
// }
// console.log("/login-existing username checking passed!!");

// let isMatched = await checkPassword(password, dbUser.password);
// if (!isMatched) {
//     res.status(400).json({
//         message: "Invalid username or password",
//     });
//     return;
// }
// console.log("/login-valid password checking passed!!");

// let {
//     password: dbUserPassword,
//     created_at,
//     updated_at,
//     ...filterUserProfile
// } = dbUser;
// req.session["user"] = filterUserProfile;
// req.session.isLoggedIn = true;
// // req.session.save()

// // console.log(sessionUser)
// res.status(200).json({
//     message: "Success login",
// });
// });

userRoutes.get("/logout", (req, res) => {
  try {
    let destroyedSession = req.session.destroy(() => {
      console.log("user logged out");
    });

    console.log("/logout destroyedSession", destroyedSession);

    // res.redirect('/login.html')
    res.json({ status: "ok" });
  } catch (e) {
    res.status(500).end("logout failed");
  }
});

userRoutes.get("/login/google", loginGoogle);

async function loginGoogle(req: express.Request, res: express.Response) {
  const accessToken = req.session?.["grant"].response.access_token;

  console.log("accessToken", accessToken);

  const fetchRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const googleProfile = await fetchRes.json();
  console.log(googleProfile);

  const users = (
    await client.query(`SELECT * FROM users WHERE username = $1`, [
      googleProfile.email,
    ])
  ).rows;
  let user = users[0];

  if (!user) {
    const randomString = crypto.randomBytes(32).toString("hex");
    let hashedPassword = await hashPassword(randomString);

    user = (
      await client.query(
        `INSERT INTO users (name,username,password)
                VALUES ($1, $2, $3) RETURNING *`,
        [googleProfile.name, googleProfile.email, hashedPassword]
      )
    ).rows[0];
    console.log(user);
    await client.query(
      `INSERT INTO google_profile(user_id,profile_pic,google_id,name)
            VALUES ($1, $2, $3, $4) RETURNING *`,
      [user.id, googleProfile.picture, googleProfile.id, googleProfile.name]
    );
  }

  if (req.session) {
    req.session["user"] = googleProfile;
  }
  res.redirect("/");
}
userRoutes.get("/login/facebook", loginfacebook);
async function loginfacebook(req: express.Request, res: express.Response) {
  const accessToken = req.session?.["grant"].response.access_token;

  console.log("accessToken:", accessToken);

  // retrieve user ID
  const userIdRes = await fetch(
    `https://graph.facebook.com/me?access_token=${accessToken}`
  );

  const facebookuserId = await userIdRes.json();
  console.log("facebookuserId: ", facebookuserId);

  const userfields = await fetch(
    `https://graph.facebook.com/${facebookuserId.id}?fields=id,name,email,picture&access_token=${accessToken}`
  );
  const facebookProfile = await userfields.json();
  console.log("facebookProfile", facebookProfile);

  const users = (
    await client.query(`SELECT * FROM users WHERE username = $1`, [
      facebookProfile.email,
    ])
  ).rows;
  let user = users[0];

  if (!user) {
    const randomString = crypto.randomBytes(32).toString("hex");
    let hashedPassword = await hashPassword(randomString);

    user = (
      await client.query(
        `INSERT INTO users (name,username,password)
                VALUES ($1, $2, $3) RETURNING *`,
        [facebookProfile.name, facebookProfile.email, hashedPassword]
      )
    ).rows[0];
    console.log(user);
    await client.query(
      `INSERT INTO facebook_profile (user_id,profile_pic,fb_id,name)
            VALUES ($1, $2, $3, $4) RETURNING *`,
      [
        user.id,
        facebookProfile.picture.data.url,
        facebookProfile.id,
        facebookProfile.name,
      ]
    );
  }
  if (req.session) {
    req.session["user"] = facebookProfile;
  }
  res.redirect("/");
}

userRoutes.get("/login/instagram", logininstagram);
async function logininstagram(req: express.Request, res: express.Response) {
  const accessToken = req.session?.["grant"].response.access_token;

  console.log("accessToken:", accessToken);

  // retrieve user ID
  const userIdRes = await fetch(
    `https://graph.instagram.com/me?access_token=${accessToken}`
  );

  const instagramuserId = await userIdRes.json();
  console.log("instagram: ", instagramuserId);

  const userfields = await fetch(
    `https://graph.instagram.com/${instagramuserId.id}?fields=id,username&access_token=${accessToken}`
  );
  const instagramProfile = await userfields.json();
  console.log("instagramProfile", instagramProfile);

  const users = (
    await client.query(`SELECT * FROM users WHERE username = $1`, [
      instagramProfile.email,
    ])
  ).rows;
  let user = users[0];

  if (!user) {
    const randomString = crypto.randomBytes(32).toString("hex");
    let hashedPassword = await hashPassword(randomString);

    user = (
      await client.query(
        `INSERT INTO users (username,password)
                VALUES ($1, $2) RETURNING *`,
        [instagramProfile.email, hashedPassword]
      )
    ).rows[0];
    console.log(user);

    await client.query(
      `INSERT INTO instagram_profile(user_id,profile_pic,ig_id,name,media_count)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        user.id,
        instagramProfile.picture,
        instagramProfile.id,
        instagramProfile.name,
        instagramProfile.media_count,
      ]
    );
  }
  if (req.session) {
    req.session["user"] = instagramProfile;
  }
  res.redirect("/");
}

userRoutes.put("/profile", updateProfile);

async function updateProfile(req: express.Request, res: express.Response) {
  const id = parseInt(req.session["user"].id);
  const myName = req.body.name;
  const aboutMe = req.body.aboutme;
  const dateOfBirth = moment(req.body.date_of_birth, "YYYY-MM-DD").toDate();
  const occupation = req.body.occupation;
  const hobby = req.body.hobby;
  const country = req.body.country;

  await client.query(
    `UPDATE users SET aboutme = $1, name= $2, date_of_birth= $3, occupation= $4, hobby=$5, country=$6 WHERE id = $7
    `,
    [aboutMe, myName, dateOfBirth, occupation, hobby, country, id]
  );

  let userResult = await client.query(`select * from users where id = $1`, [
    id,
  ]);

  let dbUser = userResult.rows[0];

  let {
    password: dbUserPassword,
    created_at,
    updated_at,
    ...filterUserProfile
  } = dbUser;
  req.session["user"] = filterUserProfile;

  res.status(200).send("Profile Updated");
  return;
}

userRoutes.get("/profile", loadProfile);

async function loadProfile(req: express.Request, res: express.Response) {
  const id = req.session.id;
  // const aboutMe = req.body.aboutMe;
  // const dateofBirth = req.body.dateofBirth;
  // const occupation = req.body.occupation;
  // const hobby = req.body.hobby;
  // const country = req.body.country;

  let profileInfo = await client.query(
    `SELECT * FROM users id = $1
    `,
    [id]
  );
  res.json(profileInfo.rows);

  // userRoutes.put("/profile/update", updateProfile);

  // async function updateProfile(req: express.Request, res: express.Response) {
  //   const id = req.session.id;
  //   const aboutMe = req.body.aboutMe;
  //   const dateofBirth = req.body.dateofBirth;
  //   const occupation = req.body.occupation;
  //   const hobby = req.body.hobby;
  //   const country = req.body.country;

  //   await client.query(
  //     `UPDATE users SET aboutMe = $1, dateofBirth= $2, occupation= $3, hobby=$4, country=$5 WHERE id = $6
  //     `,
  //     [aboutMe, dateofBirth, occupation, hobby, country, id]
  //   );
  // }

  userRoutes.post("/friend-request", addFriends);

  async function addFriends(req: express.Request, res: express.Response) {
    const id = req.session["user"].id;
    const opponent_user_id = req.body.opponentUserId;
    const message = req.body.message;
    const iconResult = (
      await client.query("SELECT icon FROM users WHERE id=$1", [id])
    ).rows[0];

    await client.query(
      `INSERT INTO notifications 
    (user_id, opponent_user_id, message, icon) 
    VALUES ($1, $2, $3, $4)`,
      [id, opponent_user_id, message, iconResult.icon]
    );
    res.json({
      message: "Sent friend request",
    });
  }
}

userRoutes.post("/accept-friends", acceptFriends);

async function acceptFriends(req: express.Request, res: express.Response) {
  const from_user_id = req.session["user"].id;
  const to_user_id = req.body.to_user_id;
  const status = req.body.status;

  await client.query(
    `INSERT INTO friends_list (from_user_id, to_user_id, status) VALUES ($1, $2, $3)`,
    [from_user_id, to_user_id, status]
  );
}

userRoutes.patch("/reject-friends", rejectFriends);

async function rejectFriends(req: express.Request, res: express.Response) {
  const id = req.session.id;
  const opponent_user_id = req.body.opponent_user_id;
  const status = req.body.status;

  await client.query(
    `UPDATE notifications SET status=$1 WHERE user_id=$2, opponent_user_id=$3`,
    [id, opponent_user_id, status]
  );

  // }

  // Get Friends from table: friends_list

  userRoutes.get("/friends", async (req, res) => {
    const id = req.session["user"].id;

    let myFriends = await client.query(
      /*sql*/ `
    with 
    active as (
    select 
    to_user_id as my_friend_id
    from friends_list fl where from_user_id  = $1
    ),
    
    passive as (
    select from_user_id  as my_friend_id 
    from friends_list fl where to_user_id  = $1
    ),
    
    my_friends as(
    select * from passive union
    select * from active 
    )
    
    
    select users.*, $1 as my_id from 
    my_friends mf join users on id = mf.my_friend_id;
    `,
      [id]
    );

    res.json(myFriends.rows);
  });
}
