import React from 'react'

const terminos = [
  {
    name: 'Participación',
    imageSrc: 'https://placehold.co/64x64?text=P',
    description: 'La participación en las rifas está sujeta a estos términos y condiciones. Los participantes deben ser mayores de 18 años.',
  },
  {
    name: 'Premios',
    imageSrc: 'https://placehold.co/64x64?text=P',
    description: 'Los premios no son transferibles ni canjeables por dinero en efectivo. La compra de un boleto no garantiza la victoria.',
  },
  {
    name: 'Datos personales',
    imageSrc: 'https://placehold.co/64x64?text=D',
    description: 'Al participar, los usuarios aceptan que sus datos sean utilizados para contactarlos en caso de resultar ganadores.',
  },
]

export default function TerminosCondiciones() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                Términos y Condiciones de RIFALO
              </h2>
              <p className="mt-4 text-gray-500">
                En RIFALO, nos comprometemos a ofrecer una experiencia de rifa justa y transparente. 
                Nuestros términos y condiciones están diseñados para proteger tanto a los participantes 
                como a nuestra organización, asegurando un proceso claro y equitativo para todos.
              </p>
            </div>
            <img
              alt="Imagen representativa de términos y condiciones"
              src="https://placehold.co/600x400?text=Términos+y+Condiciones"
              className="aspect-[3/2] w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {terminos.map((termino) => (
              <div key={termino.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <img alt="" src={termino.imageSrc || "/placeholder.svg"} className="size-16" />
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-sm font-medium text-gray-900">{termino.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{termino.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-sm text-gray-500">
            <p>RIFALO se reserva el derecho de modificar o cancelar cualquier rifa en cualquier momento.</p>
            <p className="mt-2">Los ganadores serán notificados a través de los datos de contacto proporcionados al momento de la compra del boleto.</p>
            <p className="mt-2">RIFALO no se hace responsable por errores en la información proporcionada por los participantes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

