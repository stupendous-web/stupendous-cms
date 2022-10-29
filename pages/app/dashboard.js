import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/app/projects");
  }, []);

  const { data: session } = useSession();

  const { filteredModels } = useGlobal();

  return (
    <>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
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
                      <div key={model._id}></div>
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
