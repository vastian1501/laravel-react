import useQuiosco from "../hooks/useQuiosco"

const Category = ({ categoria }) => {
  const { id, icono, nombre } = categoria
  const {handleClickCategoria, categoriaActual} = useQuiosco()

  return (
    <div className={`${ categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'} flex items-center gap-4 border-y w-full p-3 hover:bg-amber-400 cursor-pointer`}>
      <img src={`/img/icono_${icono}.svg`} alt={icono} className='w-10' />

      <button
        className='text-lg font-medium cursor-pointer truncate'
        type="button"
        onClick={ ()=> handleClickCategoria(id) }
      >{nombre}
      </button>
    </div>
  )
}

export default Category
