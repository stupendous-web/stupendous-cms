import Link from "next/link";
import { useSession, signIn } from "next-auth/react";

export default function Authenticated({ children }) {
  const { data: session } = useSession();

  return session ? (
    children
  ) : (
    <div
      className={"uk-section-primary uk-flex uk-flex-center uk-flex-middle"}
      data-uk-height-viewport={""}
    >
      <a onClick={() => signIn(null, { callbackUrl: "/app/dashboard" })}>
        Login
      </a>
      &nbsp;|&nbsp;
      <Link href={"/"}>
        <a>Home</a>
      </Link>
    </div>
  );
}
