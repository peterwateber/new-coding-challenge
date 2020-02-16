import { UserState } from "../state";
import { SetUserActionType, UserActionTypes, GetAllUserActionType } from "../actions/User";
import { Role, User } from "api-contract";

const INITIAL_STATE: UserState = {
	id: "",
	name: "",
	authenticated: false,
	role: null,
	image: {
		big: "",
		small: "",
	}
};

export const UserReducer = (state: UserState = INITIAL_STATE, action: SetUserActionType): UserState => {
	switch (action.type) {
		case UserActionTypes.SET_USER_STATE:
			return {
				...state,
				...action.payload,
				role: action.payload.role.toLocaleLowerCase() as Role
			}

		case UserActionTypes.SET_USER_LOGOUT_STATE:
			return {
				...INITIAL_STATE
			}
		default:
			return state
	}
}

export const PeopleReducer = (state: User[] = [], action: GetAllUserActionType): User[] => {
	switch (action.type) {
		case UserActionTypes.GET_ALL_USERS:
			return [
				...state,
				...action.payload
			]
		default:
			return state
	}
}