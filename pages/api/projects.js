const { MongoClient, ObjectId } = require("mongodb");
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
    .aggregate([
      {
        $match: {
          _id: new ObjectId(session?.user?._id),
        },
      },
      {
        $limit: 1,
      },
    ])
    .toArray();

  await client.close();

  const { method } = request;
  if (["GET"].includes(method)) {
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

    return response.status(200).json(projects);
  }
  if (["POST"].includes(method)) {
    const project = await client
      .db("stupendous-cms")
      .collection("projects")
      .insertOne({
        ...request?.body,
        accountId: ObjectId(user?.accountId),
      });

    await client.close();

    return response.status(200).send(project.insertedId);
  }
  await client.close();

  return response.status(405).send();
}
