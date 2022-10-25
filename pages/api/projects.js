const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  await client.connect();

  const projects = await client
    .db("stupendous-cms")
    .collection("projects")
    .aggregate([{ $match: { accountId: ObjectId(request?.body?.accountId) } }])
    .toArray();

  await client.close();
  return response.status(200).json(projects);
}
