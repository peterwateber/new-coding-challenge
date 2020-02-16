import { random } from "lodash";
import { Role, User } from "api-contract";

const uuidv1 = require("uuid/v1");
const randomNameGenerator = require("node-random-name");

const NUMBER_OF_USERS: number = 10;
const Users: User[] = [];
const roles: Role[] = Object.values(Role);


const userIds = [
	"a0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"b0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"c0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"d0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"e0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"d0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"f0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"g0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"h0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"i0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"j0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"k0a0bbb0-5099-11ea-b719-67b67a7c6454",
	"l0a0bbb0-5099-11ea-b719-67b67a7c6454",
];

for (let i = 1; i <= NUMBER_OF_USERS; i++) {
	Users.push({
		id: userIds[i],
		email: `a${i}@a.com`,
		name: randomNameGenerator(),
		password: "test123",
		role: i === 1 ? Role.MANAGER : roles[random(roles.length - 1)],
		image: {
			big: "https://i.pravatar.cc/48",
			small: "https://i.pravatar.cc/24",
		}
	});
}


export default Users;