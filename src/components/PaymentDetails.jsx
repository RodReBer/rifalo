import React from "react";

const PaymentDetails = ({ paymentMethod }) => {
  if (paymentMethod === "santander") {
    return (
      <div className="bg-gray-100 p-4 rounded-md mt-4">
        <h4 className="font-semibold mb-2">Datos para transferencia Santander:</h4>
        <p><strong>Titular:</strong> RIFALO S.A.</p>
        <p><strong>Número de cuenta:</strong> 1234567890</p>
        <p><strong>Sucursal:</strong> 01</p>
      </div>
    );
  }

  if (paymentMethod === "prex") {
    return (
      <div className="bg-gray-100 p-4 rounded-md mt-4">
        <h4 className="font-semibold mb-2">Datos para transferencia Prex:</h4>
        <p><strong>Titular:</strong> RIFALO S.A.</p>
        <p><strong>Número de cuenta:</strong> 0987654321</p>
      </div>
    );
  }

  return null;
};

export default PaymentDetails;