import React from 'react'

export default function MediosPago() {
    const mediosPago = [
        {
            nombre: 'Tarjeta de Crédito',
            descripcion: 'Visa, MasterCard, American Express',
            imagen: 'https://placehold.co/200x100?text=Credit+Cards',
        },
        {
            nombre: 'PayPal',
            descripcion: 'Rápido y seguro',
            imagen: 'https://placehold.co/200x100?text=PayPal',
        },
        {
            nombre: 'Transferencia Bancaria',
            descripcion: 'BROU, Santander, BBVA',
            imagen: 'https://placehold.co/200x100?text=Bank+Transfer',
        },
        {
            nombre: 'Efectivo',
            descripcion: 'En puntos de pago autorizados',
            imagen: 'https://placehold.co/200x100?text=Cash',
        },
    ]

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        M&eacute;todos de Pago
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Elige el m&eacute;todo que m&aacute;s te convenga para participar en nuestras rifas
                    </p>
                </div>
                <div className="mt-20">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {mediosPago.map((medio) => (
                            <div
                                key={medio.nombre}
                                className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="h-48 bg-gray-200">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={medio.imagen || "/placeholder.svg"}
                                        alt={medio.nombre}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {medio.nombre}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {medio.descripcion}
                                    </p>
                                    <div className="mt-4">
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                                        >
                                            M&aacute;s informaci&oacute;n &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

