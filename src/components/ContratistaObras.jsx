import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import CampoObrasContra from "./CampoObrasContra"


const ContratistaObras = () => {

    const [obras, setObras] = useState([{}]);
    const [documentos, setDocumentos] = useState([{}]);
    let obrasContr = obras.obras;
    const { id } = useParams();

    useEffect(() => {
        const obtenerObras = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Contratista/${id}`);
                setObras(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerObras();

    }, [setObras])


    useEffect(() => {
        const obtenerDocumentacion = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Documento/contratista/${obras.id}`);
                setDocumentos(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerDocumentacion();
    }, [obras])

    let documentacion = documentos;

    let valor = false;
    if (JSON.stringify(documentacion) != '[]') {
        valor = true;
    }



    return (
        <>
            <div>
                <p className="text-center text-3xl font-semibold my-8">{obras.nombreRazonSocial}</p>
            </div>
            <section className="w-full shadow-md border bg-white py-7 px-5">
                <p className="bg-sky-500 text-white font-semibold uppercase text-center mb-7 text-md">Información Contratista</p>
                <div className="grid grid-cols-2">
                    <div>
                        <p className="mb-2 font-semibold">Objeto Social: <span className="font-normal ">  {obras.objetoSocial}</span></p>
                        <p className="mb-2 font-semibold">Giro: <span className="font-normal ">{obras.giro}</span> </p>
                    </div>
                    <div>
                        <p className="mb-2 font-semibold">Correo: <span className="font-normal "> {obras.email}</span></p>
                        <p className="mb-2 font-semibold">Teléfono: <span className="font-normal "> {obras.telefono}</span> </p>
                    </div>
                </div>
            </section>
            <section className="my-8 w-full h-max bg-white shadow-md rounded-md py-7 px-5">
                <h2 className="bg-green-600 text-white font-semibold uppercase text-center mb-7 text-md">Documentos Contratista</h2>
                {
                    documentacion?.map((doc, index) => (
                        <div key={index} className="flex justify-between mt-2">
                            <p>{doc?.nombre}{doc?.extension}</p>
                            <a className={`hover:bg-green-700 bg-green-600 rounded-md px-4 py-2 text-white font-semibold uppercase text-sm  ${valor ? 'hidden' : 'display'}`} href={`data:application/octet-stream;base64,${doc.content}`} download={`${doc.nombre}` + `${doc.extension}`}>Descargar</a>
                        </div>
                    ))}
                <div className={`w-full justify-center ${valor ? 'hidden' : 'display'}`}>
                    <p className="text-center font-semibold text-gray-500 uppercase" >No hay documentos</p>
                </div>
            </section>
            <p className="font-semibold mt-8 text-lg text-center mb-7">Listado Obras</p>
            <div className="flex justify-center mt-10">
                <table className="w-full drop-shadow-md mb-8">
                    <thead className="bg-sky-500 text-white font-bold  uppercase">
                        <tr>
                            <th className="px-2 py-4">Codigo de Obra</th>
                            <th className="px-2 py-4">Clase de Obra</th>
                            <th className="px-2 py-4">Tipo de Obra</th>
                            <th className="px-2 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white shadow">
                        {obrasContr?.length ? (
                            obrasContr?.map((construccion, index) => (
                                <CampoObrasContra key={index} construccion={construccion} idObra={construccion?.id} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan="4" className="text-center text-gray-600 uppercase p-5">
                                    No hay obras
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

export default ContratistaObras