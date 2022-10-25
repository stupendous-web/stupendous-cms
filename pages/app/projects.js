import { useEffect, useState } from "react";
import { useGlobal } from "../../lib/context";
import { useSession } from "next-auth/react";
import axios from "axios";
import UIkit from "uikit";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const [name, setName] = useState();

  const { data: session } = useSession();

  const { projects, setProjects } = useGlobal();

  useEffect(() => {
    axios
      .get("/api/projects", { params: { userId: session?.user?._id } })
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, [session]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    axios
      .post("/api/projects", { name: name })
      .then((response) => {
        console.log(response.data);
        UIkit.modal("#create-project-modal").hide();
        setName("");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    UIkit.container = ".uk-scope";
  }, []);

  return (
    <div className={"uk-scope"}>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                <div className={"uk-width-1-1"}>
                  <div>
                    <div
                      className={"uk-button uk-button-primary uk-button-large"}
                      onClick={() =>
                        UIkit.modal("#create-project-modal").show()
                      }
                    >
                      Create a Project
                    </div>
                  </div>
                </div>
                {!!projects?.length && (
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      <h3>Projects</h3>
                      <table className="uk-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects?.map((project) => {
                            return (
                              <tr key={project._id}>
                                <td>{project.name}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id={"create-project-modal"} data-uk-modal={""}>
            <div className={"uk-modal-dialog uk-modal-body"}>
              <h3>Create Project</h3>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Name</label>
                  <input
                    type={"text"}
                    value={name}
                    className={"uk-input"}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
                <input
                  type={"submit"}
                  className={"uk-button uk-button-primary"}
                />
              </form>
            </div>
          </div>
        </Layout>
      </Authentication>
    </div>
  );
}
