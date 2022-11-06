import axios from "axios";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";
import UIkit from "uikit";
import Image from "next/image";
import imageFolder from "../../images/undraw/undraw_image__folder_re_hgp7.svg";

export default function Files() {
  const { filteredFiles, setFilteredFiles, files, setFiles, editingProject } =
    useGlobal();

  const handleUpload = (event) => {
    UIkit.notification({
      message: "Uploading!",
      status: "primary",
      pos: "bottom-right",
    });
    let formData = new FormData();
    for (let counter = 0; counter < event.target.files.length; counter++) {
      formData.append("files[]", event.target.files[counter]);
    }
    formData.append("projectId", editingProject?._id);
    axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFiles([response.data, ...files]);
        UIkit.notification({
          message: "All set!",
          status: "success",
          pos: "bottom-right",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 413) {
          UIkit.notification({
            message: "Try uploading less.",
            status: "danger",
            pos: "bottom-right",
          });
        }
      });
  };

  const handleDelete = (fileId) => {
    axios
      .delete("/api/files", { data: { fileId: fileId } })
      .then(() => {
        setFilteredFiles(filteredFiles?.filter((file) => file._id !== fileId));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Authentication>
      <Layout>
        {!filteredFiles?.length ? (
          <>
            <div
              className={
                "uk-height-1-1 uk-width-1-1 uk-flex uk-flex-center uk-flex-middle"
              }
            >
              <div className={"uk uk-width-large uk-text-center"}>
                <div
                  className={
                    "uk-width-small uk-margin-auto-right uk-margin-auto-left"
                  }
                >
                  <Image src={imageFolder} />
                </div>
                <p>Enrich your content with media.</p>
                <div data-uk-form-custom={""}>
                  <input
                    type={"file"}
                    aria-label="Custom controls"
                    accept={
                      "image/jpeg, image/pjpeg, image/png, image/gif, image/webp, image/x-icon"
                    }
                    multiple
                    onChange={(event) => handleUpload(event)}
                  />
                  <button
                    className={"uk-button uk-button-primary"}
                    type={"button"}
                    tabIndex={"-1"}
                  >
                    Upload Media
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"uk-section uk-section-small"}>
              <div className={"uk-container uk-container-expand"}>
                <div className={"uk-grid-match"} data-uk-grid={""}>
                  <div className={"uk-width-1-1"}>
                    <div data-uk-form-custom={""}>
                      <input
                        type={"file"}
                        aria-label="Custom controls"
                        accept={
                          "image/jpeg, image/pjpeg, image/png, image/gif, image/webp, image/x-icon"
                        }
                        multiple
                        onChange={(event) => handleUpload(event)}
                      />
                      <button
                        className={
                          "uk-button uk-button-primary uk-button-large"
                        }
                        type={"button"}
                        tabIndex={"-1"}
                      >
                        Upload Media
                      </button>
                    </div>
                  </div>
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-child-width-auto"} data-uk-grid={""}>
                      {filteredFiles?.map((file) => (
                        <div key={file?._id}>
                          <div
                            className={
                              "uk-cover-container uk-height-medium cover-image"
                            }
                            style={{ width: "300px" }}
                          >
                            <img
                              src={`https://storage.cloud.google.com/stupendous-cms/${file?._id}?authuser=2`}
                              alt={file._id}
                              data-uk-cover={""}
                            />
                            <a
                              className={
                                "uk-position-top-right uk-light uk-padding-small"
                              }
                              onClick={() => handleDelete(file?._id)}
                            >
                              <span className={"material-symbols-rounded"}>
                                delete
                              </span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Layout>
    </Authentication>
  );
}
