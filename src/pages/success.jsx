import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const payment_id = queryParams.get("payment_id");
    const status = queryParams.get("status");

    if (status === "approved") {
      alert(`Pago exitoso! ID de pago: ${payment_id}`);
    }
  }, [location.search]);

  return <div>Pago exitoso. Gracias por tu compra.</div>;
};

export default SuccessPage;