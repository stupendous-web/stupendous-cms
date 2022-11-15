import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import payOnline from "../images/undraw/undraw_pay_online_re_aqe6.svg";
import login from "../images/undraw/undraw_login_re_4vu2.svg";
import axios from "axios";

export default function Authentication({ children }) {
  const [billingLink, setBillingLink] = useState();
  const [subscriptionStatus, setSubscriptionStatus] = useState();

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    user?.stripeSubscription &&
      axios
        .get("/api/stripeSubscription", {
          params: { id: user?.stripeSubscription },
        })
        .then((response) => setSubscriptionStatus(response?.data?.status))
        .catch((error) => {
          console.error(error);
        });
    axios
      .post("/api/stripeBillingLink", {
        stripeCustomer: session?.user?.stripeCustomer,
      })
      .then((response) => setBillingLink(response?.data?.url))
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  if (
    user &&
    user?.isAccountOwner &&
    !["active", "trialing"].includes(subscriptionStatus)
  )
    return (
      <div
        className={"uk-section-primary uk-flex uk-flex-center uk-flex-middle"}
        data-uk-height-viewport={""}
      >
        <div>
          <div className={"uk uk-width-large uk-text-center"}>
            <div
              className={
                "uk-width-small uk-margin-auto-right uk-margin-auto-left"
              }
            >
              <Image src={payOnline} alt={"Pay"} />
            </div>
            <div>
              <p>
                Your subscription may have expired. Visit your&nbsp;
                <a href={billingLink}>billing portal</a>
                &nbsp;to learn more or email topher@stupendousweb.com for
                support.
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  if (!user) {
    return (
      <div
        className={"uk-section-primary uk-flex uk-flex-center uk-flex-middle"}
        data-uk-height-viewport={""}
      >
        <div>
          <div className={"uk uk-width-large uk-text-center"}>
            <div
              className={
                "uk-width-small uk-margin-auto-right uk-margin-auto-left"
              }
            >
              <Image src={login} alt={"Login"} />
            </div>
            <div>
              <p>
                Looks like you&apos;ve been logged out. Login{" "}
                <Link href={"/login"}>here</Link> or check out the{" "}
                <Link href={"/"}>homepage</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
