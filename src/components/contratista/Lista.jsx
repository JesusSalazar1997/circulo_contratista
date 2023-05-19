import Campo from "./Campo"

const Lista = ({ construcciones }) => {

    const obras = construcciones.obras;



    return (
        <div className="flex justify-center">
            <table className="w-full drop-shadow-md ">
                <thead className="bg-sky-500 text-white font-bold  uppercase">
                    <tr>
                        <th className="px-2 py-4">Codigo de Obra</th>
                        <th className="px-2 py-4">Clase de Obra</th>
                        <th className="px-2 py-4">Tipo de Obra</th>
                        <th className="px-2 py-4">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white shadow">
                    {obras?.length ? (
                        obras?.map((construccion) => (
                            <Campo key={construccion.id} construccion={construccion} idObra={construccion.id} />
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
    )
}

export default Lista