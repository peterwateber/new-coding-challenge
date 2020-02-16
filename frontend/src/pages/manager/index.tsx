import React from "react";
import { Message } from "src/components/message";
import ManagerModal from "./components/modal";
import "./css/manager.scss"
import { connect } from "react-redux";
import { RootState } from "src/store";
import PanelHeader from "src/components/panel-header";
import ManagerController from "./ManagerController";
import { DeliveryStatus, Delivery } from "api-contract";
import Filters from "src/components/filter";
import { filterDeliveries, getDeliveries } from "src/store/actions/Deliveries";
import { MessageActionType, ActionType } from "src/components/message/types";
import { getAllusers } from "src/store/actions/User";
import { find, isEmpty } from "lodash";


class Manager extends ManagerController {

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
			case DeliveryStatus.WAITING:
				messageActionTypes.push({
					type: ActionType.ASSIGN,
					onClick: () => {
						this.handleAssign(delivery.id, delivery.courierId, DeliveryStatus.ASSIGNED);
					}
				});
				break;
			case DeliveryStatus.ASSIGNED:
				messageActionTypes.push({
					type: ActionType.UNASSIGN,
					onClick: () => {
						this.handleAssign(delivery.id, delivery.courierId, DeliveryStatus.WAITING);
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

	getCourier = (delivery: Delivery): string => {
		const user = find(this.props.people, p => p.id === delivery.courierId);
		return !isEmpty(user) ? user.name : "";
	}


	render() {

		const { user, deliveries, people } = this.props;
		const { mounted, popModal, selectedDelivery } = this.state;

		return (
			<main role="main" className="container">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<PanelHeader user={user} />
						<div className="my-3 p-3 bg-white rounded shadow-sm">
							<h6 className="border-bottom border-gray pb-2 mb-3">Today's delivery</h6>

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
												<strong>id:</strong>&nbsp;{delivery.id} <br />
												<strong>Ordered By:</strong>&nbsp;{delivery.item.person.name} <br />
												<strong>Weight:</strong>&nbsp;{delivery.item.weightInKg}kg<br />
												<strong>Price:</strong>&nbsp;{delivery.item.currency.sign}{delivery.item.price}<br />
												<strong>Location:</strong>&nbsp;{delivery.item.destination.city}<br />
												<strong>Courier:</strong>&nbsp;{this.getCourier(delivery)}
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
				<ManagerModal
					people={people}
					fetchAllDeliveries={async () => await this.getAllDeliveries()}
					selectedDelivery={selectedDelivery}
					show={popModal}
					modalListener={this.modalListener}
				/>
			</main>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user,
	people: state.people,
	deliveries: state.deliveries.deliveries,
	filter: state.deliveries.filter
});

const mapDispatchToProps = {
	getDeliveries,
	filterDeliveries,
	getAllusers
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);