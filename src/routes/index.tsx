import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';

import { ProtectedRoute } from '../components/utilities/protectedRoute';

import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AgendasOcupacao from "../pages/admin/agendasOcupacao";
import AgendasDentista from "../pages/dentista/agendasdentista/Agendasdentista";
import Agendas from '../pages/admin/agendas/Agendasdentista';
import Profissionais from '../pages/admin/profissionais/Profissionais';
import Instances from '../pages/admin/instances';
import Conference  from "../pages/conference/Conference";
import Products from "../pages/products/Products"

export function Routes() {
  const location = useLocation();
  const history = useHistory();

  const [cookies] = useCookies(['whatsapp-token']);
  const token = cookies['whatsapp-token'];

  useEffect(() => {
    if (location.pathname === '/' && token) {
      history.push('/dashboard');
    }
  }, [location.pathname]);

  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/admin/agendas-ocupacao"  component={AgendasOcupacao} />
      <ProtectedRoute path="/dentista/agenda"  component={AgendasDentista} />
      <ProtectedRoute path="/admin/agendas"  component={Agendas} />
      <ProtectedRoute path="/admin/instancias"  component={Instances} />
      <ProtectedRoute path="/admin/products" component={Products} />
      <ProtectedRoute path="/admin/conference" component={Conference} />
      <ProtectedRoute path="/admin/profissionais"  component={Profissionais} />
    </Switch>
  );
}