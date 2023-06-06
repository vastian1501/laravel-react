import { createContext, useEffect, useState } from "react"
import { categorias as categoriasDB } from "../data/categorias"
import { toast } from 'react-toastify'
import clienteAxios from "../config/axios"



const QuioscoContext = createContext()
const QuioscoProvider = ({ children }) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [modal, setModal] = useState(false)
    const [producto, setProducto] = useState({})
    //const [productos, setProductos] = useState([])
    const [pedido, setPedido] = useState([])
    const [total, setTotal] = useState(0)

    const obtenerCategorias = async () => {
        try {
            const { data } = await clienteAxios('/api/categories')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {

        }
    }

    // const obtenerProductos = async () => {
    //     try {
    //         const {data} = await clienteAxios('/api/products')
    //         setProductos(data.data)
    //         //console.log(data.data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        obtenerCategorias();
        //obtenerProductos();
    }, [])


    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0);
        setTotal(nuevoTotal)
    }, [pedido])


    const handleClickCategoria = id => {
        const ct = categorias.filter(categoria => categoria.id === id)
        setCategoriaActual(ct[0])
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({ categoria_id, ...producto }) => {
        if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const pedidoEdit = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoEdit)
            toast.info('Se ha actualizado el producto')
        } else {
            setPedido([...pedido, producto])
            toast.success('Producto agregado correctamente')
        }

    }

    const handleEditarProducto = id => {
        const productoEditar = pedido.filter(pd => pd.id === id)[0]
        setProducto(productoEditar)
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const productos = pedido.filter(pd => pd.id !== id)
        setPedido(productos)
        toast.success('Se ha eliminado correctamente')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.post('api/orders',
                {
                    'total': total,
                    'productos': pedido.map(producto => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad,
                        }
                    })
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

            toast.success(data.message)
            setTimeout(() => {
                setPedido([]);
            }, 1000);

            setTimeout(() => {
                logout()
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCompletarOrden = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            await clienteAxios.put(`api/orders/${id}`, null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

        toast.success('Orden nº completada')
        } catch(error) {
            console.log(error)
        }
        toast.success('Orden nº completada')
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
                handleEliminarProducto,
                handleSubmitNuevaOrden,
                handleClickCompletarOrden
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