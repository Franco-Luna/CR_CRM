import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Formulario from "../components/Formulario"

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const [noEncontrado, setNoEncontrado] = useState(false);
  const { id } = useParams();

  useEffect( () => {
    const getClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setCliente(result);
        } else {
          setNoEncontrado(true);
        }
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    }
    getClienteAPI();
  }, [])

  return (
    <div className="xl:w-10/12 2xl:w-8/12 mx-auto">
      <h1 className="text-3xl text-center font-bold text-cyan-700">Editar Cliente</h1>
      <p className="text-center mt-4">Modifica el formulario para editar el cliente</p>
      <Formulario
        cliente={cliente}
        cargando={cargando}
        noEncontrado={noEncontrado}
      />
    </div>
  )
}

export default EditarCliente