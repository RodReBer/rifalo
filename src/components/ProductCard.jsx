import React from 'react'
import Timer from './Timer'

const ProductCard=({ product, ticketsSold, onClick })=> {
  // Calcular el tiempo restante en segundos
  const remainingTime = calculateTimeLeft(product.endTime)
  const isNearDeadline = remainingTime <= 7 * 24 * 60 * 60 // Menos de una semana

  function calculateTimeLeft(targetTime) {
    const endTimeInMs = targetTime.seconds * 1000 + targetTime.nanoseconds / 1000000
    const difference = endTimeInMs - Date.now()
    return Math.max(0, Math.floor(difference / 1000)) // Retorna el tiempo restante en segundos
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer" onClick={onClick}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold text-blue-600 mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">Precio del boleto: ${product.ticketPrice}</p>
      <p className="text-gray-600 mb-4">Boletos vendidos: {ticketsSold} / {product.totalTickets}</p>
      <Timer endTime={product.endTime} isNearDeadline={isNearDeadline} />
    </div>
  )
}

export default ProductCard
