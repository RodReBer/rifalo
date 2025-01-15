import React, { useState } from 'react'
import Timer from './Timer'

function ProductModal({ product, onClose, soldTickets }) {
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cedula, setCedula] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const ticketsPerPage = 100

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedTicket !== null) {
      const message = `Hola, me interesa el boleto número ${selectedTicket} para la rifa de *${product.name}*. Mis datos son: *Nombre*: ${name}, *Email*: ${email}, *Cédula*: ${cedula}`
      const whatsappUrl = `https://wa.me/59899129450?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
    }
  }

  const totalPages = Math.ceil(product.totalTickets / ticketsPerPage)
  const startTicket = (currentPage - 1) * ticketsPerPage + 1
  const endTicket = Math.min(currentPage * ticketsPerPage, product.totalTickets)

  const renderTicketButtons = () => {
    const buttons = []
    for (let i = startTicket; i <= endTicket; i++) {
      buttons.push(
        <button
          key={i}
          className={`p-1 text-xs rounded flex justify-center ${
            soldTickets.includes(i)
              ? 'bg-red-300 cursor-not-allowed'
              : i === selectedTicket
              ? 'bg-blue-600 text-white'
              : 'bg-green-100 hover:bg-blue-100'
          }`}
          onClick={() => setSelectedTicket(i)}
          disabled={soldTickets.includes(i)}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    )
  }

  const handleCedulaChange = (e) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length > 7) {
      value = value.slice(0, -1) + '-' + value.slice(-1)
    }
    if (value.length > 3) {
      value = value.slice(0, 1) + '.' + value.slice(1)
    }
    if (value.length > 7) {
      value = value.slice(0, 5) + '.' + value.slice(5)
    }
    setCedula(value)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side: Image slider and description */}
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">{product.name}</h2>
            
            {/* Image Slider */}
            <div className="relative">
              <img 
                src={product.images[currentImageIndex]} 
                alt={`${product.name} - imagen ${currentImageIndex + 1}`} 
                className=" h-64 object-cover rounded-lg mx-auto"
              />
              <button 
                onClick={prevImage} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &#10094;
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &#10095;
              </button>
            </div>

            <p className="text-gray-600">{product.description}</p>
            
            <p className="text-gray-600 font-bold">Precio del boleto: ${product.price}</p>
            
            <Timer endTime={product.endTime} />
          </div>

          {/* Right side: Ticket selection and purchase form */}
          <div className="md:w-1/2 space-y-4">
            <p className="text-gray-600 mb-2">Selecciona un número de boleto:</p>
            <div className="grid grid-cols-10 gap-1 mb-4">
              {renderTicketButtons()}
            </div>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-600">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
              />
              <input
                type="text"
                placeholder="Cédula (ej: 1.234.567-8)"
                value={cedula}
                onChange={handleCedulaChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
                maxLength="11"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  disabled={selectedTicket === null}
                >
                  Enviar por WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal

