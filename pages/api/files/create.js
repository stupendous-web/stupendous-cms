import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
const { Storage } = require("@google-cloud/storage");

const handler = nextConnect();
handler.use(middleware);

export default handler.post(async (request, response) => {
  const files = request?.files["file"];
  const body = request?.body;

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  await client.connect();
  await client
    .db("stupendous-cms")
    .collection("files")
    .insertOne({
      type: files[0].headers?.["content-type"],
      projectId: ObjectId(body?.projectId[0]),
      accountId: ObjectId(session?.user?.accountId),
      createdAt: new Date(),
    })
    .then(() =>
      response.status(200).json("GOOD THINGS COME TO THOSE WHO WAIT.")
    )
    .finally(() => client.close());
});
