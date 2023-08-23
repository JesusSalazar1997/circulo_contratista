import { useEffect, useState, useLayoutEffect } from "react";
import usePerfil from "../../src/hooks/usePerfil";
import NavInfoContra from "./NavInfoContra";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/clienteAxios";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";


const FormularioEditar = () => {

    const { id } = useParams();
    const { dataContAdm, obtenerData, mostrarAlerta, alerta, setAlerta, loading, setLoading
    } = usePerfil();
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
    const [UsuarioUsername, setUsuarioUsername] = useState('');
    const [Id, setId] = useState('');
    const [mensaje, setMensaje] = useState(false);




    useEffect(() => {
        obtenerData(id);
        let perfil = dataContAdm;
        if (perfil) {
            setUsuarioUsername(perfil.usuarioUsername)
            setId(perfil.id)
            setNombre(perfil.nombre)
            setTelefono(perfil.telefono)
            setNombreRazonSocial(perfil.nombreRazonSocial)
            setObjetoSocial(perfil.objetoSocial)
            setEmail(perfil.email)
            setGiro(perfil.giro)
            setRFC(perfil.rfc)
            setPuesto(perfil.puesto)
            setEstado(perfil.direccionFiscal?.estado)
            setMunicipio(perfil.direccionFiscal?.delegacionMunicipio)
            setColonia(perfil.direccionFiscal?.colonia)
            setNumeroExterior(perfil.direccionFiscal?.numeroExterior)
            setCodigoPostal(perfil.direccionFiscal?.codigoPostal)
            setCalle(perfil.direccionFiscal?.calle)

        }
    }, [id])

    if (Nombre === null) {
        setNombre('')
    };
    if (Telefono === null) {
        setTelefono('')
    };
    if (NombreRazonSocial === null) {
        setNombreRazonSocial('')
    };
    if (ObjetoSocial === null) {
        setObjetoSocial('')
    };
    if (Puesto === null) {
        setPuesto('')
    };
    if (Email === null) {
        setEmail('')
    };
    if (Giro === null) {
        setGiro('')
    };
    if (RFC === null) {
        setRFC('')
    };
    if (Estado === null) {
        setEstado('')
    };
    if (Municipio === null) {
        setMunicipio('')
    };
    if (Colonia === null) {
        setColonia('')
    };
    if (Calle === null) {
        setCalle('')
    };
    if (NumeroExterior === null) {
        setNumeroExterior('')
    };
    if (NumeroInterior === null) {
        setNumeroInterior('')
    };
    if (CodigoPostal === null) {
        setCodigoPostal('')
    };
    // if (CodigoObra === null) {
    //     setCodigoObra('')
    // };



    const handlesubmit = async e => {
        e.preventDefault();
        if ([Nombre, Telefono, NombreRazonSocial, ObjetoSocial, Puesto, Email, Giro, RFC, Estado, Municipio, Colonia, Calle, CodigoPostal].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        } else {
            try {

                // let DireccionFiscal = {
                //     "Calle": Calle,
                //     "NumeroExterior": NumeroExterior,
                //     "NumeroInterior": NumeroInterior,
                //     "Colonia": Colonia,
                //     "Municipio": Municipio,
                //     "Estado": Estado,
                //     "CodigoPostal": CodigoPostal
                // }

                const objeto = { "patronId": null, "direccionFiscal": null, 'usuario': null, 'id': Id, 'usuarioUsername': UsuarioUsername, 'nombre': Nombre, 'telefono': Telefono, 'nombreRazonSocial': NombreRazonSocial, 'objetoSocial': ObjetoSocial, 'rfc': RFC, 'giro': Giro, 'puesto': Puesto, 'email': Email }


                const { data } = await clienteAxios.put(`/Contratista/${Id}`, objeto)
                if (!data.id) {
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                    }, 2000);
                    setAlerta({ msg: 'Usuario Actualizado Correctamente', error: false });
                    setTimeout(() => {
                        setAlerta({});
                    }, 3000);
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }



    const { msg } = alerta;



    return (
        <>
            {<Loading load={loading} />}
            <section>
                <h2 className="text-2xl font-base text-center mt-8  mb-2">Editar Información Contratista</h2>
                <NavInfoContra />
                <i className="fa fa-drivers-license-o" aria-hidden="true"></i>

                <form
                    className=" rounded-lg bg-white py-8 px-5 mt-10"
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
                            {/* <div className="mb-5">
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
                        </div> */}

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
                    <div className={` justify-end w-full space-x-2 flex`}>
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
        </>

    )
}


export default FormularioEditar