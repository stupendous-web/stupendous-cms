import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

export default function Navigation() {
  const { data: session } = useSession();

  const router = useRouter();

  const noGreetingPaths = ["/", "/register", "/login"];
  const noDashboardLinkPaths = ["/app/dashboard"];

  return (
    <nav
      className={"uk-navbar-container uk-light uk-box-shadow-medium"}
      data-uk-navbar={""}
    >
      <div className={"uk-navbar-left"}>
        {!noGreetingPaths.includes(router.pathname) ? (
          <div className={"uk-navbar-item"}>Hello, {session?.user?.name}!</div>
        ) : (
          <Link href={"/"}>
            <a className={"uk-navbar-item uk-logo"}>Stupendous CMS</a>
          </Link>
        )}
      </div>
      <div className={"uk-navbar-right"}>
        {session?.user ? (
          <div className={"uk-navbar-item"}>
            {!noDashboardLinkPaths.includes(router.pathname) && (
              <Link href={"/app/dashboard"}>
                <a className={"uk-button uk-button-primary uk-margin-right"}>
                  Dashboard
                </a>
              </Link>
            )}
            <a
              className={"uk-button uk-button-primary"}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </a>
          </div>
        ) : (
          <div className={"uk-navbar-item"}>
            <Link href={"/register"}>
              <a className={"uk-button uk-button-primary uk-margin-right"}>
                Get Started
              </a>
            </Link>
            <Link href={"/login"}>
              <a className={"uk-button uk-button-primary"}>Login</a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
