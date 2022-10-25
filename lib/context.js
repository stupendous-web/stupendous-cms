import React, { useContext, useState } from "react";

export const Context = React.createContext();

export const useGlobal = () => useContext(Context);

export const Provider = ({ children }) => {
  const [projects, setProjects] = useState();

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
