import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = React.createContext();

export const useGlobal = () => useContext(Context);

export const Provider = ({ children }) => {
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Context.Provider
      value={{
        projects,
        setProjects,
      }}
    >
      {children}
    </Context.Provider>
  );
};
