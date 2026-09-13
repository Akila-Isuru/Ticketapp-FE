import Swal from "sweetalert2";
import API from "../api";

interface PaymentModalOptions {
  cancelButtonText?: string;
  successMessage?: string;
  errorTitle?: string;
}

export const openMockPaymentModal = async (
  bookingId: number,
  eventTitle: string,
  totalAmount: number,
  options: PaymentModalOptions = {},
): Promise<boolean> => {
  const {
    cancelButtonText = "Pay Later",
    successMessage = "Your booking status is updated to PAID.",
    errorTitle = "Payment Failed",
  } = options;

  const { value: formValues } = await Swal.fire({
    title: "💳 Mock Payment Gateway",
    html: `
      <div style="text-align: left; font-size: 14px;">
        <p style="margin-bottom: 8px; color: #4b5563;"><strong>Event:</strong> ${eventTitle}</p>
        <p style="margin-bottom: 16px; color: #16a34a; font-weight: bold; font-size: 16px;"><strong>Total:</strong> LKR ${totalAmount}</p>

        <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">Cardholder Name</label>
        <input id="swal-card-name" class="swal2-input" placeholder="John Doe" value="John Doe" style="width:100%; margin: 0 0 12px 0;">

        <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">Card Number</label>
        <input id="swal-card-number" class="swal2-input" placeholder="4111 2222 3333 4444" value="4111 2222 3333 4444" style="width:100%; margin: 0 0 12px 0;">

        <div style="display: flex; gap: 10px;">
          <div style="flex: 1;">
            <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">Expiry Date</label>
            <input id="swal-card-exp" class="swal2-input" placeholder="12/28" value="12/28" style="width:100%; margin:0;">
          </div>
          <div style="flex: 1;">
            <label style="display:block; margin-bottom:4px; font-weight:600; color:#374151;">CVV</label>
            <input id="swal-card-cvv" class="swal2-input" type="password" placeholder="123" value="123" style="width:100%; margin:0;">
          </div>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `Pay LKR ${totalAmount}`,
    confirmButtonColor: "#16a34a",
    cancelButtonText,
    preConfirm: () => {
      const name = (
        document.getElementById("swal-card-name") as HTMLInputElement
      ).value;
      const number = (
        document.getElementById("swal-card-number") as HTMLInputElement
      ).value;
      if (!name || !number) {
        Swal.showValidationMessage("Please fill in card details");
        return false;
      }
      return { name, number };
    },
  });

  if (formValues) {
    try {
      await API.put(`/bookings/pay/${bookingId}`);
      await Swal.fire("Payment Successful!", successMessage, "success");
      return true;
    } catch (error: any) {
      Swal.fire(
        errorTitle,
        error.response?.data?.message || "Failed to process payment.",
        "error",
      );
      return false;
    }
  }

  return false;
};
