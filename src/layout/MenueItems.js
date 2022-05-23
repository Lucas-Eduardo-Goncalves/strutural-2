import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
// import jwt_decode from "jwt-decode";

const MenuItems = ({ darkMode, toggleCollapsed, topMenu }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );
  

  // const [cookies] = useCookies(['whatsapp-token']);
  // const token = cookies['whatsapp-token'];
  
  const decoded = 4;
 
  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  if(decoded.sub === 432){
    return (
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        theme={darkMode && 'dark'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<FeatherIcon icon="more-vertical" />}
        openKeys={openKeys}
      >
        {!topMenu && <p className="sidebar-nav-title">Principal</p>}
    
         <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/admin/agendas-ocupacao`}>
                <FeatherIcon icon="bar-chart-2" />
              </NavLink>
            )
          }
          key="agendaocupacao"
        >
          <NavLink onClick={toggleCollapsed} to={`/admin/agendas-ocupacao`}>
            Agendas / Ocupação
          </NavLink>
        </Menu.Item> 
  
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/admin/agendas`}>
                <FeatherIcon icon="calendar" />
              </NavLink>
            )
          }
          key="agenda"
        >
          <NavLink onClick={toggleCollapsed} to={`/admin/agendas`}>
            Agendas Dentistas
          </NavLink>
        </Menu.Item> 

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/admin/profissionais`}>
                <FeatherIcon icon="users" />
              </NavLink>
            )
          }
          key="profissionais"
        >
          <NavLink onClick={toggleCollapsed} to={`/admin/profissionais`}>
            Profissinais
          </NavLink>
        </Menu.Item> 

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/admin/products`}>
                <FeatherIcon icon="shopping-cart" />
              </NavLink>
            )
          }
          key="produtos"
        >
          <NavLink onClick={toggleCollapsed} to={`/admin/products`}>
            Produtos
          </NavLink>
        </Menu.Item> 

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/admin/conference`}>
                <FeatherIcon icon="users" />
              </NavLink>
            )
          }
          key="produtos"
        >
          <NavLink onClick={toggleCollapsed} to={`/admin/conference`}>
            Conferencia
          </NavLink>
        </Menu.Item>
  
        {!topMenu && <p className="sidebar-nav-title">Whatsapp</p>}

        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/admin/instancias`}>
                <FeatherIcon icon="users" />
              </NavLink>
            )
          }
          key="instancias"
        >
          <NavLink onClick={toggleCollapsed} to={`/admin/instancias`}>
            Instâncias
          </NavLink>
        </Menu.Item> 
      </Menu>
    );

  }else{
    return (
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        theme={darkMode && 'dark'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
                `${
                  mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
                }`,
              ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<FeatherIcon icon="more-vertical" />}
        openKeys={openKeys}
      >
        {!topMenu && <p className="sidebar-nav-title">Principal</p>}
    
         
  
        <Menu.Item
          icon={
            !topMenu && (
              <NavLink className="menuItem-iocn" to={`/dentista/agenda`}>
                <FeatherIcon icon="calendar" />
              </NavLink>
            )
          }
          key="agenda"
        >
          <NavLink onClick={toggleCollapsed} to={`/dentista/agenda`}>
            Agenda
          </NavLink>
        </Menu.Item> 
  
  
      </Menu>
    );
    
  }
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
