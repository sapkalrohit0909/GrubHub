import React from 'react';
import { Row, Col } from 'antd';
import {Route} from 'react-router-dom';
import OwnerSideBar from "../../Containers/OwnerSideBar/OwnerSideBar";
import Orders from '../Orders/Orders';
import CuisineForm from '../../Containers/CuisineForm/CuisineForm';
import Cuisines from '../../Components/Cuisines/Cuisines';
import ProfileOwner from '../../Containers/ProfileOwner/ProfileOwner';
import EditOwnerProfile from '../../Components/EditOwnerProfileDrawer/EditOwnerProfileDrawer';
import Header from '../../Components/Header/Header';
import Logout from '../../Components/Logout/Logout';
import CuisineEditForm from '../EditCuisine/EditCuisine';
class Layout extends React.Component{
    componentDidMount=()=>{
        if(!localStorage.getItem('webToken')){
            this.props.history.push('/');
          }
    }
    render(){
        return (
            <div className='container-fluid'>
                <div>
                    <Row>
                        <Col span={4} style={{"height":"100vh",'backgroundColor':"rgb(4, 21, 39)"}}>
                            <OwnerSideBar></OwnerSideBar>
                        </Col>
                        <Col span={20}>
                            <Row style={{"height":"10vh","backgroundColor":"rgb(209, 199, 176)"}}>
                                <Route path="/owner/profile" exact><Header title="PROFILE"></Header></Route>
                                <Route path="/owner/profile/edit" exact><Header title="PROFILE"></Header></Route>
                                <Route path="/owner/incomingorders" exact><Header title="ORDERS"></Header></Route>
                                <Route path="/owner/inprocessorders" exact><Header title="ORDERS"></Header></Route>
                                <Route path="/owner/deliveredorders" exact><Header title="ORDERS"></Header></Route>
                                <Route path="/owner/cuisines/breakfast" exact><Header title="CUISINES"></Header></Route>
                                <Route path="/owner/cuisines/lunch" exact><Header title="CUISINES"></Header></Route>
                                <Route path="/owner/cuisines/appetizer" exact><Header title="CUISINES"></Header></Route>
                                <Route path="/owner/cuisines/add" exact><Header title="CUISINES"></Header></Route>
                                <Route path="/owner/cuisines/edit:id" exact><Header title="CUISINES"></Header></Route>
                                
                            </Row>       
                            <Row style={{"height":"90vh","overflow":"scroll"}}>
                                <Route path="/owner/profile" exact><ProfileOwner></ProfileOwner></Route>
                                <Route path="/owner/profile/edit" exact><EditOwnerProfile></EditOwnerProfile></Route>
                                <Route path="/owner/incomingorders" exact><Orders orderType="getIncomingOrders"></Orders></Route>
                                <Route path="/owner/inprocessorders" exact><Orders orderType="getAllInProcessOrders"></Orders></Route>
                                <Route path="/owner/deliveredorders" exact><Orders orderType="getAllDeliveredOrders"></Orders></Route>
                                <Route path="/owner/cuisines/breakfast" exact><Cuisines itemType="breakfast"></Cuisines></Route>
                                <Route path="/owner/cuisines/lunch" exact><Cuisines itemType="lunch"></Cuisines></Route>
                                <Route path="/owner/cuisines/appetizer" exact><Cuisines itemType="appetizer"></Cuisines></Route>
                                <Route path="/owner/cuisines/add" exact><CuisineForm></CuisineForm></Route>
                                <Route path="/owner/cuisines/edit/:id" exact><CuisineEditForm></CuisineEditForm></Route>
                                <Route path="/owner/logout"><Logout></Logout></Route>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
    
}

export default Layout;

