import { useNavigate } from 'react-router-dom'

const Cliente = ( { cliente, handleEliminarCliente } ) => {

    const navigate = useNavigate();
    const { nombre, empresa, email, telefono, notas, id } = cliente;

  return (
    <tr className="border-b hover:bg-gray-100">
        <td className="p-3">{nombre}</td>
        <td className="p-3">
            <p><span className="text-gray-800 font-bold uppercase">Email: </span>{email}</p>
            <p><span className="text-gray-800 font-bold uppercase">Teléfono: </span>{telefono}</p>
        </td>
        <td className="p-3">{empresa}</td>
        <td className="p-3 flex gap-3 flex-col xl:flex-row">
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 flex-1 text-sm text-white font-bold p-3 rounded-lg "
                onClick={ () => navigate(`/clientes/${id}`) }
            >Ver</button>
            <button
                type="button"
                className="bg-amber-400 hover:bg-yellow-500 flex-1 text-sm text-white font-bold p-3 rounded-lg"
                onClick={ () => navigate(`/clientes/editar/${id}`) }
            >Editar</button>
            <button
                type="button"
                className="bg-red-600 hover:bg-red-700 flex-1 text-sm text-white font-bold p-3 rounded-lg"
                onClick={ () => handleEliminarCliente(id) }
            >Eliminar</button>
        </td>
    </tr>
  )
}

export default Cliente