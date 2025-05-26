import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fromCurrency, toCurrency, amount, rate, email } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI);
    try {
      await client.connect();

      const db = client.db();
      const userEmail = email; // Replace with the actual user email from session or auth
      const users = db.collection("collection");

      const user = await users.findOne({ email: userEmail });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const fromCurrencyLower = fromCurrency.toLowerCase();
      const toCurrencyLower = toCurrency.toLowerCase();

      if (user.balance[fromCurrencyLower] < amount) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      // Perform the exchange
      user.balance[fromCurrencyLower] -= amount;
      user.balance[toCurrencyLower] += parseFloat((rate * 0.99).toFixed(2));

      // Update the user document in MongoDB
      await users.updateOne(
        { email: userEmail },
        { $set: { balance: user.balance } }
      );

      return res.status(200).json(user);
    } catch (error) {
      console.error("Exchange error:", error);
      return res
        .status(500)
        .json({ message: "Exchange failed", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
