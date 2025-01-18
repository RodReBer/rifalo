import React from 'react'
import { Users, Gift, ShieldCheck, AlertTriangle, HelpCircle, Scale } from 'lucide-react'

const terminos = [
  {
    name: 'Participación',
    icon: Users,
    description: 'La participación en las rifas está sujeta a estos términos y condiciones. Los participantes deben ser mayores de 18 años.',
  },
  {
    name: 'Premios',
    icon: Gift,
    description: 'Los premios no son transferibles ni canjeables por dinero en efectivo. La compra de un boleto no garantiza la victoria.',
  },
  {
    name: 'Datos personales',
    icon: ShieldCheck,
    description: 'Al participar, los usuarios aceptan que sus datos sean utilizados para contactarlos en caso de resultar ganadores.',
  },
  {
    name: 'Modificaciones',
    icon: AlertTriangle,
    description: 'RIFALO se reserva el derecho de modificar o cancelar cualquier rifa en cualquier momento.',
  },
  {
    name: 'Notificaciones',
    icon: HelpCircle,
    description: 'Los ganadores serán notificados a través de los datos de contacto proporcionados al momento de la compra del boleto.',
  },
  {
    name: 'Responsabilidad',
    icon: Scale,
    description: 'RIFALO no se hace responsable por errores en la información proporcionada por los participantes.',
  },
]

export default function TerminosCondiciones() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Términos y Condiciones de RIFALO
          </h2>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
            En RIFALO, nos comprometemos a ofrecer una experiencia de rifa justa y transparente. 
            Nuestros términos y condiciones están diseñados para proteger tanto a los participantes 
            como a nuestra organización, asegurando un proceso claro y equitativo para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {terminos.map((termino) => (
            <div 
              key={termino.name} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                  <termino.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{termino.name}</h3>
                <p className="text-gray-500 text-sm">{termino.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Información Adicional</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Todas las rifas están sujetas a la legislación vigente en Uruguay.</li>
              <li>Los participantes deben proporcionar información precisa y actualizada.</li>
              <li>RIFALO se reserva el derecho de descalificar a cualquier participante que viole estos términos y condiciones.</li>
              <li>En caso de disputas, la decisión de RIFALO será final y vinculante.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Al participar en cualquier rifa de RIFALO, usted acepta estos términos y condiciones en su totalidad.
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            Si tiene alguna pregunta, no dude en <a href="#" className="text-blue-500 hover:underline">contactarnos</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

