import React, { useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'
import { Gift, Ticket, Trophy } from 'lucide-react'

import baccio1 from "../assets/baccio/baccio-1.webp"
import baccio2 from "../assets/baccio/baccio-2.webp"
import baccio3 from "../assets/baccio/baccio-3.webp"
import baccio4 from "../assets/baccio/baccio-4.webp"
import baccio5 from "../assets/baccio/baccio-5.webp"
import baccio6 from "../assets/baccio/baccio-6.webp"

import ps51 from "../assets/ps5/ps5-1.webp"
import ps52 from "../assets/ps5/ps5-2.webp"
import ps53 from "../assets/ps5/ps5-3.webp"


const products = [
  { 
    id: 1, 
    name: 'PlayStation 5', 
    price: 100, 
    totalTickets: 300, 
    image: ps53,
    endTime: new Date('2025-05-20T23:59:59').getTime(),
    description: 'La PlayStation 5 es la última consola de Sony, ofreciendo gráficos de última generación y tiempos de carga ultrarrápidos.',
    images: [
      ps51,
      ps52,
      ps53
    ],
    soldTickets: [1, 5, 10, 15, 20]
  },
  { 
    id: 2, 
    name: 'Baccio classic 125cc', 
    price: 200, 
    totalTickets: 475, 
    image: baccio1,
    endTime: new Date('2025-06-15T23:59:59').getTime(),
    description: 'La Baccio Classic 125cc es una moto elegante y eficiente, perfecta para la ciudad.',
    images: [
      baccio1,
      baccio2,
      baccio3,
      baccio4,
      baccio5,
      baccio6
    ],
    soldTickets: [2, 7, 12, 22, 222, 345, 400, 460, 143, 178 ]
  },
  { 
    id: 3, 
    name: 'Xbox Series X', 
    price: 80, 
    totalTickets: 1000, 
    image: 'https://placehold.co/200x200?text=Xbox',
    endTime: new Date('2025-07-01T23:59:59').getTime(),
    description: 'La Xbox Series X es la consola más potente de Microsoft, ofreciendo juegos en 4K y una experiencia de juego fluida y rápida.',
    images: [
      'https://placehold.co/400x300?text=Xbox-1',
      'https://placehold.co/400x300?text=Xbox-2',
      'https://placehold.co/400x300?text=Xbox-3'
    ],
    soldTickets: [3, 8, 13, 18, 23]
  },
]

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleProductClick = (product) => {
    setSelectedProduct(product)
  }

  const handleCloseModal = () => {
    setSelectedProduct(null)
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Rifas Exclusivas
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Participa en nuestras rifas y gana increíbles premios. ¡Tu suerte te espera!
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-16">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo funciona?
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center">
                  <Gift className="w-16 h-16 text-blue-600 mb-4" />
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Paso 1
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900 mb-2">
                    Elige tu rifa
                  </dd>
                  <p className="text-sm text-gray-600">
                    Explora nuestra selección de increíbles premios
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center">
                  <Ticket className="w-16 h-16 text-green-600 mb-4" />
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Paso 2
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900 mb-2">
                    Compra tu boleto
                  </dd>
                  <p className="text-sm text-gray-600">
                    Selecciona tus números de la suerte y realiza el pago
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center">
                  <Trophy className="w-16 h-16 text-yellow-600 mb-4" />
                  <dt className="text-sm font-medium text-gray-500 mb-2">
                    Paso 3
                  </dt>
                  <dd className="text-2xl font-semibold text-gray-900 mb-2">
                    ¡Gana premios!
                  </dd>
                  <p className="text-sm text-gray-600">
                    Espera el sorteo y prepárate para ganar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rifas Destacadas</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                ticketsSold={product.soldTickets.length}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          soldTickets={selectedProduct.soldTickets}
        />
      )}
    </div>
  )
}

