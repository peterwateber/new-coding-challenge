import React, { Component } from "react";
import "./css/courier-modal.scss";
import { connect } from "react-redux";
import { RootState } from "src/store";
import { UserState } from "src/store/state";
import TimePicker from "react-time-picker";
import { DeliveryStatus } from "api-contract";
import AsyncAction from "src/api/AsyncAction";

interface Props {
	show: boolean;
	modalListener: () => void;
	user: UserState;
	selectedDelivery: {
		id: string;
		courierId: string;
		status: DeliveryStatus;
	}
	fetchAllDeliveries: () => void;
}

interface State {
	time: string;
	error: boolean;
}

class CourierModal extends Component<Props, State> {

	static defaultProps = {
		show: false
	}

	constructor(props: Props) {
		super(props);
		this.state = {
			time: null,
			error: false
		}
	}

	onChangeTime = (time: string) => {
		this.setState({ time })
	}

	handleSubmit = async (ev: any) => {
		ev.preventDefault();
		const { time } = this.state;
		const { id, courierId, status } = this.props.selectedDelivery;
		this.setState({
			error: !time
		})
		if (!!time) {
			this.setState({
				time: ""
			})
			await AsyncAction.post("delivery/changestatus", {
				deliveryId: id,
				courierId,
				status,
				time
			})
			this.props.fetchAllDeliveries();
			this.props.modalListener();
		}
	}

	render() {

		const { modalListener, show, user } = this.props;
		const { error, time } = this.state;

		if (!show) {
			return null;
		}

		return (
			<div className="overlay-toast">
				<div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
					<div className="toast-header">
						<img src={user.image.small} className="rounded mr-2" alt="..." />
						<strong className="mr-auto">Set Time</strong>
						<button
							type="button"
							className="ml-2 mb-1 close"
							data-dismiss="toast"
							aria-label="Close"
							onClick={modalListener}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="toast-body">
						<form onSubmit={async (event) => await this.handleSubmit(event)}>
							<div className="mb-1">
								<small>
									<span className="badge badge-info">24-hours</span> format
								</small>
							</div>
							<div className="mb-1">
								<TimePicker
									className="time-picker"
									onChange={this.onChangeTime}
									value={time}
									disableClock={true}
								/>
								{error && <div className="invalid-input">Please enter your time.</div>}
							</div>
							<button type="submit" className="btn btn-primary btn-sm">Submit</button>
						</form>
					</div>
				</div>
			</div >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
})

export default connect(mapStateToProps)(CourierModal);