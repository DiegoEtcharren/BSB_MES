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
    title: null
  });

  const openModal = (component, title) => {
    setModalConfig({
      isOpen: true,
      show: component,
      title: title
    });
  };

  const closeModal = () => {
    setModalConfig({
      isOpen: false,
      show: null,
      title: null
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