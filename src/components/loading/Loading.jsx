

const Loading = ({ load }) => {
    return (
        <div className={`static ${load ? 'flex' : 'hidden'} `}>
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
    )
}

export default Loading