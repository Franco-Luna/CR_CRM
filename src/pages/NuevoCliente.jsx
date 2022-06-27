import Formulario from "../components/Formulario"

const NuevoCliente = () => {
  return (
    <div className="xl:w-10/12 2xl:w-8/12 mx-auto">
      <h1 className="text-3xl text-center font-bold text-cyan-700">Nuevo Cliente</h1>
      <p className="text-center mt-4">Llena el formulario para agregar un nuevo cliente</p>
      <Formulario />
    </div>
  )
}

export default NuevoCliente