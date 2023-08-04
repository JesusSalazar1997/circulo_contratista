import { useState, useLayoutEffect } from "react";
import usePerfil from "../../src/hooks/usePerfil";
import NavSubcontratista from "../components/subcontratista/NavSubcontratista";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";

const Subcontratista = () => {


    const [Nombre, setNombre] = useState('');
    const [Telefono, setTelefono] = useState('');
    const [NombreRazonSocial, setNombreRazonSocial] = useState('');
    const [ObjetoSocial, setObjetoSocial] = useState('');
    const [Puesto, setPuesto] = useState('');
    const [Email, setEmail] = useState('');
    const [Giro, setGiro] = useState('');
    const [RFC, setRFC] = useState('');
    const [Estado, setEstado] = useState('');
    const [Municipio, setMunicipio] = useState('');
    const [Colonia, setColonia] = useState('');
    const [Calle, setCalle] = useState('');
    const [NumeroExterior, setNumeroExterior] = useState('');
    const [NumeroInterior, setNumeroInterior] = useState('');
    const [CodigoPostal, setCodigoPostal] = useState('');
    const [CodigoObra, setCodigoObra] = useState('');
    const [mensaje, setMensaje] = useState(false);

    const { mostrarAlerta, alerta, submitPerfil, perfil } = usePerfil();

    useLayoutEffect(() => {
        if (perfil?.id) {
            if (perfil.nombre === null) {
                perfil.nombre = '';
                setNombre(perfil.nombre)
            } else {
                setNombre(perfil.nombre)
            }
            if (perfil.telefono === null) {
                perfil.telefono = '';
                setTelefono(perfil.telefono)
            } else {
                setTelefono(perfil.telefono)
            }
            if (perfil.nombreRazonSocial === null) {
                perfil.nombreRazonSocial = '';
                setNombreRazonSocial(perfil.nombreRazonSocial)
            } else {
                setNombreRazonSocial(perfil.nombreRazonSocial)
            }
            if (perfil.objetoSocial === null) {
                perfil.objetoSocial = '';
                setObjetoSocial(perfil.objetoSocial)
            } else {
                setObjetoSocial(perfil.objetoSocial)
            }
            if (perfil.email === null) {
                perfil.email = '';
                setEmail(perfil.email)
            } else {
                setEmail(perfil.email)
            }
            if (perfil.giro === null) {
                perfil.giro = '';
                setGiro(perfil.giro)
            } else {
                setGiro(perfil.giro)
            }
            if (perfil.rfc === null) {
                perfil.rfc = '';
                setRFC(perfil.rfc)
            } else {
                setRFC(perfil.rfc)
            }
            if (perfil.puesto === null) {
                perfil.puesto = '';
                setPuesto(perfil.puesto)
            } else {
                setPuesto(perfil.puesto)
            }
            if (perfil.direccionFiscal.estado === null) {
                perfil.direccionFiscal.estado = '';
                setEstado(perfil.direccionFiscal.estado)
            } else {
                setEstado(perfil.direccionFiscal.estado)
            }
            if (perfil.direccionFiscal.delegacionMunicipio === null) {
                perfil.direccionFiscal.delegacionMunicipio = '';
                setMunicipio(perfil.direccionFiscal.delegacionMunicipio)
            } else {
                setMunicipio(perfil.direccionFiscal.delegacionMunicipio)
            }
            if (perfil.direccionFiscal.colonia === null) {
                perfil.direccionFiscal.colonia = '';
                setColonia(perfil.direccionFiscal.colonia)
            } else {

                setColonia(perfil.direccionFiscal.colonia)
            }
            if (perfil.direccionFiscal.numeroExterior === null) {
                perfil.direccionFiscal.numeroExterior = '';
                setNumeroExterior(perfil.direccionFiscal.numeroExterior)
            } else {
                setNumeroExterior(perfil.direccionFiscal.numeroExterior)
            }
            if (perfil.direccionFiscal.codigoPostal === null) {
                perfil.direccionFiscal.codigoPostal = '';
                setCodigoPostal(perfil.direccionFiscal.codigoPostal)
            } else {
                setCodigoPostal(perfil.direccionFiscal.codigoPostal)
            }
            if (perfil.direccionFiscal.calle === null) {
                perfil.direccionFiscal.calle = '';
                setCalle(perfil.direccionFiscal.calle)
            } else {
                setCalle(perfil.direccionFiscal.calle)
            }
        } else {
            setMensaje(true)
        }
    }, [])

    let valor = false;
    if (JSON.stringify(perfil) != '{}') {
        valor = true;
    }



    const handlesubmit = async e => {
        e.preventDefault();
        if ([Nombre, Telefono, NombreRazonSocial, CodigoObra, ObjetoSocial, Puesto, Email, Giro, RFC, Estado, Municipio, Colonia, Calle, CodigoPostal].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        } else {
            try {
                const { data } = await clienteAxios(`/Contratista/numeroRegistroObra/${CodigoObra}`)
                const idob = data.obras;
                let ObraId;
                idob.map(element => {
                    if (CodigoObra == element.numeroRegistroObra) {
                        return ObraId = element.id;
                    }
                });
                const UsuarioUsername = localStorage.getItem('username');
                let DireccionFiscal = {
                    "Calle": Calle,
                    "NumeroExterior": NumeroExterior,
                    "NumeroInterior": NumeroInterior,
                    "Colonia": Colonia,
                    "Municipio": Municipio,
                    "Estado": Estado,
                    "CodigoPostal": CodigoPostal
                }
                // const objeto = { ObraId, UsuarioUsername, Nombre, Telefono, NombreRazonSocial, ObjetoSocial, RFC, Giro, Puesto, Email, Estado, Municipio, Colonia, Calle, CodigoPostal, DireccionFiscal }

                // console.log(objeto)
                // return;
                await submitPerfil({ ObraId, UsuarioUsername, Nombre, Telefono, NombreRazonSocial, ObjetoSocial, RFC, Giro, Puesto, Email, Estado, Municipio, Colonia, Calle, CodigoPostal, DireccionFiscal })

            } catch (error) {
                mostrarAlerta({ msg: 'El código de obra no existe', error: true });
                setTimeout(() => {
                    setAlerta({});
                }, 3000);
                console.log(error);
                return;
            }
        }
    }
    const { msg } = alerta;



    return (
        <section>
            <h2 className="text-2xl font-base text-center mt-8">Información</h2>
            <div className={` justify-end w-full space-x-2 ${valor ? 'block' : 'hidden'} `}>
                <NavSubcontratista />
            </div>
            <i className="fa fa-drivers-license-o" aria-hidden="true"></i>
            <div className={`${mensaje ? 'block' : 'hidden'}`}>
                <p className={`mt-4 text-xl font-semibold text-center text-red-500`}>No hay información</p>
                <p className="text-sm text-red-600 text-center">Favor de llenar la información y subir la documentación</p>
            </div>
            <form
                className=" rounded-lg bg-white py-8 px-5 mt-10 mb-10"
                onSubmit={handlesubmit}
            >
                <div className="flex space-x-6">
                    <div className="w-1/2">
                        <p className="text-xl text-sky-500 font-semibold mt-2 mb-4">Información Personal</p>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Nombre"
                            >
                                Nombre Completo
                            </label>
                            <input
                                id="Nombre"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Nombre Completo"
                                value={Nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Telefono"
                            >
                                Teléfono
                            </label>
                            <input
                                id="Telefono"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Teléfono"
                                value={Telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="numerodeobra"
                            >
                                Número de Registro de Obra
                            </label>
                            <input
                                id="numerodeobra"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Número de Registro de Obra"
                                value={CodigoObra}
                                onChange={(e) => setCodigoObra(e.target.value)}
                            />
                        </div>

                        <p className="text-xl text-sky-500 font-semibold mt-8 mb-4">Información de la Empresa</p>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="NombreRazonSocial"
                            >
                                Razón Social de la Empresa
                            </label>
                            <input
                                id="NombreRazonSocial"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Razón Social"
                                value={NombreRazonSocial}
                                onChange={(e) => setNombreRazonSocial(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="ObjetoSocial"
                            >
                                Objeto Social de la Empresa
                            </label>
                            <input
                                id="ObjetoSocial"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Objeto Social"
                                value={ObjetoSocial}
                                onChange={(e) => setObjetoSocial(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Puesto"
                            >
                                Puesto en la Empresa
                            </label>
                            <input
                                id="Puesto"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Puesto"
                                value={Puesto}
                                onChange={(e) => setPuesto(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Email"
                            >
                                Correo Empresarial
                            </label>
                            <input
                                id="Email"
                                type="email"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Correo"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Giro"
                            >
                                Giro Empresarial
                            </label>
                            <input
                                id="Giro"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Giro"
                                value={Giro}
                                onChange={(e) => setGiro(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="RFC"
                            >
                                RFC
                            </label>
                            <input
                                id="RFC"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="RFC"
                                value={RFC}
                                onChange={(e) => setRFC(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <p className="text-xl text-sky-500 font-semibold mt-2 mb-4">Direccion Fiscal</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-5">
                                <label
                                    className="text-gray-700 uppercase font-bold text-sm"
                                    htmlFor="Estado"
                                >
                                    Estado
                                </label>
                                <input
                                    id="Estado"
                                    type="text"
                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                    placeholder="Estado"
                                    value={Estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    className="text-gray-700 uppercase font-bold text-sm"
                                    htmlFor="Municipio"
                                >
                                    Municipio
                                </label>
                                <input
                                    id="Municipio"
                                    type="text"
                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                    placeholder="Municipio"
                                    value={Municipio}
                                    onChange={(e) => setMunicipio(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Colonia"
                            >
                                Colonia
                            </label>
                            <input
                                id="Colonia"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Colonia"
                                value={Colonia}
                                onChange={(e) => setColonia(e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="Calle"
                            >
                                Calle
                            </label>
                            <input
                                id="Calle"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Colonia"
                                value={Calle}
                                onChange={(e) => setCalle(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="mb-5">
                                <label
                                    className="text-gray-700 uppercase font-bold text-sm"
                                    htmlFor="NumeroExterior"
                                >
                                    Numero Exterior
                                </label>
                                <input
                                    id="NumeroExterior"
                                    type="text"
                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                    placeholder="Numero Exterior"
                                    value={NumeroExterior}
                                    onChange={(e) => setNumeroExterior(e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <label
                                    className="text-gray-700 uppercase font-bold text-sm"
                                    htmlFor="NumeroInterior"
                                >
                                    Numero Interior
                                </label>
                                <input
                                    id="NumeroInterior"
                                    type="text"
                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                    placeholder="Numero Interior"
                                    value={NumeroInterior}
                                    onChange={(e) => setNumeroInterior(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="CodigoPostal"
                            >
                                Codigo Postal
                            </label>
                            <input
                                id="CodigoPostal"
                                type="text"
                                className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                placeholder="Codigo Postal"
                                value={CodigoPostal}
                                onChange={(e) => setCodigoPostal(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {msg && <Alerta alerta={alerta} />}
                <div className={` justify-end w-full space-x-2 ${valor ? 'hidden' : 'flex'} `}>
                    <input
                        type="submit"
                        value="Guardar"
                        className="text-sm cursor-pointer bg-green-600 py-2 px-4 uppercase font-bold
      text-white rounded hover:bg-green-700 transition-colors"
                    />
                    <input
                        type="submit"
                        value="Cancelar"
                        className="text-sm cursor-pointer  bg-red-600 py-2 px-4 uppercase font-bold
      text-white rounded hover:bg-red-700 transition-colors"
                    />
                </div>
            </form>

        </section >
    )
}


export default Subcontratista;