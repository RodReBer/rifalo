import React from 'react'
import { CreditCard, Wallet, Building, DollarSign } from 'lucide-react'

export default function MediosPago() {
    const mediosPago = [
        {
            nombre: 'Tarjeta de Crédito',
            descripcion: 'Visa, MasterCard, American Express',
            icon: CreditCard,
        },
        {
            nombre: 'PayPal',
            descripcion: 'Rápido y seguro',
            icon: Wallet,
        },
        {
            nombre: 'Transferencia Bancaria',
            descripcion: 'BROU, Santander, BBVA',
            icon: Building,
        },
        {
            nombre: 'Efectivo',
            descripcion: 'En puntos de pago autorizados',
            icon: DollarSign,
        },
    ]

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Métodos de Pago
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Elige el método que más te convenga para participar en nuestras rifas
                    </p>
                </div>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {mediosPago.map((medio) => (
                            <div
                                key={medio.nombre}
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="p-6">
                                    <medio.icon className="h-12 w-12 text-blue-500 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {medio.nombre}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {medio.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Información Adicional de Pago</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-blue-700 mb-4">Depósito o Transferencia Bancaria</h4>
                            <p className="text-gray-600 mb-2"><span className="font-medium">Banco:</span> BROU</p>
                            <p className="text-gray-600 mb-2"><span className="font-medium">Titular:</span> RIFALO S.A.</p>
                            <p className="text-gray-600 mb-2"><span className="font-medium">Cuenta:</span> 123-456789-00</p>
                            <p className="text-gray-600 mb-2"><span className="font-medium">Cédula:</span> 1.234.567-8</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold text-green-700 mb-4">Pago en Efectivo</h4>
                            <p className="text-gray-600 mb-4">Puedes realizar tu pago en efectivo en cualquier local de RedPagos o Abitab.</p>
                            <p className="text-gray-600">Indica el siguiente código al momento de pagar:</p>
                            <p className="text-3xl font-bold text-green-600 mt-2">RIFALO2024</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center bg-yellow-50 p-4 rounded-lg">
                        <p className="text-yellow-700">
                            <span className="font-bold">Importante:</span> Una vez realizado el pago, envíanos el comprobante a <a href="mailto:pagos@rifalo.com" className="text-blue-600 hover:underline">pagos@rifalo.com</a> para confirmar tu participación.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

