import { Link } from "react-router-dom";

const Campo = ({ construccion }) => {


    const { numeroRegistroObra, claseObra, tipoObra } = construccion;
    const obraId = construccion.id;
    // ${ usuarioUsername }
    return (
        <tr className="text-center">

            <td className="py-4 font-semibold">{numeroRegistroObra}</td>
            <td className="py-4 font-semibold">{claseObra}</td>
            <td className="py-4 font-semibold"> {tipoObra}</td>
            <td className="grid grid-cols-3 gap-2 content-center py-4 px-2">
                <Link to={`/administrador/subcontratista-obra/${obraId}`} >
                    <button className="w-full drop-shadow-sm py-2 px-1 bg-green-500 hover:bg-green-600 text-white text-base font-semibold rounded-lg">Ver</button>
                </Link>
                <Link to={`/administrador/formulario-obra`} >
                    <button className="drop-shadow-sm w-full py-2 px-1 bg-yellow-500 hover:bg-yellow-600 text-white text-base font-semibold rounded-lg">Editar</button>
                </Link>
                <button className="drop-shadow-sm py-2 px-1 bg-red-500 hover:bg-red-600 text-white text-base font-semibold rounded-lg">Eliminar</button>
            </td>
        </tr>
    )
}

export default Campo