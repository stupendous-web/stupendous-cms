import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = React.createContext();

export const useGlobal = () => useContext(Context);

export const Provider = ({ children }) => {
  const [projects, setProjects] = useState();
  const [editingProject, setEditingProject] = useState();
  const [models, setModels] = useState();
  const [editingModel, setEditingModel] = useState({
    _id: undefined,
    name: "",
    slug: "",
    projectId: undefined,
    accountId: undefined,
  });
  const [filteredModels, setFilteredModels] = useState();
  const [properties, setProperties] = useState();
  const [files, setFiles] = useState();

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        setProjects(response.data);
        setEditingProject(response.data[0]);
      })
      .catch((error) => console.log(error));
    axios
      .get("/api/models")
      .then((response) => setModels(response.data))
      .catch((error) => console.log(error));
    axios
      .get("/api/properties")
      .then((response) => setProperties(response.data))
      .catch((error) => console.log(error));
    axios
      .get("/api/files")
      .then((response) => setFiles(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFilteredModels(
      models?.filter((model) => model.projectId === editingProject?._id)
    );
  }, [editingProject, models]);

  return (
    <Context.Provider
      value={{
        projects,
        setProjects,
        editingProject,
        setEditingProject,
        filteredModels,
        setFilteredModels,
        editingModel,
        setEditingModel,
        properties,
        setProperties,
        files,
        setFiles,
      }}
    >
      {children}
    </Context.Provider>
  );
};
