import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

import Navigation from "../components/Navigation";

import login from "../images/undraw/undraw_login_re_4vu2.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/app",
    });
  };

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
        <div className={"uk-grid-collapse"} data-uk-grid={""}>
          <div
            className={
              "uk-width-2-3@s uk-flex uk-flex-center uk-flex-middle uk-visible@s"
            }
          >
            <div className={"uk-width-medium"}>
              <Image src={login} alt={"Login"} />
            </div>
          </div>
          <div
            className={"uk-width-1-3@s uk-section-muted uk-flex uk-flex-middle"}
            data-uk-height-viewport={""}
          >
            <div className={"uk-width-1-1 uk-container uk-container-expand"}>
              <form onSubmit={(event) => handleSubmit(event)}>
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

                <input
                  type={"submit"}
                  value={"Let's go!"}
                  className={"uk-button uk-button-primary uk-margin-right"}
                />
                <Link href={"/register"} legacyBehavior>
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
      </div>
    </>
  );
}
