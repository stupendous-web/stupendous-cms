import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  const accountId = session?.user?.accountId;
  const userId = session?.user?._id;

  switch (request.method) {
    case "DELETE":
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

      await client
        .db("stupendous-cms")
        .collection("accounts")
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
