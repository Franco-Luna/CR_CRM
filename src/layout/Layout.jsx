import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

    const location = useLocation();
    const urlActual = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">

        <div className="md:w-1/4 xl:w-1/6 bg-cyan-700 px-5 py-10">
            <h2 className='text-4xl text-center text-white font-black'>CRM</h2>
            <nav className='mt-10'>
                <Link 
                    className={`${ urlActual === '/clientes' ? 'bg-cyan-900' : ''} text-xl text-white block px-4 py-3 rounded-xl mt-2 hover:bg-cyan-900`}
                    to="/clientes"
                >Clientes</Link>
                <Link 
                    className={`${ urlActual === '/clientes/nuevo' ? 'bg-cyan-900' : ''} text-xl text-white block px-4 py-3 rounded-xl mt-2 hover:bg-cyan-900`}
                    to="/clientes/nuevo"
                >Nuevo Cliente</Link>
            </nav>
        </div>

        <div className="md:w-3/4 xl:w-5/6 md:h-screen overflow-auto p-10">
            <Outlet />
        </div>

    </div>
  )
}

export default Layout