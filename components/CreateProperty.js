import { useGlobal } from "../lib/context";
import { useState } from "react";
import axios from "axios";
import UIkit from "uikit";

export default function CreateProperty({ id }) {
  const { editingProject, filteredModels, properties, setProperties } =
    useGlobal();

  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const propertyTypes = [
    { option: "Title", value: "string" },
    { option: "Plain Text", value: "text" },
    { option: "HTML", value: "html" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/properties", {
        type: type,
        name: name,
        isRequired: isRequired,
        modelId: id,
        projectId: editingProject?._id,
      })
      .then((response) => {
        setProperties([...properties, response.data]);
        UIkit.modal(`#create-property-modal-${id}`).hide();
        setType("");
        setName("");
        setIsRequired(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <a
        href={`#create-property-modal-${id}`}
        className={
          "uk-button uk-button-primary uk-button-small uk-margin-small-right"
        }
        data-uk-toggle={""}
      >
        Add
      </a>
      <div id={`create-property-modal-${id}`} data-uk-modal={""}>
        <div className={"uk-modal-dialog uk-modal-body"}>
          <h3>
            Create Property for{" "}
            {filteredModels?.find((model) => model?._id === id).name}
          </h3>
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className={"uk-margin"}>
              <label className={"uk-form-label"}>Type</label>
              <select
                className={"uk-select"}
                onChange={(event) => setType(event.target.value)}
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
                value={name}
                className={"uk-input"}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className={"uk-margin"}>
              <label className={"uk-form-label uk-display-block"}>
                Required
              </label>
              <input
                type={"checkbox"}
                checked={isRequired}
                className={"uk-checkbox"}
                onChange={(event) => setIsRequired(event.target.checked)}
              />
            </div>
            <input
              type={"submit"}
              value={"Create"}
              className={"uk-button uk-button-primary"}
            />
          </form>
        </div>
      </div>
    </>
  );
}