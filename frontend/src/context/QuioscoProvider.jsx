import { createContext, useEffect, useState } from "react"
import { categorias as categoriasDB } from "../data/categorias"
import { toast } from 'react-toastify'


const QuioscoContext = createContext()
const QuioscoProvider = ({children}) =>{

    const [categorias, setCategorias] = useState(categoriasDB)
    const [categoriaActual, setCategoriaActual] = useState(categorias[0])
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total , 0);
        setTotal(nuevoTotal)
    }, [pedido])
    

    const handleClickCategoria = id =>{
        const ct = categorias.filter( categoria => categoria.id === id)
        setCategoriaActual(ct[0])
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) =>{
        if(pedido.some( pedidoState => pedidoState.id === producto.id)){
            const pedidoEdit = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoEdit)
            toast.info('Se ha actualizado el producto')
        }else{
            setPedido([...pedido, producto])
            toast.success('Producto agregado correctamente')
        }

    }

    const handleEditarProducto = id =>{
        const productoEditar = pedido.filter( pd => pd.id === id )[0]
        setProducto(productoEditar)
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const productos = pedido.filter( pd => pd.id !== id )
        setPedido(productos)
        toast.success('Se ha eliminado correctamente')
    }


    return (
        <QuioscoContext.Provider
            value={{ 
                categorias,
                categoriaActual,
                modal,
                producto,
                pedido,
                total,
                handleClickCategoria,
                handleClickModal,
                handleSetProducto,
                handleAgregarPedido, 
                handleEditarProducto,
                handleEliminarProducto
             }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext