import { handleLogin } from "@auth0/nextjs-auth0";

const signupHandler = (request, response) =>
  handleLogin(request, response, {
    authorizationParams: {
      screen_hint: "signup",
    },
  });

export default signupHandler;
