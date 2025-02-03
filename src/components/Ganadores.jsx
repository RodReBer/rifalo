import React from "react"
import { useProducts } from "../contexts/productContext"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Ticket } from "lucide-react"
import { Timestamp } from "firebase/firestore"

const Ganadores=()=> {
  const { products } = useProducts()

  const getValidDate = (timestamp) => {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate() // Para Firebase Timestamps
    } else if (typeof timestamp === "number" || typeof timestamp === "string") {
      const date = new Date(timestamp)
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()) // Elimina las horas
    } else {
      return null
    }
  }

  const ganadores = products.map((product) => {
    const fecha = getValidDate(product.endTime)
    return {
      ...product,
      ganador: {
        nombre: "Ganador no asignado",
        boleto: product.ticketW || Math.floor(Math.random() * product.totalTickets) + 1,
        fecha: fecha,
      },
    }
  })

  const today = new Date()
  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nuestros Ganadores</h2>
          <p className="mt-4 text-xl text-gray-500">
            Conoce a las personas afortunadas que ya disfrutan de sus premios
          </p>
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ganadores.map((ganador) => (
              <div
                key={ganador.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover"
                    src={ganador.image || "/placeholder.svg"}
                    alt={ganador.name}
                  />
                  {todayWithoutTime >= ganador.ganador.fecha && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-bl-lg flex items-center">
                      <Ticket className="w-5 h-5 mr-2" />
                      {ganador.ganador.boleto}
                    </div>
                  )}

                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{ganador.ganador.nombre}</h3>
                  <p className="mt-2 text-lg text-blue-600 font-medium">{ganador.name}</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Fecha del sorteo: {format(ganador.ganador.fecha, "d 'de' MMMM 'de' yyyy", { locale: es })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ganadores