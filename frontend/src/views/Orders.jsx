import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const Orders = () => {
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = () => clienteAxios('/api/orders', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const { data, error, isLoading } = useSWR('/api/orders', fetcher,{refreshInterval:1000})

    const { handleClickCompletarOrden } = useQuiosco();

    console.log(data?.data)
    console.log(error)
    console.log(isLoading)

    if (isLoading) return 'Cargando...'

    return (
        <div>
            <h1 className='text-4xl font-black'>Ordenes</h1>
            <p className='text-2xl my-10'>
                Administra las ordenes desde aquí.
            </p>

            <div className='grid grid-cols-3 gap-4'>
                {data.data.data.map(pedido => (
                    <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b">
                        <p className='text-xl font-bold text-slate-600 text-center uppercase pb-4 border-b '>Pedido nº {pedido.id}</p>
                        <p className='text-lg font-bold text-slate-600'>
                            Contenido del Pedido:
                        </p>

                        {pedido.productos.map(producto => (
                            <div
                                key={producto.id}
                                className='border-b border-b-slate-200 last-of-type:border-none py-4'
                            >
                                <p className='text-sm'>ID: {producto.id}</p>
                                <p>{producto.nombre}</p>
                                <p>
                                    Cantidad: {''}
                                    <span className='font-bold'>{producto.pivot.cantidad}</span>
                                </p>

                            </div>
                        ))}

                        <p className='text-lg font-bold text-slate-600'>
                            Cliente: {''}
                            <span className='font-normal'>{pedido.user.name}</span>
                        </p>

                        <p className='text-lg font-bold text-amber-500'>
                            Total a Pagar: {''}
                            <span className='font-normal text-slate-600'>{formatearDinero(pedido.total)}</span>
                        </p>

                        <button
                            type="button"
                            className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
                            onClick={() => handleClickCompletarOrden (pedido.id)}
                        >Completar</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
