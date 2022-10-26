export default function handler(request, response) {
  const { accountId } = request.query;
  response.status(200).json({ accountId: accountId });
}
