import { useEffect } from "react";
import Link from "next/link";
import { useGlobal } from "../../lib/context";
import { useSession } from "next-auth/react";
import axios from "axios";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const { data: session } = useSession();

  const { projects, setProjects } = useGlobal();

  useEffect(() => {
    console.log(session?.user?._id);
    axios
      .get("/api/projects", { params: { userId: session?.user?._id } })
      .then((response) => console.log(response.data))
      .catch((error) => console.log("error", error));
  }, [session]);

  return (
    <Authentication>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-1-1"}>
                <div>
                  <Link href={"/app/projects/create"}>
                    <a
                      className={"uk-button uk-button-primary uk-button-large"}
                    >
                      Create a Project
                    </a>
                  </Link>
                </div>
              </div>
              <div className={"uk-width-1-1"}>
                <div
                  className={
                    "uk-card uk-card-default uk-card-body uk-text-center uk-flex uk-flex-middle"
                  }
                >
                  <h3>Projects</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
