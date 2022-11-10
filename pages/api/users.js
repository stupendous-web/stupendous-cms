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

  switch (request.method) {
    case "GET":
      await client
        .db("stupendous-cms")
        .collection("users")
        .find({ accountId: ObjectId(accountId) })
        .toArray()
        .then((results) => response.status(200).send(results))
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
