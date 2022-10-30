import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
const { Storage } = require("@google-cloud/storage");

export const deleteFile = async (fileId) => {
  const storage = new Storage({
    project_id: "stupendous-web",
    credentials: {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY,
    },
  });
  await storage.bucket("stupendous-cms").file(`${fileId}`).delete();
};

export default async function handler(request, response) {
  const body = request?.body;

  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  switch (request.method) {
    case "GET":
      await client
        .db("stupendous-cms")
        .collection("files")
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
    case "DELETE":
      deleteFile(body?.fileId).then(async () => {
        await client
          .db("stupendous-cms")
          .collection("files")
          .deleteOne({ _id: ObjectId(body?.fileId) })
          .then(() =>
            response.status(200).send("Good things come to those who wait.")
          )
          .finally(() => client.close());
      });

      break;
    default:
      return response.status(405).send();
  }
}
