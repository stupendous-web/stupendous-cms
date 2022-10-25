const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  await client.connect();

  const user = await client
    .db("stupendous-cms")
    .collection("users")
    .aggregate([
      { $match: { _id: ObjectId(request?.query?.userId) } },
      { $limit: 1 },
    ])
    .toArray();

  const projects = await client
    .db("stupendous-cms")
    .collection("projects")
    .aggregate([{ $match: { accountId: ObjectId(user.accountId) } }])
    .toArray();

  await client.close();

  return response.status(200).json(projects);
}
