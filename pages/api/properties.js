import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  const body = request?.body;

  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (request.method) {
    case "POST":
      await client
        .db("stupendous-cms")
        .collection("properties")
        .insertOne({
          ...body,
          accountId: ObjectId(session?.user?.accountId),
        })
        .then(async (result) => {
          const project = await client
            .db("stupendous-cms")
            .collection("projects")
            .findOne({ _id: ObjectId(result.insertedId) });

          response.status(200).send(project);
        })
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
