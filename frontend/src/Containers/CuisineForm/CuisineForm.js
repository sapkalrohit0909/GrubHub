
import React from 'react';
import {
  Form,
  Select,
  Button,
  Upload,
  Icon,
  Input,
  Tooltip,
  InputNumber,
  Card
} from 'antd';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
const { Option } = Select;
const { TextArea } = Input;
class CuisineForm extends React.Component {
    state={
        error:""
    }
  componentDidMount=()=>{
    if(!localStorage.getItem('webToken')){
      this.props.history.push('/');
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var config = {
          headers: {'x-auth-token': localStorage.getItem('webToken')}
        };
        let url="http://localhost:4000/api/item/";
        let data=new FormData();
        data.append("itemName",values.cuisineName);
        data.append("itemDescription",values.cuisineDescription);
        data.append("itemPrice",values.itemPrice);
        data.append("itemCategory",values.itemCategory);
        data.append( "itemImage",values.upload[0].originFileObj);
        console.log(data);
        axios.post(url,data,config)
          .then((response)=>{
            console.log("inside");
            console.log(response);
            this.props.history.push('/owner/cuisines/breakfast');
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

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Card className="form" style={{"height":"600px"}}>
        <h1>New Cuisine</h1>
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>

          <Form.Item
          label={
            <span>
              Cuisine Name
              <Tooltip title="What is Cuisine's name?">
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('cuisineName', {
            rules: [{ required: true, message: 'Please input Cuisine Name', whitespace: true },{min:5,message:"Cuisine Name must be 5 character long"}],
          })(<Input />)}
        </Form.Item>

        <Form.Item
          label={
            <span>
              Cuisine Description
              <Tooltip title="What is Cuisine's Description?">
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('cuisineDescription', {
            rules: [{ required: true, message: 'Please input Cuisine Description', whitespace: true },{min:5,message:"Cuisine Description must be 5 character long"}],
          })(<TextArea />)}
        </Form.Item>

        <Form.Item label="Select Category" hasFeedback>
          {getFieldDecorator('itemCategory', {
            rules: [{ required: true, message: 'Please select Cuisine Category!' }],
          })(
            <Select placeholder="Please select Cuisine Category">
              <Option value="Breakfast">Breakfast</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Appetizer">Appetizer</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item
                label={
                <span>
                    Cuisine Price
                    <Tooltip title="What is Cuisine's Price?">
                    </Tooltip>
                </span>
                }
            >
            {getFieldDecorator('itemPrice', {
            rules: [{ required: true, message: 'Please input Cuisine Price' }],
            })(<InputNumber min={0} step={0.1}/>)}
            </Form.Item>

        <Form.Item label="Upload" extra="">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            rules: [{ required: true, message: 'Please Upload Cuisine Photo' }],
          })(
            <Upload name="logo" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload Cuisine Photo
              </Button>
            </Upload>,
          )}
        </Form.Item>

        <h1 style={{"color":"red"}}>{this.state.error}</h1>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Add Cuisine
          </Button>
        </Form.Item>
      </Form>
      </Card>
    );
  }
}

const WrappedDemo = Form.create({ name: 'validate_other' })(CuisineForm);

export default withRouter(WrappedDemo);
          