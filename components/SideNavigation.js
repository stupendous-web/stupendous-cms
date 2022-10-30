import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobal } from "../lib/context";
import axios from "axios";
import { useSession } from "next-auth/react";
import gravatar from "gravatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faFeather,
  faImage,
  faProjectDiagram,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

export default function SideNavigation() {
  const [billingLink, setBillingLink] = useState("");

  const { projects, properties } = useGlobal();

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
      href: "/app/content",
      heading: "Content",
      icon: faFeather,
      description:
        "This is the the bread and butter of your API. See and edit all the data that's accessible via your API.",
      visible: !!properties?.length,
    },
    {
      href: "/app/media",
      heading: "Media",
      icon: faImage,
      description: "",
      visible: !!projects?.length,
    },
  ];

  const adminLinks = [
    {
      href: "/app/projects",
      heading: "Projects",
      icon: faProjectDiagram,
      description:
        "A way to help you manage your content. Create and manage your projects here. You can add models and users to your projects later.",
      visible: true,
    },
    {
      href: "/app/models",
      heading: "Models",
      icon: faDatabase,
      description:
        "Groups of attributes that users can add such as pages or blog posts. Here you can create models and add attributes to them.",
      visible: !!projects?.length,
    },
    {
      href: "/app/users",
      heading: "Users",
      icon: faUser,
      description: "",
      visible: false,
    },
    {
      href: billingLink,
      heading: "Billing",
      icon: faWallet,
      description:
        "A portal for you to manage your subscription and view your invoices.",
      visible: true,
    },
  ];

  return (
    <>
      <div className={"uk-flex uk-flex-center uk-flex-middle uk-padding"}>
        <img
          src={gravatar.url(session?.user?.email)}
          className={"uk-border-circle"}
          style={{ width: "3rem" }}
        />
      </div>
      <div>
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
                      <FontAwesomeIcon icon={link.icon} fixedWidth />
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
                          <FontAwesomeIcon icon={link.icon} fixedWidth />
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
