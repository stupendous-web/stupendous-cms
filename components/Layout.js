import Link from "next/link";
import { useSession } from "next-auth/react";
import gravatar from "gravatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFeather,
  faDatabase,
  faProjectDiagram,
  faUser,
  faImage,
} from "@fortawesome/free-solid-svg-icons";

import Navigation from "./Navigation";

export default function Layout({ children }) {
  const { data: session } = useSession();

  const links = [
    { href: "/", tooltip: "Publish Content", icon: faFeather },
    { href: "/", tooltip: "Edit Models", icon: faDatabase },
    { href: "/", tooltip: "Edit Projects", icon: faProjectDiagram },
    { href: "/", tooltip: "Invite Users", icon: faUser },
    { href: "/", tooltip: "Edit Media", icon: faImage },
  ];

  return (
    <>
      <div
        className={"uk-grid-collapse"}
        data-uk-grid={""}
        data-uk-height-viewport={""}
      >
        <div
          className={"uk-section-secondary uk-width-auto uk-box-shadow-large"}
        >
          <div className={"uk-container uk-container-expand uk-text-center"}>
            <div
              className={"uk-flex uk-flex-middle"}
              style={{ height: "80px" }}
            >
              <img
                src={gravatar.url(session?.user?.email)}
                className={"uk-border-circle"}
                style={{ width: "2rem" }}
              />
            </div>
            {links.map((link, key) => {
              return (
                <Link key={key} href={link.href}>
                  <a>
                    <p data-uk-tooltip={`title: ${link.tooltip}; pos: right;`}>
                      <FontAwesomeIcon icon={link.icon} />
                    </p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <div className={"uk-width-expand"}>
          <Navigation />
          {children}
        </div>
      </div>
    </>
  );
}
