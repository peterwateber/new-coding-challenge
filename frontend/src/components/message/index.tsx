import React, { Component } from "react";
import className from "classnames";
import "./css/message.scss";
import MessageAction from "./components/MessageAction";
import MessageTime from "./components/MessageTime";
import { MessageActionType } from "./types";

interface Props {
	completed: boolean;
	message?: JSX.Element;
	time: string;
	actions: MessageActionType[];
	messageStatus?: "red" | "yellow" | "green" | ""
}

interface State {

}


export class Message extends Component<Props, State> {

	static defaultProps = {
		completed: false,
		actions: [] as MessageActionType[],
		messageStatus: ""
	}

	render() {
		const { actions, message, messageStatus, completed, time } = this.props;

		return (
			<div className={
				className({
					"media": true,
					"text-muted": true,
					"pb-2": true,
					"justify-content-end": !completed
				})
			}>
				<div>
					<div className={className({
						"message": true,
						"completed": completed,
						[messageStatus || ""]: true,
					})}>
						{
							messageStatus === "red" && <span className="badge badge-pill badge-danger badge-red">!</span>
						}
						<MessageAction actions={actions} completed={completed} />
						{message}
					</div>
					<MessageTime message={time} completed={completed} />
				</div>
			</div>
		);
	}
}