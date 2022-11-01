import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobal } from "../../lib/context";
import axios from "axios";
import dayjs from "dayjs";
import UIkit from "uikit";
let calendar = require("dayjs/plugin/calendar");

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

dayjs.extend(calendar);

export default function Objects() {
  const {
    projects,
    editingProject,
    filteredModels,
    filteredObjects,
    setEditingObject,
  } = useGlobal();

  const router = useRouter();

  const createObject = (modelId) => {
    axios
      .post("/api/objects", {
        projectId: editingProject._id,
        modelId: modelId,
      })
      .then((response) => {
        UIkit.modal("#create-object-modal").hide();
        setEditingObject(response?.data);
        router.push("/app/editor");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    UIkit.container = ".uk-scope";
  }, []);

  return (
    <div className={"uk-scope"}>
      <Authentication>
        <Layout>
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                {!projects?.length && (
                  <div className={"uk-width-1-1"}>
                    <div
                      className={"uk-alert-warning uk-flex uk-flex-middle"}
                      data-uk-alert={""}
                    >
                      <span className={"uk-text-large uk-margin-right"}>
                        👇
                      </span>
                      <div>
                        Looks like you don&apos;t have any projects. Add one to
                        get started!
                      </div>
                    </div>
                  </div>
                )}
                <div className={"uk-width-1-1"}>
                  <div>
                    <a
                      href={"#create-object-modal"}
                      className={"uk-button uk-button-primary uk-button-large"}
                      data-uk-toggle={""}
                    >
                      Create New Content
                    </a>
                  </div>
                </div>
                {!!filteredObjects?.length && (
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
                          {filteredObjects?.map((project) => {
                            return (
                              <tr key={project._id}>
                                <td>{project?.type}&nbsp;</td>
                                <td>
                                  {dayjs().calendar(dayjs(project?.createdAt))}
                                </td>
                                <td className={"uk-text-right"}>
                                  <a
                                    className={"uk-margin-right"}
                                    onClick={() => {
                                      setEditingObject();
                                      router.push("/app/editor");
                                    }}
                                  >
                                    <span
                                      className={"material-symbols-rounded"}
                                    >
                                      edit
                                    </span>
                                  </a>
                                  <span
                                    className={
                                      "uk-text-primary uk-margin-right"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      UIkit.modal
                                        .confirm(
                                          "Are you sure you wish to permanently delete this project?"
                                        )
                                        .then(() => handleDelete(project._id));
                                    }}
                                  >
                                    <span
                                      className={"material-symbols-rounded"}
                                    >
                                      delete
                                    </span>
                                  </span>
                                  <Link href={""}>
                                    <a>
                                      <span
                                        className={"material-symbols-rounded"}
                                      >
                                        link
                                      </span>
                                    </a>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div id={"create-object-modal"} data-uk-modal={""}>
            <div className={"uk-modal-dialog uk-modal-body"}>
              <h3>Content Type</h3>
              <form>
                <div className={"uk-margin"}>
                  <select
                    defaultValue={""}
                    className={"uk-select"}
                    onChange={(event) => createObject(event.target.value)}
                    required
                  >
                    <option value={""}>Select</option>
                    {filteredModels?.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
        </Layout>
      </Authentication>
    </div>
  );
}
