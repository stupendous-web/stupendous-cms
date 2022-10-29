import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGlobal } from "../lib/context";
import { useState } from "react";
import axios from "axios";

export default function PropertiesModal() {
  const { properties, setProperties, editingProject, editingModel } =
    useGlobal();

  const propertyTypes = [
    { name: "Title", type: "string" },
    { name: "Plain Text", type: "text" },
    { name: "HTML", type: "html" },
  ];

  const [editingName, setEditingName] = useState();

  const handleSubmit = (type) => {
    axios
      .post("/api/properties", {
        type: type,
        isRequired: false,
        modelId: editingModel?._id,
        projectId: editingProject?._id,
      })
      .then((response) => {})
      .catch((error) => console.log(error));
  };

  const handleDelete = (propertyId) => {
    axios
      .delete("/api/properties", { data: { propertyId: propertyId } })
      .then(() => {
        setProperties(
          properties.filter((property) => property._id !== propertyId)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      className={"uk-modal-container"}
      id={"properties-modal"}
      data-uk-modal={""}
    >
      <div className={"uk-modal-dialog uk-modal-body"}>
        <h3>Edit Properties for {editingModel?.name}</h3>
        <div className={"uk-grid-match uk-margin"} data-uk-grid={""}>
          <div className={"uk-width-auto uk-flex uk-flex-top"}>
            <div>
              {propertyTypes.map((propertyType) => {
                return (
                  <p key={propertyType.type}>
                    <a
                      className={
                        "uk-button uk-button-default uk-button-small uk-margin-small-right"
                      }
                      onClick={() => handleSubmit(propertyType.type)}
                    >
                      {propertyType?.name}
                    </a>
                  </p>
                );
              })}
            </div>
          </div>
          <div className={"uk-width-expand"}>
            {!properties?.length ? (
              <div
                className={
                  "uk-placeholder uk-flex uk-flex-center uk-flex-middle"
                }
              >
                Click a property type to add it here.
              </div>
            ) : (
              <div className={"uk-placeholder"}>
                {properties?.map((property) => {
                  return (
                    <div
                      className={
                        "uk-card uk-card-body uk-animation-fade uk-margin"
                      }
                      key={property._id}
                    >
                      <div data-uk-grid={""}>
                        <div className={"uk-width-expand"}>
                          <div className={"uk-text-bold"}>
                            {
                              propertyTypes?.find(
                                (propertyType) =>
                                  propertyType?.type === property?.type
                              ).name
                            }
                          </div>
                        </div>
                        <div>
                          <label className={"uk-form-label"}>
                            Required
                            <input
                              type={"checkbox"}
                              value={property?.isRequired}
                              className={"uk-checkbox uk-margin-small-left"}
                            />
                          </label>
                        </div>
                        <div
                          className={"uk-text-danger"}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(property._id)}
                        >
                          Delete
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={"uk-margin-small-left"}
                          />
                        </div>
                      </div>
                      <div className={"uk-margin"}>
                        <label>Name</label>
                        <input
                          type={"text"}
                          value={editingName}
                          className={"uk-input"}
                          onChange={(event) =>
                            setEditingName(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
