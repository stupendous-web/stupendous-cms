import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getSubscription } from "../utils/api";

export default function Authentication({ children }) {
  const [billingLink, setBillingLink] = useState();
  const [subscription, setSubscription] = useState();

  const { data: session } = useSession();

  useEffect(() => {
    session?.user?.stripeSubscription &&
      getSubscription({ id: session?.user?.stripeSubscription }).then(
        (response) => {
          setSubscription(response.data);
          console.log(response.data);
        }
      );
  }, [session]);

  return session ? (
    children
  ) : (
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
