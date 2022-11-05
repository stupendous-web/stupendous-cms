import { useState } from "react";
import Image from "next/image";
import { useGlobal } from "../../lib/context";
import axios from "axios";
import UIkit from "uikit";
import { createSlug } from "../../utils/helpers";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";
import CreateProperty from "../../components/CreateProperty";
import EditProperty from "../../components/EditProperty";

import typewriter from "../../images/undraw/undraw_typewriter_re_u9i2.svg";

export default function Models() {
  const [modelSingular, setModelSingular] = useState("");
  const [modelPlural, setModelPlural] = useState("");

  const {
    models,
    setModels,
    filteredModels,
    editingModel,
    setEditingModel,
    projects,
    editingProject,
    properties,
    setProperties,
    filteredProperties,
  } = useGlobal();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/models", {
        singular: modelSingular,
        plural: modelPlural,
        slug: createSlug(modelPlural),
        projectId: editingProject?._id,
      })
      .then((response) => {
        UIkit.modal("#create-model-modal").hide();
        setModels([response.data[0], ...models]);
        setModelSingular("");
        setModelPlural("");
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (event) => {
    event.preventDefault();
    axios
      .patch("/api/models", editingModel)
      .then((response) => {
        UIkit.modal("#edit-model-modal").hide();
        const newState = models.map((model) => {
          if (model._id === editingModel._id) {
            return response.data[0];
          }

          return model;
        });
        setModels(newState);
        setEditingModel({
          ...editingModel,
          singular: "",
          plural: "",
          projectId: undefined,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (modelId) => {
    axios
      .delete("/api/models", { data: { modelId: modelId } })
      .then(() => {
        setModels(models?.filter((model) => model._id !== modelId));
        setProperties(
          properties?.filter((property) => property?.modelId !== modelId)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <Authentication>
      <Layout>
        {!models?.length ? (
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
                  <Image src={typewriter} />
                </div>
                <p>Models structure how your clients contribute content.</p>
                <a
                  className={"uk-button uk-button-primary"}
                  href={"#create-model-modal"}
                  data-uk-toggle={""}
                >
                  Create a Model
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"uk-section uk-section-small"}>
              <div className={"uk-container uk-container-expand"}>
                <div className={"uk-grid-match"} data-uk-grid={""}>
                  <div className={"uk-width-auto"}>
                    <div>
                      <div
                        className={
                          "uk-button uk-button-primary uk-button-large"
                        }
                        onClick={() =>
                          UIkit.modal("#create-model-modal").show()
                        }
                      >
                        Create a Model
                      </div>
                    </div>
                  </div>
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      <h3>Models</h3>
                      <table
                        className={"uk-table uk-table-divider uk-table-hover"}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Slug</th>
                            <th>Properties</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {filteredModels?.map((model) => {
                            const modelProperties = filteredProperties?.filter(
                              (property) => property?.modelId === model._id
                            );
                            return (
                              <tr key={model._id}>
                                <td>{model.plural}</td>
                                <td>{model.slug}</td>
                                <td>
                                  {!!modelProperties?.length &&
                                    modelProperties?.map((property) => {
                                      return (
                                        <EditProperty
                                          model={model}
                                          property={property}
                                          key={property._id}
                                        />
                                      );
                                    })}
                                  <CreateProperty id={model._id} />
                                </td>
                                <td className={"uk-text-right"}>
                                  <span
                                    className={
                                      "uk-text-primary uk-margin-right"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      setEditingModel(model);
                                      UIkit.modal("#edit-model-modal").show();
                                    }}
                                  >
                                    <i
                                      className={
                                        "ri-pencil-fill uk-margin-right"
                                      }
                                    />
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
                                    <i className={"ri-delete-bin-fill"} />
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
        <div id={"create-model-modal"} data-uk-modal={""}>
          <div className={"uk-modal-dialog uk-modal-body"}>
            <h3>Create a Model</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Singular Name</label>
                <input
                  type={"text"}
                  value={modelSingular}
                  className={"uk-input"}
                  onChange={(event) => setModelSingular(event.target.value)}
                  required
                />
                <div className={"uk-text-small"}>ex: My Stupendous Page</div>
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Plural Name</label>
                <input
                  type={"text"}
                  value={modelPlural}
                  className={"uk-input"}
                  onChange={(event) => setModelPlural(event.target.value)}
                  required
                />
                <div className={"uk-text-small"}>ex: My Stupendous Pages</div>
              </div>
              <input
                type={"submit"}
                value={"Create"}
                className={"uk-button uk-button-primary"}
              />
            </form>
          </div>
        </div>
        <div id={"edit-model-modal"} data-uk-modal={""}>
          <div className={"uk-modal-dialog uk-modal-body"}>
            <h3>Edit a Model</h3>
            <form onSubmit={(event) => handleEdit(event)}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Singular Name</label>
                <input
                  type={"text"}
                  value={editingModel?.singular}
                  className={"uk-input"}
                  onChange={(event) =>
                    setEditingModel({
                      ...editingModel,
                      singular: event.target.value,
                      slug: createSlug(event.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Plural Name</label>
                <input
                  type={"text"}
                  value={editingModel?.plural}
                  className={"uk-input"}
                  onChange={(event) =>
                    setEditingModel({
                      ...editingModel,
                      plural: event.target.value,
                      // slug: createSlug(event.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Project</label>
                <select
                  value={editingModel.projectId}
                  className={"uk-select"}
                  onChange={(event) =>
                    setEditingModel({
                      ...editingModel,
                      projectId: event.target.value,
                    })
                  }
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
