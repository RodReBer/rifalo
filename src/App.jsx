import React from 'react'
import ProductList from './components/ProductList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold text-center">Rifas Disponibles</h1>
      </header>
      <main className="container mx-auto p-4">
        <ProductList />
      </main>
    </div>
  )
}

export default App

