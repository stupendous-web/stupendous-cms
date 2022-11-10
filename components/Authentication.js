import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getBillingLink, getSubscription } from "../utils/api";

export default function Authentication({ children }) {
  const [billingLink, setBillingLink] = useState();
  const [subscriptionStatus, setSubscriptionStatus] = useState();

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    user?.stripeSubscription &&
      getSubscription({ id: user?.stripeSubscription }).then((response) =>
        setSubscriptionStatus(response?.data?.status)
      );
    getBillingLink({ stripeCustomer: session?.user?.stripeCustomer }).then(
      (response) => setBillingLink(response?.data?.url)
    );
  }, [user]);

  if (user && !["active", "trialing"].includes(subscriptionStatus))
    return (
      <div
        className={"uk-section-primary uk-flex uk-flex-center uk-flex-middle"}
        data-uk-height-viewport={""}
      >
        Your subscription may have expired. Visit your&nbsp;
        <a href={billingLink}>billing portal</a>
        &nbsp;to learn more or email topher@stupendousweb.com for support.
      </div>
    );

  if (!user) {
    return (
      <div
        className={"uk-section-primary uk-flex uk-flex-center uk-flex-middle"}
        data-uk-height-viewport={""}
      >
        <Link href={"/login"}>
          <a>Login</a>
        </Link>
        &nbsp;|&nbsp;
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </div>
    );
  }

  return children;
}
