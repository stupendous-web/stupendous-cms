import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  const user = await client
    .db("stupendous-cms")
    .collection("users")
    .findOne({ _id: ObjectId(session?.user?._id) });

  switch (request.method) {
    case "POST":
      await client
        .db("stupendous-cms")
        .collection("models")
        .insertOne({
          ...request?.body,
          accountId: ObjectId(user?.accountId),
        })
        .then(async (result) => {
          const model = await client
            .db("stupendous-cms")
            .collection("model")
            .findOne({ _id: ObjectId(result.insertedId) });

          response.status(200).send(model);
        })
        .finally(() => client.close());

      break;
    case "GET":
      const models = await client
        .db("stupendous-cms")
        .collection("models")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(user?.accountId),
            },
          },
          {
            $addFields: {
              projectId: {
                $toObjectId: "$projectId",
              },
            },
          },
          {
            $lookup: {
              from: "projects",
              localField: "projectId",
              foreignField: "_id",
              as: "project",
              pipeline: [{ $limit: 1 }],
            },
          },
        ])
        .toArray();
      await client.close();

      response.status(200).json(models);

      break;
    default:
      return response.status(405).send();
  }
}
