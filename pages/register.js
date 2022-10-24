import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/register", {
        name: name,
        email: email,
        password: password,
      })
      .then(() => {
        signIn(null, { callbackUrl: "/app/dashboard" });
      })
      .catch((error) => console.log(error));
  };

  return (
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
              className={"uk-input"}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <input
            type={"submit"}
            value={"Let's Go!"}
            className={"uk-button uk-button-primary"}
          />
        </form>
      </div>
    </div>
  );
}
