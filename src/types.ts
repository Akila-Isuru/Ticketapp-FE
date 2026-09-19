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
  cardImageUrl: string;
  eventDate: string;
  category: string;
  subCategory?: string;
}

export interface TicketTier {
  id: number;
  name: string;
  price: number;
  totalCount: number;
  availableCount: number;
}

export interface Booking {
  bookingId: number;
  orderId: string;
  merchantId: string;
  eventTitle: string;
  tierName?: string;
  ticketCount: number;
  totalAmount: number;
  currency: string;
  paymentStatus: string;
  bookingTime: string;
  hash?: string;
}
