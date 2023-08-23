import { useState, useEffect } from "react";
import image from "../../public/img/logo.png";
import arrow from "../../public/img/arrow-14.svg"
import Menu from "../components/Menu";
import usePerfil from "../hooks/usePerfil";

const Header = () => {

    const [usuario, setUsuario] = useState('');
    const { nav, setNav } = usePerfil(false);
    const tipoUsuario = parseInt(localStorage.getItem('tipoUsuario'));

    const valor = () => {
        if (nav) {
            setNav(false)
        } else {
            setNav(true)
        }
    }
    useEffect(() => {
        if (tipoUsuario === 0) {
            setUsuario('Contratista')
        } else if (tipoUsuario === 1) {
            setUsuario('Subcontratista')
        } else {
            setUsuario('Administrador')
        }
    }, [])



    return (
        <header className="flex static">
            <div className="flex basis-3/4 justify-between pl-4 pr-28 py-2 bg-sky-950">
                <div className=" w-20 h-16">
                    <img className="w-auto h-auto md:w-full md:h-full" src={image} alt="Imagen Logo" />
                </div>
                <div className="flex justify-center items-center">
                    <h2 className="text-white font-base text-center text-3xl">Circulo de Contratistas</h2>
                </div>

            </div>
            <div className="flex basis-2/6 gap-4 py-2 justify-center items-center bg-sky-500 cursor-pointer">
                <p className="text-white font-bold text-center text-lg">{usuario}</p>
                <button onClick={() => valor()} >
                    <img className="w-7 h-7 hover:fill " src={arrow} alt="Imagen Arrow" />
                </button>
                <Menu />
            </div>
        </header>
    )
}

export default Header