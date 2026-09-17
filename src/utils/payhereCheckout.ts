declare global {
  interface Window {
    payhere: any;
  }
}

interface PayhereCheckoutParams {
  orderId: string;
  merchantId: string;
  hash: string;
  amount: number;
  currency: string;
  eventTitle: string;
  customerFirstName: string;
  customerEmail: string;
  notifyUrl: string;
  onCompleted: () => void;
  onDismissed: () => void;
  onError: (error: string) => void;
}

export const startPayhereCheckout = ({
  orderId,
  merchantId,
  hash,
  amount,
  currency,
  eventTitle,
  customerFirstName,
  customerEmail,
  notifyUrl,
  onCompleted,
  onDismissed,
  onError,
}: PayhereCheckoutParams) => {
  if (!window.payhere) {
    onError("PayHere SDK failed to load. Please refresh and try again.");
    return;
  }

  window.payhere.onCompleted = onCompleted;
  window.payhere.onDismissed = onDismissed;
  window.payhere.onError = onError;

  const payment = {
    sandbox: true,
    merchant_id: merchantId,
    return_url: undefined,
    cancel_url: undefined,
    notify_url: notifyUrl,
    order_id: orderId,
    items: eventTitle,
    amount: amount.toFixed(2),
    currency: currency,
    hash: hash,
    first_name: customerFirstName,
    last_name: "",
    email: customerEmail,
    phone: "0770000000",
    address: "No Address Given",
    city: "Colombo",
    country: "Sri Lanka",
  };

  window.payhere.startPayment(payment);
};
