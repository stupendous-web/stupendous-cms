import Link from "next/link";

import Layout from "../../components/Layout";

export default function Projects() {
  return (
    <Layout>
      <div className={"uk-section uk-section-small"}>
        <div className={"uk-container uk-container-expand"}>
          <div className={"uk-grid-match"} data-uk-grid={""}>
            <div className={"uk-width-1-1"}>
              <div>
                <Link href={"/app/projects/create"}>
                  <a className={"uk-button uk-button-primary uk-button-large"}>
                    Create a Project
                  </a>
                </Link>
              </div>
            </div>
            <div className={"uk-width-1-1"}>
              <div
                className={
                  "uk-card uk-card-default uk-card-body uk-text-center uk-flex uk-flex-center uk-flex-middle"
                }
              >
                asdf
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
