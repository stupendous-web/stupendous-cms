import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";

import cms from "../images/undraw/undraw_cms_re_asu0.svg";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/accounts", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/app",
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error?.response?.data);
      });
  };

  return (
    <>
      <Head>
        <title>
          Get Started | Stupendous CMS by Stupendous Web | Clients manage their
          content. You manage their software.
        </title>
      </Head>
      <div style={{ overflow: "auto" }} data-uk-height-viewport={""}>
        <div className={"uk-grid-collapse"} data-uk-grid={""}>
          <div
            className={
              "uk-width-2-3@s uk-section-primary uk-flex uk-flex-center uk-flex-middle uk-visible@s"
            }
          >
            <div className={"uk-width-large uk-padding"}>
              <Image src={cms} alt={"Register"} />
            </div>
          </div>
          <div
            className={"uk-width-1-3@s uk-flex uk-flex-middle"}
            data-uk-height-viewport={""}
          >
            <div className={"uk-width-1-1 uk-container uk-container-expand"}>
              <h1>Get Started</h1>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Name</label>
                  <input
                    type={"text"}
                    value={name}
                    className={"uk-input"}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
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
                    minLength={8}
                    className={"uk-input"}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <p className={"uk-text-bold"}>No credit card required!</p>
                  <p>
                    Stupendous CMS is FREE for 30 days and just $15/mo. after
                    that! Access for{" "}
                    <Link href={"https://stupendousweb.com"} legacyBehavior>
                      <a
                        title={
                          "Web App Development Services | Stupendous Web | If you want to build community, build a stupendous web app"
                        }
                      >
                        Stupendous Web
                      </a>
                    </Link>{" "}
                    clients and contributors is always free!!!
                  </p>{" "}
                </div>
                {error && (
                  <div class={"uk-alert-danger"} data-uk-alert={""}>
                    <p>
                      {error?.title || "There was an error."} Please try again
                      or email{" "}
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
                <Link href={"/login"} legacyBehavior>
                  <a
                    title={
                      "Login | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                    }
                  >
                    Login
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
