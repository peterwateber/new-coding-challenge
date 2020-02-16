import { Route, Redirect } from "react-router-dom";
import React from "react";
import { AppRoutes } from "src/config";


export const PrivateRoute = ({ authenticated, children, redirectUrl, ...rest }: any) => {
	return (
		<Route
			{...rest}
			render={({ location }) =>
				!authenticated ? (
					children
				) : (
						<Redirect
							to={{
								pathname: redirectUrl,
								state: { from: location }
							}}
						/>
					)
			}
		/>
	);
}

PrivateRoute.defaultProps = {
	redirectUrl: AppRoutes.index
}