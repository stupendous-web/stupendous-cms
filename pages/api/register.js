import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

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
    // Create Stripe Customer and Subscription

    const customer = await stripe.customers.create({
      name: body.name,
      email: body.email,
    });
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price:
            process.env.NODE_ENV === "production"
              ? "price_1M22T8IqQW8xJ9oZYO15nAXY"
              : "price_1M22DwIqQW8xJ9oZWX3aYB23",
        },
      ],
      trial_end: dayjs().add(3, "months").unix(),
    });

    // Create Account

    const account = await client
      .db("stupendous-cms")
      .collection("accounts")
      .insertOne({ createdAt: new Date() });

    // Create User

    await client
      .db("stupendous-cms")
      .collection("users")
      .insertOne({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        stripeCustomer: customer.id,
        stripeSubscription: subscription.id,
        isAccountOwner: true,
        accountId: ObjectId(account.insertedId),
        createdAt: new Date(),
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
