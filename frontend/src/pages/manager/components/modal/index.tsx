import React, { Component } from "react";
import "./css/manager-modal.scss";
import { RootState } from "src/store";
import { connect } from "react-redux";
import { UserState } from "src/store/state";
import { DeliveryStatus, User } from "api-contract";
import Autosuggest from 'react-autosuggest';
import AsyncAction from "src/api/AsyncAction";

interface Props {
	show: boolean;
	people: User[];
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
	people: User[];
	courier: string;
	courierId: string;
	error: boolean;
}

class ManagerModal extends Component<Props, State> {

	static defaultProps = {
		show: false
	}

	constructor(props: Props) {
		super(props);
		this.state = {
			people: [],
			courier: "",
			courierId: "",
			error: false
		};
	}

	closeModal = () => {
		this.props.modalListener()
		this.setState({
			courierId: "",
			courier: "",
			error: false,
		})
	}

	handleSubmit = async (ev: any) => {
		ev.preventDefault();
		const { courierId } = this.state;
		const { id, status } = this.props.selectedDelivery;
		if (!!courierId || status === DeliveryStatus.WAITING) {
			await AsyncAction.post("delivery/changestatus", {
				deliveryId: id,
				status,
				courierId
			})
			this.setState({
				courierId: "",
				courier: "",
				error: false,
			})
			this.props.fetchAllDeliveries();
			this.props.modalListener();
		} else {
			this.setState({
				error: !courierId
			})
		}
	}

	handleSelected = async (ev: any, { suggestion }: any) => {
		this.setState({
			courierId: suggestion.id
		})
	}

	handleOnChange = (event: any, { newValue }: any) => {
		this.setState({
			courier: newValue,
			courierId: !newValue ? "" : this.state.courierId
		})
	}

	onSuggestionsFetchRequested = ({ value }: any) => {
		this.setState({
			people: this.getSuggestion(value)
		})
	}

	onSuggestionsClearRequested = () => {
		this.setState({
			people: []
		})
	}

	getSuggestion = (value: string): User[] => {
		if (!!value)
			return this.props.people.filter(p => p.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);
		return [];
	}

	getSuggestionValue = (user: User) => {
		return user.name;
	}

	renderSuggestion = (user: User) => {
		return (
			<span>{user.name}</span>
		);
	}

	render() {

		const { show, user } = this.props;
		const { courier, people, error } = this.state;

		if (!show) {
			return null;
		}

		return (
			<div className="overlay-toast">
				<div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
					<div className="toast-header">
						<img src={user.image.small} className="rounded mr-2" alt="..." />
						<strong className="mr-auto">Assign to courier</strong>
						<button
							type="button"
							className="ml-2 mb-1 close"
							data-dismiss="toast"
							aria-label="Close"
							onClick={this.closeModal}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="toast-body">
						<form onSubmit={this.handleSubmit}>
							<Autosuggest
								suggestions={people}
								onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
								onSuggestionsClearRequested={this.onSuggestionsClearRequested}
								getSuggestionValue={this.getSuggestionValue}
								renderSuggestion={this.renderSuggestion}
								onSuggestionSelected={this.handleSelected}
								inputProps={{
									placeholder: "Search for courier",
									value: courier,
									onChange: this.handleOnChange
								}}
							/>
							{error && <small className="invalid-input">Cannot submit. Please find a courier.</small>}
							<div>
								<small>
									Assignee can be empty for <span className="badge badge-pill badge-dark">Unassigned</span>
								</small>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
})

export default connect(mapStateToProps)(ManagerModal);