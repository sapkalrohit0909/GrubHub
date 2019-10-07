import React,{Component}from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
class BuyerSideBar extends Component {
    render() {
      return (
        <div>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
          >
              <Menu.Item key="1">
              <Icon type="user" />
                <span><Link style={{"color":"white"}} to="/buyer/profile">Profile</Link></span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="database" />
                <span><Link style={{"color":"white"}} to="/buyer/menu">Menu</Link></span>
              </Menu.Item>
              <Menu.Item key="2">
              <Icon type="build" />
                <span><Link style={{"color":"white"}} to="/buyer/cart">Cart</Link></span>
              </Menu.Item>
              <Menu.Item key="4">
              <Icon type="logout" />
                <span><Link style={{"color":"white"}} to="/buyer/logout">Logout</Link></span>
              </Menu.Item>
          </Menu>
        </div>
      );
    }
  }

  export default BuyerSideBar;