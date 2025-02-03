import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Loader from './Loader';
import { useProducts } from '../contexts/productContext';
import { Gift, Ticket, Trophy } from 'lucide-react';

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { products, loading, error } = useProducts();

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  // Mostrar Loader mientras los datos se cargan
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // Mostrar mensaje de error si hay un problema
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Rifas Exclusivas
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Participa en nuestras rifas y gana incre&iacute;bles premios. ¡Tu suerte te espera!
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-16">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ¿C&oacute;mo funciona?
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center">
                  <Gift className="w-16 h-16 text-blue-600 mb-4" />
                  <dt className="text-sm font-medium text-gray-500 mb-2">Paso 1</dt>
                  <dd className="text-2xl font-semibold text-gray-900 mb-2">
                    Elige tu rifa
                  </dd>
                  <p className="text-sm text-gray-600">
                    Explora nuestra selecci&oacute;n de incre&iacute;bles premios
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-green-200 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center">
                  <Ticket className="w-16 h-16 text-green-600 mb-4" />
                  <dt className="text-sm font-medium text-gray-500 mb-2">Paso 2</dt>
                  <dd className="text-2xl font-semibold text-gray-900 mb-2">
                    Compra tu boleto
                  </dd>
                  <p className="text-sm text-gray-600">
                    Selecciona tus n&uacute;meros de la suerte y realiza el pago
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 overflow-hidden shadow-lg rounded-lg transition-transform duration-300 hover:scale-105">
                <div className="px-4 py-5 sm:p-6 flex flex-col items-center text-center">
                  <Trophy className="w-16 h-16 text-yellow-600 mb-4" />
                  <dt className="text-sm font-medium text-gray-500 mb-2">Paso 3</dt>
                  <dd className="text-2xl font-semibold text-gray-900 mb-2">
                    ¡Gana premios!
                  </dd>
                  <p className="text-sm text-gray-600">
                    Espera el sorteo y prep&aacute;rate para ganar
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
  );
}

export default ProductList;