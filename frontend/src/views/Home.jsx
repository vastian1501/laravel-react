import Product from '../components/Product'
//import { productos as data } from "../data/productos"
import useQuiosco from '../hooks/useQuiosco'
import useSWR from 'swr';
import clienteAxios from '../../config/axios';

const Home = () => {
  const { categoriaActual, productos } = useQuiosco()
  const fetcher = () => clienteAxios('/api/products').then(data => data.data)

  const { data, error, isLoading } = useSWR("/api/products", fetcher, {
    refreshInterval: 1000,
  })

  if (isLoading) return (
    <div className="looping-rhombuses-spinner">
      <div className="rhombus"></div>
      <div className="rhombus"></div>
      <div className="rhombus"></div>
    </div>
  )
  

  const productosFiltrados = data.data.filter(dt => dt.categoria_id === categoriaActual.id)
  return (
    <>
      <h1 className='text-4xl font-black mt-4'>{categoriaActual.nombre}</h1>
      <p className='text-2xl my-8'>Elige y personaliza tu pedido a continuación</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {productosFiltrados.map(producto => (
          <Product
            key={producto.id}
            producto={producto}
          />

        ))}

      </div>
    </>
  )
}

export default Home
