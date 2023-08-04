import { Link } from "react-router-dom";

const CampoSubcontratistas = ({ subcontratistas }) => {
    const { nombreRazonSocial, objetoSocial, giro, usuarioUsername } = subcontratistas;



    return (
        <tr className="text-center">
            <td className="py-4 font-semibold">{nombreRazonSocial}</td>
            <td className="py-4 font-semibold">{objetoSocial}</td>
            <td className="py-4 font-semibold"> {giro}</td>
            <td className=" py-4 px-2">
                <Link to={`/subcontratista/informacion-subcontratista/${usuarioUsername}`} >
                    <button className="w-full drop-shadow-sm py-2 px-1 bg-green-600 hover:bg-green-700 text-white text-base font-semibold rounded-lg">Ver</button>
                </Link>
            </td>
        </tr>
    )
}

export default CampoSubcontratistas