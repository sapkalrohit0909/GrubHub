import React,{Component}from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';
class OwnerSideBar extends Component {
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
                <span><Link style={{"color":"white"}} to="/owner/profile">Profile</Link></span>
              </Menu.Item>
              <Menu.Item key="2">
              <Icon type="build" />
                <span><Link style={{"color":"white"}} to="/owner/incomingorders">Orders</Link></span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="database" />
                <span><Link style={{"color":"white"}} to="/owner/cuisines/breakfast">Menu</Link></span>
              </Menu.Item>
              <Menu.Item key="4">
              <Icon type="logout" />
                <span><Link style={{"color":"white"}} to="/owner/logout">Logout</Link></span>
              </Menu.Item>
          </Menu>
        </div>
      );
    }
  }

  export default OwnerSideBar;