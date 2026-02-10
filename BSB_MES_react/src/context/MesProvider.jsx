import { createContext, useState, useEffect} from "react"

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
  });

  const openModal = (component) => {
    setModalConfig({
      isOpen: true,
      show: component,
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      show: null,
    });
  };

  return (
    <MesContext.Provider
      value={{
        title,
        actionButton,
        setHeaderConfig,
        modal,
        handleClickModal,
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