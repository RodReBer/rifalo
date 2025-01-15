import React from 'react'

export default function Ganadores() {
  const ganadores = [
    { 
      nombre: 'Ana Rodríguez', 
      premio: 'PlayStation 5', 
      fecha: '15/04/2025',
      boleto: '201',
      imagen: 'https://placehold.co/300x300?text=Ana'
    },
    { 
      nombre: 'Carlos Garcia', 
      premio: 'Nintendo Switch', 
      fecha: '20/03/2025',
      boleto: '089',
      imagen: 'https://placehold.co/300x300?text=Carlos'
    },
    { 
      nombre: 'Laura Martínez', 
      premio: 'Xbox Series X', 
      fecha: '10/02/2025',
      boleto: '456',
      imagen: 'https://placehold.co/300x300?text=Laura'
    },
  ]

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nuestros Ganadores
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Conoce a las personas afortunadas que ya disfrutan de sus premios
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ganadores.map((ganador) => (
              <div
                key={ganador.nombre}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover"
                    src={ganador.imagen || "/placeholder.svg"}
                    alt={ganador.nombre}
                  />
                  <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-bl-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    {ganador.boleto}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{ganador.nombre}</h3>
                  <p className="mt-2 text-lg text-blue-600 font-medium">{ganador.premio}</p>
                  <p className="mt-2 text-sm text-gray-500">Fecha del sorteo: {ganador.fecha}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

