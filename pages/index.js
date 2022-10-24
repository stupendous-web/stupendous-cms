import Link from "next/link";

import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <div
        className={"uk-section"}
        data-uk-height-viewport={"offset-top: true"}
      >
        <div className={"uk-container uk-container-xsmall"}>
          <h2>
            Your clients manage their content.
            <br />
            You manage their software.
          </h2>
          <p>
            As a noob developer, I was frustrated with that lack of platforms
            that would allow my clients to manager their content while allowing
            me to insert it easily into their project via an API at an
            affordable cost. Yeah! Yeah! Wordpress, right? Blah! Blah!
            Let&apos;s do better! PHP is 💀! Stupendous CMS is a hosted,
            headless content management system built with Javascript and
            MongoDB. Your clients can login and easily manage their content and
            you can access it through your REST API. Let&apos;s go!
          </p>
          <p>
            <Link href={"/register"}>
              <a className={"uk-button uk-button-primary uk-margin-right"}>
                Get started!
              </a>
            </Link>
            <Link href={"/login"}>
              <a>Login</a>
            </Link>
          </p>
          <p className={"uk-text-small"}>
            Learn more at{" "}
            <Link href={"https://stupendousweb.com"}>
              <a
                title={
                  "Web App Development Services | Stupendous Web | If you want to build community, build a stupendous web app"
                }
              >
                Stupendous Web
              </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
