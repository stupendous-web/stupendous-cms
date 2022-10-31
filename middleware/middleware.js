import nextConnect from "next-connect";
import multiparty from "multiparty";

const middleware = nextConnect();

export default middleware.use(async (request, response, next) => {
  const form = new multiparty.Form({ maxFilesSize: 4500000 }); // per Vercel

  await form.parse(request, function (error, fields, files) {
    if (error?.code === "ETOOBIG") {
      response.status(413).send();
    }
    request.body = fields;
    request.files = files;
    next();
  });
});
