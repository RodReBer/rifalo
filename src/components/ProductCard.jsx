import React from 'react'
import Timer from './Timer'

function ProductCard({ product, ticketsSold, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 cursor-pointer" onClick={onClick}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold text-blue-600 mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">Precio del boleto: ${product.price}</p>
      <p className="text-gray-600 mb-4">Boletos vendidos: {ticketsSold} / {product.totalTickets}</p>
      <Timer endTime={product.endTime} />
    </div>
  )
}

export default ProductCard

