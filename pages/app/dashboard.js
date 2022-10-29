import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const { data: session } = useSession();

  const { projects, filteredModels } = useGlobal();

  return (
    <>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                {!projects?.length && (
                  <div className={"uk-width-1-1"}>
                    <div
                      className={"uk-alert-warning uk-flex uk-flex-middle"}
                      data-uk-alert={""}
                    >
                      <span className={"uk-text-large uk-margin-right"}>
                        💡
                      </span>
                      <div>
                        Looks like you don&apos;t have any projects. Navigate to
                        the projects page to add one.
                      </div>
                    </div>
                  </div>
                )}
                {!!filteredModels?.length && (
                  <div className={"uk-width-auto"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      {filteredModels?.map((model) => (
                        <div key={model._id}>
                          <span className={"uk-h1 uk-margin-right"}>12</span>
                          {model.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={"uk-width-expand"}>
                  <div className={"uk-card uk-card-default uk-card-body"}>
                    <h3>Your API Endpoints</h3>
                    {filteredModels?.map((model) => (
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
