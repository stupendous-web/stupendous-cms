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
        .collection("models")
        .insertOne({
          name: body?.name,
          slug: body?.slug,
          projectId: ObjectId(body?.projectId),
          accountId: ObjectId(session?.user?.accountId),
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
      await client
        .db("stupendous-cms")
        .collection("models")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(session?.user?.accountId),
            },
          },
        ])
        .toArray()
        .then((result) => {
          response.status(200).json(result);
        })
        .finally(() => client.close());

      break;
    case "PATCH":
      await client
        .db("stupendous-cms")
        .collection("models")
        .updateOne(
          { _id: ObjectId(body?._id) },
          {
            $set: {
              name: body?.name,
              slug: body?.slug,
              projectId: ObjectId(body?.projectId),
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
                  _id: ObjectId(body?._id),
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
        .deleteOne({ _id: ObjectId(body?.modelId) });

      await client
        .db("stupendous-cms")
        .collection("properties")
        .deleteMany({ modelId: ObjectId(body?.modelId) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
