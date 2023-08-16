import usePerfil from "../hooks/usePerfil";
import Lista from "../components/contratista/Lista";
import { Link, useNavigate } from "react-router-dom";

const Contratista = () => {

    const navigate = useNavigate();
    const { perfil } = usePerfil()
    const construcciones = perfil;



    let valor = false;
    if (JSON.stringify(perfil) == '[]') {
        valor = true;
    }



    return (
        <>


            <h1 className="text-xl font-base text-center mt-7 ">Listado Obras</h1>
            <p className="text-center text-3xl font-semibold mb-8">{perfil.nombreRazonSocial}</p>


            <Lista key={perfil.rfc} construcciones={construcciones} />

            <div className={`mt-3 w-full flex justify-end ${valor ? 'hidden' : 'flex'}`}>
                <Link to="/contratista/obra">
                    <button className="drop-shadow-md py-2 px-7 bg-yellow-500 hover:bg-yellow-600 text-white text-base font-semibold rounded-lg">Añadir Obra</button>
                </Link>
            </div>
        </>
    )
}

export default Contratista

