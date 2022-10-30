import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";
const { Storage } = require("@google-cloud/storage");

const handler = nextConnect();
handler.use(middleware);

export const uploadFile = async (file) => {
  const storage = new Storage({
    project_id: "stupendous-web",
    credentials: {
      client_email: process.env.GCS_CLIENT_EMAIL,
      private_key: process.env.GCS_PRIVATE_KEY,
    },
  });

  await storage.bucket("stupendous-cms").upload(file, {
    destination: `test.${file.split(".").pop()}`,
  });
};

export default handler.post(async (request, response) => {
  const files = request?.files?.files;
  console.log(files);

  uploadFile(files[0]?.path).catch(response.status(500).send(error));

  response.status(200).send("Good things come to those who wait.");
});

export const config = {
  api: {
    bodyParser: false,
  },
};
