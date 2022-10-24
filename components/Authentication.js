import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Authentication({ children }) {
  const { data: session } = useSession();

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
