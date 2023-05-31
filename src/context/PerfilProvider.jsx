import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const PerfilContext = createContext();

const PerfilProvider = ({ children }) => {
    const [perfil, setPerfil] = useState([])
    const [obras, setObras] = useState([]);
    const [data, setData] = useState([]);
    const [nav, setNav] = useState(false);
    const [alerta, setAlerta] = useState([]);
    const [dataContAdm, setdataContAdm] = useState({})
    const [contratista, setContratista] = useState('');


    const navigate = useNavigate();

    useEffect(() => {
        const obtenerInformación = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios(`/Contratista/${username}`)
                setPerfil(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerInformación();
    }, [])


    useEffect(() => {
        const obtenerObras = async () => {
            try {
                const username = localStorage.getItem('username')
                if (!username) return;
                const { data } = await clienteAxios("/Contratista");
                setData(data);
                data.forEach(e => {
                    if (username === e.usuarioUsername) {
                        setObras(e);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        obtenerObras();
    }, []);

    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const submitPerfil = async perfil => {

        try {
            const username = localStorage.getItem('username')
            if (!username) return
            const { data } = await clienteAxios.post('/Contratista', perfil)
            setAlerta({
                msg: 'Información Agregada Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate("/perfil/informacion")
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }
    const editarPerfil = async perfil => {
        try {
            const username = localStorage.getItem('username')
            if (!username) return
            const { data } = await clienteAxios.post('/Contratista', perfil)
            setAlerta({
                msg: 'Información Agregada Correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate("/perfil/informacion")
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const obtenerData = async id => {
        try {
            const user = localStorage.getItem('username')
            if (!user) return;
            const { data } = await clienteAxios(`/Contratista/${id}`)
            console.log(data)
            setdataContAdm(data)
        } catch (error) {
            console.log(error)
        }
    }


    const obtenerContratista = async () => {
        try {
            const username = localStorage.getItem('username')
            if (!username) return;
            const { data } = await clienteAxios(`/Contratista/${username}`);
            setContratista(data.id);
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <PerfilContext.Provider
            value={{
                data,
                setNav,
                nav,
                mostrarAlerta,
                alerta,
                submitPerfil,
                perfil,
                obras,
                dataContAdm,
                obtenerData,
                obtenerContratista,
                contratista
            }}
        >
            {children}
        </PerfilContext.Provider>
    )
}

export {
    PerfilProvider
}

export default PerfilContext;