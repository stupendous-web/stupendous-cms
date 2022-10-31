import { useGlobal } from "../lib/context";
import { useState } from "react";
import axios from "axios";
import UIkit from "uikit";

export default function EditProperty({ model, property }) {
  const { filteredModels, properties, setProperties } = useGlobal();

  const [editingId, setEditingId] = useState(property?._id);
  const [editingType, setEditingType] = useState(property?.type);
  const [editingName, setEditingName] = useState(property?.type);
  const [editingIsRequired, setEditingIsRequired] = useState(
    property?.isRequired
  );

  const propertyTypes = [
    { option: "String of Text", value: "string" },
    { option: "Plain Text Block", value: "text" },
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
          <h3>
            Edit Property for{" "}
            {
              filteredModels?.find(
                (filteredModel) => filteredModel?._id === model._id
              ).name
            }
          </h3>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className={"uk-margin"}>
              <label className={"uk-form-label"}>Type</label>
              <select
                value={editingType}
                className={"uk-select"}
                onChange={(event) => setEditingType(event.target.value)}
                required
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
                onChange={(event) => setEditingName(event.target.value)}
                required
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
