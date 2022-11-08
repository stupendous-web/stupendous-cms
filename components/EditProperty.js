import { useGlobal } from "../lib/context";
import axios from "axios";
import UIkit from "uikit";

export default function EditProperty({ model, property }) {
  const { filteredModels } = useGlobal();

  const editingId = property._id;

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
              <h3>{property?.name}</h3>
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
          <div className={"uk-margin"}>
            <div className={"uk-text-bold"}>Type</div>
            <div>{property?.type}</div>
          </div>
          <div className={"uk-margin"}>
            <div className={"uk-text-bold"}>Property Name</div>
            <div>{property?.property}</div>
          </div>
          <div className={"uk-margin"}>
            <div className={"uk-text-bold"}>Required</div>
            <div>{property?.isRequired ? "True" : "False"}</div>
          </div>
        </div>
      </div>
    </>
  );
}
