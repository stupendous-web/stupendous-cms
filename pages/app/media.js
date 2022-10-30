import axios from "axios";
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
    <form>
      <div className={"uk-margin"}>
        <input type={"file"} onChange={(event) => handleUpload(event)} />
      </div>
    </form>
  );
}
