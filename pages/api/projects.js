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
        .collection("projects")
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
    case "GET":
      const projects = await client
        .db("stupendous-cms")
        .collection("projects")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(session?.user?.accountId),
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
          { _id: ObjectId(body?._id) },
          { $set: { name: body?.name, slug: body?.slug } }
        )
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    case "DELETE":
      await client
        .db("stupendous-cms")
        .collection("projects")
        .deleteOne({ _id: ObjectId(body?._id) });

      await client
        .db("stupendous-cms")
        .collection("models")
        .deleteMany({ projectId: ObjectId(body?._id) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      // Delete Attributes

      break;
    default:
      return response.status(405).send();
  }
}
