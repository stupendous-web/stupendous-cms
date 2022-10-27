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
                  <div className={"uk-card uk-card-default uk-card-body"}>
                    <h3>Your API Endpoints</h3>
                    {models?.map((model) => (
                      <div key={model._id}>
                        <Link
                          href={`https://stupendouscms.com/api/${session?.user?.accountId}/${model?.project[0]?.slug}/${model.slug}`}
                        >
                          <a>
                            https://stupendouscms.com/api/
                            {session?.user?.accountId}/{model?.project[0]?.slug}
                            /{model.slug}
                          </a>
                        </Link>
                      </div>
                    ))}
                    <div>
                      <Link
                        href={`https://stupendouscms.com/api/${session?.user?.accountId}/media`}
                      >
                        <a>
                          https://stupendouscms.com/api/
                          {session?.user?.accountId}/media (COMING SOON!)
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
