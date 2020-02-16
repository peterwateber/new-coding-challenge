import { find, isEmpty } from "lodash";
import Users from "../mocks/Users";
import { User } from "api-contract";

export const userDetails = (userId: string, strippedUserId: boolean = true) => {
	let user: User;
	let maskedUserId: string = "";

	if (userId) {
		user = find(Users, (u: User) => u.id === userId);
		if (!isEmpty(user)) {
			maskedUserId = strippedUserId ? (user.id || "").substr((user.id || "").length - 4) : user.id;
		}
	}


	return Promise.resolve({
		id: !!userId ? maskedUserId : "",
		isAuthenticated: !!userId && !isEmpty(user),
		name: !!userId && !isEmpty(user) ? user.name : "",
		role: !!userId && !isEmpty(user) ? user.role : "",
		image: !!userId && !isEmpty(user) ? user.image : {},
	});
};