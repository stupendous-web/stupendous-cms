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

export const uploadManyFiles = async (files, body, session) => {
  files?.map(async (file) => {
    await client.connect();
    await client
      .db("stupendous-cms")
      .collection("files")
      .insertOne({
        type: file?.headers?.["content-type"],
        projectId: ObjectId(body?.projectId[0]),
        accountId: ObjectId(session?.user?.accountId),
        createdAt: new Date(),
      })
      .then(async (result) => {
        uploadFile(file?.path, result?.insertedId).then(async () => {
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
        });
      });
  });
};

export default handler.post(async (request, response) => {
  if (request?.method !== "POST") {
    return response.status(405).send();
  }

  const files = request?.files["files[]"];
  const body = request?.body;

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  await uploadManyFiles(files, body, session, response).finally(() => {
    client.close();

    response.status(200).send("Good things come to those who wait.");
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};
