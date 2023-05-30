import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Summary from "../components/Summary"
import useQuiosco from "../hooks/useQuiosco"
import Modal from 'react-modal'
import ProductModal from "../components/ProductModal"
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth"


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root')

const Layout = () => {

  const {modal, handleClickModal, producto } = useQuiosco()
  const {user, error} = useAuth({middleware:'auth'})

  return (
    <>
      <div className="md:flex">
        <Sidebar />

        <main className='flex-1 px-4 h-screen overflow-y-scroll bg-amber-100'>
          <Outlet />
        </main>

        <Summary />
      </div>


      <Modal isOpen={modal} style={customStyles} >
        <ProductModal
          producto={producto}
        />
      </Modal>

      <ToastContainer autoClose={1500} />
    </>
  )
}

export default Layout
