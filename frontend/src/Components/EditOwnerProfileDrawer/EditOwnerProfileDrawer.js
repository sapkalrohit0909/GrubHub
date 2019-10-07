
import React from 'react';
import axios from 'axios';
import {
  Form,
  Input,
  Tooltip,
  Button,
  Card
} from 'antd';
import {withRouter} from 'react-router-dom';
class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    error:"",
    _id:"",
    name:"",
    restaurantName:"",
    restaurantZip:""
  };

  componentDidMount=()=>{
    console.log(this.props);
    if(!localStorage.getItem('webToken')){
      this.props.history.push('/');
    }
    var config = {
      headers: {'x-auth-token': localStorage.getItem('webToken')}
    };
    let url="http://localhost:4000/api/owner/me"
    axios.get(url,config)
      .then((response)=>{
        console.log("inside");
        console.log(response);
        this.setState({_id:response.data._id ,
            name:response.data.name,
            restaurantName:response.data.restaurantName,
            restaurantZip:response.data.restaurantZip
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
          let data={
            "name":values.name,
            "restaurantName":values.restName,
            "restaurantZip":values.restZipCode
          }

          var config = {
            headers: {'x-auth-token': localStorage.getItem('webToken')}
          };
          let url="http://localhost:4000/api/owner"
          axios.put(url,data,config)
            .then((response)=>{
              this.props.history.push("/owner/profile");
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

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };


  render() {
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
    <Card className="form">
      <h1>Edit Profile</h1>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
      <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What is your name?">
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            initialValue:this.state.name,
            rules: [{ required: true, message: 'Please input your Name', whitespace: true }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Restaurant Name&nbsp;
              <Tooltip title="What is your name?">
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('restName', {
            initialValue:this.state.restaurantName,
            rules: [{ required: true, message: 'Please input your Restaurant Name', whitespace: true }],
          })(<Input/>)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Restuaurant Zip Code&nbsp;
              <Tooltip title="What is your Restuaurant Zip Code?">
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('restZipCode', {
            initialValue:this.state.restaurantZip,
            rules: [{ required: true, message: 'Please input your Restuaurant Zip Code', whitespace: true }],
          })(<Input/>)}
        </Form.Item>

        <h1 style={{"color":"red"}}>{this.state.error}</h1>
        <Form.Item {...tailFormItemLayout} style={{"marginRight":"30px"}}>
          <Button type="primary" htmlType="submit" >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(WrappedRegistrationForm);
          