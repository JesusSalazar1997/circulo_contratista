import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header";


const RutaProtegida = () => {
    const { auth, cargando } = useAuth();


    return (
        <>
            {auth ? (
                <div className="">
                    <div className={`static ${cargando ? 'flex' : 'hidden'} `}>
                        <div className="absolute medidas-spine">
                            <div className=" z-40 lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className="z-30 flex fixed inset-0 bg-gray-800 opacity-75">
                        </div>
                    </div>
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

