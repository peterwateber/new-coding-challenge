import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "src/store";
import { setUser } from "src/store/actions/User";
import LoginController from "./LoginController";

class Login extends LoginController {

	render() {
		const { form } = this.state;
		return (
			<div>
				<main role="main" className="container">
					<div className="row justify-content-center">
						<div className="col-md-4">
							<div className="my-3 p-3 bg-white rounded shadow-sm">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label>Email address</label>
										<input
											type="text"
											className={classNames({
												"form-control": true,
												"is-valid": form.touched && !form.feedback,
												"is-invalid": form.touched && !!form.feedback
											})}
											onChange={(event) => this.handleChange(event, "email")}
										/>

										{
											form.touched && !!form.feedback && <div
												className={classNames({
													"valid-feedback": !form.feedback,
													"invalid-feedback": !!form.feedback
												})}
											>
												{form.feedback}
											</div>
										}
									</div>
									<div className="form-group">
										<label>Password</label>
										<input
											type="password"
											className="form-control"
											onChange={(event) => this.handleChange(event, "password")}
										/>
									</div>
									<button
										type="submit"
										className="btn btn-primary"
										onClick={this.handleSubmit}
									>
										Login
								</button>
								</form>
							</div>
						</div>
					</div>
				</main >
			</div>
		)
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

const mapDispatchToprops = {
	setUser,
};

export default connect(mapStateToProps, mapDispatchToprops)(Login);