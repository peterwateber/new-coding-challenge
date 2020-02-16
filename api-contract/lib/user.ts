import { Role } from "./role";

export interface LoginRequest {
	email: string;
	password: string;
}

export interface User {
	id: string;
	image: {
		big: string;
		small: string;
	};
	name: string;
	email: string;
	password: string;
	role: Role;
}