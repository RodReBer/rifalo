import { useState, useEffect } from "react";
import Timer from "./Timer";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { initMercadoPago } from "@mercadopago/sdk-react";

initMercadoPago(import.meta.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY);

const ProductModal = ({ product, onClose, soldTickets }) => {
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [cedula, setCedula] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTimeExpired, setIsTimeExpired] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showMercadoPagoButton, setShowMercadoPagoButton] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const ticketsPerPage = 100;

  const openModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const remainingTime = calculateTimeLeft(product.endTime);
      if (remainingTime <= 0) {
        setIsTimeExpired(true);
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [product.endTime]);

  useEffect(() => {
    const isComplete =
      selectedTickets.length > 0 &&
      name.trim() !== "" &&
      lastName.trim() !== "" &&
      phone.trim() !== "" &&
      cedula.trim() !== "" &&
      email.trim() !== "" &&
      paymentMethod !== "" &&
      termsAccepted;

    setIsFormComplete(isComplete);
  }, [selectedTickets, name, lastName, phone, cedula, email, paymentMethod, termsAccepted]);

  function calculateTimeLeft(targetTime) {
    const endTimeInMs = targetTime.seconds * 1000 + targetTime.nanoseconds / 1000000;
    const difference = endTimeInMs - Date.now();
    return Math.max(0, Math.floor(difference / 1000));
  }

  const sendConfirmationEmail = async (ticketInfo) => {
    try {
      const templateParams = {
        name: name,
        lastName: lastName,
        phone: phone,
        cedula: cedula,
        email: email,
        product: product.name,
        tickets: ticketInfo,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      };

      const emailData = {
        service_id: import.meta.env.REACT_APP_EMAILJS_SERVICE_ID,
        template_id: import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        user_id: import.meta.env.REACT_APP_EMAILJS_USER_ID,
        template_params: templateParams,
      };

      await emailjs.send(
        emailData.service_id,
        emailData.template_id,
        emailData.template_params,
        emailData.user_id
      );
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const calculatePrice = (basePrice) => {
    return paymentMethod === "mercadopago" ? basePrice * 1.1 : basePrice;
  };

  const handleMercadoPagoPayment = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isProcessingPayment) return;
    setIsProcessingPayment(true);

    try {
      if (!isFormComplete) {
        openModal("Por favor, completa todos los campos del formulario antes de proceder al pago.");
        return;
      }

      const unitPrice = calculatePrice(product.ticketPrice);
      const totalAmount = selectedTickets.length * unitPrice;

      const preference = {
        items: [
          {
            title: `Boletos para ${product.name}`,
            unit_price: unitPrice,
            quantity: selectedTickets.length,
          },
        ],
        payer: {
          name: name,
          surname: lastName,
          email: email,
          phone: {
            number: phone,
          },
          identification: {
            type: "CI",
            number: cedula,
          },
        },
      };

      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(preference),
      });

      const data = await response.json();

      if (data.id) {
        window.open(data.init_point, "_blank");

        // Enviar correo después de abrir la ventana de pago
        const ticketNumbers = selectedTickets.join(", ");
        const emailSent = await sendConfirmationEmail(ticketNumbers);

        if (emailSent) {
          openModal("¡Proceso completado! Se ha enviado un correo de confirmación.");
        } else {
          openModal("Pago realizado pero hubo un error al enviar el correo de confirmación");
        }

        // Cerrar el modal principal después de 3 segundos
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        throw new Error("Failed to create preference");
      }
    } catch (error) {
      console.error("Error creating MercadoPago payment link:", error);
      openModal("Hubo un error al generar el link de pago. Por favor, intenta nuevamente.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      setShowAlert(true);
      openModal("Por favor, completa todos los campos del formulario y acepta los términos y condiciones.");
      return;
    }

    if (selectedTickets.length > 0 && paymentMethod !== "mercadopago") {
      const ticketNumbers = selectedTickets.join(", ");
      const totalAmount = selectedTickets.length * calculatePrice(product.ticketPrice);

      const message = `Hola, me interesan los boletos número ${ticketNumbers} para la rifa de *${product.name}*. 
Mis datos son: 
*Nombre*: ${name} ${lastName}
*Teléfono*: ${phone}
*Cédula*: ${cedula}
*Correo*: ${email}
*Método de pago*: ${paymentMethod}

*Total a pagar*: $${totalAmount.toFixed(2)}`;

      const whatsappUrl = `https://wa.me/59899129450?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      try {
        const emailSent = await sendConfirmationEmail(ticketNumbers);
        if (emailSent) {
          openModal("¡Compra realizada con éxito! Se ha enviado un correo de confirmación.");
        } else {
          throw new Error("Failed to send confirmation email");
        }
      } catch (error) {
        openModal(
          "La compra se ha realizado, pero hubo un problema al enviar el correo de confirmación. Por favor, contacta al soporte."
        );
      } finally {
        onClose();
      }
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowMercadoPagoButton(method === "mercadopago");
  };

  const totalPages = Math.ceil(product.totalTickets / ticketsPerPage);
  const startTicket = (currentPage - 1) * ticketsPerPage + 1;
  const endTicket = Math.min(currentPage * ticketsPerPage, product.totalTickets);

  const handleTicketSelection = (ticketNumber) => {
    if (selectedTickets.includes(ticketNumber)) {
      setSelectedTickets(selectedTickets.filter((t) => t !== ticketNumber));
    } else {
      setSelectedTickets([...selectedTickets, ticketNumber]);
    }
  };

  const renderTicketButtons = () => {
    const buttons = [];
    for (let i = startTicket; i <= endTicket; i++) {
      buttons.push(
        <button
          key={i}
          className={`p-1 text-xs rounded ${
            soldTickets.includes(i)
              ? "bg-red-300 cursor-not-allowed"
              : isTimeExpired
              ? "bg-green-100 cursor-not-allowed"
              : selectedTickets.includes(i)
              ? "bg-blue-600 text-white"
              : "bg-green-100 hover:bg-blue-100"
          }`}
          onClick={() => !isTimeExpired && !soldTickets.includes(i) && handleTicketSelection(i)}
          disabled={isTimeExpired || soldTickets.includes(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? product.images.length - 1 : prevIndex - 1));
  };

  const handleCedulaChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 7) {
      value = value.slice(0, -1) + "-" + value.slice(-1);
    }
    if (value.length > 3) {
      value = value.slice(0, 1) + "." + value.slice(1);
    }
    if (value.length > 7) {
      value = value.slice(0, 5) + "." + value.slice(5);
    }
    setCedula(value);
  };

  const totalAmount = selectedTickets.length * calculatePrice(product.ticketPrice);

  const renderPaymentDetails = () => {
    switch (paymentMethod) {
      case "santander":
        return (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h4 className="font-semibold mb-2">Datos para transferencia Santander:</h4>
            <p>
              <strong>Titular:</strong> RIFALO S.A.
            </p>
            <p>
              <strong>Número de cuenta:</strong> 1234567890
            </p>
            <p>
              <strong>Sucursal:</strong> 01
            </p>
          </div>
        );
      case "prex":
        return (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h4 className="font-semibold mb-2">Datos para transferencia Prex:</h4>
            <p>
              <strong>Titular:</strong> RIFALO S.A.
            </p>
            <p>
              <strong>Número de cuenta:</strong> 0987654321
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <p className="text-gray-800">{modalMessage}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">{product.name}</h2>
            <div className="relative">
              <img
                src={product.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &#10094;
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                &#10095;
              </button>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-600 font-bold">Precio del boleto: ${product.ticketPrice}</p>
            <Timer endTime={product.endTime} />
          </div>

          <div className="md:w-1/2 space-y-4">
            <p className="text-gray-600 mb-2">Selecciona números de boleto:</p>
            <div className="grid grid-cols-10 gap-1 mb-4">{renderTicketButtons()}</div>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>
              <span className="text-sm text-gray-600">
                P&aacute;gina {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Boletos seleccionados:</p>
              <div className="flex flex-wrap gap-2">
                {selectedTickets.map((ticket) => (
                  <span key={ticket} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                    {ticket}
                    <button onClick={() => handleTicketSelection(ticket)} className="ml-2">
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
                disabled={isTimeExpired}
              />
              <input
                type="text"
                placeholder="Apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
                disabled={isTimeExpired}
              />
              <input
                type="tel"
                placeholder="Número de celular"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
                disabled={isTimeExpired}
              />
              <input
                type="text"
                placeholder="Cédula (ej: 1.234.567-8)"
                value={cedula}
                onChange={handleCedulaChange}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
                maxLength="11"
                disabled={isTimeExpired}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                required
                disabled={isTimeExpired}
              />

              
              <div className="space-y-2">
                <p className="font-semibold">M&eacute;todo de pago:</p>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === "santander"}
                      onChange={() => handlePaymentMethodChange("santander")}
                      className="mr-2"
                    />
                    Santander
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === "prex"}
                      onChange={() => handlePaymentMethodChange("prex")}
                      className="mr-2"
                    />
                    Prex
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={paymentMethod === "mercadopago"}
                      onChange={() => handlePaymentMethodChange("mercadopago")}
                      className="mr-2"
                    />
                    Mercado Pago
                  </label>
                </div>
                {paymentMethod === "mercadopago" && (
                  <p className="text-sm text-red-600 mt-2">
                    Nota: El pago con MercadoPago tiene un recargo del 10% sobre el precio base.
                  </p>
                )}
              </div>

              {renderPaymentDetails()}

              <div className="bg-blue-100 p-4 rounded">
                <p className="font-semibold">
                  Total a pagar: ${totalAmount.toFixed(2)}
                  {paymentMethod === "mercadopago" && (
                    <span className="text-sm text-red-600 ml-2">(Incluye recargo del 10%)</span>
                  )}
                </p>
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mr-2"
                />
                Acepto los t&eacute;rminos y condiciones
              </label>

              {showAlert && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Atenci&oacute;n!</strong>
                  <span className="block sm:inline"> Debes aceptar los t&eacute;rminos y condiciones para continuar.</span>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                >
                  Cancelar
                </button>
                {paymentMethod === "mercadopago" && isFormComplete ? (
                  <button
                    onClick={(e) => handleMercadoPagoPayment(e)}
                    type="button"
                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 w-full"
                    disabled={!isFormComplete || isTimeExpired || isProcessingPayment}
                  >
                    {isProcessingPayment ? "Procesando..." : "Pagar con MercadoPago"}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 w-full"
                    disabled={!isFormComplete || isTimeExpired}
                  >
                    Confirmar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal