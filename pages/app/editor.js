import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Projects() {
  const [body, setBody] = useState();

  return (
    <div className={"uk-scope"}>
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
                        className={
                          "uk-button uk-button-primary uk-button-large"
                        }
                      >
                        Publish
                      </a>
                    </div>
                  </div>
                </div>
                <div className={"uk-width-1-1"}>
                  <Editor
                    tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                    init={{
                      menubar: "",
                      toolbar:
                        "undo redo | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | removeformat",
                      plugins: ["wordcount", "lists"],
                    }}
                    onEditorChange={setBody}
                  />
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Authentication>
    </div>
  );
}
