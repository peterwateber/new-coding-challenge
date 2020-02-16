import { Component } from "react";
import { UserState, DeliveriesState } from "src/store/state";
import { Delivery, DeliveryStatus } from "api-contract";
import AsyncAction from "src/api/AsyncAction";
import { GetDeliveriesActionType, FilterDeliveriesActionType } from "src/store/actions/Deliveries";


interface Props {
	user: UserState;
	deliveries: Delivery[];
	filter: DeliveryStatus;
	getDeliveries: (payload: Partial<DeliveriesState>) => GetDeliveriesActionType;
	filterDeliveries: (payload: DeliveryStatus) => FilterDeliveriesActionType;
}

interface State {
	mounted: boolean;
	popModal: boolean;
	selectedDelivery: {
		id: string;
		courierId: string;
		status: DeliveryStatus;
	};
}


class CourierController extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			mounted: false,
			popModal: false,
			selectedDelivery: {
				id: "",
				courierId: "",
				status: null
			}
		}
	}

	async componentDidMount() {
		await this.getAllDeliveries();


		this.setState({
			mounted: true,
		});
	}

	getAllDeliveries = async () => {
		const deliveries = await AsyncAction.get("delivery/all");
		this.props.getDeliveries({
			deliveries
		});
	}

	handleChangeStatus = async (id: string, courierId: string, status: DeliveryStatus) => {
		this.setState({
			selectedDelivery: {
				id,
				courierId,
				status
			},
		})
		this.modalListener();
	}

	filterByStatus = async (status: DeliveryStatus) => {
		this.props.filterDeliveries(status);
	}

	modalListener = () => {
		this.setState({
			popModal: !this.state.popModal
		});
	}
}

export default CourierController;