import React from 'react';
import axios from 'axios';
import {Row,Col} from 'antd';
import { Form,Card } from 'antd';
import {Route,withRouter} from 'react-router-dom';
import CuisineAddCart from '../CuisineAddCart/CuisineAddCart';
import SelectQuantityToAdd from '../SelectQuntityToAdd/SelectQuntityToAdd';

class RestaurantCuisines extends React.Component{
    state={
        restaurantName:"",
        email:"",
        restaurantZip:"",
        profileImage:"",
        cuisines:[]
    }
    componentDidMount=()=>{
        if(!localStorage.getItem('BuyerWebToken')){
            this.props.history.push('/');
          }
        var config = {
            headers: {'x-auth-token': localStorage.getItem('BuyerWebToken')}
          };
          let url="http://localhost:4000/api/owner/"+this.props.match.params.id;
          axios.get(url,config)
            .then((response)=>{
                let initialData=response.data;
                url="http://localhost:4000/api/item//cuisines/"+initialData._id;
                axios.get(url,config)
                    .then((response)=>{
                        let data={
                            restaurantName:initialData.restaurantName,
                            email:initialData.email,
                            restaurantZip:initialData.restaurantZip,
                            profileImage:initialData.profileImage,
                            cuisines:[...response.data]
                        }
                        this.setState(data);
                    }).catch((error)=>{
                        if(error.response){
                            this.setState({error:error.response.data})
                          }
                          console.log(error);
                    })
            })
            .catch((error)=>{
              if(error.response){
                this.setState({error:error.response.data})
              }
              console.log(error);
            })
    }
      addToCartHandler=(id)=>{
          this.props.history.push(this.props.location.pathname+"/"+id);
      }
    render(){
        let cuisines=this.state.cuisines.map((cuisine)=>{
            return <CuisineAddCart
            itemCategory={cuisine.itemCategory}
            itemImage={cuisine.itemImage}
            itemName={cuisine.itemName}
            itemPrice={cuisine.itemPrice}
            itemId={cuisine._id}
            restaurantId={cuisine.restaurantId}
            addToCartHandler={()=>this.addToCartHandler(cuisine._id)}
            key={cuisine._id}
            />
        });
        return (
            
                <div style={{"width":"100%","marginTop":"20px"}}>
                    <Card style={{"backgroundColor":"rgb(159, 201, 245)"}}>
                        <Row>
                            <Col span={6} style={{"height":"150px","width":"150px","marginRight":"30px"}}>
                                <div style={{"width":"100%","height":"100%"}}><img src={"http://localhost:4000/"+this.state.profileImage} alt="Restaurant" style={{"width":"100%","height":"100%","borderRadius":"10px"}}></img></div>
                            </Col>
                            <Col span={18}>
                                <h1>Restaurant Info</h1>
                                <span><b>Restaurant Name:</b>{this.state.restaurantName}</span><br></br>
                                <span><b>Email:</b>{this.state.email}</span><br></br>
                                <span><b>Zip Code:</b>{this.state.restaurantZip}</span><br></br>
                            </Col> 
                        </Row>
                    </Card>
                    <Row>
                    <Route path="/buyer/resturant/:id/:cuisineId" exact><SelectQuantityToAdd></SelectQuantityToAdd></Route>
                    <Route path="/buyer/resturant/:id"  exact render={()=><h1>Cuisines</h1>}></Route>
                    <Route path="/buyer/resturant/:id" exact render={()=>cuisines}></Route> 
                    </Row>
               
                </div>
        );
    }  
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(RestaurantCuisines);
export default withRouter(WrappedNormalLoginForm);

