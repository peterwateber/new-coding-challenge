import { DeliveriesActionTypes } from "../actions/Deliveries";
import { DeliveriesState } from '../state';

const INITIAL_STATE: DeliveriesState = {
	deliveries: [],
	filter: null
};

export const DeliveriesReducer = (state: DeliveriesState = INITIAL_STATE, action: any): DeliveriesState => {
	switch (action.type) {
		case DeliveriesActionTypes.GET_DELIVERIES_ALL:
			return {
				...state,
				...action.payload
			}
		case DeliveriesActionTypes.FILTER_DELIVERIES:
			return {
				...state,
				filter: action.payload
			}
		default:
			return state
	}
}