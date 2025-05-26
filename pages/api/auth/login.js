import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing credentials" });

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const user = await client
    .db()
    .collection("collection")
    .findOne({ email, password });
  await client.close();

  if (user) {
    res.json({ user: { email: user.email, balance: user.balance } });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
}
