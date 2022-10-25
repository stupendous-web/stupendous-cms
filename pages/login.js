import { useState } from "react";
import { signIn } from "next-auth/react";

import Navigation from "../components/Navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <>
      <Navigation />
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signIn("credentials", {
                email: email,
                password: password,
                callbackUrl: "/app/dashboard",
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
            <input
              type={"submit"}
              value={"Let's go!"}
              className={"uk-button uk-button-primary uk-margin-right"}
            />
            <Link href={"/register"}>
              <a>Register</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}