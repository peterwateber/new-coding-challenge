import React from "react";
import { Message } from "src/components/message";
import { RootState } from "src/store";
import { connect } from "react-redux";
import PanelHeader from "src/components/panel-header";
import CourierController from "./CourierController";
import { DeliveryStatus, Delivery } from "api-contract";
import Filters from "src/components/filter";
import { ActionType, MessageActionType } from "src/components/message/types";

import "./styles/courier.scss"
import { getDeliveries, filterDeliveries } from "src/store/actions/Deliveries";
import CourierModal from "./components/modal";

class Courier extends CourierController {

	messageStatus(status: DeliveryStatus) {
		switch (status) {
			case DeliveryStatus.WAITING:
				return "red";
			case DeliveryStatus.PICKED_UP:
				return "green";
			case DeliveryStatus.ASSIGNED:
				return "yellow"
			default:
				return "";
		}
	}

	setActions(delivery: Delivery): MessageActionType[] {
		const messageActionTypes: MessageActionType[] = [];

		switch (delivery.item.status) {
			case DeliveryStatus.ASSIGNED:
				messageActionTypes.push({
					type: ActionType.PICK,
					onClick: () => {
						this.handleChangeStatus(delivery.id, delivery.courierId, DeliveryStatus.PICKED_UP);
					}
				});
				break;
			case DeliveryStatus.PICKED_UP:
				messageActionTypes.push({
					type: ActionType.DELIVERED,
					onClick: () => {
						this.handleChangeStatus(delivery.id, delivery.courierId, DeliveryStatus.DELIVERED);
					}
				});
				messageActionTypes.push({
					type: ActionType.UNPICK,
					onClick: () => {
						this.handleChangeStatus(delivery.id, delivery.courierId, DeliveryStatus.ASSIGNED);
					}
				});
				break;
		}

		return messageActionTypes;
	}

	shouldDisplayDeliveries = (delivery: Delivery): boolean => {
		const { filter } = this.props;
		return (!filter || delivery.item.status === filter);
	}


	render() {
		const { user, deliveries } = this.props;
		const { mounted, popModal, selectedDelivery } = this.state;

		return (
			<>
				<main role="main" className="container">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<PanelHeader user={user} />

							<div className="my-3 p-3 bg-white rounded shadow-sm">
								{
									mounted &&
									<Filters
										deliveries={deliveries}
										filterByStatus={this.filterByStatus}
										role={user.role}
									/>
								}
								{
									deliveries.map((delivery, index) =>
										this.shouldDisplayDeliveries(delivery) && <Message
											key={index}
											completed={delivery.item.status === DeliveryStatus.DELIVERED}
											messageStatus={this.messageStatus(delivery.item.status)}
											actions={this.setActions(delivery)}
											message={
												<>
													<strong>id: {delivery.id}</strong><br />
													<strong>Ordered By:</strong>&nbsp;{delivery.item.person.name} <br />
													<strong>Weight:</strong>&nbsp;{delivery.item.weightInKg}kg<br />
													<strong>Price:</strong>&nbsp;{delivery.item.currency.sign}{delivery.item.price}<br />
													<strong>Location:</strong>&nbsp;{delivery.item.destination.city}<br />
												</>
											}
											time={delivery.updated}
										/>
									)
								}
								{
									deliveries.filter(this.shouldDisplayDeliveries).length === 0 && <div className="text-center">No results found.</div>
								}
							</div>
						</div>
					</div>
				</main>
				<CourierModal
					fetchAllDeliveries={async () => await this.getAllDeliveries()}
					selectedDelivery={selectedDelivery}
					show={popModal}
					modalListener={this.modalListener}
				/>
			</>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user,
	deliveries: state.deliveries.deliveries,
	filter: state.deliveries.filter
});

const mapDispatchToProps = {
	getDeliveries,
	filterDeliveries
}

export default connect(mapStateToProps, mapDispatchToProps)(Courier);