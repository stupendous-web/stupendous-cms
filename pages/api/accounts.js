import { MongoClient, ObjectId } from "mongodb";
const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);
import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  const body = request.body;

  const client = new MongoClient(process.env.MONGO_DB_URI);
  const collection = client.db("stupendous-cms").collection("accounts");
  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  const accountId = session?.user?.accountId;
  const userId = session?.user?._id;
  const stripeCustomer = session?.user?.stripeCustomer;

  switch (request.method) {
    case "POST":
      const user = await client
        .db("stupendous-cms")
        .collection("users")
        .findOne({ email: body?.email });

      if (!user) {
        const customer = await stripe.customers.create({
          name: body?.name,
          email: body?.email,
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
          trial_end: dayjs().add(30, "days").unix(),
        });

        await collection
          .insertOne({ createdAt: new Date() })
          .then(async (result) => {
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
                accountId: ObjectId(result.insertedId),
                createdAt: new Date(),
              });
          })
          .finally(() => {
            client.close();

            response.status(200).send("Good things come to those who wait.");
          });
      } else {
        await client.close();

        return response
          .status(422)
          .json({ title: "That email is already registered." });
      }
      break;
    case "DELETE":
      await stripe.customers.del(stripeCustomer);

      await client
        .db("stupendous-cms")
        .collection("objects")
        .deleteMany({ accountId: ObjectId(accountId) });

      await client
        .db("stupendous-cms")
        .collection("properties")
        .deleteMany({ accountId: ObjectId(accountId) });

      await client
        .db("stupendous-cms")
        .collection("models")
        .deleteMany({ accountId: ObjectId(accountId) });

      await client
        .db("stupendous-cms")
        .collection("projects")
        .deleteMany({ accountId: ObjectId(accountId) });

      await client
        .db("stupendous-cms")
        .collection("users")
        .deleteOne({ _id: ObjectId(userId) });

      await collection
        .deleteOne({ _id: ObjectId(accountId) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
