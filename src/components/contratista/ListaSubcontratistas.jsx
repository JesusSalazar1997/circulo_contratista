import { useState, useEffect } from "react";
import usePerfil from "../../hooks/usePerfil";
import { useParams } from "react-router-dom";
import clienteAxios from "../../../config/clienteAxios";
import CampoSubcontratistas from "./CampoSubcontratistas";

const ListaSubcontratistas = () => {

    const [subcontratista, setSubcontratista] = useState([{}]);
    const [obraSeleccionada, setobraSeleccionada] = useState({});
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
            <p className="font-semibold mt-8 text-lg text-center mb-7">Listado Subcontratistas</p>
            <div className="flex justify-center mt-10">
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

export default ListaSubcontratistas