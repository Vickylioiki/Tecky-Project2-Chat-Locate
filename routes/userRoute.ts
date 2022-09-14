import express from 'express'
import { client } from '../main'
import { checkPassword, hashPassword } from '../hash'
import fetch from 'cross-fetch'
import crypto from 'crypto'

export const userRoutes = express.Router()

userRoutes.get('/', async (req, res) => {
    let userResult = await client.query('select * from users')
    res.json(userResult.rows)
})

userRoutes.post('/friend-request', async (req, res) => {
    let fromUserId = req.session['user'].id
    let toUserId = req.body.toUserId
    // let userResult = await client.query('insert into friends ')
    // status = 'PENDING'
    res.json({
        message: 'Friend request sent.'
    })
})

userRoutes.post('/register', async (req, res) => {
    try {
        const { username, password, name } = req.body
        console.log('req.body', req.body)
        if (!username || !password || !name) {
            res.status(400).json({
                message: 'Invalid username or password'
            })
            return
        }
        console.log('username and password checking passed!!')

        let userResult = await client.query(
            `select * from users where username = $1`,
            [username]
        )

        if (userResult.rows.length > 0) {
            res.status(400).json({
                message: 'username already exists'
            })
            return
        }
        console.log('existing username checking passed!!')

        let hashedPassword = await hashPassword(password)
        console.log('hashedPassword', hashedPassword)
        await client.query(
            `insert into users (username, password, name) values ($1, $2, $3)`,
            [username, hashedPassword, name]
        )
        res.json({ message: 'User created' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
})

userRoutes.post('/login', async (req, res) => {
    console.log('userRoutes - /login', req.body)
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({
            message: 'Invalid username or password'
        })
        return
    }
    console.log('/login-username and password checking passed!!')

    let userResult = await client.query(
        `select * from users where username = $1`,
        [username]
    )
    let dbUser = userResult.rows[0]

    if (!dbUser) {
        res.status(400).json({
            message: 'Invalid username'
        })
        return
    }
    console.log('/login-existing username checking passed!!')

    let isMatched = await checkPassword(password, dbUser.password)
    if (!isMatched) {
        res.status(400).json({
            message: 'Invalid username or password'
        })
        return
    }
    console.log('/login-valid password checking passed!!')

    let {
        password: dbUserPassword,
        id,
        created_at,
        updated_at,
        ...sessionUser
    } = dbUser
    req.session['user'] = sessionUser

    // console.log(sessionUser)
    res.status(200).json({
        message: 'Success login'
    })
})

userRoutes.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('user logged out')
    })
    res.redirect('/')
})

userRoutes.get('/login/google', loginGoogle);

async function loginGoogle(req: express.Request, res: express.Response) {
    const accessToken = req.session?.['grant'].response.access_token

    console.log('accessToken', accessToken)

    const fetchRes = await fetch(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    const googleProfile = await fetchRes.json()
    console.log(googleProfile)

    const users = (
        await client.query(`SELECT * FROM users WHERE username = $1`, [
            googleProfile.email
        ])
    ).rows
    let user = users[0]

    if (!user) {
        const randomString = crypto.randomBytes(32).toString('hex')
        let hashedPassword = await hashPassword(randomString)

        user = (
            await client.query(
                `INSERT INTO users (username,password)
                VALUES ($1, $2) RETURNING *`,
                [googleProfile.email, hashedPassword]
            )
        ).rows[0]
        console.log(user)
        await client.query(
            `INSERT INTO google_profile(user_id,profile_pic,google_id,name)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.id, googleProfile.picture, googleProfile.id, googleProfile.name]
        )
    }



    if (req.session) {
        req.session['user'] = googleProfile
    }
    res.redirect('/')
}
userRoutes.get('/login/facebook', loginfacebook);
async function loginfacebook(req: express.Request, res: express.Response) {
    const accessToken = req.session?.['grant'].response.access_token

    console.log('accessToken:', accessToken)

    // retrieve user ID
    const userIdRes = await fetch(
        `https://graph.facebook.com/me?access_token=${accessToken}`,

    )

    const facebookuserId = await userIdRes.json()
    console.log('facebookuserId: ', facebookuserId)

    const userfields = await fetch(
        `https://graph.facebook.com/${facebookuserId.id}?fields=id,name,email,picture&access_token=${accessToken}`
    )
    const facebookProfile = await userfields.json()
    console.log('facebookProfile', facebookProfile)

    const users = (
        await client.query(`SELECT * FROM users WHERE username = $1`, [
            facebookProfile.email
        ])
    ).rows
    let user = users[0]

    if (!user) {
        const randomString = crypto.randomBytes(32).toString('hex')
        let hashedPassword = await hashPassword(randomString)

        user = (
            await client.query(
                `INSERT INTO users (username,password)
                VALUES ($1, $2) RETURNING *`,
                [facebookProfile.email, hashedPassword]
            )
        ).rows[0]
        console.log(user)
        await client.query(
            `INSERT INTO facebook_profile(user_id,profile_pic,fb_id,name)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.id, facebookProfile.picture, facebookProfile.id, facebookProfile.name]
        )
    }
    if (req.session) {
        req.session['user'] = facebookProfile
    }
    res.redirect('/')
}

userRoutes.get('/login/instagram', logininstagram);
async function logininstagram(req: express.Request, res: express.Response) {
    const accessToken = req.session?.['grant'].response.access_token

    console.log('accessToken:', accessToken)

    // retrieve user ID
    const userIdRes = await fetch(
        `https://graph.instagram.com/me?access_token=${accessToken}`,

    )

    const instagramuserId = await userIdRes.json()
    console.log('instagram: ', instagramuserId)

    const userfields = await fetch(
        `https://graph.instagram.com/${instagramuserId.id}?fields=id,username&access_token=${accessToken}`
    )
    const instagramProfile = await userfields.json()
    console.log('instagramProfile', instagramProfile)

    const users = (
        await client.query(`SELECT * FROM users WHERE username = $1`, [
            instagramProfile.email
        ])
    ).rows
    let user = users[0]

    if (!user) {
        const randomString = crypto.randomBytes(32).toString('hex')
        let hashedPassword = await hashPassword(randomString)

        user = (
            await client.query(
                `INSERT INTO users (username,password)
                VALUES ($1, $2) RETURNING *`,
                [instagramProfile.email, hashedPassword]
            )
        ).rows[0]
        console.log(user)

        await client.query(
            `INSERT INTO instagram_profile(user_id,profile_pic,ig_id,name,media_count)
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user.id, instagramProfile.picture, instagramProfile.id, instagramProfile.name, instagramProfile.media_count]
        )
    }
    if (req.session) {
        req.session['user'] = instagramProfile
    }
    res.redirect('/')
}