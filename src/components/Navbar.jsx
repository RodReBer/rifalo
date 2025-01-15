import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">RIFALO</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
              <Link to="/terminos" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Términos y Condiciones</Link>
              <Link to="/ganadores" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Ganadores</Link>
              <Link to="/pagos" className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Medios de Pago</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none">
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Inicio</Link>
            <Link to="/terminos" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Términos y Condiciones</Link>
            <Link to="/ganadores" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Ganadores</Link>
            <Link to="/pagos" className="hover:bg-blue-700 block px-3 py-2 rounded-md text-base font-medium">Medios de Pago</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

