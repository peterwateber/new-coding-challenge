import { isEmpty } from 'lodash';
import { Component } from 'react';
import AsyncAction from "src/api/AsyncAction";
import { UserState } from "src/store/state";
import { SetUserActionType } from "src/store/actions/User";

interface Props extends DispatchProps {

}

interface DispatchProps {
	setUser: (payload: UserState) => SetUserActionType;
}

interface State {
	email: string;
	password: string;
	redirect: boolean;
	form: {
		valid: boolean;
		touched: boolean;
		feedback: string;
	}
}

class LoginController extends Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			redirect: false,
			form: {
				valid: false,
				touched: false,
				feedback: "",
			}
		}
	}

	private _validateEmail = (email: string): boolean => {
		const regEx = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		this.setState({
			form: {
				valid: regEx.test(email),
				touched: true,
				feedback: regEx.test(email) ? "" : "Email is invalid."
			}
		});
		return regEx.test(email);
	}

	handleChange = (event: any, type: "email" | "password") => {
		const { value } = event.target;
		if (type === "email") {
			this._validateEmail(value);
		}

		this.setState({
			[type]: value,
		} as any);
	}

	handleSubmit = async (event: any) => {
		event.preventDefault();
		const { email, password } = this.state;
		const valid = this._validateEmail(email);
		if (valid) {
			const login = await AsyncAction.post("auth/login", {
				email,
				password
			});
			if (isEmpty(login)) {
				this.setState({
					form: {
						...this.state.form,
						feedback: "Invalid email or password."
					}
				} as any);
			} else {
				this.props.setUser({
					...login,
					authenticated: true
				});
			}
		}
	}
}

export default LoginController;