import { useState } from "react";
import usePerfil from "../../hooks/usePerfil";
import Alerta from "../Alerta";
import clienteAxios from "../../../config/clienteAxios";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";


const DocumentacionObra = () => {

    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState(parseInt('0'));
    const [convertir64, setConvertir64] = useState('');
    const [tipodocumento, setTipodocumento] = useState(parseInt('0'));
    const [selectHidden, setselectHidden] = useState(false);
    const [formatoDocumento, setformatoDocumento] = useState("");
    const tipodoc = parseInt(tipodocumento)
    const { setAlerta, alerta, loading, setLoading } = usePerfil();
    const navigate = useNavigate();


    function changeInput() {
        if (tipodoc === 1) {
            setselectHidden(true)
        } else {
            setselectHidden(false)
        }
    }

    const convertirBase64 = (archivos) => {
        let val = archivos[0]["name"];
        let formato = val.split('.')[1];
        setformatoDocumento('.' + formato);
        Array.from(archivos).forEach(archivo => {
            let reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = function () {
                let arrayAuxiliar = [];
                let base64 = reader.result;
                arrayAuxiliar = base64.split(',');
                // console.log(arrayAuxiliar[1])
                setConvertir64(arrayAuxiliar[1])
            }
        })
    }
    let date = new Date();
    let fecha = date.toISOString();
    const str = fecha.substring(0, fecha.length - 5);

    const handlesubmit = async e => {
        e.preventDefault();

        if (nombre == '' || convertir64 == '') {
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })
            return
        }
        if (monto === '') {
            setMonto('0');
        }

        const cantidad = parseInt(monto)

        let docs = {
            "nombre": nombre,
            "contratistaId": null,
            "obraId": id,
            "fecha": str,
            "content": convertir64,
            "monto": cantidad,
            "estado": tipodoc,
            "extension": formatoDocumento
        }

        const { data } = await clienteAxios.post('/Documento', docs)
        setLoading(true)
        setAlerta({ msg: 'Documento subido correctamente', error: false });
        setTimeout(() => {
            setLoading(false)
        }, 2000);
        navigate(`/contratista/subcontratistas-obra/${id}`);

    }




    const { msg } = alerta;
    return (
        <>
            {<Loading load={loading} />}
            <section className="mb-5">
                <h2 className="text-2xl font-base text-center mt-8">Documentación Obra</h2>
                {/* FORMULARIO ARCHIVOS */}
                < div
                    className="mt-8 bg-white py-8 px-5 h-max rounded-lg" >
                    <form
                        onSubmit={handlesubmit}
                    >

                        <p className="text-xl text-sky-500 font-semibold mt-2 mb-4">Documentos Obra</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="mb-5">
                                <label
                                    className="text-gray-700 uppercase font-bold text-sm"
                                    htmlFor="nombre"
                                >
                                    Nombre Documento
                                </label>
                                <input
                                    id="nombre"
                                    type="text"
                                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md shadow"
                                    placeholder="Nombre Documento"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>
                            <div className="mb-5">
                                <label className="text-gray-700 uppercase font-bold text-sm">Tipo </label>
                                <select onClick={changeInput} name="tipodocumento" value={tipodocumento}
                                    className="border rounded-md shadow  p-2 mt-2  w-full" onChange={e => setTipodocumento(e.target.value)}>
                                    <option value="0">Identificación</option>
                                    <option value="1">Comprobante</option>
                                </select>
                            </div>
                            <div className={`${selectHidden ? 'display' : 'hidden'} mb-2 inline`}>
                                <label htmlFor="monto" className="text-gray-700 uppercase font-bold text-sm">Ingrese el Monto</label>
                                <input id="monto" type="text" placeholder="Monto" className=" mt-1.5 px-2 py-1 border w-full" onChange={e => setMonto(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label
                                className="text-gray-700 uppercase font-bold text-sm"
                                htmlFor="nombre"
                            >
                                Documento
                            </label>
                            <input
                                id="content"
                                type="file"
                                className="border w-full p-2 mt-1.5 placeholder-gray-400 rounded-md shadow"
                                onChange={(e) => convertirBase64(e.target.files)}
                            />
                        </div>
                        {msg && <Alerta alerta={alerta} />}
                        <div className="flex justify-end space-x-2">
                            <input
                                type="submit"
                                value="Guardar"
                                className="cursor-pointer text-sm bg-green-600 py-2 px-4 uppercase font-bold
      text-white rounded hover:bg-green-700 transition-colors"
                            />
                            <input
                                type="submit"
                                value="Cancelar"
                                className="cursor-pointer text-sm bg-red-600 py-2 px-4 uppercase font-bold
      text-white rounded hover:bg-red-700 transition-colors"
                            />
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default DocumentacionObra