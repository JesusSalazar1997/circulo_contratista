

const Loading = ({ load }) => {
    return (
        <div className={`sticky top-1/3 static ${load ? 'flex' : 'hidden'} `}>
            <div className="absolute medidas-spine">
                <div className=" z-40 lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p className="z-50 text-white font-semibold text-md absolute">Cargando Espere...</p>
            </div>
            <div className="z-30 flex fixed inset-0 bg-gray-800 opacity-75">
            </div>

        </div>
    )
}

export default Loading