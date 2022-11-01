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
          name: body?.name,
          type: body?.type,
          isRequired: body?.isRequired,
          modelId: ObjectId(body?.modelId),
          projectId: ObjectId(body?.projectId),
          accountId: ObjectId(session?.user?.accountId),
          createdAt: new Date(),
        })
        .then(async (result) => {
          const property = await client
            .db("stupendous-cms")
            .collection("properties")
            .findOne({ _id: ObjectId(result.insertedId) });

          response.status(200).send(property);
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
        .collection("properties")
        .updateOne(
          { _id: ObjectId(body?._id) },
          {
            $set: {
              type: body?.type,
              name: body?.name,
              isRequired: body?.isRequired,
            },
          }
        )
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    case "DELETE":
      await client
        .db("stupendous-cms")
        .collection("properties")
        .deleteOne({ _id: ObjectId(body?.propertyId) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      // Patch objects

      break;
    default:
      return response.status(405).send();
  }
}
