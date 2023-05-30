import clienteAxios from "../config/axios"
import useSWR from 'swr'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const useAuth = ({ middleware, url }) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .catch(error => {
                throw Error(error?.response?.data?.errors);
            })
    )

    const login = async (datos, setErrores, setLoading) => {
        try {
            const respuesta = await clienteAxios.post('/api/login', datos)
            //Guardamos el token en el localstorage
            localStorage.setItem('AUTH_TOKEN', respuesta.data.token)
            setErrores([])
            setLoading(true);
            await mutate()
            //console.log(respuesta.data.token)
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }
    const register = async (datos, setErrores, setLoading) => { 
        try {
            const respuesta = await clienteAxios.post('/api/register', datos)
            //console.log(respuesta.data.token)
            localStorage.setItem('AUTH_TOKEN', respuesta.data.token)
            setErrores([])
            setLoading(true);
            await mutate()
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors);  
        }

    }

    console.log(user)
    console.log(error)

    useEffect(() => {
        if (middleware === 'guest' && url && user) {
            navigate(url)
        }

        if (middleware === 'auth' && error) {
            navigate('/auth/login')
        }
    }, [user, error])


    return {
        login,
        register,
        logout,
        user,
        error
    }

}