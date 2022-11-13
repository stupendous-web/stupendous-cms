import { MongoClient, ObjectId } from "mongodb";
import { authOptions } from "./auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import sgMail from "@sendgrid/mail";
const bcrypt = require("bcrypt");

export default async function handler(request, response) {
  const body = request?.body;

  const client = new MongoClient(process.env.MONGO_DB_URI);
  const collection = client.db("stupendous-cms").collection("users");
  await client.connect();

  const req = request;
  const res = response;
  const session = await unstable_getServerSession(req, res, authOptions);

  const accountId = session?.user?.accountId;

  switch (request.method) {
    case "POST":
      // check for duplicates

      await collection
        .insertOne({
          name: body?.name,
          email: body?.email,
          isAccountOwner: false,
          projectId: ObjectId(body?.projectId),
          accountId: ObjectId(accountId),
          createdAt: new Date(),
        })
        .then(async (result) => {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          sgMail.send({
            to: body?.email,
            from: "topher@stupendousweb.com",
            subject: "Stupendous CMS Publisher Invitation",
            text: `Someone invited you to be a publisher on Stupendous CMS. Follow the link below to complete your registration:\n\nhttps://stupendouscms.com/onboard?_id=${result?.insertedId}`,
          });

          await collection
            .findOne({ _id: ObjectId(result.insertedId) })
            .then((result) => {
              response.status(200).json(result);
            });
        })
        .finally(() => client.close());

      break;
    case "GET":
      await collection
        .find({ accountId: ObjectId(accountId) })
        .toArray()
        .then((results) => response.status(200).json(results))
        .finally(() => client.close());

      break;
    case "PATCH":
      await collection
        .updateOne(
          { _id: ObjectId(body?._id) },
          { $set: { password: bcrypt.hashSync(body.password, 10) } }
        )
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    case "DELETE":
      await collection
        .deleteOne({ _id: ObjectId(body?._id) })
        .then(() =>
          response.status(200).send("Good things come to those who wait.")
        )
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
