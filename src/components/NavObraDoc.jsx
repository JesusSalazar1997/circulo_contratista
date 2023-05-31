import { Link, useParams } from "react-router-dom";



const NavObraDoc = () => {

    const { id } = useParams();

    return (

        <nav>
            <div className="flex fot-semibold ">
                <Link to={`/administrador/formulario-editar-obra/${id}`} >
                    <p className="px-2 py-1 rounded-t-lg hover:bg-sky-500 hover:text-white  text-lg font-semibold " >Información</p>
                </Link>
                <Link to={`/administrador/formulario-editar-obra-documentacion/${id}`} >
                    <p className="px-2 py-1 rounded-t-lg text-lg font-semibold hover:text-white hover:bg-sky-500 ">Documentos</p>
                </Link>
            </div>
            <div className="rounded-t-lg border-b-4 border-sky-500"></div>
        </nav>
    )
}

export default NavObraDoc