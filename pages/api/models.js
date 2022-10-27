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
            .collection("models")
            .aggregate([
              {
                $match: {
                  _id: ObjectId(result.insertedId),
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
    case "PATCH":
      await client
        .db("stupendous-cms")
        .collection("models")
        .updateOne(
          { _id: ObjectId(request?.body?._id) },
          {
            $set: {
              name: request?.body?.name,
              projectId: request?.body?.projectId,
            },
          }
        )
        .then(async () => {
          const model = await client
            .db("stupendous-cms")
            .collection("models")
            .aggregate([
              {
                $match: {
                  _id: ObjectId(request?.body?._id),
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

          response.status(200).send(model);
        })
        .finally(() => client.close());

      break;
    case "DELETE":
      await client
        .db("stupendous-cms")
        .collection("models")
        .deleteOne({ _id: ObjectId(request?.body?._id) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}