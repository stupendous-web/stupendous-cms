import { ObjectId } from "mongodb";

const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);
const bcrypt = require("bcrypt");

export default async function handler(request, response) {
  const body = request.body;
  await client.connect();

  // Validate Email

  const user = await client
    .db("stupendous-cms")
    .collection("users")
    .aggregate([
      { $match: { email: body.email } },
      { $limit: 1 },
      { $count: "count" },
    ])
    .toArray();

  if (!user.length) {
    // Create Stripe Customer

    const customer = await stripe.customers.create({
      name: body.name,
      email: body.email,
    });

    // Create Account

    const account = await client
      .db("stupendous-cms")
      .collection("accounts")
      .insertOne({ created_at: new Date() });

    // Create User

    await client
      .db("stupendous-cms")
      .collection("users")
      .insertOne({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        stripeCustomer: customer.id,
        isAccountOwner: true,
        account: ObjectId(account.insertedId),
        created_at: new Date(),
      });
  } else {
    await client.close();

    return response
      .status(422)
      .json({ title: "That email is already registered." });
  }
  await client.close();

  return response.status(200).send("Good things come to those who wait.");
}
