import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const users = [
    { username: "john", password: "pass", name: "John Doe", balance: 1000 },
    { username: "jane", password: "pass", name: "Jane Smith", balance: 2500 },
  ];

  await client.db().collection("collection").insertMany(users);
  await client.close();

  res.json({ message: "Users created: john/pass, jane/pass" });
}
