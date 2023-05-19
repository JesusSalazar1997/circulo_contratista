import document from "../../public/img/document.svg";
import logout from "../../public/img/logout.svg";
import home from "../../public/img/home.svg";
import settings from "../../public/img/settings.svg";
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import usePerfil from "../hooks/usePerfil";
import { useEffect, useState } from "react";



const Menu = () => {

    const [usuario, setUsuario] = useState()
    const { cerrarSesion } = useAuth()
    const navigate = useNavigate();
    const handleCerrarSesion = () => {
        cerrarSesion()
        localStorage.removeItem('username');
        navigate('')
    }

    const { nav, setNav } = usePerfil(false);

    useEffect(() => {
        setUsuario(localStorage.getItem('tipoUsuario'))
    }, [])


    const cambiar = () => {
        const mostrar = parseInt(usuario)
        if (mostrar === 0) {
            const links = {
                link: '/contratista',
                link1: '/contratista/informacion',
                ocultar: false,
                link2: '/contratista/configuracion'
            }
            return links;
        } else if (mostrar === 1) {
            const links = {
                link: '/subcontratista',
                link1: '/subcontratista/informacion',
                ocultar: true,
                link2: '/subcontratista/configuracion'
            }
            return links;
        } else {
            const links = {
                link: '/administrador',
                link1: '/administrador/informacion',
                ocultar: true,
                link2: '/administrador/configuracion'
            }
            return links;
        }
    }
    let existe = cambiar()


    const valor = () => {
        if (nav) {
            setNav(false)
        } else {
            setNav(true)
        }
    }


    return (

        <div className={`text-white absolute z-10  position-menu width-menu  bg-sky-950  pl-4 pr-28 py-3 ${nav ? ' transition ease-in-out duration-700 opacity-100  ' : 'opacity-0 hidden '}`} >
            <Link to={existe.link}>
                <div className="flex gap-2 hover:text-sky-500">
                    <div className="w-8 h-8 mt-2 pb-1.5">
                        <img className="w-auto h-auto md:w-full md:h-full" src={home} alt="Imagen Documents" />
                    </div>
                    <p onClick={() => valor()} className="flex items-center">Inicio</p>
                </div>
            </Link >
            <Link to={existe.link1}>
                <div className={`${existe.ocultar ? 'hidden' : 'flex'} gap-2 hover:text-sky-500 `}>
                    <div className="w-7 h-7 mt-2">
                        <img className="w-auto h-auto md:w-full md:h-full" src={document} alt="Imagen Documents" />
                    </div>
                    <p onClick={() => valor()} className="flex items-center">Información y Documentos</p>
                </div>
            </Link >
            <Link to={existe.link2}>
                <div className="flex gap-2 hover:text-sky-500">
                    <div className="w-8 h-8 mt-2">
                        <img className="w-auto h-auto md:w-full md:h-full" src={settings} alt="Imagen Settings" />
                    </div>
                    <p onClick={() => valor()} className="flex items-center">Configuración de la Cuenta</p>
                </div>
            </Link >

            <div className="flex gap-2 hover:text-sky-500">
                <div className="w-8 h-8 mt-2 ">
                    <img className="w-auto h-auto md:w-full md:h-full" src={logout} alt="Imagen Logout" />
                </div>
                <button type="button" onClick={handleCerrarSesion} className="flex items-center" href="">Cerrar Sesión</button>
            </div>
        </div >

    )
}

export default Menu