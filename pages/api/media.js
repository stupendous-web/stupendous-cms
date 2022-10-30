import middleware from "../../middleware/middleware";
import nextConnect from "next-connect";

const handler = nextConnect();
handler.use(middleware);

export default handler.post(async (request, response) => {
  console.log(request.files);

  const files = request?.files?.files;

  response.status("200").send({ paths: files[0]?.path });
});

export const config = {
  api: {
    bodyParser: false,
  },
};
