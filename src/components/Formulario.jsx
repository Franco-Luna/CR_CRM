import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ( { cliente, cargando, noEncontrado } ) => {

  const navigate = useNavigate();

  const validarClienteSchema = Yup.object().shape({
    nombre: Yup.string()
              .min(2, 'El nombre debe tener al menos 2 caracteres')
              .max(20, 'El nombre debe tener un máximo de 20 caracteres')
              .required('El nombre es obligatorio'),
    empresa: Yup.string()
              .required('El nombre de la empresa es obligatorio'),
    email: Yup.string()
              .email('El email no es válido')
              .required('El email es obligatorio'),
    telefono: Yup.number()
              .positive('El teléfono no es válido')
              .integer('El teléfono no es válido')
              .typeError('El teléfono no es válido')
  })

  const handleSubmit = async values => {
    try {
      if (cliente.id) {
        //Editar Cliente
        const url= `${import.meta.env.VITE_API_URL}/${cliente.id}`;
        await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } else {
        //Nuevo Cliente
        const url= import.meta.env.VITE_API_URL;
        await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      }
      navigate('/clientes');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    cargando ? <Spinner /> : noEncontrado ? <Alerta>Cliente ID no válido</Alerta> : (
      <div className='bg-white mt-10 p-10 rounded-xl shadow-md md:w-3/4 mx-auto'>
        <h2 className='text-gray-600 text-center text-xl font-bold uppercase'>{cliente?.nombre ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>

        <Formik
          initialValues={{
            nombre: cliente?.nombre ?? '',
            empresa: cliente?.empresa ?? '',
            email: cliente?.email ?? '',
            telefono: cliente?.telefono ?? '',
            notas: cliente?.notas ?? ''
          }}
          enableReinitialize={true}
          onSubmit={ async ( values, { resetForm } ) => {
            await handleSubmit(values);
            resetForm();
          }}
          validationSchema={validarClienteSchema}
        >
          { ( { errors, touched } ) => {
            return (
              <Form className='mt-10'>

                <div className='mb-4'>
                  <label htmlFor="nombre" className='text-gray-800'>Nombre:</label>
                  <Field
                    id='nombre'
                    type='text'
                    name='nombre'
                    className='block w-full bg-gray-50 p-3 mt-3 ml-3'
                    placeholder='Ingrese el nombre del cliente...'
                  />

                  { errors.nombre && touched.nombre ? (
                    <Alerta>{errors.nombre}</Alerta>
                  ) : null }
                </div>

                <div className='mb-4'>
                  <label htmlFor="empresa" className='text-gray-800'>Empresa:</label>
                  <Field
                    id='empresa'
                    type='text'
                    name='empresa'
                    className='block w-full bg-gray-50 p-3 mt-3 ml-3'
                    placeholder='Ingrese la empresa del cliente...'
                  />

                  { errors.empresa && touched.empresa ? (
                    <Alerta>{errors.empresa}</Alerta>
                  ) : null }
                </div>

                <div className='mb-4'>
                  <label htmlFor="email" className='text-gray-800'>Email:</label>
                  <Field
                    id='email'
                    type='email'
                    name='email'
                    className='block w-full bg-gray-50 p-3 mt-3 ml-3'
                    placeholder='Ingrese el email del cliente...'
                  />

                  { errors.email && touched.email ? (
                    <Alerta>{errors.email}</Alerta>
                  ) : null }
                </div>

                <div className='mb-4'>
                  <label htmlFor="telefono" className='text-gray-800'>Teléfono:</label>
                  <Field
                    id='telefono'
                    type='tel'
                    name='telefono'
                    className='block w-full bg-gray-50 p-3 mt-3 ml-3'
                    placeholder='Ingrese el teléfono del cliente...'
                  />

                  { errors.telefono && touched.telefono ? (
                    <Alerta>{errors.telefono}</Alerta>
                  ) : null }
                </div>

                <div className='mb-4'>
                  <label htmlFor="notas" className='text-gray-800'>Notas:</label>
                  <Field
                    as='textarea'
                    id='notas'
                    type='text'
                    name='notas'
                    className='block w-full bg-gray-50 p-3 mt-3 ml-3'
                    placeholder='Ingrese la notas del cliente...'
                  />
                </div>

                <input
                  type='submit'
                  value={cliente?.nombre ? 'Guardar Cambios' : 'Agregar Cliente'}
                  className='w-full bg-cyan-700 mt-5 p-3 text-white uppercase font-bold rounded-md hover:bg-cyan-900 cursor-pointer'
                />
              </Form>
            )
          }}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
  noEncontrado: false
}

export default Formulario