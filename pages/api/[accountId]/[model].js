import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  const { accountId } = request.query;

  await client.connect();

  switch (request.method) {
    case "GET":
      const models = await client
        .db("stupendous-cms")
        .collection("models")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(accountId),
            },
          },
        ])
        .toArray()
        .then((result) => response.status(200).json(result))
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
