import { createContext, useState, useEffect} from "react"

const MesContext = createContext();

const MesProvider = ({children}) => {
    const [title, setTitle] = useState("Dashboard");
    const [actionButton, setActionButton] = useState(null);
    const [modal, setModal] = useState(false);
    const setHeaderConfig = (pageTitle, buttonConfig = null) => {
        setTitle(pageTitle);
        setActionButton(buttonConfig);
    };

    const handleClickModal = () => {
        setModal(!modal)
    }

        return (
        <MesContext.Provider
            value = {{
                title,
                actionButton,
                setHeaderConfig,
                modal,
                handleClickModal
            }}
        >
            {children}
        </MesContext.Provider>
    )
}

export { MesProvider };
export default MesContext;