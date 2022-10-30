import { useState } from "react";
import axios from "axios";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

export default function Media() {
  const [isLoading, setIsLoading] = useState(false);

  const { files, setFiles } = useGlobal();

  const handleUpload = (event) => {
    setIsLoading(true);
    axios
      .post(
        "/api/media",
        { files: event.target.files[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setFiles([response.data, ...files]);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Authentication>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-1-1"}>
                <div data-uk-form-custom={""}>
                  <input
                    type={"file"}
                    aria-label="Custom controls"
                    accept={"image/*"}
                    onChange={(event) => handleUpload(event)}
                  />
                  <button
                    className={"uk-button uk-button-primary uk-button-large"}
                    type={"button"}
                    tabIndex={"-1"}
                  >
                    Upload Media
                  </button>
                </div>
              </div>
              {isLoading ? (
                <div data-uk-spinner={""}></div>
              ) : (
                <div className={"uk-width-1-1"}>
                  <div
                    className={"uk-child-width-1-6"}
                    data-uk-grid={"masonry: true"}
                  >
                    {files?.map((file) => (
                      <div key={file?._id}>
                        <img
                          src={`https://storage.cloud.google.com/stupendous-cms/${file?._id}?authuser=2`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
