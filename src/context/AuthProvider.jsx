import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState()
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const tipoUsuario = parseInt(localStorage.getItem('tipoUsuario'));

    useEffect(() => {

        const autenticarUsuario = () => {
            if (!username) {
                navigate("/");
                setCargando(false)
                setAuth()
                return;
            } else if (tipoUsuario === 0) {
                navigate("/contratista");
                setTimeout(() => {
                    setCargando(false)
                }, 1000);
                setAuth(username)
            } else if (tipoUsuario === 1) {
                navigate("/subcontratista");
                setTimeout(() => {
                    setCargando(false)
                }, 1000);
                setAuth(username)
            } else {
                navigate("/administrador");
                setTimeout(() => {
                    setCargando(false)
                }, 1000);
                setAuth(username)
            }
        }
        autenticarUsuario()

    }, [auth])


    const cerrarSesion = () => {
        setAuth({})
    }


    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
            }}

        >
            {children}
        </AuthContext.Provider>

    )
}

export {
    AuthProvider
}

export default AuthContext;