import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import Navigation from "../components/Navigation";

import editor from "../images/screenshots/editor.jpg";
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
      <div
        className={"hero-gradient"}
        style={{ height: "calc(100vh - 6rem)", overflow: "auto" }}
      >
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <h1 className={"uk-heading-medium"}>
              Clients manage their content. You manage their software.
            </h1>
            <p>
              As a developer, it can be frustrating to allow your clients to
              manager their content while allowing you as the developer to
              insert it easily into their project via an API and at an
              affordable cost. Stupendous CMS is a hosted, headless content
              management system with a focus on Javascript and JSON. Your
              clients can login and easily manage their content and you can
              access it through your REST API. Let&apos;s go!
            </p>
          </div>
        </div>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <div className={"uk-flex-middle"} data-uk-grid={""}>
              <div className={"uk-width-2-3@s"}>
                <div className={"next-image"}>
                  <Image src={editor} alt={"Stupendous CMS"} />
                </div>
              </div>
              <div className={"uk-width-1-3@s"}>
                <h3>Content Meets Code</h3>
                <p>
                  Distraction free editing makes it easy for your clients to
                  publish their content in a way that&apos;s accessible to you
                  as a developer.
                </p>
                <pre
                  className={
                    "uk-padding-small uk-margin-small-top uk-section-muted"
                  }
                >
                  <code>
                    {"{"}
                    <br />
                    &nbsp;&nbsp;id: 473057399,
                    <br />
                    &nbsp;&nbsp;slug: &quot;an-epic&quot;,
                    <br />
                    &nbsp;&nbsp;title: &quot;An Epic&quot;,
                    <br />
                    &nbsp;&nbsp;content: &quot;&#60;p&#62;&#60;em&#62;Lorem
                    ipsum&#60;/em&#62; dolor sit amet, consectetur adipisicing
                    elit. Consequatur hic praesentium
                    quibusdam.&#60;/p&#62;&quot;,
                    <br />
                    &nbsp;&nbsp;createdAt:
                    &quot;2022-07-09T10:06:55+00:00&quot;,
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <div className={"uk-child-width-1-2@s"} data-uk-grid={""}>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i class={"ri-cloud-fill uk-margin-right"} /> Cloud Hosted
                </h3>
                <p>
                  Make things easy for your clients and yourself! You can host
                  and manage all your content, media, and JSON endpoints right
                  here.
                </p>
              </div>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i class={"ri-braces-fill uk-margin-right"} />
                  REST API
                </h3>
                <p>
                  This is a developer&apos;s dream. Your REST API is accessible
                  through your own custom endpoints including paths to your
                  media.
                </p>
              </div>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i class={"ri-clipboard-fill uk-margin-right"} />
                  Project Management
                </h3>
                <p>
                  Keep it cool! Stay organized by managing your content by type
                  and into projects that your clients can easily access.
                </p>
              </div>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i class={"ri-image-fill uk-margin-right"} />
                  Media
                </h3>
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
            <p className={"uk-text-bold"}>No credit card required!</p>
            <p>
              Stupendous CMS is FREE for 3 months and just $15/mo. after that!
              Access for{" "}
              <Link href={"https://stupendousweb.com"}>
                <a
                  title={
                    "Web App Development Services | Stupendous Web | If you want to build community, build a stupendous web app"
                  }
                >
                  Stupendous Web
                </a>
              </Link>{" "}
              clients and contributors is always free!!!
            </p>
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
                  Start for FREE!
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
          </div>
        </div>
      </div>
    </>
  );
}
