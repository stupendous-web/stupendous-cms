import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGlobal } from "../../lib/context";
import dayjs from "dayjs";
import UIkit from "uikit";
import calendar from "dayjs/plugin/calendar";
import axios from "axios";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

import contentCreator from "../../images/undraw/undraw_content_creator_re_pt5b.svg";

dayjs.extend(calendar);

export default function Objects() {
  const {
    editingProject,
    filteredModels,
    filteredObjects,
    objects,
    setObjects,
    setEditingObject,
    properties,
  } = useGlobal();

  const [modelId, setModelId] = useState();

  const router = useRouter();

  useEffect(() => {
    if (modelId) {
      let blueprint = {};
      properties?.map((property) => {
        if (property?.modelId === modelId) {
          blueprint[property?.property] = "";
          return null;
        }
      });
      axios
        .post("/api/objects", {
          data: blueprint,
          projectId: editingProject?._id,
          modelId: modelId,
        })
        .then((response) => {
          console.log(response?.data);
          setObjects([response?.data, ...objects]);
          setEditingObject(response?.data);
          router.push("/app/editor");
          UIkit.modal("#create-object-modal").hide();
        });
    }
  }, [modelId]);

  const handleDelete = (_id) => {
    UIkit.modal
      .confirm("Are you sure you wish to permanently delete this object?")
      .then(() =>
        axios
          .delete("/api/objects", { data: { _id: _id } })
          .then(() =>
            setObjects(objects?.filter((object) => object._id !== _id))
          )
      );
  };

  return (
    <Authentication>
      <Layout>
        {!filteredObjects?.length ? (
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
                  <Image src={contentCreator} />
                </div>
                <p>Publish content to your site or application.</p>
                <a
                  className={"uk-button uk-button-primary"}
                  href={"#create-object-modal"}
                  data-uk-toggle={""}
                >
                  Create New Content
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={"uk-section uk-section-small"}>
              <div className={"uk-container uk-container-expand"}>
                <div className={"uk-grid-match"} data-uk-grid={""}>
                  <div className={"uk-width-1-1"}>
                    <div>
                      <a
                        href={"#create-object-modal"}
                        className={
                          "uk-button uk-button-primary uk-button-large"
                        }
                        data-uk-toggle={""}
                      >
                        Create New Content
                      </a>
                    </div>
                  </div>
                  <div className={"uk-width-1-1"}>
                    <div className={"uk-card uk-card-default uk-card-body"}>
                      <h3>Your Content</h3>
                      <table
                        className={"uk-table uk-table-divider uk-table-hover"}
                      >
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>Date</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {filteredObjects?.map((object) => {
                            const type = filteredModels?.find(
                              (model) => model._id === object.modelId
                            )?.singular;
                            return (
                              <tr key={object._id}>
                                <td>{type}</td>
                                <td>{dayjs(object?.createdAt).calendar()}</td>
                                <td className={"uk-text-right"}>
                                  <a
                                    className={"uk-margin-right"}
                                    onClick={() => {
                                      setEditingObject(object);
                                      router.push("/app/editor");
                                    }}
                                  >
                                    <i
                                      className={
                                        "ri-pencil-fill uk-margin-right"
                                      }
                                    />
                                  </a>
                                  <span
                                    className={
                                      "uk-text-primary uk-margin-right"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleDelete(object._id)}
                                  >
                                    <i className={"ri-delete-bin-fill"} />
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div id={"create-object-modal"} data-uk-modal={""}>
          <div className={"uk-modal-dialog uk-modal-body"}>
            <h3>Content Type</h3>
            <form>
              <div className={"uk-margin"}>
                <select
                  value={modelId}
                  className={"uk-select"}
                  onChange={(event) => setModelId(event.target.value)}
                  required
                >
                  <option value={""}>Select</option>
                  {filteredModels?.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.singular}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
