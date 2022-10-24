import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  const router = useRouter();

  const paths = ["/", "/register", "/login"];

  return (
    <nav
      className={"uk-navbar-container uk-light uk-box-shadow-medium"}
      data-uk-navbar={""}
    >
      {!paths.includes(router.pathname) && (
        <div className={"uk-navbar-left"}>
          <div className={"uk-navbar-item"}>Hello, {session?.user?.name}!</div>
        </div>
      )}
      <div className={"uk-navbar-right"}>
        {session?.user ? (
          <ul className={"uk-navbar-nav"}>
            {!paths.includes(router.pathname) && (
              <li>
                <Link href={"/app/dashboard"}>
                  <a>Dashboard</a>
                </Link>
              </li>
            )}
            <li>
              <a onClick={() => signOut({ callbackUrl: "/" })}>Logout</a>
            </li>
          </ul>
        ) : (
          <ul className={"uk-navbar-nav"}>
            <li>
              <Link href={"/register"}>
                <a>Get Started</a>
              </Link>
            </li>
            <li>
              <Link href={"/login"}>
                <a>Login</a>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
