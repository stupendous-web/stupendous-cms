import { useEffect, useState } from "react";
import { useGlobal } from "../../lib/context";
import axios from "axios";
import UIkit from "uikit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatModel } from "../../utils/helpers";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const [modelName, setModelName] = useState("");
  const [project, setProject] = useState();
  const [editingProject, setEditingProject] = useState();

  const { models, projects } = useGlobal();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/models", { name: modelName, projectId: project })
      .then((response) => {
        UIkit.modal("#create-model-modal").hide();
        setModelName("");
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .patch("/api/projects", editingProject)
      .then(() => {
        UIkit.modal("#edit-project-modal").hide();
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
      .then(() => {})
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    UIkit.container = ".uk-scope";
    UIkit.util.on("#sortable", "moved", function (event) {
      console.log(event);
    });
  }, []);

  return (
    <div className={"uk-scope"}>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                <div className={"uk-width-auto"}>
                  <div>
                    <div
                      className={"uk-button uk-button-primary uk-button-large"}
                      onClick={() => UIkit.modal("#create-model-modal").show()}
                    >
                      Create a Model
                    </div>
                  </div>
                </div>
                <div className={"uk-width-auto"}>
                  <div>
                    <div
                      className={"uk-button uk-button-default uk-button-large"}
                      onClick={() =>
                        UIkit.modal("#create-project-modal").show()
                      }
                    >
                      Add Property to a Model
                    </div>
                  </div>
                </div>
                {!!projects?.length && (
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      <h3>Models</h3>
                      <table
                        className={"uk-table uk-table-divider uk-table-hover"}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Project</th>
                            <th>Properties</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {models?.map((model) => {
                            return (
                              <tr key={model._id}>
                                <td>{model.name}</td>
                                <td>{model?.project[0]?.name}</td>
                                <td>
                                  <a
                                    className={
                                      "uk-button uk-button-default uk-button-small uk-margin-small-right"
                                    }
                                  >
                                    Title
                                  </a>
                                  <a
                                    className={
                                      "uk-button uk-button-default uk-button-small uk-margin-small-right"
                                    }
                                  >
                                    Body
                                  </a>
                                  <a
                                    className={
                                      "uk-button uk-button-default uk-button-small uk-margin-small-right"
                                    }
                                  >
                                    Date
                                  </a>
                                </td>
                                <td className={"uk-text-right"}>
                                  <span
                                    className={
                                      "uk-text-primary uk-margin-right"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setEditingProject(model);
                                      UIkit.modal("#edit-model-modal").show();
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
                                          "Are you sure you wish to permanently delete this model?"
                                        )
                                        .then(() => handleDelete(model._id));
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
          <div id={"create-model-modal"} data-uk-modal={""}>
            <div className={"uk-modal-dialog uk-modal-body"}>
              <h3>Create a Model</h3>
              <form onSubmit={(event) => handleSubmit(event)}>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Name</label>
                  <input
                    type={"text"}
                    value={formatModel(modelName)}
                    className={"uk-input"}
                    onChange={(event) => setModelName(event.target.value)}
                    required
                  />
                  <div className={"uk-text-small"}>ex: my-stupendous-pages</div>
                </div>
                <div className={"uk-margin"}>
                  <label className={"uk-form-label"}>Project</label>
                  <select
                    value={project}
                    className={"uk-select"}
                    onChange={(event) => setProject(event.target.value)}
                    required
                  >
                    <option value={""}>Select</option>
                    {projects?.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
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
