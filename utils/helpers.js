export const createSlug = (string) => {
  string = string.replace(" ", "-");
  string = string.replace(/[^\w\s-]/g, "");
  string = string.toLowerCase();

  return string;
};
