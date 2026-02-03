import { createContext, useState, useEffect} from "react"

const MesContext = createContext();

const MesProvider = ({children}) => {
    const [currentSidebarOption, setCurrentSidebarOption] = useState('dashboard');

    const handleClickSidebarOption = (id) => {
            setCurrentSidebarOption(id);
        }

        return (
        <MesContext.Provider
            value = {{
                currentSidebarOption,
                setCurrentSidebarOption,
                handleClickSidebarOption
            }}
        >
            {children}
        </MesContext.Provider>
    )
}

export { MesProvider };
export default MesContext;
