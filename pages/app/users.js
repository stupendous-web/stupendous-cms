import { useState } from "react";
import Image from "next/image";
import { useGlobal } from "../../lib/context";
import { useSession } from "next-auth/react";
import { post, del } from "../../utils/api";
import UIkit from "uikit";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

import userFlow from "../../images/undraw/undraw_user_flow_re_bvfx.svg";

export default function Users() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const { filteredUsers, users, setUsers, editingProject } = useGlobal();

  const { data: session } = useSession();

  const handleSubmit = (event) => {
    event.preventDefault();
    post("users", {
      name: name,
      email: email,
      projectId: editingProject?._id,
    }).then((response) => {
      setUsers([response?.data, ...users]);
      setName(undefined);
      setEmail(undefined);
      UIkit.modal("#create-user-modal").hide();
    });
  };

  const handleDelete = (_id) => {
    UIkit.modal
      .confirm("Are you sure you wish to permanently delete this user?")
      .then(() =>
        del("users", _id).then(() =>
          setUsers(users?.filter((user) => user?._id !== _id))
        )
      );
  };

  return (
    <Authentication>
      <Layout>
        {!filteredUsers?.length ? (
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
                  <Image src={userFlow} />
                </div>
                <p>Users are people that can add content to your API.</p>
                <a
                  href={"#create-user-modal"}
                  className={"uk-button uk-button-primary"}
                  data-uk-toggle={""}
                >
                  Invite a User
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className={"uk-section uk-section-small"}>
            <div className={"uk-container uk-container-expand"}>
              <div className={"uk-grid-match"} data-uk-grid={""}>
                <div className={"uk-width-1-1"}>
                  <div>
                    <a
                      className={"uk-button uk-button-primary uk-button-large"}
                      href={"#create-user-modal"}
                      data-uk-toggle={""}
                    >
                      Invite a User
                    </a>
                  </div>
                </div>
                <div className={"uk-width-1-1"}>
                  <div className={"uk-card uk-card-default uk-card-body"}>
                    <h3>Users</h3>
                    <table
                      className={"uk-table uk-table-divider uk-table-hover"}
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers?.map((user) => {
                          if (user?._id === session?.user?._id) return;
                          return (
                            <tr key={user?._id}>
                              <td>{user?.name}</td>
                              <td>{user?.email}</td>
                              <td className={"uk-text-right"}>
                                <span
                                  className={"uk-text-primary"}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDelete(user._id)}
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
        )}
        <div id={"create-user-modal"} data-uk-modal={""}>
          <div className={"uk-modal-dialog uk-modal-body"}>
            <h3>Invite User</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Name</label>
                <input
                  type={"text"}
                  value={name}
                  className={"uk-input"}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className={"uk-margin"}>
                <label className={"uk-form-label"}>Email</label>
                <input
                  type={"email"}
                  value={email}
                  className={"uk-input"}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <input
                type={"submit"}
                value={"Send"}
                className={"uk-button uk-button-primary"}
              />
            </form>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
