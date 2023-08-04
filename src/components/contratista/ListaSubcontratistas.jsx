import { useState, useEffect } from "react";
import usePerfil from "../../hooks/usePerfil";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/clienteAxios";
import CampoSubcontratistas from "./CampoSubcontratistas";
import { Link } from "react-router-dom";


const ListaSubcontratistas = () => {

    const [subcontratista, setSubcontratista] = useState([{}]);
    const [obraSeleccionada, setobraSeleccionada] = useState({});
    const [documentacion, setDocumentacion] = useState([]);
    const { perfil } = usePerfil()
    const construcciones = perfil.obras;

    const { id } = useParams();


    useEffect(() => {
        const obtenerSubContratistas = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Contratista/subcontratista/obra/${id}`);
                // console.log(data)
                setSubcontratista(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerSubContratistas();

        construcciones.forEach(e => {
            if (id === e.id) {
                setobraSeleccionada(e);
            } else {
                return;
            }

        })

        const obtenerDocumentacion = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Documento/obra/${id}`);
                // console.log(data)
                setDocumentacion(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerDocumentacion();
    }, [])

    let valor = false;
    if (documentacion.length > 0) {
        valor = true
    } else {
        valor = false
    }


    let idObra = construcciones.map((subcontratista) => subcontratista.id)




    return (
        <>
            <div>
                <p className="text-center text-3xl font-semibold my-8">{perfil.nombreRazonSocial}</p>
            </div>
            <section className="w-full shadow-md border bg-white py-7 px-5">
                <p className="font-bold uppercase text-center mb-7 text-md">Información de Obra</p>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="mb-2 font-semibold">Numero de Registro de Obra: <span className="font-normal ">  {obraSeleccionada.numeroRegistroObra}</span></p>
                        <p className="mb-2 font-semibold">Monto de la Obra: $<span className="font-normal ">{obraSeleccionada.montoContrato}</span> </p>
                    </div>
                    <div>
                        <p className="mb-2 font-semibold">Fecha de Inicio: <span className="font-normal "> {obraSeleccionada.fechaInicio}</span> </p>
                        <p className="mb-2 font-semibold">Fecha de Termino: <span className="font-normal "> {obraSeleccionada.fechaTermino}</span> </p>
                    </div>
                </div>

            </section>
            <div className="mt-8 bg-white py-8 px-5 h-max rounded-lg">
                <p className="bg-cyan-600 text-white font-semibold uppercase text-center mb-7 text-sm">Documentación de Obra</p>

                {
                    documentacion?.map((doc) => (
                        <div key={doc.id} className="flex justify-between mt-2 hover:bg-gray-200">
                            <p className="text-sky-800 font-semibold pt-1 pl-1">{doc.nombre}{doc.extension}</p>
                            <a className="hover:bg-green-700 bg-green-600 rounded-md px-4 py-2 text-white font-semibold uppercase text-sm" href={`data:application/octet-stream;base64,${doc.content}`} download={`${doc.nombre}` + `${doc.extension}`}>Descargar</a>
                        </div>
                    ))}
                <div className={`${valor ? 'hidden' : 'display'}`}>
                    <p className={` text-center uppercase text-gray-600  `} >No hay documentos para esta obra</p>
                </div>
                <Link to={`/contratista/documentacion-obra/${id}`} >
                    <div className="w-full flex justify-end mt-6">
                        <p className="px-4 py-2  bg-yellow-500 rounded-lg text-md font-semibold text-white hover:bg-yellow-600">Añadir Documento</p>
                    </div>
                </Link>
            </div>
            <p className="font-semibold mt-8 text-lg text-center mb-7">Listado Subcontratistas</p>
            <div className="flex justify-center mt-10 mb-10">
                <table className="w-full drop-shadow-md ">
                    <thead className="bg-sky-500 text-white font-bold  uppercase">
                        <tr>
                            <th className="px-2 py-4">Empresa</th>
                            <th className="px-2 py-4">Giro</th>
                            <th className="px-2 py-4">Objeto</th>
                            <th className="px-2 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white shadow">
                        {subcontratista?.length ? (
                            subcontratista?.map((subcontratistas) => (
                                <CampoSubcontratistas key={idObra} subcontratistas={subcontratistas} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td className="font-semibold"></td>
                                <td COLSPAN="2" className="col-span-4 text-center text-gray-600 uppercase p-5">
                                    No hay Subcontratistas para Esta Obra
                                </td>
                                <td className="font-semibold"></td>
                                <td className="font-semibold"></td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListaSubcontratistas