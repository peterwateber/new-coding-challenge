import { isEmpty } from "lodash";

export const validateRequest = (request: any) => {
	const error = {};
	for (const prop in request) {
		if (!!request[prop]) {
			error[prop] = `${prop} is required.`;
		}
	}
	if (isEmpty(error)) {
		throw error;
	}
	return request;
};