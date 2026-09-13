export interface User {
  id?: number;
  name?: string;
  email: string;
  role?: string;
}

export interface Event {
  id: number;
  title: string;
  location: string;
  ticketPrice: number;
  totalTickets: number;
  availableTickets: number;
  imageUrl: string;
  eventDate: string;
}

export interface Booking {
  bookingId: number;
  orderId: string;
  merchantId: string;
  eventTitle: string;
  ticketCount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  bookingTime: string;
  hash?: string;
}
