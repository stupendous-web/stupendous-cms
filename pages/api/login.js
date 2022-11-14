import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

export default withIronSessionApiRoute(async function handler(
  request,
  response
) {
  const body = request?.body;

  const client = new MongoClient(process.env.MONGO_DB_URI);
  const collection = client.db("stupendous-cms").collection("users");
  await client.connect();

  await collection.findOne({ email: body?.email }).then(async (result) => {
    if (bcrypt.compareSync(body?.password, result?.password)) {
      delete result?.password;
      request.session.user = result;
      await request.session.save();
      response.send({ ok: true });
    } else {
      response.status(403).json({ title: "That password doesn't look right" });
    }
  });
},
ironOptions);
