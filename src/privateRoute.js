import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/loginProvider";

function PrivateRoute({ component: Component, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default useAuth(PrivateRoute);
