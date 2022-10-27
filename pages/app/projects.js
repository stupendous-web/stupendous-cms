import { useEffect, useState } from "react";
import { useGlobal } from "../../lib/context";
import axios from "axios";
import UIkit from "uikit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const [name, setName] = useState("");
  const [editingProject, setEditingProject] = useState({ name: "" });

  const { projects, setProjects, models, setModels } = useGlobal();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/projects", { name: name })
      .then((response) => {
        UIkit.modal("#create-project-modal").hide();
        setProjects([response.data, ...projects]);
        setName("");
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .patch("/api/projects", editingProject)
      .then(() => {
        UIkit.modal("#edit-project-modal").hide();
        const newState = projects.map((project) => {
          if (project._id === editingProject._id) {
            return { ...project, name: editingProject.name };
          }

          return project;
        });
        setProjects(newState);
        setEditingProject({
          ...editingProject,
          name: "",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (_id) => {
    axios
      .delete("/api/projects", { data: { _id: _id } })
      .then(() => {
        setProjects(projects.filter((project) => project._id !== _id));
        setModels(models.filter((model) => model.projectId !== _id));
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
                      <table
                        className={"uk-table uk-table-divider uk-table-hover"}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {projects?.map((project) => {
                            return (
                              <tr key={project._id}>
                                <td>{project.name}</td>
                                <td className={"uk-text-right"}>
                                  <span
                                    className={
                                      "uk-text-primary uk-margin-right"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setEditingProject(project);
                                      UIkit.modal("#edit-project-modal").show();
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </span>
                                  <span
                                    className={"uk-text-primary"}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      UIkit.modal
                                        .confirm(
                                          "Are you sure you wish to permanently delete this project?"
                                        )
                                        .then(() => handleDelete(project._id));
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faTrash} />
                                  </span>
                                </td>
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
              <h3>Create a Project</h3>
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
                  <div className={"uk-text-small"}>ex: My Stupendous Blog</div>
                </div>
                <input
                  type={"submit"}
                  value={"Create"}
                  className={"uk-button uk-button-primary"}
                />
              </form>
            </div>
          </div>
          <div id={"edit-project-modal"} data-uk-modal={""}>
            <div className={"uk-modal-dialog uk-modal-body"}>
              <h3>Edit a Project</h3>
              <form onSubmit={(event) => handleEdit(event)}>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Name</label>
                  <input
                    type={"text"}
                    value={editingProject?.name}
                    className={"uk-input"}
                    onChange={(event) =>
                      setEditingProject({
                        ...editingProject,
                        name: event.target.value,
                      })
                    }
                    required
                  />
                </div>
                <input
                  type={"submit"}
                  value={"Save"}
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
