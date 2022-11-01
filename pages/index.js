import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import Navigation from "../components/Navigation";

import rest from "../images/screenshots/rest.jpg";
import projects from "../images/screenshots/projects.jpg";
import models from "../images/screenshots/models.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Stupendous CMS by Stupendous Web | Clients manage their content. You
          manage their software.
        </title>
      </Head>
      <Navigation />
      <div className={"hero-gradient"}>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <h1 className={"uk-heading-medium"}>
              Clients manage their content. You manage their software.
            </h1>
            <p>
              As a noob developer, I was frustrated with that lack of platforms
              that would allow my clients to manager their content while
              allowing me to insert it easily into their project via an API at
              an affordable cost. Yeah! Yeah! Wordpress, right? Blah! Blah!
              Let&apos;s do better! PHP is 💀! Stupendous CMS is a hosted,
              headless content management system built with Javascript and
              MongoDB. Your clients can login and easily manage their content
              and you can access it through your REST API. Let&apos;s go!
            </p>
            <p className={"uk-h1 uk-text-right"}>
              <i className={"devicon-nextjs-original-wordmark"} />
              <i className={"devicon-mongodb-plain-wordmark"} />
              <i className={"devicon-googlecloud-plain-wordmark"} />
            </p>
          </div>
        </div>
        <div className={"uk-section"}>
          <div className={"uk-container"}>
            <div className={"uk-child-width-1-3@s"} data-uk-grid={""}>
              <div>
                <div className={"next-image"}>
                  <Image src={rest} alt={"Stupendous CMS"} />
                </div>
              </div>
              <div>
                <div className={"next-image"}>
                  <Image src={projects} alt={"Stupendous CMS"} />
                </div>
              </div>
              <div>
                <div className={"next-image"}>
                  <Image src={models} alt={"Stupendous CMS"} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <div className={"uk-child-width-1-2@s"} data-uk-grid={""}>
              <div>
                <h3>Cloud Hosted</h3>
                <p>
                  Make things easy for your clients and yourself! You can host
                  and manage all your content, media, and JSON endpoints right
                  here.
                </p>
              </div>
              <div>
                <h3>REST API</h3>
                <p>
                  This is a developer&apos;s dream. Your REST API is accessible
                  through your own custom endpoints and your media is hosted via
                  the Stupendous CMS Google Cloud Storage account.
                </p>
              </div>
              <div>
                <h3>Project and Content Management</h3>
                <p>
                  Keep it cool! Stay organized by managing your content by type
                  and into projects that your clients can easily access.
                </p>
              </div>
              <div>
                <h3>Media</h3>
                <p>
                  That&apos;s right! You can upload media as well and access it
                  through a Google Cloud endpoint in your API.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <p>
              <Link href={"/register"}>
                <a
                  title={
                    "Get Started | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                  }
                  className={
                    "uk-button uk-button-primary uk-button-large uk-margin-right"
                  }
                >
                  Get started!
                </a>
              </Link>
              <Link href={"/login"}>
                <a
                  title={
                    "Login | Stupendous CMS by Stupendous Web | Clients manage their content. You manage their software."
                  }
                >
                  Login
                </a>
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
      </div>
    </>
  );
}
