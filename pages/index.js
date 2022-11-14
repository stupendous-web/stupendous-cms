import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import Navigation from "../components/Navigation";

import editor from "../images/screenshots/editor.jpg";
import rest from "../images/screenshots/rest.jpg";
import projects from "../images/screenshots/projects.jpg";
import models from "../images/screenshots/models.jpg";

export default function Home({ user }) {
  return (
    <>
      <Head>
        <title>
          Stupendous CMS by Stupendous Web | Clients manage their content. You
          manage their software.
        </title>
      </Head>
      <Navigation user={user} />
      <div style={{ height: "calc(100vh - 6rem)", overflow: "auto" }}>
        <div className={"uk-section uk-section-xlarge"}>
          <div className={"uk-container uk-container-large"}>
            <div
              className={"uk-child-width-1-2@s uk-flex-middle"}
              data-uk-grid={""}
            >
              <div>
                <h1 className={"uk-heading-medium"}>
                  Clients manage their content. You manage their software.
                </h1>
                <p>
                  Stupendous CMS is an affordable, hosted, headless content
                  management system with a focus on Javascript and JSON. Your
                  clients can login and easily manage their content and you can
                  access it through your REST API. Let&apos;s go!
                </p>
                <p>
                  <Link href={"/register"} legacyBehavior>
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
                  <Link href={"/login"} legacyBehavior>
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
              <div>
                <div className={"uk-inline"}>
                  <div
                    className={
                      "uk-padding-large uk-padding-remove-top uk-padding-remove-left"
                    }
                  >
                    <Image src={editor} alt={"Stupendous CMS"} />
                  </div>
                  <pre
                    className={
                      "uk-padding-small uk-width-medium uk-section-muted uk-position-bottom-right uk-overflow-hidden"
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
        </div>

        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <div className={"uk-child-width-1-2@s"} data-uk-grid={""}>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i className={"ri-cloud-fill uk-margin-right"} /> Cloud Hosted
                </h3>
                <p>
                  Make things easy for your clients and yourself! You can host
                  and manage all your content, media, and JSON endpoints right
                  here.
                </p>
              </div>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i className={"ri-braces-fill uk-margin-right"} />
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
                  <i className={"ri-clipboard-fill uk-margin-right"} />
                  Project Management
                </h3>
                <p>
                  Keep it cool! Stay organized by managing your content by type
                  and into projects that your clients can easily access.
                </p>
              </div>
              <div>
                <h3 className={"uk-flex uk-flex-middle"}>
                  <i className={"ri-image-fill uk-margin-right"} />
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
                <Image src={rest} alt={"Stupendous CMS"} />
              </div>
              <div>
                <Image src={projects} alt={"Stupendous CMS"} />
              </div>
              <div>
                <Image src={models} alt={"Stupendous CMS"} />
              </div>
            </div>
          </div>
        </div>
        <div className={"uk-section"}>
          <div className={"uk-container uk-container-small"}>
            <p className={"uk-text-bold"}>No credit card required!</p>
            <p>
              Stupendous CMS is FREE for 30 days and just $15/mo. after that!
              Access for{" "}
              <Link href={"https://stupendousweb.com"} legacyBehavior>
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
              <Link href={"/register"} legacyBehavior>
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
              <Link href={"/login"} legacyBehavior>
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
