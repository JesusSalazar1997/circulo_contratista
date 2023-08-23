import { useParams } from "react-router-dom";
import { useState, useLayoutEffect, useEffect } from "react";
import clienteAxios from "../../../config/clienteAxios";


const InformacionSubcontratista = () => {
    const params = useParams();
    const { id } = params;
    const [datos, setDatos] = useState([{}]);
    const [documentos, setDocumentos] = useState([{}]);


    useLayoutEffect(() => {
        const obtenerInformación = async () => {
            try {
                const { data } = await clienteAxios(`/Contratista/${id}`)
                setDatos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerInformación()

    }, [])


    useEffect(() => {
        const obtenerDocumentoSubcontratista = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Documento/contratista/${datos.id}`);
                // console.log(data)
                setDocumentos(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerDocumentoSubcontratista();
    }, [datos])

    let documentacion = documentos;



    let valor = false;
    if (JSON.stringify(documentacion) != '[]') {
        valor = true;
    }

    return (
        <div>
            <section className="mt-8 w-full h-max bg-white shadow-md rounded-md pt-4">
                <h2 className="text-lg mb-8 font-bold text-center">Información Subcontratista</h2>
                <div className="mx-4">
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Nombre Razón Social</p>
                            <p className="text-gray-700 my-2 ml-2">{datos?.nombreRazonSocial}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Nombre Subcontratista</p>
                            <p className="text-gray-700 my-2 ml-2">{datos?.nombre}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Giro</p>
                            <p className="text-gray-700 my-2 ml-2">{datos?.giro}</p>
                        </div>
                        <div className="w-1/2">
                            <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Objeto Social</p>
                            <p className="text-gray-700 my-2 ml-2">{datos?.objetoSocial}</p>
                        </div>
                    </div>
                    <div>
                        <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Dirección</p>
                        <div className="grid grid-cols-4">
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Estado</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.estado}</p>
                            </div>
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Ciudad</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.delegacionMunicipio}</p>
                            </div>
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Fraccionamiento</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.colonia}</p>
                            </div>
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Calle</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.calle}</p>
                            </div>
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Número Exterior</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.numeroExterior}</p>
                            </div>
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Número Interior</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.numeroInterior}</p>
                            </div>
                            <div className="my-2">
                                <p className="ml-2 text-md font-semibold">Código Postal</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.direccionFiscal?.codigoPostal}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pb-5 mb-8">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="my-2">
                                <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Teléfono</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.telefono}</p>
                            </div>
                            <div className="my-2">
                                <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">RFC</p>
                                <p className="text-gray-700 my-2 ml-2">{datos?.rfc}</p>
                            </div>
                        </div>
                        <div className="my-2">
                            <p className="bg-sky-600 pl-3 py-1 text-md text-white font-semibold">Correo</p>
                            <p className="text-gray-700 my-2 ml-2">{datos?.email}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="my-8 w-full h-max bg-white shadow-md rounded-md pt-4">
                <div className=" bg-white py-4 px-5 h-max rounded-lg">
                    <p className="bg-green-600 text-white font-semibold uppercase text-center mb-4 text-sm">Documentación de Subcontratista</p>
                    {
                        documentacion?.map((doc, key) => (
                            <div key={key} className="flex justify-between mt-2 hover:bg-gray-200">
                                <p className="text-sky-800 font-semibold pt-1 pl-1">{doc.nombre}{doc.extension}</p>
                                <a className="hover:bg-green-700 bg-green-600 rounded-md px-4 py-2 text-white font-semibold uppercase text-sm" href={`data:application/octet-stream;base64,${doc.content}`} download={`${doc.nombre}` + `${doc.extension}`}>Descargar</a>
                            </div>
                        ))}
                    <div className={`w-full justify-center ${valor ? 'hidden' : 'display'}`}>
                        <p className="text-center font-semibold text-gray-500 uppercase" >No hay documentos</p>
                    </div>

                </div>
            </section >
        </div >
    )
}

export default InformacionSubcontratista