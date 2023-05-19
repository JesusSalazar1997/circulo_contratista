import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";


const RutaProtegida = () => {
    const { auth, cargando } = useAuth();
    if (cargando) return 'cargando...'
    return (
        <>
            {auth ? (
                <div className="">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <main className="container mx-auto ">
                            <Outlet />
                        </main>
                    </div>

                </div>
            ) : <Navigate to="/" />}

        </>
    )
}

export default RutaProtegida