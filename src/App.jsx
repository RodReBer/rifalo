import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import TerminosCondiciones from './components/TerminosCondiciones'
import Ganadores from './components/Ganadores'
import MediosPago from './components/MediosPago'
import ScrollToTop from './components/ScrollToTop'
import WhatsAppButton from './components/WhatsAppButton'


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <ScrollToTop />
        <main className="container mx-auto p-4 min-h-screen">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/terminos" element={<TerminosCondiciones />} />
            <Route path="/ganadores" element={<Ganadores />} />
            <Route path="/pagos" element={<MediosPago />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />

      </div>
    </Router>
  )
}

