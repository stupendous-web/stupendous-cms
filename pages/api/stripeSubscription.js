const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);

export default async function handler(request, response) {
  if (request?.method !== "GET") return response.status(405).send();

  try {
    const subscription = await stripe.subscriptions.retrieve(
      request?.query?.id
    );

    return response.status(200).send(subscription);
  } catch (error) {
    return response.status(500).send(error);
  }
}
