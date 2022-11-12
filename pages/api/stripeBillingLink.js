const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);

export default async function handler(request, response) {
  if (request?.method !== "POST") return response.status(405).send();

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: request?.body?.stripeCustomer,
      return_url: "https://stupendouscms.com/app",
    });

    return response.status(200).send(session);
  } catch (error) {
    return response.status(500).send(error);
  }
}
