import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'
import Spinner from '../components/Spinner'

const Inicio = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect( () => {
    const getClientesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const response = await fetch(url);
        const result = await response.json();
        setClientes(result);
        console.log(clientes)
        setCargando(false);
      } catch (error) {
        console.log(error)
      }
    }
    getClientesAPI();
  }, [])

  const handleEliminarCliente = async id => {
    const confirmar = confirm('¿Está seguro que desea eliminar este cliente?');
    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url, {
          method: 'DELETE'
        })
        if (response.ok) {
          const clientesActualizado = clientes.filter( cliente => cliente.id !== id );
          setClientes(clientesActualizado);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      <h1 className="text-3xl text-center font-bold text-cyan-700">Clientes</h1>
      <p className="text-center mt-4">Administra tus Clientes</p>

      {cargando ? <Spinner /> : clientes.length ? (
        <table className='w-full 2xl:w-4/5 mx-auto bg-white table-auto shadow-md mt-10'>
          <thead className='bg-cyan-700 text-white'>
            <tr>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Empresa</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientes.map( cliente => (
              <Cliente
                key={cliente.id}
                cliente={cliente}
                handleEliminarCliente={handleEliminarCliente}
              />
            ))}
          </tbody>
        </table>
        ) : <p className='mt-5'>No hay clientes agregados...</p>
      }
    </>
  )
}

export default Inicio