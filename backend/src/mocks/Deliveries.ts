import { Delivery, DeliveryStatus, Role } from "api-contract";
import { random } from "lodash";
import Users from "./Users";
import Logger from "../logger";

const uuidv1 = require("uuid/v1");
const randomNameGenerator = require("node-random-name");
const randomCountry = require("random-country");

const NUMBER_OF_DELIVERIES: number = 50;
let Deliveries: Delivery[] = [];
const courierIds = Users.filter(user => user.role === Role.COURIER).map(user => user.id);
const status = Object.keys(DeliveryStatus);

for (let i = 1; i <= NUMBER_OF_DELIVERIES; i++) {
	const deliveryStatus = status[random(status.length - 1)] as DeliveryStatus;
	Deliveries.push({
		id: uuidv1(),
		courierId: courierIds[random(courierIds.length) - 1],
		updated: new Date().toISOString(),
		item: {
			id: uuidv1(),
			price: 1000,
			currency: {
				sign: "$",
				value: "USD"
			},
			weightInKg: 1,
			person: {
				name: randomNameGenerator()
			},
			purchaseDate: new Date().toISOString(),
			destination: {
				coordinates: {
					lat: 0,
					lng: 0
				},
				city: randomCountry({ full: true })
			},
			status: deliveryStatus
		}
	});
}

const setDeliveries = (deliveries: Delivery[]) => {
	Deliveries = deliveries;
};


// const count = Math.floor(Math.random() * 6) + 5;
// const mockDeliveries = Array.from(new Array(count), (x, i) => i + 1).map(c => randomDeliveries());
// export default chain(mockDeliveries).flattenDeep().value();

export { setDeliveries, Deliveries };