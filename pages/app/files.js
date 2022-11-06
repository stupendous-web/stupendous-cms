import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useGlobal } from "../../lib/context";
import UIkit from "uikit";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

import imageFolder from "../../images/undraw/undraw_image__folder_re_hgp7.svg";

export default function Files() {
  const [isUploading, setIsUploading] = useState(false);

  const { filteredFiles, setFilteredFiles, files, setFiles, editingProject } =
    useGlobal();

  const handleChange = async (event) => {
    setIsUploading(true);
    for (let counter = 0; counter < event.target.files.length; counter++) {
      let formData = new FormData();
      formData.append("file", event.target.files[counter]);
      formData.append("projectId", editingProject?._id);
      formData.append("counter", counter);
      await axios
        .post("/api/files/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setIsUploading(counter + 1 < event.target.files.length);
          setFiles([response.data, ...files]);
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
    }
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
                    onChange={(event) => handleChange(event)}
                  />
                  <button
                    className={"uk-button uk-button-primary"}
                    type={"button"}
                    tabIndex={"-1"}
                    disabled={isUploading}
                  >
                    Upload Media
                  </button>
                </div>
                <div className={"uk-margin"}>
                  {isUploading && <div data-uk-spinner={""} />}
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
                        onChange={(event) => handleChange(event)}
                      />
                      <button
                        className={
                          "uk-button uk-button-primary uk-button-large"
                        }
                        type={"button"}
                        tabIndex={"-1"}
                        disabled={isUploading}
                      >
                        Upload Media
                      </button>
                      {isUploading && (
                        <div
                          data-uk-spinner={""}
                          className={"uk-margin-left"}
                        />
                      )}
                    </div>
                  </div>
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-child-width-auto"} data-uk-grid={""}>
                      {filteredFiles?.map((file) => (
                        <div key={file?._id}>
                          <div
                            className={"uk-cover-container"}
                            style={{ height: "12rem", width: "12rem" }}
                          >
                            <img
                              src={`https://storage.cloud.google.com/stupendous-cms/${file?._id}?authuser=1`}
                              alt={file._id}
                              data-uk-cover={""}
                            />
                            <div
                              className={
                                "uk-position-top-right uk-padding-small"
                              }
                            >
                              <a
                                href={`#lightbox-${file._id}`}
                                style={{ color: "#ffffff" }}
                                data-uk-toggle={""}
                              >
                                <i className={"ri-zoom-in-fill"} />
                              </a>
                              <div
                                id={`lightbox-${file._id}`}
                                className={"uk-padding-remove"}
                                data-uk-modal={""}
                              >
                                <div class={"uk-flex uk-flex-center"}>
                                  <button
                                    type={"button"}
                                    className={
                                      "uk-modal-close-full uk-close-large"
                                    }
                                    style={{ color: "#ffffff" }}
                                    data-uk-close={""}
                                  />
                                  <img
                                    src={`https://storage.cloud.google.com/stupendous-cms/${file?._id}?authuser=1`}
                                    alt={file._id}
                                    className={"uk-padding"}
                                    style={{ maxHeight: "100vh" }}
                                  />
                                </div>
                              </div>
                              &nbsp;
                              <a
                                style={{ color: "#ffffff" }}
                                onClick={() => handleDelete(file?._id)}
                              >
                                <i className={"ri-delete-bin-fill"} />
                              </a>
                            </div>
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
