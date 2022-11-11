import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);

export default async function handler(request, response) {
  const { accountId, projectSlug } = request?.query;

  await client.connect();

  switch (request.method) {
    case "GET":
      const project = await client
        .db("stupendous-cms")
        .collection("projects")
        .findOne({ slug: projectSlug });

      await client
        .db("stupendous-cms")
        .collection("files")
        .aggregate([
          {
            $match: {
              accountId: ObjectId(accountId),
              projectId: ObjectId(project._id),
            },
          },
        ])
        .toArray()
        .then((results) =>
          response.status(200).send(
            results?.map((result) => {
              return {
                id: ObjectId(result._id).toString(),
                type: result?.type,
                url: result?.url,
                createdAt: result?.createdAt,
              };
            })
          )
        )
        .finally(() => client.close());

      break;
    default:
      return response.status(405).send();
  }
}
