export const formatModel = (model) => {
  model = model.replace(" ", "-");
  model = model.replace(/[^\w\s-]/g, "");
  model = model.toLowerCase();

  return model;
};
