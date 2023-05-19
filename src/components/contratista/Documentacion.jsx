import NavSubcontratista from "../subcontratista/NavSubcontratista";
import { useState } from "react";
import usePerfil from "../../hooks/usePerfil";
import Alerta from "../Alerta";
import clienteAxios from "../../../config/clienteAxios";

const Documentos = () => {

    const [nombre, setNombre] = useState('');
    const [monto, setMonto] = useState(parseInt('0'));
    const [convertir64, setConvertir64] = useState('');
    const [tipodocumento, setTipodocumento] = useState(parseInt('0'));
    const [selectHidden, setselectHidden] = useState(false);
    const tipodoc = parseInt(tipodocumento)
    const { perfil, mostrarAlerta, alerta, } = usePerfil();


    function changeInput() {
        if (tipodoc === 1) {
            setselectHidden(true)
        } else {
            setselectHidden(false)
        }
    }

    const convertirBase64 = (archivos) => {
        Array.from(archivos).forEach(archivo => {
            let reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload = function () {
                let arrayAuxiliar = [];
                let base64 = reader.result;
                arrayAuxiliar = base64.split(',');
                console.log(arrayAuxiliar[1])
                setConvertir64(arrayAuxiliar[1])
            }
        })
    }
    let date = new Date();
    let fecha = date.toISOString();
    const str = fecha.substring(0, fecha.length - 5);
    // console.log(convertirBase64(convertir64));

    const handlesubmit = async e => {
        e.preventDefault();

        if (nombre === '') {
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

        // let docs = {
        //     "nombre": nombre,
        //     "contratistaId": perfil.id,
        //     "obraId": null,
        //     "fecha": str,
        //     "content": convertir64,
        //     "monto": cantidad,
        //     "estado": tipodoc
        // }
        let docs = {
            "contratistaId": "68d647d0-4cb8-4ba9-bde3-08db4478452d",
            "obraId": null,
            "nombre": "Comprobante",
            "fecha": "2023-05-13T23:16:09",
            "estado": 0,
            "monto": 0,
            "content": "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"
        }
        console.log(docs);
        const { data } = await clienteAxios.post('/Documento', { docs })
        console.log(data);
        mostrarAlerta({
            msg: 'Documento subido correctamente',
            error: false
        })
        return

    }

    const { msg } = alerta;
    return (
        <section className="mb-5">
            <h2 className="text-2xl font-base text-center mt-8">Documentación</h2>
            <NavSubcontratista />
            {/* FORMULARIO ARCHIVOS */}
            < div
                className="mt-8 bg-white py-8 px-5 h-max rounded-lg" >
                <form
                    onSubmit={handlesubmit}
                >

                    <p className="text-xl text-sky-500 font-semibold mt-2 mb-4">Documentos Subcontratista</p>
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

    )
}

export default Documentos