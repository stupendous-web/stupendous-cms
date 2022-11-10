import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useGlobal } from "../../lib/context";
import Text from "../../components/editor/Text";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const { value, setValue } = useState();

  const { filteredProperties, editingObject, isSaving } = useGlobal();

  return (
    <Authentication>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-flex uk-flex-middle"}>
              {isSaving ? (
                <>
                  <div className={"uk-margin-right"} data-uk-spinner={""} />
                  Saving Draft
                </>
              ) : (
                <>Draft Saved</>
              )}
            </div>
            {filteredProperties?.map((property) => {
              if (property.modelId === editingObject?.modelId) {
                return (
                  <div className={"uk-margin"} key={property._id}>
                    <h3>{property.name}</h3>
                    {property.type === "string" && <Text property={property} />}
                    {property.type === "html" && (
                      <ReactQuill value={value} onChange={setValue} />
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
