import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "../lib/context";
import "../styles/uikit/uikit.css";
import UIkit from "uikit";
import "remixicon/fonts/remixicon.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(
    "%c  ___ _                          _            __      __   _    \n" +
      " / __| |_ _  _ _ __  ___ _ _  __| |___ _  _ __\\ \\    / /__| |__ \n" +
      " \\__ \\  _| || | '_ \\/ -_) ' \\/ _` / _ \\ || (_-<\\ \\/\\/ / -_) '_ \\\n" +
      " |___/\\__|\\_,_| .__/\\___|_||_\\__,_\\___/\\_,_/__/ \\_/\\_/\\___|_.__/.COM\n" +
      "              |_| ",
    "color: #ec008c"
  );

  useEffect(() => {
    UIkit.container = ".uk-scope";
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider>
        <div className={"uk-scope"}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
