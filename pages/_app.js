import { SessionProvider } from "next-auth/react";
import { Provider } from "../lib/context";
import uikit from "uikit";
import devicon from "devicon";
import "../styles/uikit/uikit.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
