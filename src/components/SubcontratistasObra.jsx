import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import usePerfil from "../hooks/usePerfil";
import CampoSubcontratistas from "./CampoSubcontratistas";

const SubcontratistasObra = () => {
    const [subcontratista, setSubcontratista] = useState([{}]);
    const [obraSeleccionada, setobraSeleccionada] = useState({});
    const { perfil } = usePerfil();
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

        construcciones.forEach(e => {
            if (id === e.id) {
                setobraSeleccionada(e);
            } else {
                return;
            }
        })
    }, [])



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
            <section className="my-8 w-full h-max bg-white shadow-md rounded-md pt-4">
                <h2 className="text-lg mb-8 font-bold text-center">Documentos Obra</h2>
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
                            subcontratista?.map((subcontratistas) => (
                                <CampoSubcontratistas key={subcontratistas.id} subcontratistas={subcontratistas} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td className="py-4 font-semibold"></td>
                                <td className="text-center text-gray-600 uppercase p-5">
                                    No hay Subcontratistas para Esta Obra
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

export default SubcontratistasObra