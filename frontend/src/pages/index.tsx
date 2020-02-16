import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import AsyncAction from "src/api/AsyncAction";
import Header from "src/components/header";
import { PrivateRoute, PrivateRouteSecureRoute } from "src/components/route";
import { AppRoutes } from "src/config";
import { RootState } from "src/store";
import { SetUserActionType, userLogout, setUser } from "src/store/actions/User";
import { UserState } from "src/store/state";
import "./css/main.scss";
import Login from "./login";
import { AppState, DeliveryStatus } from "api-contract";
import Manager from "./manager";
import Courier from "./courier";
import ErrorPage from "./error";
import { filterDeliveries, FilterDeliveriesActionType } from "src/store/actions/Deliveries";

interface Props extends DispatchProps {
	user: UserState;
}

interface DispatchProps {
	setUser: (payload: UserState) => SetUserActionType;
	userLogout: () => void;
	filterDeliveries: (payload: DeliveryStatus) => FilterDeliveriesActionType;
}


interface State {
	mounted: boolean
}


class Home extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			mounted: false
		}
	}

	async componentDidMount() {
		try {
			const user: AppState = await AsyncAction.get("auth/appstate");
			this.props.setUser({
				id: user.id,
				authenticated: user.isAuthenticated,
				role: user.role,
				name: user.name,
				image: user.image,
			});
			this.setState({
				mounted: true
			})
		} catch (ex) {

		}
	}

	private async handleLogout() {
		await AsyncAction.get("auth/logout");
		this.props.userLogout()
		this.props.filterDeliveries(null);
	}

	render() {
		const { user } = this.props;
		const { authenticated, role } = user;
		const { mounted } = this.state;

		return (
			<Router>
				{
					mounted && authenticated === false && <Redirect push to={AppRoutes.login} />
				}
				<Header
					user={user}
					navigationLinks={authenticated ? [
						{
							url: AppRoutes.logout,
							title: "Logout",
							onClick: async () => {
								await this.handleLogout();
							}
						}
					] : []}
				/>
				<Switch>
					{
						mounted && authenticated &&
						<Route exact path={AppRoutes.index}>
							<Redirect push to={AppRoutes[role]} />
						</Route>
					}
					{
						mounted &&
						<PrivateRoute
							path={AppRoutes.login}
							authenticated={authenticated}
							redirectUrl={AppRoutes[role]}
						>
							<Login />
						</PrivateRoute>
					}
					{
						/**
						 * Below routes are for Manager and Courier
						 */
					}
					{
						mounted &&
						<PrivateRouteSecureRoute
							path={AppRoutes.manager}
							authenticated={authenticated && AppRoutes.manager.indexOf(role) > -1}
							redirectUrl={authenticated ? AppRoutes.error404 : AppRoutes.login}
						>
							<Manager />
						</PrivateRouteSecureRoute>
					}
					{
						mounted &&
						<PrivateRouteSecureRoute
							path={AppRoutes.courier}
							authenticated={authenticated && AppRoutes.courier.indexOf(role) > -1}
							redirectUrl={authenticated ? AppRoutes.error404 : AppRoutes.login}
						>
							<Courier />
						</PrivateRouteSecureRoute>
					}
					{
						mounted && <Route>
							<ErrorPage />
						</Route>
					}
				</Switch>
			</Router >
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

const mapDispatchToprops = {
	userLogout,
	setUser,
	filterDeliveries
};

export default connect(mapStateToProps, mapDispatchToprops)(Home);