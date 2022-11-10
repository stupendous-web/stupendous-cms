import axios from "axios";

export const get = async (resource, params) =>
  await axios
    .get(`/api/${resource}`, { params: params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

export const patchObject = async (data) => {
  return await axios
    .patch("/api/objects", data)
    .then((response) => {
      return response.data; // change me
    })
    .catch((error) => {
      console.error(error);
    });
};

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
