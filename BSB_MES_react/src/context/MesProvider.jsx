import { createContext, useState, useEffect} from "react"
import axiosClient from '../config/axios.js';

const MesContext = createContext();

const MesProvider = ({ children }) => {
  const [title, setTitle] = useState("Dashboard");
  const [actionButton, setActionButton] = useState(null);
  const setHeaderConfig = (pageTitle, buttonConfig = null) => {
    setTitle(pageTitle);
    setActionButton(buttonConfig);
  };

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    show: null,
    title: null,
    description: null
  });

  const openModal = (component, title, description) => {
    setModalConfig({
      isOpen: true,
      show: component,
      title: title,
      description: description
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      show: null,
      title: null,
      description: null
    });
  };

  return (
    <MesContext.Provider
      value={{
        title,
        actionButton,
        setHeaderConfig,
        modalConfig,
        openModal,
        closeModal
      }}
    >
      {children}
    </MesContext.Provider>
  );
};

export { MesProvider };
export default MesContext;