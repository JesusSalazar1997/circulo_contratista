import { useState } from "react";
import image from "../../public/img/logo.png";
import log from "../../public/img/12.svg";
import sec from "../../public/img/13.svg";
import { Link, useNavigate } from 'react-router-dom';
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../../config/clienteAxios";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth, auth } = useAuth();


  const handleSubmit = async e => {
    e.preventDefault();

    if ([username, password].includes('')) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      setTimeout(() => {
        setAlerta({})
      }, 2000);
      return
    }
    // Si pasa la validación 
    try {
      const { data } = await clienteAxios.post(`/Usuario/validarCredenciales`, { username, password })
      setAuth(data.tipoUsuario);
      localStorage.setItem("username", data.username);
      localStorage.setItem("tipoUsuario", data.tipoUsuario);
    } catch (error) {
      setAlerta({ msg: 'El usuario no existe o la contraseña es incorrecta', error: true });
      setTimeout(() => {
        setAlerta({})
      }, 2000);

    }

  }



  const { msg } = alerta;


  return (
    <>
      <div className=" max-h-max flex xl:ml-64 flex-col md:flex-row items-center">
        <div className=" max-w-xs max-h-xs sm:max-w-sm sm:max-h-sm md:border-r-4 md:border-r-white-500">
          <img className="w-auto h-auto md:w-full md:h-full" src={image} alt="Imagen Logo" />
        </div>
        <div className="w-72 max-h-sm sm:ml-10">
          <h1 className="text-white text-center text-2xl ">Iniciar Sesión</h1>
          <form className="mt-4 mb-2 flex justify-center flex-col" action="" onSubmit={handleSubmit} >
            <div className="flex">
              <div className="flex items-end">
                <img className="w-10 sm:w-20" src={log} alt="Image Login" />
              </div>
              <div className="my-1 inline">
                <label htmlFor="username" className="block font-semibold text-white">Correo</label>
                <input id="username" type="email" placeholder="Correo Electrónico" className="mt-1 p-2 border  w-full" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="flex">
              <div className="flex items-end">
                <img className="w-10 sm:w-20" src={sec} alt="Image Block" />
              </div>
              <div className="my-2 inline">
                <label htmlFor="password" className="block font-semibold text-white">Contraseña</label>
                <input id="password" type="password" placeholder="Ingrese su Contraseña" className="mt-1 p-2 border  w-full" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
            </div>
            {msg && <Alerta alerta={alerta} />}
            <div className="md:flex-none margin-left mt-2">
              <input type="submit" value="Iniciar Sesión" className="rounded-xl text-sm font-bold px-4 py-2 bg-sky-500 text-white hover:cursor-pointer hover:bg-sky-600 transition-colors" />
            </div>
          </form>
          <nav className="margin-left-li lg:flex lg:justify-between">
            <Link className="block mt-none text-white text-sm text-center transition-colors hover:text-gray-300" to="registrar">Crear Cuenta</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Login;
