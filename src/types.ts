export interface User{
    id?:number;
    name?:string;
    email:string;
    role?:string
}

export interface Event{
    id:number;
    title :string;
    description : string;
    location : string;
    dateTime : string;
    ticketPrice : number;
    totalTickets : number;
    availableTickets : number;

}

export interface Booking{
    bookingId : number;
    orderId : number;
    merchantId: string;
    eventTitle : string;
    ticketCount : number;
    totalAmount : number;
    currency: string ;
    paymentStatus : string ;
    bookingTime?:string;
    hash? :string;
}