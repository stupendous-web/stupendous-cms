import { MongoClient, ObjectId } from "mongodb";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(request, response) {
  const body = request?.body;

  const client = new MongoClient(process.env.MONGO_DB_URI);
  const collection = client.db("stupendous-cms").collection("objects");
  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (request.method) {
    case "POST":
      const createdAt = new Date();
      await collection
        .insertOne({
          modelId: ObjectId(body?.modelId),
          projectId: ObjectId(body?.projectId),
          accountId: ObjectId(session?.user?.accountId),
          createdAt: createdAt,
        })
        .then(async (result) => {
          await collection.updateOne(
            { _id: result.insertedId },
            {
              $set: {
                data: {
                  id: ObjectId().toString(),
                  ...body?.data,
                  createdAt: createdAt,
                },
              },
            }
          );
          await collection
            .findOne({ _id: ObjectId(result.insertedId) })
            .then((result) => response.status(200).send(result));
        })
        .finally(() => client.close());

      break;
    case "GET":
      await collection
        .aggregate([
          {
            $match: {
              accountId: ObjectId(session?.user?.accountId),
            },
          },
          { $sort: { createdAt: -1 } },
        ])
        .toArray()
        .then((result) => response.status(200).json(result))
        .finally(() => client.close());

      break;
    case "PATCH":
      await collection
        .updateOne(
          { _id: ObjectId(body?.objectId) },
          { $set: { data: body?.data } }
        )
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    case "DELETE":
      await collection
        .deleteOne({ _id: ObjectId(body?._id) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
