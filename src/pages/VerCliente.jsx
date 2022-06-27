import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import Alerta from '../components/Alerta'

const VerCliente = () => {

  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const { id } = useParams();

  useEffect( () => {
    const getClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    }
    getClienteAPI();
  }, [])
  return (
    cargando ? <Spinner /> : Object.keys(cliente).length === 0 ? <Alerta>Cliente ID no válido</Alerta> : (
      <div className="xl:w-10/12 2xl:w-8/12 mx-auto">
        <h1 className="text-3xl text-center font-bold text-cyan-700">Ver Cliente</h1>
        <p className="text-center mt-4">Información del Cliente:</p>

        <div className='border max-w-xl p-3 mt-10 mx-auto bg-white'>
          {cliente.nombre && (
            <p className='text-gray-600 font-bold p-5 border-b last:border-0 hover:bg-gray-100'><span className='text-gray-800'>Nombre: </span>{cliente.nombre}</p>
          )}
          {cliente.email && (
            <p className='text-gray-600 font-bold p-5 border-b last:border-0 hover:bg-gray-100'><span className='text-gray-800'>Email: </span>{cliente.email}</p>
          )}
          {cliente.telefono && (
            <p className='text-gray-600 font-bold p-5 border-b last:border-0 hover:bg-gray-100'><span className='text-gray-800'>Teléfono: </span>{cliente.telefono}</p>
          )}
          {cliente.empresa && (
            <p className='text-gray-600 font-bold p-5 border-b last:border-0 hover:bg-gray-100'><span className='text-gray-800'>Empresa: </span>{cliente.empresa}</p>
          )}
          {cliente.notas && (
            <p className='text-gray-600 font-bold p-5 hover:bg-gray-100'><span className='text-gray-800'>Notas: </span>{cliente.notas}</p>
          )}
        </div>
      </div>
    )
  )
}

export default VerCliente