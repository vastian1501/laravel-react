import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import Alert from "../components/Alert";
import BeatLoader from "react-spinners/ClipLoader";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errores, setErrores] = useState([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    })
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(nameRef.current.value)
        const datos = {
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
        }

        login(datos, setErrores, setLoading)
    }

    return (
        <>
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                {loading ?
                    <div className="flex flex-col items-center">
                        <BeatLoader color="#FFC26F" className="py-4 m-4" />
                        <p className="tex-center my-4 text-amber-950">Iniciando sesión...</p>
                    </div>
                    :
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >

                        {errores ? errores.map((error, i) => <Alert key={i}>{error}</Alert>) : null}
                        <div className="mb-4">
                            <label
                                className="text-slate-800"
                                htmlFor="email"
                            >Email:</label>
                            <input
                                type="email"
                                id="email"
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="email"
                                placeholder="Tu Email"
                                ref={emailRef}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="text-slate-800"
                                htmlFor="password"
                            >Password:</label>
                            <input
                                type="password"
                                id="password"
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="password"
                                placeholder="Tu Password"
                                ref={passwordRef}
                            />
                        </div>


                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                        />
                    </form>
                }
            </div>

            <nav className="mt-5">
                <Link to="/auth/register">
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}

export default Login
