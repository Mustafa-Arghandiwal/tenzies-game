
export default function Tenzi(props) {
    return (
        <button style={{backgroundColor: props.frozen ? "#00b8b4" : undefined}} onClick={() => props.freeze(props.index)} 
        className=" py-3 w-16  bg-white drop-shadow-xl rounded-md text-2xl grid place-items-center
        cursor-pointer active:scale-95 duration-75 transition-all">
            {props.num}
            
        </button>
    )
}