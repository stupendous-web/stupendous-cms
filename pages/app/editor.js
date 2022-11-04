import { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const { value, setValue } = useState();

  return (
    <Authentication>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-1-1"}>
                <div className={"uk-flex-middle"} data-uk-grid={""}>
                  <div className={"uk-width-expand"}>
                    <h1>
                      <input
                        type={"text"}
                        className={"uk-input"}
                        style={{ background: "none", height: "inherit" }}
                        placeholder={"Title"}
                        autoFocus
                      />
                    </h1>
                  </div>
                  <div>
                    <a
                      className={"uk-button uk-button-primary uk-button-large"}
                    >
                      Publish
                    </a>
                  </div>
                </div>
              </div>
              <div className={"uk-width-1-1"}>
                <ReactQuill value={value} onChange={setValue} />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
