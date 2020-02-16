import { User } from 'api-contract';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { UserState, DeliveriesState } from "./state";
import thunk from 'redux-thunk';
import { UserReducer, PeopleReducer } from "./reducers/User";
import { DeliveriesReducer } from './reducers/Deliveries';

export interface RootState {
	user: UserState;
	people: User[];
	deliveries: DeliveriesState;
}

const staticReducer = {
	user: UserReducer,
	people: PeopleReducer,
	deliveries: DeliveriesReducer
};

const rootReducer = combineReducers<RootState>(staticReducer);

export default createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)