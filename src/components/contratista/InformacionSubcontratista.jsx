import { useParams } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import clienteAxios from "../../../config/clienteAxios";


const InformacionSubcontratista = () => {
    const params = useParams();
    const { id } = params;
    const [datos, setDatos] = useState([{}]);

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
                <h2 className="text-lg mb-8 font-bold text-center">Documentos Subcontratista</h2>
                <div className="mx-4">
                    <div className="flex space-x-2">
                        <div className="w-1/2">
                            <p className="bg-green-600 pl-3 py-1 text-md text-white font-semibold">Comprobante</p>
                            <p className="text-gray-700 my-2 ml-2">Pago</p>
                        </div>
                        <div className="w-1/2">
                            <p className="bg-green-600 pl-3 py-1 text-md text-white font-semibold">Identifiación</p>
                            <p className="text-gray-700 my-2 ml-2">INE</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InformacionSubcontratista