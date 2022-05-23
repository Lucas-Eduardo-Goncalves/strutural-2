import React, { ComponentType } from 'react';
import { useCookies } from 'react-cookie';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

interface IProtectedRouteProps {
  component: ComponentType<any>;
  path: string;
}

export function ProtectedRoute({ component, path }: IProtectedRouteProps) {
  const [cookies] = useCookies(['whats-front-token']);
  const token = cookies['whats-front-token'];

  const isLoggedIn = token;
  return isLoggedIn ? <Route component={component} path={path} /> : <Redirect to="/" />;
};

ProtectedRoute.propTypes = {
  component: propTypes.object.isRequired,
  path: propTypes.string.isRequired,
};
