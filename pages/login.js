import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import Navigation from "../components/Navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setIsError] = useState(false);

  const router = useRouter();

  return (
    <>
      <Head>
        <title>
          Login | Stupendous CMS by Stupendous Web | Clients manage their
          content. You manage their software.
        </title>
      </Head>
      <Navigation />
      <div style={{ height: "calc(100vh - 6rem)", overflow: "auto" }}>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-xsmall"}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                signIn("credentials", {
                  email: email,
                  password: password,
                  redirect: false,
                }).then(({ error }) => {
                  error ? setIsError(true) : router.replace("/app/dashboard");
                });
              }}
            >
              <h1>Login</h1>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Email</label>
                <input
                  type={"email"}
                  value={email}
                  className={"uk-input"}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Password</label>
                <input
                  type={"password"}
                  value={password}
                  min={8}
                  className={"uk-input"}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {isError && (
                <div class={"uk-alert-danger"} data-uk-alert={""}>
                  <p>
                    That didn&apos;t work. Please try again or email{" "}
                    <Link href={"mailto:topher@stupendousweb.com"}>
                      <a>topher@stupendousweb.com</a>
                    </Link>{" "}
                    for help.
                  </p>
                </div>
              )}
              <input
                type={"submit"}
                value={"Let's go!"}
                className={"uk-button uk-button-primary uk-margin-right"}
              />
              <Link href={"/register"}>
                <a
                  title={
                    "Get Started | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                  }
                >
                  Register
                </a>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
