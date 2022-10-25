const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);

export default async function Handler(request, response) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: request?.body?.stripeCustomer,
      return_url: "https://stupendouscms.com/app/dashboard",
    });
    response.status(200).send(session.url);
  } catch (error) {
    response.status(200).send("");
  }
}
