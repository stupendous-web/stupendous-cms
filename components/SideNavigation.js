import { useEffect, useState } from "react";
import Link from "next/link";
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
    { href: "/app/content", tooltip: "Publish Content", icon: faFeather },
    { href: "/app/media", tooltip: "Edit Media", icon: faImage },
  ];

  const adminLinks = [
    { href: "/app/projects", tooltip: "Edit Projects", icon: faProjectDiagram },
    { href: "/app/models", tooltip: "Edit Models", icon: faDatabase },
    { href: "/app/users", tooltip: "Invite Users", icon: faUser },
    {
      href: billingLink,
      tooltip: "Billing",
      icon: faWallet,
    },
  ];

  return (
    <div className={"uk-container uk-container-expand uk-text-center"}>
      <div className={"uk-flex uk-flex-middle"} style={{ height: "80px" }}>
        <img
          src={gravatar.url(session?.user?.email)}
          className={"uk-border-circle"}
          style={{ width: "2rem" }}
        />
      </div>
      {publishingLinks.map((link, key) => {
        return (
          <div key={key}>
            <Link href={link.href}>
              <a>
                <p data-uk-tooltip={`title: ${link.tooltip}; pos: right;`}>
                  <FontAwesomeIcon icon={link.icon} />
                </p>
              </a>
            </Link>
          </div>
        );
      })}
      {session?.user?.isAccountOwner && (
        <div>
          {adminLinks.map((link, key) => {
            return (
              <div key={key}>
                <Link href={link.href}>
                  <a>
                    <p data-uk-tooltip={`title: ${link.tooltip}; pos: right;`}>
                      <FontAwesomeIcon icon={link.icon} />
                    </p>
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
