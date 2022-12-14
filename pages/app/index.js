import { useEffect } from "react";
import Link from "next/link";
import { useGlobal } from "../../lib/context";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Layout from "../../components/Layout";

export default function Index() {
  const router = useRouter();

  const { projects, editingProject, filteredModels } = useGlobal();

  const { data: session } = useSession();

  useEffect(() => {
    projects?.length < 1 && router.replace("/app/projects");
  }, [projects]);

  useEffect(() => {
    if (session) {
      !session.user?.isAccountOwner && router.replace("/app/objects");
    }
  }, [session]);

  return (
    <>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-expand"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <h3>Your API Endpoints</h3>
                  <ul className={"uk-list uk-list-divider"}>
                    {filteredModels?.map((model) => (
                      <div key={model._id}>
                        <li>
                          <Link
                            href={`https://stupendouscms.com/api/${session?.user?.accountId}/${editingProject?.slug}/${model?.slug}`}
                          >
                            https://stupendouscms.com/api/
                            {session?.user?.accountId}/{editingProject?.slug}/
                            {model?.slug}
                          </Link>
                        </li>
                      </div>
                    ))}
                    <li>
                      <Link
                        href={`https://stupendouscms.com/api/${session?.user?.accountId}/${editingProject?.slug}/files`}
                      >
                        https://stupendouscms.com/api/
                        {session?.user?.accountId}/{editingProject?.slug}
                        /files
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={"uk-width-auto"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <div className={"uk-width-small"}>
                    <h3>????</h3>
                    <p>
                      Here is a list of all your API endpoints. They are
                      structured by your account ID first, then by project, then
                      type
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
