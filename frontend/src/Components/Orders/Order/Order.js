import React, { Component } from 'react';
import { Descriptions ,Card, Button ,Row,Col} from 'antd';
import {
    Form,
    Select
  } from 'antd';
const { Option } = Select;
class Order extends Component{

  handleUpdate=e=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.changeStatusHandler(this.props.orderId,values.itemCategory);
        }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        };
    let buttons=<Row>
                    <Col span={12}>
                        <Button type="primary" style={{"marginRight":"20%"}} onClick={this.props.acceptHandler}>Accept</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="danger" style={{"marginLeft":"20%"}} onClick={this.props.rejectHandler}>Reject</Button>
                    </Col >
                </Row>; 
    let removeFromCartButton=null;
    if(this.props.orderStatus==='inCart'){
      buttons="";
      removeFromCartButton=<Button onClick={this.props.rejectHandler} style={{"marginTop":"30px"}} type="primary">Remove From Cart</Button>
    }

    let changeStatus=null;
    if(this.props.orderStatus==='Delivered'){
        buttons="";
    }

    if(this.props.orderStatus==='Preparing' || this.props.orderStatus==='Ready'|| this.props.orderStatus==='Accepted'){
        buttons="";
        changeStatus=(
            <Form {...formItemLayout} onSubmit={this.handleUpdate} style={{"marginRight":"10%"}}>
                <Form.Item label="change status" hasFeedback>
                    {getFieldDecorator('itemCategory', {
                        initialValue:this.props.orderStatus,
                        rules: [{ required: true, message: 'Please select Cuisine Category!' }],
                    })(
                    <Select placeholder="Please select Cuisine Category">
                    <Option value="Preparing">Preparing</Option>
                    <Option value="Ready">Ready</Option>
                    <Option value="Delivered">Delivered</Option>
                    </Select>,
                )}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit" style={{"marginLeft":"200px"}}>
                        Update Cuisine
                    </Button>
                </Form.Item>
            </Form>
        );
    }
  return (
      <Card style={{height:"300px","border":"solid 1px black","borderRadius":"5px ","margin":"20px"}}>
            <Descriptions title="Order Details:">
            <Descriptions.Item label="Item Name">{this.props.itemName}</Descriptions.Item>
            <Descriptions.Item label="Item Price">{this.props.itemPrice}</Descriptions.Item>
            <Descriptions.Item label="Quantity">{this.props.quantity}</Descriptions.Item>
            <Descriptions.Item label="Order Status">{this.props.orderStatus}</Descriptions.Item>
            <Descriptions.Item label="Buyer Name">{this.props.buyerName}</Descriptions.Item>
            <Descriptions.Item label="Phone Number">{this.props.PhoneNumber}</Descriptions.Item>
            {buttons}
            </Descriptions>
            {changeStatus}
            {removeFromCartButton}
      </Card>
  );
    }
    
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Order);
export default WrappedRegistrationForm;
