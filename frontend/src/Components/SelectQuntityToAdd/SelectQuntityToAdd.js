import React from 'react';
import axios from 'axios';
import {Row,Col,Tooltip,InputNumber} from 'antd';
import { Form,  Button,Card } from 'antd';
import {withRouter} from 'react-router-dom';

class SelectQuantityToAdd extends React.Component{
    state={
        itemCategory:"",
        itemDescription:"",
        itemImage:"",
        itemName:"",
        itemPrice:"",
        _id:"",
        error:""
    }
    componentDidMount=()=>{
        console.log(this.props);
        let cuisineId=this.props.match.params.cuisineId;
        if(!localStorage.getItem('BuyerWebToken')){
            this.props.history.push('/');
          }
        var config = {
            headers: {'x-auth-token': localStorage.getItem('BuyerWebToken')}
          };
          let url="http://localhost:4000/api/item/"+cuisineId;
          axios.get(url,config)
            .then((response)=>{
                this.setState({
                    itemCategory:response.data[0].itemCategory,
                    itemDescription:response.data[0].itemDescription,
                    itemImage:response.data[0].itemImage,
                    itemName:response.data[0].itemName,
                    itemPrice:response.data[0].itemPrice,
                });
            })
            .catch((error)=>{
              if(error.response){
                this.setState({error:error.response.data})
              }
              console.log(error);
            })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            console.log(this.props);
            var config = {
                headers: {'x-auth-token': localStorage.getItem('BuyerWebToken')}
              };
              let url="http://localhost:4000/api/order/addToCart";
              let payload={
                itemId:this.props.match.params.cuisineId,
                quantity:values.quantity
              }
              axios.post(url,payload,config)
                .then((response)=>{
                    this.props.history.push("/buyer/resturant/"+this.props.match.params.id);
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
    
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
          };
        return (
            
                <div style={{"width":"100%","marginTop":"20px"}}>
                    <Card>
                        <Row>
                            <Col span={6} style={{"height":"150px","width":"150px","marginRight":"30px"}}>
                                <div style={{"width":"100%","height":"100%"}}><img src={"http://localhost:4000/"+this.state.itemImage} alt="Cuisine" style={{"width":"100%","height":"100%","borderRadius":"10px"}}></img></div>
                            </Col>
                            <Col span={18}>
                                <h1>Cuisine Info</h1>
                                <span ><b style={{"textAlign":"left"}}>Cuisine Name   :</b>{this.state.itemName}</span><br></br>
                                <span><b style={{"textAlign":"left"}}>Cuisine Price  :</b>{this.state.itemPrice}</span><br></br>
                                <span><b>Description    :</b>{this.state.itemDescription}</span><br></br>
                                <span><b>Item Category   :</b>{this.state.itemCategory}</span><br></br>
                            </Col>
                        </Row>
                        <Row>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                                <Form.Item
                                    label={
                                        <span>
                                            Enter Quantity
                                            <Tooltip title="How much quantity you want?">
                                            </Tooltip>
                                        </span>
                                        }
                                    >
                                    {getFieldDecorator('quantity', {
                                    rules: [{ required: true, message: 'Please enter quantity' }],
                                    })(<InputNumber min={0} step={1}/>)}
                                </Form.Item>
                                <h1 style={{"color":"red"}}>{this.state.error}</h1>
                                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                    <Button type="primary" htmlType="submit">
                                        Add To Cart
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Row>
                    </Card>
                </div>
        );
    }  
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SelectQuantityToAdd);
export default withRouter(WrappedNormalLoginForm);

