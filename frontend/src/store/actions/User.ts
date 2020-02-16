import { User } from 'api-contract';
import { UserState } from '../state';

export enum UserActionTypes {
	SET_USER_STATE = "set/user/state",
	SET_USER_LOGOUT_STATE = "set/user/logout/state",
	GET_ALL_USERS = "get/all/users",
}

export interface SetUserActionType {
	type: UserActionTypes;
	payload: UserState;
}

export interface GetAllUserActionType {
	type: UserActionTypes;
	payload: User[]
}

/**
 * Action Creators
 */

export const getAllusers = (payload: User[]): GetAllUserActionType => ({
	type: UserActionTypes.GET_ALL_USERS,
	payload,
})

export const setUser = (payload: UserState): SetUserActionType => ({
	type: UserActionTypes.SET_USER_STATE,
	payload
})

export const userLogout = () => ({
	type: UserActionTypes.SET_USER_LOGOUT_STATE,
})