export const createSlug = (string) => {
  string = string.replace(" ", "-");
  string = string.replace(/[^\w\s-]/g, "");
  string = string.toLowerCase();

  return string;
};

export const createPropertyName = (string) => {
  string = string.replace(" ", "");
  string = string.replace(/[^a-zA-Z]/g, "");
  string = string.charAt(0).toLowerCase() + string.slice(1);

  return string;
};
