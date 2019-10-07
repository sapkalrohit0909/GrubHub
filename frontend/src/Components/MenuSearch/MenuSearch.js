import React from 'react';
import axios from 'axios';
import {Row} from 'antd';
import { Form, Input, Button } from 'antd';
import {withRouter} from 'react-router-dom';
import IndividualRestaurant from '../IndividualRestaurant/IndividualRestaurant';

class MenuSearch extends React.Component{
    state={
        restaurants:[]
    }
    componentDidMount=()=>{
        if(!localStorage.getItem('BuyerWebToken')){
            this.props.history.push('/');
          }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values.cuisineName);
            if(!localStorage.getItem('BuyerWebToken')){
                this.props.history.push('/');
              }
              var config = {
                headers: {'x-auth-token': localStorage.getItem('BuyerWebToken')}
              };
              let url="http://localhost:4000/api/owner/restaurants";
              let payload={
                  "searchTerm":values.cuisineName
              };
              axios.post(url,payload,config)
                .then((response)=>{
                    console.log(response.data);
                  this.setState({restaurants:[...response.data]});
                })
                .catch((error)=>{
                  if(error.response){
                    this.setState({error:error.response.data})
                  }
                  console.log(error);
                })
          }
        });
      };
    getRestaurntHandler=(id)=>{
        this.props.history.push("/buyer/resturant/"+id);
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        let restaurants=this.state.restaurants.map((restaurant)=>{
            return <IndividualRestaurant
            restaurantName={restaurant.restaurantName}
            email={restaurant.email}
            restaurantZip={restaurant.restaurantZip}
            profileImage={restaurant.profileImage}
            getRestaurntHandler={()=>this.getRestaurntHandler(restaurant._id)}
            key={restaurant._id}
            />
        })
        return (
                <div style={{"width":"100%","marginTop":"20px"}}>
                    <Row>
                        <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('cuisineName', {
                                rules: [{ required: true, message: 'Please input your Cuisine Name!' }],
                            })(
                                <Input
                                placeholder="cuisineName"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Search
                        </Button>
                        </Form.Item>
                        </Form>
                    </Row>
                    <Row>
                            {restaurants}
                    </Row>
                </div>
        );
    }  
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(MenuSearch);
export default withRouter(WrappedNormalLoginForm);

