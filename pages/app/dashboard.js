import { useSession } from "next-auth/react";
import Link from "next/link";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const { data: session } = useSession();

  const checklist = [
    "Create a project",
    "Create a model",
    "Invite your team",
    "Start creating content",
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
                    {checklist.map((item, key) => {
                      return (
                        <div key={key}>
                          <input
                            type={"checkbox"}
                            checked={!key}
                            className={"uk-checkbox uk-margin-small-right"}
                            style={{ cursor: "inherit" }}
                          />
                          {item}
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
                        href={`https://stupendouscms.com/api/${session?.user?._id}`}
                      >
                        <a>
                          https://stupendouscms.com/api/{session?.user?._id}
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
