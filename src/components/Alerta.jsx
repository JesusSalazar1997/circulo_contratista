

const Alerta = ({ alerta }) => {
    return (
        <>

            <div className={`${alerta.error ? 'bg-red-500' : 'bg-sky-500'} bg-gradient-to-br text-center px-2 py-2  text-white font-bold text-xs my-2`}>{alerta.msg}</div>


        </>
    )
}

export default Alerta