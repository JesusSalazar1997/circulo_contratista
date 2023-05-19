import { Link } from "react-router-dom";

const Campo = ({ construccion, idObra }) => {

    const { claseObra, numeroRegistroObra, tipoObra } = construccion;



    return (
        <tr className="text-center">
            <td className="py-4 font-semibold">{numeroRegistroObra}</td>
            <td className="py-4 font-semibold">{claseObra}</td>
            <td className="py-4 font-semibold"> {tipoObra}</td>
            <td className="py-4 px-2">
                <Link to={`/contratista/subcontratistas-obra/${idObra}`} >
                    <button className="w-full drop-shadow-sm py-2 px-1 bg-green-500 hover:bg-green-600 text-white text-base font-semibold rounded-lg">Ver</button>
                </Link>
                {/* <Link to={`/perfil/obra`} >
                    <button className="drop-shadow-sm w-full py-2 px-1 bg-yellow-500 hover:bg-yellow-600 text-white text-base font-semibold rounded-lg">Editar</button>
                </Link>
                <button className="drop-shadow-sm py-2 px-1 bg-red-500 hover:bg-red-600 text-white text-base font-semibold rounded-lg">Eliminar</button> */}
            </td>
        </tr>
    )
}

export default Campo;