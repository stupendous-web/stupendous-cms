import Link from "next/link";

import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
          <h1>Clients manage their content. You manage their software.</h1>
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
          <p className={"uk-h1 uk-text-right"}>
            <i className={"devicon-nextjs-original-wordmark"} />
            <i className={"devicon-mongodb-plain-wordmark"} />
          </p>
        </div>
      </div>
      <div className={"uk-section"}>
        <div className={"uk-container"}>
          <div className={"uk-child-width-1-2@s"} data-uk-grid={""}>
            <div>
              <img
                src={"/images/examples/dashboard.jpg"}
                alt={"Stupendous CMS Dashboard"}
                className={"uk-box-shadow-medium"}
                style={{ borderRadius: "7px" }}
              />
            </div>
            <div>
              <img
                src={"/images/examples/models.jpg"}
                alt={"Stupendous CMS Dashboard"}
                className={"uk-box-shadow-medium"}
                style={{ borderRadius: "7px" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"uk-section"}>
        <div className={"uk-container uk-container-xsmall"}>
          <p>
            <Link href={"/register"}>
              <a
                className={
                  "uk-button uk-button-primary uk-button-large uk-margin-right"
                }
              >
                Get started!
              </a>
            </Link>
            <Link href={"/login"}>
              <a>Login</a>
            </Link>
          </p>
          <p>
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
