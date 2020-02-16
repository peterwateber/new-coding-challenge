import { Component } from "react";
import { UserState, DeliveriesState } from "src/store/state";
import { Delivery, DeliveryStatus, User } from "api-contract";
import AsyncAction from "src/api/AsyncAction";
import { FilterDeliveriesActionType, GetDeliveriesActionType } from "src/store/actions/Deliveries";
import { GetAllUserActionType } from "src/store/actions/User";


interface Props {
	user: UserState;
	people: User[];
	deliveries: Delivery[];
	filter: DeliveryStatus;
	getDeliveries: (payload: Partial<DeliveriesState>) => GetDeliveriesActionType;
	filterDeliveries: (payload: DeliveryStatus) => FilterDeliveriesActionType;
	getAllusers: (payload: User[]) => GetAllUserActionType;
}

interface State {
	popModal: boolean;
	mounted: boolean
	selectedDelivery: {
		id: string;
		courierId: string;
		status: DeliveryStatus;
	};
}


class ManagerController extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			popModal: false,
			mounted: false,
			selectedDelivery: {
				id: "",
				courierId: "",
				status: null
			}
		};
	}

	async componentDidMount() {
		await this.getAllDeliveries();
		await this.getAllUsers();
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

	getAllUsers = async () => {
		const people = await AsyncAction.get("auth/users");
		this.props.getAllusers(people);
	}

	handleAssign = async (id: string, courierId: string, status: DeliveryStatus) => {
		this.setState({
			selectedDelivery: {
				id,
				courierId,
				status
			},
		})
		this.modalListener();
	}

	modalListener = () => {
		this.setState({
			popModal: !this.state.popModal
		});
	}

	filterByStatus = async (status: DeliveryStatus, reset: boolean = false) => {
		this.props.filterDeliveries(status)
	}
}

export default ManagerController;