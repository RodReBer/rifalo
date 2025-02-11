const useMercadoPago = () => {
    const handleMercadoPagoPayment = async (preference) => {
      const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer APP_USR-4281791626434269-013116-6607947a5c31cb822e1977eb30cd57e6-200909974`,
        },
        body: JSON.stringify(preference),
      });
  
      const data = await response.json();
      return data;
    };
  
    return { handleMercadoPagoPayment };
  };
  
  export default useMercadoPago;