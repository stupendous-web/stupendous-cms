const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);
const bcrypt = require("bcrypt");

export default async function handler(request, response) {
  const body = request.body;
  await client.connect();
  await client
    .db("stupendous-cms")
    .collection("users")
    .insertOne({
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      created_at: new Date(),
    });

  await client.close();
  response.status(200).json("hi");
}
