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
  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  await client
    .db("stupendous-cms")
    .collection("media")
    .insertOne({
      accountId: ObjectId(session?.user?.accountId),
    })
    .then(async (result) => {
      uploadFile(request?.files?.files[0]?.path, result?.insertedId)
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .catch((error) => response.status(500).send(error));
    })
    .finally(() => client.close());
});

export const config = {
  api: {
    bodyParser: false,
  },
};
