import axios from "axios";

export const patchObject = async (data) => {
  return await axios
    .patch("/api/objects", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};
