import Campo from "../components/Campo"
import usePerfil from "../hooks/usePerfil"

const Administrador = () => {

    const { data } = usePerfil();

    return (
        <>
            <h1 className="text-2xl font-base text-center my-8">Listado Contratistas</h1>
            <div className="flex justify-center">
                <table className="w-full drop-shadow-md mb-4 ">
                    <thead className="bg-sky-500 text-white font-bold  uppercase">
                        <tr>
                            <th className="px-2 py-4">Nombre Razón Social</th>
                            <th className="px-2 py-4">Objeto Social</th>
                            <th className="px-2 py-4">Giro</th>
                            <th className="px-2 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white shadow">
                        {data.length ? (
                            data.map((data) => (
                                <Campo key={data.id} data={data} />
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan="4" className="text-center text-gray-600 uppercase p-5">
                                    No hay contratistas
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

export default Administrador