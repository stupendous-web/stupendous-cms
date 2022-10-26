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
    .aggregate([
      {
        $match: {
          _id: ObjectId(session?.user?._id),
        },
      },
      {
        $limit: 1,
      },
    ])
    .toArray();

  switch (request.method) {
    case "GET":
      const projects = await client
        .db("stupendous-cms")
        .collection("projects")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(user[0]?.accountId),
            },
          },
        ])
        .toArray();

      await client.close();

      response.status(200).json(projects);

      break;
    case "POST":
      const project = await client
        .db("stupendous-cms")
        .collection("projects")
        .insertOne({
          ...request?.body,
          accountId: ObjectId(user[0]?.accountId),
        });

      await client.close();

      response.status(200).send(project.insertedId);

      break;
    default:
      return response.status(405).send();
  }
}
