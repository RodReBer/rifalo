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
import GeneratorPdf from './components/GeneratorPdf'
import { ProductProvider } from './contexts/productContext'
import Failure from './pages/failure.jsx'
import Success from './pages/success.jsx'
import Pending from './pages/pending.jsx'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbo8K8DFS7zuzVIOetU1CXp7TNPkOGkPo",
  authDomain: "rifalo-a17fc.firebaseapp.com",
  projectId: "rifalo-a17fc",
  storageBucket: "rifalo-a17fc.firebasestorage.app",
  messagingSenderId: "386673723111",
  appId: "1:386673723111:web:c62f665fac12d8b0c10442",
  measurementId: "G-DJZ6YEW2MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export default function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <ScrollToTop />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/terminos" element={<TerminosCondiciones />} />
              <Route path="/ganadores" element={<Ganadores />} />
              <Route path="/pagos" element={<MediosPago />} />
              <Route path="/generatorpdf" element={<GeneratorPdf />} />
              <Route path="/success" element={<Success />} />
              <Route path="/failure" element={<Failure />} />
              <Route path="/pending" element={<Pending />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </ProductProvider>
  )
}

