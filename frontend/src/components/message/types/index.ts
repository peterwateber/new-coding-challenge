export enum ActionType {
	DELIVERED = "Delivered",
	PICK = "Pick",
	ASSIGN = "Assign",
	UNASSIGN = "Unassign",
	UNPICK = "Unpick",
}


export interface MessageActionType {
	type: ActionType;
	onClick: () => void;
}
