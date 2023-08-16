import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import usePerfil from "../hooks/usePerfil";
import CampoSubcontratistas from "./CampoSubcontratistas";
import dayjs from "dayjs";

const SubcontratistasObra = () => {
    const [subcontratista, setSubcontratista] = useState([{}]);
    const [obraSeleccionada, setobraSeleccionada] = useState({});
    const [documentos, setDocumentos] = useState([{}]);
    const { perfil } = usePerfil();
    const construcciones = perfil.obras;
    const { id } = useParams();

    useEffect(() => {
        const obtenerSubContratistas = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) {
                    return;
                }
                const { data } = await clienteAxios(`/Contratista/subcontratista/obra/${id}`);
                // console.log(data)
                setSubcontratista(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerSubContratistas();
        const obtenerObra = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Obra/${id}`);
                // console.log(data)
                setobraSeleccionada(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerObra();


        const obtenerDocumentoObra = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Documento/obra/${id}`);
                setDocumentos(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerDocumentoObra();

        construcciones?.forEach(e => {
            if (id === e.id) {
                setobraSeleccionada(e);
            } else {
                return;
            }
        })
    }, [])
    let documentacion = documentos;

    let valor = false;
    if (documentacion.length == 0) {
        valor = true;
    }

    let fechaFormateadaInicio = dayjs(obraSeleccionada.fechaInicio).format("DD/MM/YYYY");
    let fechaFormateadaFin = dayjs(obraSeleccionada.fechaTermino).format("DD/MM/YYYY");



    return (
        <>
            <div>
                <p className="text-center text-3xl font-semibold my-8">{perfil.nombreRazonSocial}</p>
            </div>
            <section className="w-full shadow-md border bg-white py-7 px-5">
                <p className="bg-sky-500 text-white font-semibold uppercase text-center mb-7 text-md">Información de Obra</p>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="mb-2 font-semibold">Numero de Registro de Obra: <span className="font-normal ">  {obraSeleccionada.numeroRegistroObra}</span></p>
                        <p className="mb-2 font-semibold">Monto de la Obra: $<span className="font-normal ">{obraSeleccionada.montoContrato}</span> </p>
                    </div>
                    <div>
                        <p className="mb-2 font-semibold">Fecha de Inicio: <span className="font-normal "> {fechaFormateadaInicio}</span> </p>
                        <p className="mb-2 font-semibold">Fecha de Termino: <span className="font-normal "> {fechaFormateadaFin}</span> </p>
                    </div>
                </div>
            </section>
            <section className="my-8 w-full h-max bg-white shadow-md rounded-md py-7 px-5">
                <h2 className="bg-green-600 text-white font-semibold uppercase text-center mb-7 text-md">Documentos Obra</h2>
                {
                    documentacion?.map((doc, index) => (
                        <div key={index} className={`mt-2 w-full flex justify-between ${valor ? 'hidden' : 'display'}`}>
                            <p>{doc.nombre}{doc.extension}</p>
                            <a className="hover:bg-green-700 bg-green-600 rounded-md px-4 py-2 text-white font-semibold uppercase text-sm" href={`data:application/octet-stream;base64,${doc.content}`} download={`${doc.nombre}` + `${doc.extension}`}>Descargar</a>
                        </div>
                    ))}
                <div className={`w-full justify-center ${valor ? 'display' : 'hidden'}`}>
                    <p className="text-center font-semibold text-gray-500 uppercase" >No hay documentos</p>
                </div>
            </section>
            <p className="font-semibold mt-8 text-lg text-center mb-7">Listado Subcontratistas</p>
            <div className="flex justify-center mt-10">
                <table className="w-full drop-shadow-md mb-8 ">
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
                            subcontratista?.map((subcontratistas, index) => (
                                <CampoSubcontratistas key={index} subcontratistas={subcontratistas} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan="4" className="text-center text-gray-600 uppercase p-5">
                                    No hay Subcontratistas para Esta Obra
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SubcontratistasObra