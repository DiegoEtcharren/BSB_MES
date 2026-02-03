import { useContext } from 'react'
import MesContext from '../context/MesProvider'

const useMES = () => {
    return (
        useContext(MesContext)
    )
}

export default useMES;