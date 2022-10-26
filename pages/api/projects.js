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
        .collection("projects")
        .insertOne({
          ...request?.body,
          accountId: ObjectId(user?.accountId),
        })
        .then(async (result) => {
          const project = await client
            .db("stupendous-cms")
            .collection("projects")
            .findOne({ _id: ObjectId(result.insertedId) });

          response.status(200).send(project);
        })
        .finally(() => {
          client.close();
        });
      break;
    case "GET":
      const projects = await client
        .db("stupendous-cms")
        .collection("projects")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(user?.accountId),
            },
          },
        ])
        .toArray();
      await client.close();

      response.status(200).json(projects);

      break;
    case "PATCH":
      await client
        .db("stupendous-cms")
        .collection("projects")
        .updateOne(
          { _id: ObjectId(request?.body?._id) },
          { $set: { name: request?.body?.name } }
        );
      await client.close();

      response.status(200).send("Good things come to those who wait.");

      break;
    case "DELETE":
      await client
        .db("stupendous-cms")
        .collection("projects")
        .deleteOne({ _id: ObjectId(request?.body?._id) });
      await client.close();

      response.status(200).send("Good things come to those who wait.");

      break;
    default:
      return response.status(405).send();
  }
}
