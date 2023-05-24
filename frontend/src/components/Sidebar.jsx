import Category from "./Category"
import useQuiosco from "../hooks/useQuiosco"

const Sidebar = () => {
    const {categorias} = useQuiosco()
  return (
    <div className='md:w-72 shadow-xl'>
      <div className="p-4">
        <img src="img/logo.svg" alt="Logo app" className="w-40" />
      </div>

      <div className="mt-10">
        {categorias.map( categoria => (
            <Category
                key={categoria.id}
                categoria={categoria}
            />
        ))}
      </div>

      <button className="uppercase text-white text-lg bg-red-500 font-semibold p-2 text-center mt-10 w-full hover:bg-red-400">
        Cancelar Pedido
      </button>
    </div>
  )
}

export default Sidebar
