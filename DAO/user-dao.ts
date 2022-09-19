import { client } from "../utils/db";

export async function getUserById(userId: number) {
  const user = (
    await client.query(`SELECT * from users where id = $1`, [userId])
  ).rows[0];
  return user;
}
