import { useGlobal } from "../lib/context";
import { useState } from "react";
import axios from "axios";
import UIkit from "uikit";
import { createPropertyName } from "../utils/helpers";

export default function EditProperty({ model, property }) {
  const { filteredModels, properties, setProperties } = useGlobal();

  const [editingId, setEditingId] = useState(property?._id);
  const [editingType, setEditingType] = useState(property?.type);
  const [editingName, setEditingName] = useState(property?.name);
  const [editingIsRequired, setEditingIsRequired] = useState(
    property?.isRequired
  );

  const propertyTypes = [
    { option: "Plain Text", value: "string" },
    { option: "HTML", value: "html" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .patch("/api/properties", {
        _id: editingId,
        type: editingType,
        name: editingName,
        isRequired: editingIsRequired,
      })
      .then(() => {
        const newState = properties.map((property) => {
          if (property._id === editingId) {
            return {
              ...property,
              type: editingType,
              name: editingName,
              isRequired: editingIsRequired,
            };
          }

          return property;
        });
        setProperties(newState);
        UIkit.modal(`#edit-property-modal-${editingId}`).hide();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    axios
      .delete("/api/properties", { data: { propertyId: editingId } })
      .then(() => {
        // This doesn't work: setProperties(properties?.filter((property) => property !== editingId));
        UIkit.modal(`#edit-property-modal-${editingId}`).hide();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <a
        href={`#edit-property-modal-${editingId}`}
        className={
          "uk-button uk-button-default uk-button-small uk-margin-small-right"
        }
        data-uk-toggle={""}
      >
        {property?.name}
      </a>
      <div id={`edit-property-modal-${editingId}`} data-uk-modal={""}>
        <div className={"uk-modal-dialog uk-modal-body"}>
          <div className={"uk-flex-middle"} data-uk-grid={""}>
            <div className={"uk-width-expand"}>
              <h3>
                Edit Property for{" "}
                {
                  filteredModels?.find(
                    (filteredModel) => filteredModel?._id === model._id
                  ).name
                }
              </h3>
            </div>
            <div>
              <div
                className={"uk-text-muted"}
                style={{ cursor: "pointer" }}
                onClick={() => handleDelete()}
              >
                <i className={"ri-delete-bin-fill"} />
              </div>
            </div>
          </div>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className={"uk-margin"}>
              <label className={"uk-form-label"}>Type</label>
              <select
                value={editingType}
                className={"uk-select"}
                onChange={(event) => setEditingType(event.target.value)}
                required
                disabled
              >
                <option value={""}>Select</option>
                {propertyTypes.map((propertyType) => {
                  return (
                    <option key={propertyType.value} value={propertyType.value}>
                      {propertyType?.option}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={"uk-margin"}>
              <label className={"uk-form-label"}>Name</label>
              <input
                type={"text"}
                value={editingName}
                className={"uk-input"}
                onChange={(event) =>
                  setEditingName(createPropertyName(event.target.value))
                }
                required
                disabled
              />
            </div>
            <div className={"uk-margin"}>
              <label className={"uk-form-label uk-display-block"}>
                Required
              </label>
              <input
                type={"checkbox"}
                checked={editingIsRequired}
                className={"uk-checkbox"}
                onChange={() => setEditingIsRequired(!editingIsRequired)}
                disabled
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
    </>
  );
}
