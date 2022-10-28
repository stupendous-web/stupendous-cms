import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGlobal } from "../lib/context";
import { useEffect } from "react";
import axios from "axios";

export default function PropertiesModal() {
  const { properties, setProperties, editingModel, setEditingModel } =
    useGlobal();

  const propertyTypes = [
    { name: "Title", slug: "string" },
    { name: "Plain Text", slug: "text" },
    { name: "HTML", slug: "html" },
  ];

  useEffect(() => {
    axios
      .get("/api/properties", { params: editingModel._id })
      .then((response) => setProperties(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (type) => {
    axios
      .post("/api/properties", {
        type: type,
        isRequired: false,
        modelId: editingModel._id,
        projectId: editingProject_id,
      })
      .then((response) => {})
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
                  <p key={propertyType.slug}>
                    <a
                      className={
                        "uk-button uk-button-default uk-button-small uk-margin-small-right"
                      }
                      onClick={() => handleSubmit(propertyType.slug)}
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
                {properties?.map((property, key) => {
                  return (
                    <div
                      className={
                        "uk-card uk-card-body uk-animation-fade uk-margin"
                      }
                      key={property._id}
                    >
                      <div data-uk-grid={""}>
                        <div className={"uk-width-expand"}>
                          <div className={"uk-text-bold"}>{property?.name}</div>
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
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className={"uk-margin-small-left"}
                          />
                        </div>
                      </div>
                      <div className={"uk-margin"}>
                        <label>Name</label>
                        <input type={"text"} className={"uk-input"} />
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
