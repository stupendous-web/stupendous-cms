import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobal } from "../../lib/context";
import axios from "axios";
import UIkit from "uikit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { createSlug } from "../../utils/helpers";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Content() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const {
    projects,
    setProjects,
    editingProject,
    setEditingProject,
    filteredModels,
    setModels,
  } = useGlobal();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/projects", { name: name, slug: slug })
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
            return {
              ...project,
              name: editingProject.name,
              slug: editingProject.slug,
            };
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

  const handleEditingProjectNameChange = (event) => {
    setEditingProject({
      ...editingProject,
      name: event.target.value,
      slug: createSlug(event.target.value),
    });
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
                {!projects?.length && (
                  <div className={"uk-width-1-1"}>
                    <div
                      className={"uk-alert-warning uk-flex uk-flex-middle"}
                      data-uk-alert={""}
                    >
                      <span className={"uk-text-large uk-margin-right"}>
                        👇
                      </span>
                      <div>
                        Looks like you don&apos;t have any projects. Add one to
                        get started!
                      </div>
                    </div>
                  </div>
                )}
                <div className={"uk-width-1-1"}>
                  <div>
                    <div
                      className={"uk-button uk-button-primary uk-button-large"}
                      onClick={() =>
                        UIkit.modal("#create-content-modal").show()
                      }
                    >
                      Create New Content
                    </div>
                  </div>
                </div>
                {!!projects?.length && (
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      <h3>Your Content</h3>
                      <table
                        className={"uk-table uk-table-divider uk-table-hover"}
                      >
                        <thead>
                          <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {projects?.map((project) => {
                            return (
                              <tr key={project._id}>
                                <td />
                                <td>
                                  {project.name}&nbsp;
                                  <span
                                    className={"uk-text-muted uk-text-italic"}
                                  >
                                    by Topher on March 5th, 2099
                                  </span>{" "}
                                </td>
                                <td className={"uk-text-right"}>
                                  <Link href={"/app/editor"}>
                                    <a className={"uk-margin-right"}>
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    </a>
                                  </Link>
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
          <div id={"create-content-modal"} data-uk-modal={""}>
            <div className={"uk-modal-dialog uk-modal-body"}>
              <h3>Content Type</h3>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"uk-margin"}>
                  <select className={"uk-select"} required>
                    <option value={""}>Select</option>
                    {filteredModels?.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                    onChange={(event) => handleEditingProjectNameChange(event)}
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
