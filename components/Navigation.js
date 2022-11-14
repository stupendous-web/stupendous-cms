import Link from "next/link";

export default function Navigation({ user }) {
  return (
    <nav
      className={"uk-navbar-container uk-light uk-box-shadow-medium"}
      data-uk-navbar={""}
    >
      <div className={"uk-navbar-left"}>
        <Link href={"/"} legacyBehavior>
          <a
            title={
              "Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
            }
            className={"uk-navbar-item uk-logo uk-visible@s"}
          >
            Stupendous CMS
          </a>
        </Link>
      </div>
      <div className={"uk-navbar-right"}>
        {user ? (
          <div className={"uk-navbar-item"}>
            <Link href={"/app"} legacyBehavior>
              <a className={"uk-button uk-button-primary uk-margin-right"}>
                Dashboard
              </a>
            </Link>
            <a className={"uk-button uk-button-primary"}>Logout</a>
          </div>
        ) : (
          <div className={"uk-navbar-item"}>
            <Link href={"/register"} legacyBehavior>
              <a
                title={
                  "Get Started | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                }
                className={"uk-button uk-button-primary uk-margin-right"}
              >
                Start for FREE!
              </a>
            </Link>
            <Link href={"/login"} legacyBehavior>
              <a
                title={
                  "Login | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                }
                className={"uk-button uk-button-primary"}
              >
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
