import React from "react";
import { Delivery, DeliveryStatus, Role } from "api-contract";
import { filter } from "lodash";

interface Props {
	deliveries: Delivery[];
	role: Role;
	filterByStatus: (status: DeliveryStatus, reset?: boolean) => void;
}

const Filters = (props: Props) => {

	const { deliveries, filterByStatus, role } = props;
	const total: any = {};


	const statusCount = (deliveries: Delivery[], status: DeliveryStatus) => {
		return filter(deliveries, (delivery) => delivery.item.status === status).length;
	}

	Object.keys(DeliveryStatus).map((key) => {
		total[key] = statusCount(deliveries, key as DeliveryStatus);
	})

	return (
		<div className="border-bottom border-gray pb-2 mb-3">
			<strong>Filter:</strong>&nbsp;
				<span className="button-filters">
				<button
					className="btn btn-link btn-sm"
					onClick={() => {
						filterByStatus(null);
					}}
				>
					<span className="badge badge-pill badge-info">
						{deliveries.length}
					</span>
					&nbsp;All
				</button>
				{
					role === Role.MANAGER.toLocaleLowerCase() &&
					<button
						className="btn btn-danger btn-sm"
						onClick={() => {
							filterByStatus(DeliveryStatus.WAITING);
						}}
					>
						<span className="badge badge-pill badge-light">
							{total[DeliveryStatus.WAITING]}
						</span>
						&nbsp;Waiting
					<span className="badge badge-pill badge-danger badge-red">!</span>
					</button>
				}
				<button
					className="btn btn-warning btn-sm"
					onClick={() => {
						filterByStatus(DeliveryStatus.ASSIGNED);
					}}
				>
					<span className="badge badge-pill badge-light">
						{total[DeliveryStatus.ASSIGNED]}
					</span>
					&nbsp;Assigned
				</button>
				<button
					className="btn btn-success btn-sm"
					onClick={() => {
						filterByStatus(DeliveryStatus.PICKED_UP);
					}}
				>
					<span className="badge badge-pill badge-light">
						{total[DeliveryStatus.PICKED_UP]}
					</span>
					&nbsp;Picked Up
				</button>
				<button
					className="btn btn-secondary btn-sm"
					onClick={() => {
						filterByStatus(DeliveryStatus.DELIVERED);
					}}
				>
					<span className="badge badge-pill badge-light">
						{total[DeliveryStatus.DELIVERED]}
					</span>
					&nbsp;Delivered
				</button>
			</span>
		</div>
	)
}


export default Filters;