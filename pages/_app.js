import uikit from "uikit";
import devicon from "devicon";
import { SessionProvider } from "next-auth/react";
import "../styles/uikit/uikit.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
