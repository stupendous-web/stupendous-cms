import Image from "next/image";
import { useGlobal } from "../../lib/context";
import { useSession } from "next-auth/react";

import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";

import userFlow from "../../images/undraw/undraw_user_flow_re_bvfx.svg";

export default function Users() {
  const { filteredUsers } = useGlobal();

  const { data: session } = useSession();

  return (
    <Authentication>
      <Layout>
        {filteredUsers?.length < 2 && (
          <>
            <div
              className={
                "uk-section uk-width-1-1 uk-flex uk-flex-center uk-flex-middle"
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
                <a className={"uk-button uk-button-primary"}>
                  Invite your Users
                </a>
              </div>
            </div>
          </>
        )}
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-1-1"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <h3>Users</h3>
                  <table className={"uk-table uk-table-divider uk-table-hover"}>
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers?.map((user) => {
                        return (
                          <tr key={user._id}>
                            <td className={"uk-flex uk-flex-middle"}>
                              {user.name}
                              <span className={"uk-badge uk-margin-left"}>
                                {user._id === session?.user?._id && "You!"}
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
      </Layout>
    </Authentication>
  );
}
