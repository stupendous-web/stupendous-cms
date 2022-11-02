import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  const { accountId, projectSlug } = request?.query;

  await client.connect();

  switch (request.method) {
    case "GET":
      await client
        .db("stupendous-cms")
        .collection("files")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(accountId),
              // Get project ID from slug
              // projectId: ObjectId(projectId),
            },
          },
        ])
        .toArray()
        .then((result) => {
          response.status(200).send(result);
        })
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
