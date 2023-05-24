import Product from '../components/Product'
import { productos as data } from "../data/productos"
import useQuiosco from '../hooks/useQuiosco'

const Home = () => {
  const {categoriaActual} = useQuiosco()
  const productos = data.filter( dt => dt.categoria_id === categoriaActual.id)
  
  return (
    <>
      <h1 className='text-4xl font-black mt-4'>{categoriaActual.nombre}</h1>
      <p className='text-2xl my-8'>Elige y personaliza tu pedido a continuación</p>

      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {productos.map( producto => (
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
