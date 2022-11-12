import axios from "axios";

export const post = async (resource, data, config = {}) =>
  await axios
    .post(`/api/${resource}`, data, config)
    .then((response) => response)
    .catch((error) => console.error(error));

export const get = async (resource, params) =>
  await axios
    .get(`/api/${resource}`, { params: params })
    .then((response) => response)
    .catch((error) => console.error(error));

export const patch = async (resource, data) =>
  await axios
    .patch(`/api/${resource}`, data)
    .then((response) => response)
    .catch((error) => console.error(error));

export const del = async (resource, _id) =>
  await axios
    .delete(`/api/${resource}`, { data: { _id: _id } })
    .then((response) => response)
    .catch((error) => console.error(error));

export const upload = async (data) =>
  await axios
    .post("/api/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response)
    .catch((error) => console.error(error));

// Stripe

export const getSubscription = async (params) => {
  return await axios
    .get("/api/stripeSubscription", { params: params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getBillingLink = async (data) => {
  return await axios
    .post("/api/stripeBillingLink", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};
