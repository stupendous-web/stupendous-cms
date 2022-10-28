import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  const body = request?.body;
  const { modelId } = request?.query;

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
          type: body?.type,
          modelId: ObjectId(body?.modelId),
          projectId: ObjectId(body?.projectId),
          accountId: ObjectId(session?.user?.accountId),
        })
        .then(() => {
          response.status(200).send("Good things come to those who wait.");
        })
        .finally(() => client.close());

      break;
    case "GET":
      await client
        .db("stupendous-cms")
        .collection("properties")
        .aggregate([
          {
            $match: {
              modelId: ObjectId(modelId),
            },
          },
        ])
        .toArray()
        .then((result) => {
          response.status(200).json(result);
        })
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
