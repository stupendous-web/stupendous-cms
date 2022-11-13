import { withIronSessionApiRoute } from "iron-session/next";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);

export default withIronSessionApiRoute(
  async function handler(request, response) {
    const body = request?.body;
    console.log(body);

    const client = new MongoClient(process.env.MONGO_DB_URI);
    const collection = client.db("stupendous-cms").collection("users");
    await client.connect();

    await collection.findOne({ email: body?.email }).then(async (result) => {
      console.log(result);
      if (bcrypt.compareSync(body?.password, result?.password)) {
        request.session.user = result;
        await request.session.save();
        response.send({ ok: true });
      } else {
        response
          .status(403)
          .json({ title: "That password doesn't look right" });
      }
    });
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);
