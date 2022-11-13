import React, { useContext, useEffect, useState } from "react";
import { get } from "../utils/api";

export const Context = React.createContext();

export const useGlobal = () => useContext(Context);

export const Provider = ({ children }) => {
  const [projects, setProjects] = useState();
  const [editingProject, setEditingProject] = useState();
  const [models, setModels] = useState();
  const [filteredModels, setFilteredModels] = useState();
  const [editingModel, setEditingModel] = useState({
    _id: undefined,
    name: "",
    slug: "",
    projectId: undefined,
    accountId: undefined,
  });
  const [properties, setProperties] = useState();
  const [filteredProperties, setFilteredProperties] = useState();
  const [objects, setObjects] = useState();
  const [filteredObjects, setFilteredObjects] = useState();
  const [editingObject, setEditingObject] = useState();
  const [users, setUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  const [files, setFiles] = useState();
  const [filteredFiles, setFilteredFiles] = useState();
  const [isSaving, setIsSaving] = useState(false);

  const propertyTypes = [
    { option: "Plain Text", value: "string" },
    { option: "HTML", value: "html" },
  ];

  useEffect(() => {
    get("projects").then((response) => {
      setProjects(response?.data);
      setEditingProject(response?.data[0]);
    });
    get("models").then((response) => setModels(response?.data));
    get("properties").then((response) => setProperties(response?.data));
    get("objects").then((response) => setObjects(response?.data));
    get("users").then((response) => setUsers(response?.data));
    get("files").then((response) => setFiles(response?.data));
  }, []);

  useEffect(() => {
    setFilteredModels(
      models?.filter((model) => model?.projectId === editingProject?._id)
    );
    setFilteredProperties(
      properties?.filter(
        (property) => property?.projectId === editingProject?._id
      )
    );
    setFilteredObjects(
      objects?.filter((object) => object?.projectId === editingProject?._id)
    );
    setFilteredUsers(
      users?.filter((user) => user?.projectId === editingProject?._id)
    );
    setFilteredFiles(
      files?.filter((file) => file?.projectId === editingProject?._id)
    );
  }, [editingProject, models, properties, objects, users, files]);

  return (
    <Context.Provider
      value={{
        projects,
        setProjects,
        editingProject,
        setEditingProject,
        models,
        setModels,
        filteredModels,
        setFilteredModels,
        editingModel,
        setEditingModel,
        properties,
        setProperties,
        filteredProperties,
        users,
        setUsers,
        filteredUsers,
        files,
        setFiles,
        filteredFiles,
        setFilteredFiles,
        objects,
        setObjects,
        filteredObjects,
        setFilteredObjects,
        editingObject,
        setEditingObject,
        propertyTypes,
        isSaving,
        setIsSaving,
      }}
    >
      {children}
    </Context.Provider>
  );
};
