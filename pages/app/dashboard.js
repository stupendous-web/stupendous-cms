import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const { data: session } = useSession();

  const { projects, models } = useGlobal();

  const listItems = [
    {
      name: "Create a project",
      href: "/app/projects",
      checked: !!projects?.length,
    },
    { name: "Create a model", href: "", checked: !!models?.length },
    { name: "Invite your team", href: "", checked: false },
    { name: "Start creating content", href: "", checked: false },
  ];

  return (
    <>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                <div className={"uk-width-1-3"}>
                  <div className={"uk-card uk-card-default uk-card-body"}>
                    <h3>Let&apos;s get started!</h3>
                    {listItems.map((item, key) => {
                      return (
                        <div key={key}>
                          {item.checked ? "✅" : "❌"}
                          <span className={"uk-margin-small-left"}>
                            <Link href={item.href}>
                              <a>{item.name}</a>
                            </Link>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={"uk-width-2-3"}>
                  <div
                    className={
                      "uk-card uk-card-default uk-card-body uk-flex uk-flex-center uk-flex-middle"
                    }
                  >
                    <div className={"uk-text-center"}>
                      <h2>🎉</h2>
                      <div>You can access your API via:</div>
                      <Link
                        href={`https://stupendouscms.com/api/${session?.user?.accountId}`}
                      >
                        <a>
                          https://stupendouscms.com/api/
                          {session?.user?.accountId}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Authentication>
    </>
  );
}
