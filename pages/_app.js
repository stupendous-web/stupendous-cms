import { SessionProvider } from "next-auth/react";
import { Provider } from "../lib/context";
import uikit from "uikit";
import devicon from "devicon";
import "../styles/uikit/uikit.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(
    "%c  ___ _                          _            __      __   _    \n" +
      " / __| |_ _  _ _ __  ___ _ _  __| |___ _  _ __\\ \\    / /__| |__ \n" +
      " \\__ \\  _| || | '_ \\/ -_) ' \\/ _` / _ \\ || (_-<\\ \\/\\/ / -_) '_ \\\n" +
      " |___/\\__|\\_,_| .__/\\___|_||_\\__,_\\___/\\_,_/__/ \\_/\\_/\\___|_.__/.COM\n" +
      "              |_| ",
    "color: #ec008c"
  );
  return (
    <SessionProvider session={session}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
