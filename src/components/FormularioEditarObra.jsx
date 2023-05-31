import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import usePerfil from "../hooks/usePerfil";
import Alerta from "./Alerta";
import clienteAxios from "../../config/clienteAxios";
import NavObraDoc from "./NavObraDoc";

const FormularioEditarObra = () => {
    const [NumeroRegistroObra, setNumeroRegistroObra] = useState('')
    const [Delegacion, setDelegacion] = useState('')
    const [Subdelegacion, setSubdelegacion] = useState('')
    const [FechaRegistro, setFechaRegistro] = useState('')
    const [FechaInicio, setFechaInicio] = useState('')
    const [FechaTermino, setFechaTermino] = useState('')
    const [CantidadContrato, setCantidadContrato] = useState('')
    const [TipoObra, setTipoObra] = useState('')
    const [ObraContratada, setObraContratada] = useState('')
    const [NumeroRegistroObraPropietario, setNumeroRegistroObraPropietario] = useState('')
    const [ObraMetros, setObraMetross] = useState('')
    const [ClaseObra, setClaseObra] = useState('')
    const [FolioRepse, setFolioRepse] = useState('')
    const [Estado, setEstado] = useState('')
    const [NumeroExterior, setNumeroExterior] = useState('')
    const [NumeroInterior, setNumeroInterior] = useState('')
    const [Municipio, setMunicipio] = useState('')
    const [Colonia, setColonia] = useState('')
    const [Calle, setCalle] = useState('')
    const [CodigoPostal, setCodigoPostal] = useState('');
    const [ContratistaId, setContratistaId] = useState('');

    const { mostrarAlerta, alerta, setAlerta } = usePerfil();

    const SuperficieObraMetros = parseInt(ObraMetros);
    const MontoContrato = parseInt(CantidadContrato);
    const Documentos = null;

    useEffect(() => {
        const obtenerInformación = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return
                const { data } = await clienteAxios(`/Contratista/${username}`)
                setContratistaId(data.id)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerInformación()

    }, [])



    const handlesubmit = async e => {
        e.preventDefault();
        if ([NumeroRegistroObra, Delegacion, FechaRegistro, FechaInicio, FechaTermino, MontoContrato, TipoObra, ObraContratada, NumeroRegistroObraPropietario, ClaseObra, FolioRepse, SuperficieObraMetros, Estado, Municipio, Colonia, Calle, CodigoPostal].includes('')) {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return;
        }
        //Si pasa la validación
        const Direccion = { Estado, NumeroExterior, NumeroInterior, Municipio, Colonia, Calle, CodigoPostal };
        try {

            // const objeto = { ContratistaId, NumeroRegistroObra, Delegacion, Subdelegacion, FechaRegistro, FechaInicio, FechaTermino, MontoContrato, ObraContratada, NumeroRegistroObraPropietario, ClaseObra, FolioRepse, SuperficieObraMetros, Direccion, Documentos };
            // console.log(objeto);
            const { data } = await clienteAxios.post(`/Obra`, { ContratistaId, NumeroRegistroObra, Delegacion, Subdelegacion, FechaRegistro, FechaInicio, FechaTermino, MontoContrato, ObraContratada, NumeroRegistroObraPropietario, ClaseObra, FolioRepse, SuperficieObraMetros, Direccion, Documentos, TipoObra })
            console.log(data);
            setAlerta({ msg: 'La obra se creo correctamente', error: true });
            setTimeout(() => {
                setAlerta({})
            }, 2000);
        } catch (error) {
            console.log(error)
        }

    }



    const { msg } = alerta;
    return (
        <section>
            <h2 className="text-2xl font-base text-center my-7">Editar Información Obra</h2>
            <NavObraDoc />
            <div className="mt-8 flex justify-center pb-10">
                <form
                    className="bg-white py-8 px-5  rounded-lg"
                    onSubmit={handlesubmit}
                >

                    <p className="text-xl text-center text-sky-500 font-semibold mt-1 mb-4">Información de la Obra</p>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="NumeroRegistroObra"
                        >
                            Numero de Registro de Obra
                        </label>
                        <input
                            id="NumeroRegistroObra"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder=" Numero de Registro de Obra"
                            value={NumeroRegistroObra}
                            onChange={(e) => setNumeroRegistroObra(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="Delegacion"
                        >
                            Delegación
                        </label>
                        <input
                            id="Delegacion"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Delegación"
                            value={Delegacion}
                            onChange={(e) => setDelegacion(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="Subdelegacion"
                        >
                            Subdelegación
                        </label>
                        <input
                            id="Subdelegacion"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Subdelegación"
                            value={Subdelegacion}
                            onChange={(e) => setSubdelegacion(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="FechaRegistro"
                        >
                            Fecha de Registro
                        </label>
                        <input
                            id="FechaRegistro"
                            type="date"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            value={FechaRegistro}
                            onChange={(e) => setFechaRegistro(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="FechaInicio"
                        >
                            Fecha de Inicio de la Obra
                        </label>
                        <input
                            id="FechaInicio"
                            type="date"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Fecha de Inicio"
                            value={FechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="FechaTermino"
                        >
                            Fecha de Termino
                        </label>
                        <input
                            id="FechaTermino"
                            type="date"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Fecha de Termino"
                            value={FechaTermino}
                            onChange={(e) => setFechaTermino(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="MontoContrato"
                        >
                            Monto del Contrato
                        </label>
                        <input
                            id="MontoContrato"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Monto Contrato"
                            value={CantidadContrato}
                            onChange={(e) => setCantidadContrato(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="TipoObra"
                        >
                            Tipo de Obra
                        </label>
                        <input
                            id="TipoObra"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Monto del Contrato"
                            value={TipoObra}
                            onChange={(e) => setTipoObra(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="ObraContratada"
                        >
                            Obra Contratada
                        </label>
                        <input
                            id="ObraContratada"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Obra Contratada"
                            value={ObraContratada}
                            onChange={(e) => setObraContratada(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="NumeroRegistroObraPropietario"
                        >
                            Número de Registro de Obra del Propietario
                        </label>
                        <input
                            id="NumeroRegistroObraPropietario"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Número de Registro de Obra del Propietario"
                            value={NumeroRegistroObraPropietario}
                            onChange={(e) => setNumeroRegistroObraPropietario(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="SuperficieObraMetros"
                        >
                            Superficie de la Obra
                        </label>
                        <input
                            id="SuperficieObraMetros"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Superficie de la Obra en Metros"
                            value={ObraMetros}
                            onChange={(e) => setObraMetross(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="ClaseObra"
                        >
                            Clase de la Obra
                        </label>
                        <input
                            id="ClaseObra"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Clase de la Obra"
                            value={ClaseObra}
                            onChange={(e) => setClaseObra(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            className="text-gray-700 uppercase font-bold text-sm"
                            htmlFor="FolioRepse"
                        >
                            Folio Repse
                        </label>
                        <input
                            id="FolioRepse"
                            type="text"
                            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                            placeholder="Folio Repse"
                            value={FolioRepse}
                            onChange={(e) => setFolioRepse(e.target.value)}
                        />
                    </div>
                    <p className="text-xl text-sky-500 font-semibold mt-8 mb-4">Direccion de la Obra</p>
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

                    {msg && <Alerta alerta={alerta} />}
                    <div className="flex justify-end w-full space-x-2">
                        <input
                            type="submit"
                            value="Guardar"
                            className="text-sm cursor-pointer bg-green-600 py-2 px-4 uppercase font-bold 
      text-white rounded hover:bg-green-700 transition-colors"
                        />
                        <Link to="/contratista">
                            <input
                                type="submit"
                                value="Cancelar"
                                className="text-sm cursor-pointer  bg-red-600 py-2 px-4 uppercase font-bold 
      text-white rounded hover:bg-red-700 transition-colors"
                            />
                        </Link>
                    </div>
                </form>
            </div>
        </section >
    )
}

export default FormularioEditarObra