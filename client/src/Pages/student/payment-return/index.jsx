import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndfinalizePaymentService } from "@/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PaypalPaymentReturnPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerID = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerID) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderID"));

        const response = await captureAndfinalizePaymentService(
          paymentId,
          payerID,
          orderId,
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderID");
          window.location.href = "/student-courses";
        }
      }
      capturePayment();
    }
  }, [payerID, paymentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment....Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaypalPaymentReturnPage;
