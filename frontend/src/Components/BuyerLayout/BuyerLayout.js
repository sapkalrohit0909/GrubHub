import React from 'react';
import {Row,Col} from 'antd';
import BuyerSideBar from '../../Containers/BuyerSideBar/BuyerSideBar';
import Header from '../../Components/Header/Header';
import Logout from '../Logout/Logout';
import ProfileBuyer from '../../Containers/ProfileBuyer/ProfileBuyer';
import EditBuyerProfile from '../../Components/EditBuyerProfileDrawer/EditBuyerProfileDrawer';
import Cart from '../Cart/Cart';
import {Route} from 'react-router-dom';
import MenuSearch from '../MenuSearch/MenuSearch';
import RestaurantCuisines from '../RestaurantCuisines/RestaurantCuisines';

class Layout extends React.Component{
    componentDidMount=()=>{
        if(!localStorage.getItem('BuyerWebToken')){
            this.props.history.push('/');
          }
    }
    render(){
        return (
            <div className='container-fluid'>
                <div>
                    <Row>
                        <Col span={4} style={{"height":"100vh",'backgroundColor':"rgb(4, 21, 39)"}}>
                           <BuyerSideBar></BuyerSideBar>
                        </Col>
                        <Col span={20}>
                            <Row style={{"height":"10vh","backgroundColor":"rgb(209, 199, 176)"}}>
                                <Route path="/buyer/profile" exact><Header title="PROFILE"></Header></Route>        
                                <Route path="/buyer/profile/edit" exact><Header title="PROFILE"></Header></Route>        
                                <Route path="/buyer/cart" exact><Header title="CART"></Header></Route>
                                <Route path="/buyer/menu" exact><Header title="MENU"></Header></Route>  
                                <Route path="/buyer/resturant/:id"><Header title="MENU"></Header></Route>      
                            </Row>       
                            <Row style={{"height":"90vh","overflow":"scroll"}}>
                                <Route path="/buyer/profile" exact><ProfileBuyer></ProfileBuyer></Route>
                                <Route path="/buyer/profile/edit" exact><EditBuyerProfile></EditBuyerProfile></Route>
                                <Route path="/buyer/cart" exact><Cart></Cart></Route>
                                <Route path="/buyer/menu"><MenuSearch></MenuSearch></Route>
                                <Route path="/buyer/logout" exact><Logout></Logout></Route>
                                <Route path="/buyer/resturant/:id" ><RestaurantCuisines></RestaurantCuisines></Route>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
    
}

export default Layout;

