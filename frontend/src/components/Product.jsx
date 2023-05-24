import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const Product = ({ producto }) => {
    const { categoria_id, id, imagen, nombre, precio } = producto
    const { handleClickModal, handleSetProducto } = useQuiosco()
    return (
        <div className="border p-3 shadow-md bg-white rounded-md">
            <img src={`/img/${imagen}.jpg`} alt={imagen} className="w-full rounded-sm" />
            <div className="p-5">
                <h3 className="text-2xl font-semibold h-28">{nombre}</h3>
                <p className="font-semibold text-4xl text-amber-500">{formatearDinero(precio)}</p>
            </div>

            <div className="">
                <button 
                    className="shadow-md rounded-md uppercase w-full text-white bg-amber-600 text-center font-semibold py-4 hover:bg-amber-500"
                    onClick={ ()=> {handleClickModal(); handleSetProducto(producto)}}
                >
                    AÑADIR
                </button>
            </div>
        </div>
    )
}

export default Product
