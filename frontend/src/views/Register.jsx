import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import BeatLoader from "react-spinners/ClipLoader";
import Alert from "../components/Alert";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errores, setErrores] = useState([])
    const [loading, setLoading] = useState(false);
    const { register } = useAuth({ middleware: 'guest', url: '/' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(nameRef.current.value)
        const datos = {
            'name': nameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value,
            'password_confirmation': passwordConfirmationRef.current.value,
        }

        register(datos, setErrores, setLoading);

    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu Cuenta llenando el formulario</p>

            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-5">

                {loading ?
                    <div className="flex flex-col items-center">
                        <BeatLoader color="#FFC26F" className="py-4 m-4" />
                        <p className="tex-center my-4 text-amber-950">Registrando usuario e iniciando sesión...</p>
                    </div>
                    :
                    <form onSubmit={handleSubmit} noValidate >

                        {errores ? errores.map((error, i) => <Alert key={i}>{error}</Alert>) : null}
                        <div className="mb-4">
                            <label
                                className="text-slate-800"
                                htmlFor="name"
                            >Nombre:</label>
                            <input
                                type="text"
                                id="name"
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="name"
                                placeholder="Tu Nombre"
                                ref={nameRef}
                            />
                        </div>

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

                        <div className="mb-4">
                            <label
                                className="text-slate-800"
                                htmlFor="password_confirmation"
                            >Repetir Password:</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                className="mt-2 w-full p-3 bg-gray-50"
                                name="password_confirmation"
                                placeholder="Repetir Password"
                                ref={passwordConfirmationRef}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Crear Cuenta"
                            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                        />
                    </form>
                }
            </div>

            <nav className="mt-5">
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}

export default Register
