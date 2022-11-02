import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobal } from "../lib/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import gravatar from "gravatar";

export default function SideNavigation() {
  const [billingLink, setBillingLink] = useState("");

  const { projects, filteredModels, filteredProperties } = useGlobal();

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.stripeCustomer) {
      axios
        .post("/api/billingLink", {
          stripeCustomer: session?.user?.stripeCustomer,
        })
        .then((response) => setBillingLink(response.data))
        .catch((error) => console.log(error));
    }
  }, [session]);

  const publishingLinks = [
    {
      href: "/app/objects",
      heading: "Content",
      icon: "edit_document",
      description:
        "This is the the bread and butter of your API. See and edit all the data that's accessible via your API.",
      visible:
        !!projects?.length &&
        filteredModels?.length &&
        filteredProperties?.length,
    },
    {
      href: "/app/media",
      heading: "Media",
      icon: "image",
      description:
        "Upload your files to the Stupendous Web bucket and access them via your API",
      visible: !!projects?.length,
    },
  ];

  const adminLinks = [
    {
      href: "/app/projects",
      heading: "Projects",
      icon: "assignment",
      description:
        "A way to help you manage your content. Create and manage your projects here. You can add models and users to your projects later.",
      visible: true,
    },
    {
      href: "/app/models",
      heading: "Models",
      icon: "database",
      description:
        "Groups of attributes that users can add such as pages or blog posts. Here you can create models and add attributes to them.",
      visible: !!projects?.length,
    },
    {
      href: "/app/users",
      heading: "Users",
      icon: "database",
      description: "",
      visible: false,
    },
    {
      href: billingLink,
      heading: "Billing",
      icon: "credit_card",
      description:
        "A portal for you to manage your subscription and view your invoices.",
      visible: true,
    },
  ];

  return (
    <>
      <div
        className={"uk-navbar-container uk-navbar-transparent"}
        data-uk-navbar={""}
      >
        <div className={"uk-navbar-item"}>
          <Link href={"/app/account"}>
            <a>
              <img
                src={gravatar.url(session.user.email)}
                className={"uk-border-circle"}
                style={{ width: "4rem" }}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className={"uk-margin"}>
        {publishingLinks.map((link, key) => {
          return (
            <div className={link?.visible ? undefined : "uk-hidden"} key={key}>
              <div className={"uk-width-1-1 uk-inline"}>
                <Link href={link.href}>
                  <a>
                    <p
                      className={"uk-text-center"}
                      style={{ fontSize: "1.5rem" }}
                    >
                      <span className={"material-symbols-rounded"}>
                        {link.icon}
                      </span>
                    </p>
                  </a>
                </Link>
                <div
                  className={"uk-box-shadow-large"}
                  data-uk-dropdown="pos: right-top; offset: -14"
                >
                  <h3 style={{ color: "inherit" }}>{link.heading}</h3>
                  <p>{link.description}</p>
                </div>
              </div>
            </div>
          );
        })}
        {session?.user?.isAccountOwner && (
          <>
            {adminLinks.map((link, key) => {
              return (
                <div
                  className={link?.visible ? undefined : "uk-hidden"}
                  key={key}
                >
                  <div className={"uk-width-1-1 uk-inline my-class"}>
                    <Link href={link.href}>
                      <a>
                        <p
                          className={"uk-text-center"}
                          style={{ fontSize: "1.5rem" }}
                        >
                          <span className={"material-symbols-rounded"}>
                            {link.icon}
                          </span>
                        </p>
                      </a>
                    </Link>
                    <div
                      className={"uk-box-shadow-large"}
                      data-uk-dropdown="pos: right-top; offset: -14"
                    >
                      <h3 style={{ color: "inherit" }}>{link.heading}</h3>
                      <p>{link.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
