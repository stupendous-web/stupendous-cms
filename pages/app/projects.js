import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGlobal } from "../../lib/context";
import axios from "axios";
import UIkit from "uikit";
import { createSlug } from "../../utils/helpers";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

import scrumBoard from "../../images/undraw/undraw_scrum_board_re_wk7v.svg";

export default function Projects() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const router = useRouter();

  const {
    projects,
    setProjects,
    editingProject,
    setEditingProject,
    models,
    setModels,
  } = useGlobal();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/projects", { name: name, slug: slug })
      .then((response) => {
        setProjects([response.data, ...projects]);
        setEditingProject(response.data);
        UIkit.modal("#create-project-modal").hide();
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

  const handleProjectNameChange = (event) => {
    setName(event.target.value);
    setSlug(createSlug(event.target.value));
  };

  const handleEditingProjectNameChange = (event) => {
    setEditingProject({
      ...editingProject,
      name: event.target.value,
      slug: createSlug(event.target.value),
    });
  };

  return (
    <Authentication>
      <Layout>
        {!projects?.length ? (
          <>
            <div
              className={
                "uk-height-1-1 uk-width-1-1 uk-flex uk-flex-center uk-flex-middle"
              }
            >
              <div className={"uk uk-width-large uk-text-center"}>
                <div
                  className={
                    "uk-width-small uk-margin-auto-right uk-margin-auto-left"
                  }
                >
                  <Image src={scrumBoard} />
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                <a
                  className={"uk-button uk-button-primary"}
                  href={"#create-project-modal"}
                  data-uk-toggle={""}
                >
                  Create a Project
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"uk-section uk-section-small"}>
              <div className={"uk-container uk-container-expand"}>
                <div className={"uk-grid-match"} data-uk-grid={""}>
                  <div className={"uk-width-1-1"}>
                    <div>
                      <a
                        className={
                          "uk-button uk-button-primary uk-button-large"
                        }
                        href={"#create-project-modal"}
                        data-uk-toggle={""}
                      >
                        Create a Project
                      </a>
                    </div>
                  </div>
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      <h3>Projects</h3>
                      <table
                        className={"uk-table uk-table-divider uk-table-hover"}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Slug</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {projects?.map((project) => {
                            return (
                              <tr key={project._id}>
                                <td>
                                  <a
                                    onClick={() => {
                                      setEditingProject(project);
                                      router.push("/app/models");
                                    }}
                                  >
                                    {project.name}
                                  </a>
                                </td>
                                <td>{project.slug}</td>
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
                                    <span
                                      className={"material-symbols-rounded"}
                                    >
                                      edit
                                    </span>
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
                                    <span
                                      className={"material-symbols-rounded"}
                                    >
                                      delete
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

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
                  onChange={(event) => handleProjectNameChange(event)}
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
  );
}
