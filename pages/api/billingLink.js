const stripe = require("stripe")(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY
);

export default async function Handler(request, response) {
  return response.status(200).send(
    (
      await stripe.billingPortal.sessions.create({
        customer: request?.body?.customer,
        return_url: "https://stupendouscms.com/app/dashboard",
      })
    ).url
  );
}
