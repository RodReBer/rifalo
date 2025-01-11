import React, { useState } from 'react'
import ProductCard from './ProductCard'
import ProductModal from './ProductModal'

const products = [
  { 
    id: 1, 
    name: 'PlayStation 5', 
    price: 100, 
    totalTickets: 300, 
    image: 'https://placehold.co/200x200?text=PS5',
    endTime: new Date('2025-01-15T23:59:59').getTime(),
    description: 'La PlayStation 5 es la última consola de Sony, ofreciendo gráficos de última generación y tiempos de carga ultrarrápidos.',
    images: [
      'https://placehold.co/400x300?text=PS5-1',
      'https://placehold.co/400x300?text=PS5-2',
      'https://placehold.co/400x300?text=PS5-3'
    ],
    soldTickets: [1, 5, 10, 15, 20]
  },
  { 
    id: 2, 
    name: 'Nintendo Switch', 
    price: 50, 
    totalTickets: 500, 
    image: 'https://placehold.co/200x200?text=Switch',
    endTime: new Date('2025-06-15T23:59:59').getTime(),
    description: 'La Nintendo Switch es una consola híbrida que te permite jugar en casa o en movimiento, con una amplia biblioteca de juegos exclusivos.',
    images: [
      'https://placehold.co/400x300?text=Switch-1',
      'https://placehold.co/400x300?text=Switch-2',
      'https://placehold.co/400x300?text=Switch-3'
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

function ProductList() {
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

export default ProductList

