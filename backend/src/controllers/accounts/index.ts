import { LoginRequest, User } from "api-contract";
import * as Koa from "koa";
import { Body, Controller, Get, Post, Request, Route, SuccessResponse } from "tsoa";
import Users from "../../mocks/Users";
import { find, isEmpty } from "lodash";
import Logger from "../../logger";
import { validateRequest } from "../../utils/Validate";
import { userDetails } from "../../service/AuthService";

@Route("auth")
export class AccountsController extends Controller {

	@SuccessResponse(200)
	@Get("/appstate")
	public async appState(@Request() koaRequest: Koa.Request) {
		const { ctx } = koaRequest;
		return userDetails(ctx.session.userId || "");
	}

	@SuccessResponse(200)
	@Get("/users")
	public async getAllUsers() {
		return Promise.resolve(Users.map(user => ({
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			image: user.image
		})));
	}


	@SuccessResponse(200)
	@Post("/login")
	public async login(@Body() requestBody: LoginRequest, @Request() koaRequest: Koa.Request) {
		const { ctx } = koaRequest;
		try {
			if (ctx.session.userId) {
				this.logout(koaRequest);
				// Logger.info(`Already loggin!`, ctx.session.userId);
				// return userDetails(ctx.session.userId);
			}
			const { email, password } = validateRequest(requestBody);
			const { id: userId } = find(Users, (u: User) => u.email === email && u.password === password);
			if (!isEmpty(userId)) {
				Logger.info(`Login user request`, userId);
				ctx.session.userId = userId;
				return userDetails(ctx.session.userId);
			} else {
				ctx.session.userId = null;
				this.setStatus(400);
				return {
					error: "Invalid username or password."
				};
			}
		} catch (ex) {
			Logger.error(`[Error] ${ex}`);
		}
	}

	@SuccessResponse(302, "Redirect")
	@Get("/logout")
	public async logout(@Request() koaRequest: Koa.Request) {
		const { ctx } = koaRequest;
		Logger.info(`Logout requested for `, ctx.session.userId);
		ctx.session.userId = null;
	}
}