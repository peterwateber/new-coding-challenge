export interface DeliveryRequest {
    deliveryId: string;
    status: DeliveryStatus;
    courierId?: string;
    time?: string;
}
export interface Delivery {
    id: string;
    courierId: string;
    updated: string;
    item: DeliveryItem;
}
export interface DeliveryItem {
    id: string;
    price: number;
    currency: {
        sign: string;
        value: string;
    };
    weightInKg: number;
    person: {
        name: string;
    };
    purchaseDate: string;
    destination: Destination;
    status: DeliveryStatus;
}
interface Destination {
    coordinates: {
        lat: number;
        lng: number;
    };
    city: string;
}
export declare enum DeliveryStatus {
    WAITING = "WAITING",
    ASSIGNED = "ASSIGNED",
    PICKED_UP = "PICKED_UP",
    DELIVERED = "DELIVERED"
}
export {};
