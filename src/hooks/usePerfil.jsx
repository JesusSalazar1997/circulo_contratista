import { useContext } from "react";
import PerfilContext from "../context/PerfilProvider";

const usePerfil = () => {
    return useContext(PerfilContext)
}

export default usePerfil