import image from "../../public/img/logo.png";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";



const Registrar = () => {

  // const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repertirPassword, setRepertirPassword] = useState('');
  const [tipusuario, setTipusuario] = useState('');
  const [codigoObra, setCodigoObra] = useState('');
  const [alerta, setAlerta] = useState({});
  const [selectHidden, setselectHidden] = useState(false);
  let tipousuario = parseInt(tipusuario);

  function changeInput() {
    if (tipousuario === 1) {
      setselectHidden(true)
    } else {
      setselectHidden(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();

    // console.log(tipousuario)
    if ([username, password, repertirPassword, tipousuario].includes('')) {

      setAlerta({ msg: 'Todos los campos son obligatorios', error: true });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return
    }
    if (password !== repertirPassword) {
      setAlerta({ msg: 'Las contraseñas no coinciden', error: true });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return
    }
    if (password.length < 6) {
      setAlerta({
        msg: 'Las contraseña debe tener más de seis caracteres', error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return
    }

    if (tipousuario === 1 && codigoObra === '') {
      setAlerta({
        msg: 'El codigo de obra es obligatorio', error: true
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return
    } else {
      try {
        let estatus = 1;
        const { data } = await clienteAxios(`/Contratista/numeroRegistroObra/${codigoObra}`)

        if (!data.id) {
          setAlerta({ msg: 'El código de obra no existe', error: true });
          setTimeout(() => {
            setAlerta({});
          }, 3000);
        } else {
          const response = await clienteAxios.post(`/Usuario`, {
            estatus, tipousuario, password, username
          })

          setAlerta({ msg: 'Usuario creado correctamente', error: false });
          setTimeout(() => {
            setAlerta({});
          }, 3000);
          setUsername('');
          setPassword('');
          setRepertirPassword('');
          setTipusuario('');
          setCodigoObra('');
          return;
        }

      } catch (error) {
        console.log(error)
      }
    }
    if (tipousuario === 0) {
      //Crear el Usuario en la Api
      try {
        let estatus = 0;
        const respues = await clienteAxios.post(`/Usuario`, {
          estatus, tipousuario, password, username
        })

        setAlerta({ msg: 'Usuario creado correctamente', error: false });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
        setUsername('');
        setPassword('');
        setRepertirPassword('');
        setTipusuario('');
        setCodigoObra('');

      } catch (error) {
        setAlerta({ msg: 'El usuario ya existe', error: true });
      }
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div className="max-h-min flex xl:ml-64 flex-col md:flex-row items-center">
        <div className="max-w-xs max-h-xs sm:max-w-sm sm:max-h-sm md:border-r-4 md:border-r-white-500">
          <img className="w-auto h-auto md:w-full md:h-full" src={image} alt="Imagen Logo" />
        </div>
        <div className=" w-60 max-h-sm md:ml-10">
          <h1 className="text-white text-center text-2xl">Crear Cuenta</h1>
          <form className="mt-4 mb-2 flex justify-center flex-col" onSubmit={handleSubmit} action="" >
            {/* <div className="my-1 inline">
              <label htmlFor="name" className="block font-semibold text-white">Nombre</label>
              <input id="name" type="text" placeholder="Nombre Completo" className="mt-1 px-2 py-1 border  w-full" value={nombre} onChange={e => setNombre(e.target.value)} />
            </div> */}
            <div className="mb-1 inline">
              <label htmlFor="username" className="block font-semibold text-white">Correo</label>
              <input id="username" type="email" placeholder="Correo Electrónico" className="mt-1 px-2 py-1 border  w-full" value={username} onChange={e => setUsername(e.target.value)} />

            </div>
            <div className="mb-2 inline">
              <label htmlFor="password" className="block font-semibold text-white">Contraseña</label>
              <input id="password" type="password" placeholder="Ingrese su Contraseña" className="mt-1 px-2 py-1 border  w-full" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-2 inline">
              <label htmlFor="password2" className="block font-semibold text-white">Repetir Contraseña</label>
              <input id="password2" type="password" placeholder="Repita la Contraseña" className="mt-1 px-2 py-1 border w-full" value={repertirPassword} onChange={e => setRepertirPassword(e.target.value)} />
            </div>
            <div className="mb-2">
              <label className="mb-1 block font-semibold text-white">Elija un Perfil de Usuario</label>
              <select onClick={changeInput} name="tipousuario" value={tipusuario} className="px-1 px-2 py-1 w-full" onChange={e => setTipusuario(e.target.value)}>
                <option className="text-gray-300" label="">--Seleccione--</option>
                <option value="0">Contratista(Pátron)</option>
                <option value="1">Subcontratista</option>
              </select>
            </div>
            <div className={`${selectHidden ? 'display' : 'hidden'} mb-2 inline`}>
              <label htmlFor="codigo_obra" className="block font-semibold text-white">Ingrese el Código de Obra</label>
              <input id="codigo_obra" type="text" placeholder="Código de la Obra" className="mt-1 px-2 py-1 border w-full" value={codigoObra} onChange={e => setCodigoObra(e.target.value)} />
            </div>
            {msg && <Alerta alerta={alerta} />}
            <div className="flex justify-center mt-2">
              <input type="submit" value="Crear Cuenta" className="rounded-xl text-sm font-bold px-4 py-2 bg-sky-500 text-white hover:cursor-pointer hover:bg-sky-600 transition-colors" />
            </div>
          </form>
          <nav className="flex justify-center">
            <Link className="block mt-none text-white text-sm text-center transition-colors hover:text-gray-300" to="/">¿Ya tienes cuenta? Inicia Sesión</Link>
          </nav>

        </div>
      </div>
    </>
  );
};

export default Registrar;
