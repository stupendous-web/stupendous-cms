import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";
const { Storage } = require("@google-cloud/storage");

const handler = nextConnect();
handler.use(middleware);

export const uploadFile = async (file, insertedId) => {
  const storage = new Storage({
    project_id: "stupendous-web",
    credentials: {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY,
    },
  });
  await storage.bucket("stupendous-cms").upload(file, {
    destination: `${insertedId}`,
  });
};

export default handler.post(async (request, response) => {
  if (request?.method !== "POST") {
    return response.status(405).send();
  }
  console.log(request?.files?.files[0]);
  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  await client.connect();

  await client
    .db("stupendous-cms")
    .collection("files")
    .insertOne({
      type: request?.files?.files[0]?.headers?.["content-type"],
      projectId: ObjectId(request.body?.projectId[0]),
      accountId: ObjectId(session?.user?.accountId),
      createdAt: new Date(),
    })
    .then(async (result) => {
      uploadFile(request?.files?.files[0]?.path, result?.insertedId)
        .then(async () => {
          await client
            .db("stupendous-cms")
            .collection("files")
            .updateOne(
              { _id: ObjectId(result?.insertedId) },
              {
                $set: {
                  url: `https://storage.cloud.google.com/stupendous-cms/${result?.insertedId}?authuser=2`,
                },
              }
            );

          await client
            .db("stupendous-cms")
            .collection("files")
            .findOne({ _id: ObjectId(result.insertedId) })
            .then((result) => {
              response.status(200).json(result);
            })
            .finally(() => {
              client.close();
            });
        })
        .catch((error) => {
          response.status(500).send(error);
        });
    });
});

export const config = {
  api: {
    bodyParser: false,
  },
};
