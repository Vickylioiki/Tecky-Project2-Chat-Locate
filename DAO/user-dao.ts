import { client } from "../utils/db";
import { UserDAO } from "../utils/model";

export async function getUserById(userId: number) {
    const user = (await client.query(`SELECT * from users where id = $1`, [userId])).rows[0];
    console.log("userId : ", userId);
    console.log(user);

    return user;
}

export async function getUserByUsername(username: string): Promise<UserDAO> {
    const users = (await client.query(`SELECT * FROM users WHERE username = $1`, [username])).rows;
    if (users.length > 1) {
        throw new Error("More than 1 user sharing same username");
    }
    return users[0];
}

export async function createUser(name: string, email: string, password: string): Promise<UserDAO> {
    return (
        await client.query(
            `INSERT INTO users (name,username,password)
             VALUES ($1, $2, $3) RETURNING *`,
            [name, email, password]
        )
    ).rows[0];
}
