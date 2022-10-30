import axios from "axios";
import Authentication from "../../components/Authentication";
import Layout from "../../components/Layout";
export default function Media() {
  const handleUpload = (event) => {
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
        console.log(response.data);
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
            </div>
          </div>
        </div>
      </Layout>
    </Authentication>
  );
}
