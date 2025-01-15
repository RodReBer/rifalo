import React, { useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

//baccio images
import baccio1 from '../assets/baccio/baccio-1.webp'
import baccio2 from '../assets/baccio/baccio-2.webp'
import baccio3 from '../assets/baccio/baccio-3.webp'
import baccio4 from '../assets/baccio/baccio-4.webp'
import baccio5 from '../assets/baccio/baccio-5.webp'
import baccio6 from '../assets/baccio/baccio-6.webp'

//ps5 images
import ps5_1 from '../assets/ps5/ps5-1.webp'
import ps5_2 from '../assets/ps5/ps5-2.webp'
import ps5_3 from '../assets/ps5/ps5-3.webp'

const products = [
  { 
    id: 1, 
    name: 'PlayStation 5', 
    price: 200, 
    totalTickets: 300, 
    image: 'https://www.rosashermanos.com.uy/imgs/productos/_original_16392.jpg',
    endTime: new Date('2025-05-20T23:59:59').getTime(),
    description: 'La PlayStation 5 es la última consola de Sony, ofreciendo gráficos de última generación y tiempos de carga ultrarrápidos.',
    images: [
      ps5_1,
      ps5_2,
      ps5_3
    ],
    soldTickets: [1, 5, 10, 15, 20, 201, 202, 203, 204, 205]
  },
  { 
    id: 2, 
    name: 'Baccio classic 125cc', 
    price: 2400, 
    totalTickets: 500, 
    image: baccio1,
    endTime: new Date('2025-06-15T23:59:59').getTime(),
    description: 'La Baccio Classic 125cc es una moto clásica con un diseño moderno y un motor de 125cc, perfecta para moverse por la ciudad. Incluye obsequios: casco y chaleco reflectivo.',
    images: [
      baccio1,
      baccio2,
      baccio3,
      baccio4,
      baccio5,
      baccio6
    ],
    soldTickets: [2, 7, 12, 17, 22]
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          ticketsSold={product.soldTickets.length}
          onClick={() => handleProductClick(product)}
        />
      ))}
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

