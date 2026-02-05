import { createContext, useState, useEffect} from "react"

const MesContext = createContext();

const MesProvider = ({children}) => {
    const [title, setTitle] = useState("Dashboard");

        return (
        <MesContext.Provider
            value = {{
                title,
                setTitle
            }}
        >
            {children}
        </MesContext.Provider>
    )
}

export { MesProvider };
export default MesContext;