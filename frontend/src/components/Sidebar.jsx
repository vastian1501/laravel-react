import Category from "./Category"
import useQuiosco from "../hooks/useQuiosco"
import { useAuth } from "../hooks/useAuth"


const Sidebar = () => {
  const { categorias } = useQuiosco()
  const { logout, user } = useAuth({middleware:'logout', url:'/auth/login'})
  const handleLogout = () =>{
    logout()
  }

  return (
    <div className='md:w-72 shadow-xl'>
      <div className="p-4">
        <img src="img/logo.svg" alt="Logo app" className="w-40" />
      </div>

      <div>
        <p className="text-center mt-4 font-medium">Hola {user?.name}</p>
      </div>

      <div className="mt-10">
        {categorias.map(categoria => (
          <Category
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </div>

      <button className="uppercase text-white text-lg bg-red-500 font-semibold p-2 text-center mt-10 w-full hover:bg-red-400" onClick={handleLogout}>
        Cancelar Pedido
      </button>
    </div>
  )
}

export default Sidebar
