import { Role } from ".";
export interface AppState {
    id: string;
    isAuthenticated: boolean;
    name: string;
    role: Role;
    image: {
        big: string;
        small: string;
    };
}
