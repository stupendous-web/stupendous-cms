import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { patch } from "../utils/api";

import Navigation from "../components/Navigation";

export default function Onboard() {
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    patch("users", {
      _id: router?.query?.userId,
      password: password,
    }).then(() => {
      router.replace("/login");
    });
  };

  return (
    <>
      <Head>
        <title>
          Join the Team | Stupendous CMS by Stupendous Web | Clients manage
          their content. You manage their software.
        </title>
      </Head>
      <Navigation />
      <div style={{ height: "calc(100vh - 6rem)", overflow: "auto" }}>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-xsmall"}>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className={"uk-margin"}>
                <h3>Create a password to login.</h3>
                <label className={"uk-form-label"}>Password</label>
                <input
                  type={"password"}
                  value={password}
                  minLength={8}
                  className={"uk-input"}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error && (
                <div class={"uk-alert-danger"} data-uk-alert={""}>
                  <p>
                    {error?.title || "There was an error."} Please try again or
                    email{" "}
                    <Link
                      href={"mailto:topher@stupendousweb.com"}
                      legacyBehavior
                    >
                      <a>topher@stupendousweb.com</a>
                    </Link>{" "}
                    for help.
                  </p>
                </div>
              )}
              <input
                type={"submit"}
                value={"Let's Go!"}
                className={"uk-button uk-button-primary uk-margin-right"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
