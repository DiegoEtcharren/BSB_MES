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

  const fetchOperators = async () => {
    try {
      const response = await axiosClient.get("/api/employees");
      // setOperators(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.error("Failed to fetch operators:", err);
      // setError("Could not load operators. Please try again later.");
    } finally {
      console.log("Loading done...");
    }
  };

  return (
    <MesContext.Provider
      value={{
        title,
        actionButton,
        setHeaderConfig,
        modalConfig,
        openModal,
        closeModal,
        fetchOperators
      }}
    >
      {children}
    </MesContext.Provider>
  );
};

export { MesProvider };
export default MesContext;