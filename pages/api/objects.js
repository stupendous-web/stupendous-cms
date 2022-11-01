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
        .collection("objects")
        .insertOne({
          ...body,
          modelId: ObjectId(body?.modelId),
          projectId: ObjectId(body?.projectId),
          accountId: ObjectId(session?.user?.accountId),
          createdAt: new Date(),
        })
        .then(async (result) => {
          await client
            .db("stupendous-cms")
            .collection("objects")
            .findOne({ _id: ObjectId(result.insertedId) })
            .then((result) => response.status(200).send(result));
        })
        .finally(() => client.close());

      break;
    case "GET":
      await client
        .db("stupendous-cms")
        .collection("objects")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(session?.user?.accountId),
            },
          },
          {
            $addFields: {
              modelId: {
                $toObjectId: "$modelId",
              },
            },
          },
          {
            $lookup: {
              from: "models",
              localField: "modelId",
              foreignField: "_id",
              as: "model",
              pipeline: [{ $limit: 1 }],
            },
          },
        ])
        .toArray()
        .then((result) => response.status(200).json(result))
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}