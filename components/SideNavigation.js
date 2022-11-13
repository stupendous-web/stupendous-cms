import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobal } from "../lib/context";
import { useSession } from "next-auth/react";
import gravatar from "gravatar";
import { getBillingLink } from "../utils/api";

export default function SideNavigation() {
  const [billingLink, setBillingLink] = useState("");

  const { projects, filteredModels, filteredProperties } = useGlobal();

  const { data: session } = useSession();
  const isAccountOwner = session?.user?.isAccountOwner;

  useEffect(() => {
    if (session?.user?.stripeCustomer) {
      getBillingLink({ stripeCustomer: session?.user?.stripeCustomer }).then(
        (response) => setBillingLink(response?.data?.url || "")
      );
    }
  }, [session]);

  const links = [
    {
      href: "/app/projects",
      heading: "Projects",
      icon: "ri-clipboard-fill",
      description:
        "A way to help you manage your content. Create and manage your projects here. You can add models and users to your projects later.",
      visible: isAccountOwner,
    },
    {
      href: "/app/models",
      heading: "Models",
      icon: "ri-database-2-fill",
      description:
        "Groups of attributes that users can add such as pages or blog posts. Here you can create models and add attributes to them.",
      visible: isAccountOwner && !!projects?.length,
    },
    {
      href: "/app/users",
      heading: "Users",
      icon: "ri-user-fill",
      description:
        "Give access to people you want to publish content to your API.",
      visible: isAccountOwner && !!projects?.length,
    },
    {
      href: "/app/objects",
      heading: "Content",
      icon: "ri-edit-2-fill",
      description:
        "This is the the bread and butter of your API. See and edit all the data that's accessible via your API.",
      visible:
        !!projects?.length &&
        filteredModels?.length &&
        filteredProperties?.length,
    },
    {
      href: "/app/files",
      heading: "Media",
      icon: "ri-image-fill",
      description:
        "Upload your files to the Stupendous Web bucket and access them via your API",
      visible: !!projects?.length,
    },
    {
      href: billingLink,
      heading: "Billing",
      icon: "ri-wallet-fill",
      description:
        "A portal for you to manage your subscription and view your invoices.",
      visible: !!billingLink,
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
            <img
              src={gravatar.url(session.user.email)}
              className={"uk-border-circle"}
              style={{ width: "4rem" }}
            />
          </Link>
        </div>
      </div>
      <div className={"uk-margin"}>
        {links.map((link, key) => {
          return (
            <div className={link?.visible ? undefined : "uk-hidden"} key={key}>
              <div className={"uk-width-1-1 uk-inline my-class"}>
                <Link href={link.href}>
                  <p
                    className={"uk-text-center"}
                    style={{ fontSize: "1.5rem" }}
                  >
                    <i className={link.icon} />
                  </p>
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
      </div>
    </>
  );
}
