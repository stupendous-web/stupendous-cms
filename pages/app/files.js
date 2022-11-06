import axios from "axios";
import { useGlobal } from "../../lib/context";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";
import UIkit from "uikit";
import Image from "next/image";
import imageFolder from "../../images/undraw/undraw_image__folder_re_hgp7.svg";
import { useState } from "react";

export default function Files() {
  const [previews, setPreviews] = useState([]);

  const { filteredFiles, setFilteredFiles, files, setFiles, editingProject } =
    useGlobal();

  const handleChange = async (event) => {
    let blobs = [];
    for (let counter = 0; counter < event.target.files.length; counter++) {
      blobs.push(URL.createObjectURL(event.target.files[counter]));
    }
    setPreviews(blobs);
    for (let counter = 0; counter < event.target.files.length; counter++) {
      console.log(event.target.files[counter]);
      let formData = new FormData();
      formData.append("file", event.target.files[counter]);
      formData.append("projectId", editingProject?._id);
      await axios
        .post("/api/files/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setPreviews(previews?.shift());
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
        {!!previews?.length && (
          <div>
            <div className={"uk-section uk-section-small"}>
              <div className={"uk-container uk-container-expand"}>
                <div data-uk-grid={""}>
                  {previews.map((preview, key) => (
                    <div key={key}>
                      <div
                        className={"uk-cover-container"}
                        style={{ height: "10rem", width: "10rem" }}
                      >
                        <img src={preview} data-uk-cover={""} />
                        <div
                          className={"uk-overlay-default uk-position-cover"}
                        />
                        <div
                          className={"uk-overlay uk-position-center uk-dark"}
                        >
                          <div data-uk-spinner={""} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {!filteredFiles?.length && !previews?.length ? (
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
                        onChange={(event) => handleChange(event)}
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
                            className={"uk-cover-container"}
                            style={{ height: "12rem", width: "12rem" }}
                          >
                            <img
                              src={`https://storage.cloud.google.com/stupendous-cms/${file?._id}?authuser=1`}
                              alt={file._id}
                              data-uk-cover={""}
                            />
                            <a
                              className={
                                "uk-position-top-right uk-light uk-padding-small"
                              }
                              onClick={() => handleDelete(file?._id)}
                            >
                              <i className={"ri-delete-bin-fill"} />
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
