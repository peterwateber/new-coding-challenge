import React from "react";
import TimeAgo from "timeago-react";

interface Props {
	completed: boolean;
	message: string;
}

const MessageTime = (props: Props) => {
	const { completed, message } = props;
	return (
		<div className="message-time text-right">
			{
				completed &&
				<svg className="bi bi-check" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M15.854 5.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L8.5 12.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd"></path>
				</svg>
			}
			<small>
				{completed ? "Delivered" : ""}&nbsp;
				<TimeAgo datetime={message} />
			</small>
		</div>
	)
}

MessageTime.defaultProps = {
	completed: false,
	message: "just now"
}

export default MessageTime;