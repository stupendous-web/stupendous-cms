import nextConnect from "next-connect";
import multiparty from "multiparty";

const middleware = nextConnect();

export default middleware.use(async (request, response, next) => {
  const form = new multiparty.Form();

  await form.parse(request, function (error, fields, files) {
    request.body = fields;
    request.files = files;
    next();
  });
});
