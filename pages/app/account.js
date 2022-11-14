import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";
import UIkit from "uikit";
import axios from "axios";
import { signOut } from "next-auth/react";

const handleDelete = () => {
  UIkit.modal
    .confirm(
      "Are you sure you wish to permanently delete your account and all your content?"
    )
    .then(() =>
      axios
        .delete("/api/accounts")
        .then(() => {
          signOut();
        })
        .catch((error) => console.log(error))
    );
};
export default function Account() {
  return (
    <Authentication>
      <Layout>
        <div className={"uk-section uk-section-small"}>
          <div className={"uk-container uk-container-expand"}>
            <div className={"uk-grid-match"} data-uk-grid={""}>
              <div className={"uk-width-1-1"}>
                <div className={"uk-card uk-card-default uk-card-body"}>
                  <h3>Account</h3>
                  <div className={"uk-margin"}>
                    <a onClick={() => handleDelete()}>Delete Account</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
