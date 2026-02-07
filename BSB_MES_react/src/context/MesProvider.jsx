import { createContext, useState, useEffect} from "react"

const MesContext = createContext();

const MesProvider = ({children}) => {
    const [title, setTitle] = useState("Dashboard");
    const [actionButton, setActionButton] = useState(null);
    const setHeaderConfig = (pageTitle, buttonConfig = null) => {
        setTitle(pageTitle);
        setActionButton(buttonConfig);
    };

        return (
        <MesContext.Provider
            value = {{
                title,
                actionButton,
                setHeaderConfig
            }}
        >
            {children}
        </MesContext.Provider>
    )
}

export { MesProvider };
export default MesContext;