import { DeliveriesState } from 'src/store/state';
import { DeliveryStatus } from "api-contract";

export enum DeliveriesActionTypes {
	GET_DELIVERIES_ALL = "get/deliveries/all",
	FILTER_DELIVERIES = "filter/deliveries",
}

export interface GetDeliveriesActionType {
	type: DeliveriesActionTypes;
	payload: Partial<DeliveriesState>;
}

export interface FilterDeliveriesActionType {
	type: DeliveriesActionTypes;
	payload: DeliveryStatus;
}


/**
 * Action creators
 */

export const getDeliveries = (payload: Partial<DeliveriesState>): GetDeliveriesActionType => ({
	type: DeliveriesActionTypes.GET_DELIVERIES_ALL,
	payload
})

export const filterDeliveries = (payload: DeliveryStatus): FilterDeliveriesActionType => ({
	type: DeliveriesActionTypes.FILTER_DELIVERIES,
	payload
})