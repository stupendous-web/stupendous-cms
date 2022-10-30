import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const { data: session } = useSession();

  const { editingProject, filteredModels } = useGlobal();

  return (
    <>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                <div className={"uk-width-1-1"}>
                  <div className={"uk-card uk-card-default uk-card-body"}>
                    <h3>Your API Endpoints</h3>
                    <ul className={"uk-list uk-list-divider"}>
                      {filteredModels?.map((model) => (
                        <div key={model._id}>
                          <li>
                            <Link
                              href={`https://stupendouscms.com/api/${session?.user?.accountId}/${editingProject?.slug}/${model?.slug}`}
                            >
                              <a>
                                https://stupendouscms.com/api/
                                {session?.user?.accountId}/
                                {editingProject?.slug}/{model?.slug}
                              </a>
                            </Link>
                          </li>
                        </div>
                      ))}
                      <li>
                        <Link
                          href={`https://stupendouscms.com/api/${session?.user?.accountId}/${editingProject?.slug}/files`}
                        >
                          <a>
                            https://stupendouscms.com/api/
                            {session?.user?.accountId}/{editingProject?.slug}
                            /files
                          </a>
                        </Link>
                      </li>
                    </ul>
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
