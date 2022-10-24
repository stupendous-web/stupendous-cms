import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <nav
      className={"uk-navbar-container uk-light uk-box-shadow-medium"}
      data-uk-navbar={""}
    >
      {router.pathname !== "/" && (
        <div className={"uk-navbar-left"}>
          <div className={"uk-navbar-item"}>Hello, {session?.user?.name}!</div>
        </div>
      )}
      <div className={"uk-navbar-right"}>
        {session?.user ? (
          <ul className={"uk-navbar-nav"}>
            {router.pathname === "/" && (
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
              <a
                onClick={() => signIn(null, { callbackUrl: "/app/dashboard" })}
              >
                Login
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
