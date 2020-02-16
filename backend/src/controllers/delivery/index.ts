import { random } from "lodash";
import { Delivery, DeliveryRequest, DeliveryStatus, Role } from "api-contract";
import { Body, Controller, Get, Post, Request, Route } from "tsoa";
import { Deliveries, setDeliveries } from "../../mocks/Deliveries";
import Logger from "../../logger";
import * as Koa from "koa";
import { userDetails } from "../../service/AuthService";
import { LocalDate, LocalTime, ZonedDateTime, ZoneId } from "@js-joda/core";
import Users from "../../mocks/Users";


@Route("delivery")
export class DeliveryController extends Controller {

	@Get("/all")
	public async getAll(@Request() koaRequest: Koa.Request) {
		const { ctx } = koaRequest;
		const user = await userDetails(ctx.session.userId || "", false);
		Logger.info(`My user details ${user.id}`);

		if (user.role === Role.COURIER) {
			return Deliveries.filter((delivery: Delivery) => delivery.courierId === user.id && delivery.item.status !== DeliveryStatus.WAITING).map(delivery => {
				const updated = ZonedDateTime.parse(delivery.updated).toLocalDateTime().toString();
				delivery.updated = new Date(updated).toISOString();
				return delivery;
			});
		}
		const courierId = Users.filter(u => u.role === Role.COURIER).map(c => c.id);
		return Deliveries.map(delivery => {
			const updated = ZonedDateTime.parse(delivery.updated).toLocalDateTime().toString();
			delivery.courierId = delivery.item.status === DeliveryStatus.WAITING ? "" : courierId[random(courierId.length - 1)];
			delivery.updated = new Date(updated).toISOString();
			return delivery;
		});
	}

	@Post("/changestatus")
	public async delivered(@Body() requestBody: DeliveryRequest) {
		Logger.info(`Request submit ${JSON.stringify(requestBody)}`);
		const { courierId, deliveryId, status, time } = requestBody;
		const now = ZonedDateTime.of(
			LocalDate.now(),
			LocalTime.parse(time || LocalTime.now().toString()),
			ZoneId.of("UTC+08:00")
		);

		setDeliveries(Deliveries.map(delivery => {
			if (delivery.id === deliveryId) {
				delivery.courierId = courierId;
				delivery.item.status = status;
				delivery.updated = now.toString();
			}
			return delivery;
		}));
	}
}