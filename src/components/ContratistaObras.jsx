import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import CampoObrasContra from "./CampoObrasContra"


const ContratistaObras = () => {

    const [obras, setObras] = useState([{}]);

    let obrasContr = obras.obras;
    const { id } = useParams();

    useEffect(() => {
        const obtenerSubContratistas = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Contratista/${id}`);
                // console.log(data)
                setObras(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerSubContratistas();
    }, [])




    return (
        <>
            <div>
                <p className="text-center text-3xl font-semibold my-8">{obras.nombreRazonSocial}</p>
            </div>
            <section className="w-full shadow-md border bg-white py-7 px-5">
                <p className="font-bold uppercase text-center mb-7 text-md">Información de Contratista</p>
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
            <section className="my-8 w-full h-max bg-white shadow-md rounded-md pt-4">
                <h2 className="text-lg mb-8 font-bold text-center">Documentos Contratista</h2>
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
                            obrasContr?.map((construccion) => (
                                <CampoObrasContra key={construccion.id} construccion={construccion} idObra={construccion.id} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td className="py-4 font-semibold"></td>
                                <td className="text-center text-gray-600 uppercase p-5">
                                    No hay obras aún
                                </td>
                                <td className="py-4 font-semibold"></td>
                                <td className="py-4 font-semibold"></td>
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