import React, { Component } from "react";
import { MessageActionType } from "../types";
import { isEmpty } from "lodash";

interface Props {
	completed: boolean;
	actions: MessageActionType[];
}

interface State {

}

export default class MessageAction extends Component<Props, State> {
	static defaultProps = {
		completed: false
	}

	render() {
		const { actions } = this.props;

		return (
			<>
				{
					actions.length > 0 && <div className="message-tooltip">
						<ul>
							{
								actions.map((action, index) => !isEmpty(action) && <li key={index}>
									<a
										href="/#"
										onClick={(event) => {
											event.preventDefault();
											action.onClick();
										}}
									>{action.type}</a>
								</li>)
							}
						</ul>
					</div>
				}
			</>
		)
	}
}