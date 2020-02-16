import axios, { AxiosResponse } from "axios";

const API_URL = "/api/v1/";

export default class AsyncAction {

	private static _setHeader() {
		axios.defaults.headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json"
		}
	}

	static async get(url: string, parameter?: object): Promise<any> {
		AsyncAction._setHeader();
		try {
			const response: AxiosResponse = await axios.get(API_URL.concat(url), parameter);
			return response.data;
		} catch (ex) {
			console.log(`AsyncAction "get" error: `, ex);
		}
	}

	static async post(url: string, parameter?: object): Promise<any> {
		AsyncAction._setHeader();
		try {
			const response: AxiosResponse = await axios.post(API_URL.concat(url), parameter);
			return response.data;
		} catch (ex) {
			console.log(`AsyncAction "post" error: `, ex);
		}
	}
}