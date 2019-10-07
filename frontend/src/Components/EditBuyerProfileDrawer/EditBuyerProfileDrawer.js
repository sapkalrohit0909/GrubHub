
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
    name:"",
    phoneNumber:""
  };

  componentDidMount=()=>{
    if(!localStorage.getItem('BuyerWebToken')){
      this.props.history.push('/');
    }
    var config = {
      headers: {'x-auth-token': localStorage.getItem('BuyerWebToken')}
    };
    let url="http://localhost:4000/api/buyer/me"
    axios.get(url,config)
      .then((response)=>{
        this.setState({_id:response.data._id ,
            name:response.data.name,
            phoneNumber:response.data.phoneNumber
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
            "phoneNumber":values.phoneNumber,
          }

          var config = {
            headers: {'x-auth-token': localStorage.getItem('BuyerWebToken')}
          };
          let url="http://localhost:4000/api/buyer"
          axios.put(url,data,config)
            .then((response)=>{
              this.props.history.push("/buyer/profile");
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
              Phone Number&nbsp;
              <Tooltip title="What is your phone Number?">
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('phoneNumber', {
            initialValue:this.state.phoneNumber,
            rules: [{ required: true, message: 'Please input valid phone number', whitespace: true ,pattern: new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)}],
          })(<Input/>)}
        </Form.Item>
        <h1 style={{"color":"red"}}>{this.state.error}</h1>
        <Form.Item {...tailFormItemLayout} >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default withRouter(WrappedRegistrationForm);
          