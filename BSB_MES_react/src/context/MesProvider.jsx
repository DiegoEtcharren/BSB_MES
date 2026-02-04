import { createContext, useState, useEffect} from "react"

const MesContext = createContext();

const MesProvider = ({children}) => {
    const [activeTab, setActiveTab] = useState('dashboard');


    const handleActiveTab = (option) => {
            setActiveTab(option);
            console.log(activeTab);
        }

        return (
        <MesContext.Provider
            value = {{
                activeTab,
                handleActiveTab
            }}
        >
            {children}
        </MesContext.Provider>
    )
}

export { MesProvider };
export default MesContext;
