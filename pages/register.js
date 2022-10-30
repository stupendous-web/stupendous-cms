import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import Navigation from "../components/Navigation";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        router.replace("/login");
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
      <Navigation />
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
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
            </div>
            {error && (
              <div class={"uk-alert-danger"} data-uk-alert={""}>
                <p>
                  {error?.title || "There was an error."} Please try again or
                  email{" "}
                  <Link href={"mailto:topher@stupendousweb.com"}>
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
            <Link href={"/login"}>
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
    </>
  );
}
