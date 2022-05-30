import React, { useEffect } from 'react';
import Cookie from "js-cookie";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import { ProtectedRoute } from '../components/utilities/protectedRoute';

import SignIn from '../pages/SignIn';
import { Users } from '../pages/users';
import Conference from '../pages/conference/Conference';
import ConferenceDetails from '../pages/conference/ConferenceDetails';
import Products from '../pages/products/Products';
import Instances from '../pages/instances/Instances';

export function Routes() {
  const location = useLocation();
  const history = useHistory();

  const token = Cookie.get("strutural-token");

  useEffect(() => {
    if (location.pathname === '/' && token) {
      history.push('/admin/usuarios');
    }
  }, [history, token, location.pathname]);

  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      
      <ProtectedRoute path="/admin/usuarios" component={Users} />
      <ProtectedRoute path="/admin/instancias" component={Instances} />
      <ProtectedRoute path="/admin/products" component={Products} />
      <ProtectedRoute path="/admin/conferenceDetails/:codPedido"  component={ConferenceDetails} />
      <ProtectedRoute path="/admin/conference" component={Conference} />
    </Switch>
  );
}