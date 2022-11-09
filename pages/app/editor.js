import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const { value, setValue } = useState();

  const { filteredProperties, editingObject } = useGlobal();

  return (
    <Authentication>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <p className={"uk-text-right"}>
              <a className={"uk-button uk-button-primary uk-button-large"}>
                Publish
              </a>
            </p>
            {filteredProperties?.map((property) => {
              if (property.modelId === editingObject?.modelId) {
                return (
                  <div className={"uk-margin"} key={property._id}>
                    <h3>{property.name}</h3>
                    {property.type === "string" && (
                      <input
                        type={"text"}
                        className={"uk-input"}
                        style={{ background: "none", paddingLeft: 0 }}
                        placeholder={"Text"}
                      />
                    )}
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
