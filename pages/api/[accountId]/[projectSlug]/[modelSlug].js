import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  const { accountId, projectSlug, modelSlug } = request?.query;

  await client.connect();

  switch (request.method) {
    case "GET":
      const project = await client
        .db("stupendous-cms")
        .collection("projects")
        .findOne({ slug: projectSlug });

      const model = await client
        .db("stupendous-cms")
        .collection("models")
        .findOne({ slug: modelSlug });

      await client
        .db("stupendous-cms")
        .collection("objects")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(accountId),
              projectId: ObjectId(project._id),
              modelId: ObjectId(model._id),
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
