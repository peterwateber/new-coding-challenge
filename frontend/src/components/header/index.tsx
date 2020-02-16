import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "src/config";
import { UserState } from "src/store/state";

interface NavigationLinks {
	url: string;
	title: string;
	onClick?: () => void;
}

interface Props {
	user: UserState;
	navigationLinks: NavigationLinks[]
}

const Header = (props: Props) => {
	const navigationLinks: NavigationLinks[] = [
		{
			url: props.user.authenticated ? AppRoutes.index : AppRoutes.login,
			title: "Dashboard"
		},
		...props.navigationLinks,
	]

	return (
		<div className="nav-scroller bg-light shadow-sm">
			<nav className="nav nav-underline">
				{
					navigationLinks.map((link, index) =>
						<Link
							key={index}
							to={link.url}
							className={classNames({
								"nav-link": true,
								"active": true,
							})}
							onClick={link.onClick}
						>
							{link.title}
						</Link>
					)
				}
			</nav>
		</div>
	)
}

export default Header;