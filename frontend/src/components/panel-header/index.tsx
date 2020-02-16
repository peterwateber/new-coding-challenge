import React from "react";
import { UserState } from "src/store/state";

interface Props {
	user: UserState;
}

const PanelHeader = (props: Props) => {
	const { id, image, name, role } = props.user;

	return (
		<div className="d-flex align-items-center p-3 my-3 text-white-50 bg-dark rounded shadow-sm">
			<img className="mr-3" src={image.big} alt="" width="48" height="48" />
			<div className="lh-100">
				<h6 className="mb-0 text-white lh-100">
					@{name}&nbsp; {/*<span className="badge badge-pill bg-success align-text-bottom">2</span>*/}
				</h6>
				<small>Id: {id}</small><br />
				<small>Role: {role}</small>
			</div>
		</div>
	)
}

export default PanelHeader;