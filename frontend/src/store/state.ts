import { Delivery, Role, DeliveryStatus } from 'api-contract';

export interface UserState {
	id: string;
	name: string;
	authenticated: boolean;
	role: Role;
	image: {
		big: string;
		small: string;
	}
}

export interface DeliveriesState {
	deliveries: Delivery[],
	filter: DeliveryStatus
}