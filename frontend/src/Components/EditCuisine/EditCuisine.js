
import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Button,
  Card,
  InputNumber,
  Select
} from 'antd';
const { Option } = Select;
let {TextArea}=Input;
class EditCuisineForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    error:"",
    itemName:"",
    itemPrice:"",
    itemDescription:"",
    itemCategory:""
  };

  componentDidMount=()=>{
      console.log(this.props);
      if(!localStorage.getItem('webToken')){
        this.props.history.push('/');
      }
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/item/"+this.props.match.params.id;
      axios.get(url,config)
        .then((response)=>{
          console.log("inside");
          console.log(response);
          this.setState({itemName:response.data[0].itemName,itemPrice:response.data[0].itemPrice,itemDescription:response.data[0].itemDescription,itemCategory:response.data[0].itemCategory});
        })
        .catch((error)=>{
          if(error.response){
            this.setState({error:error.response.data})
          }
          console.log(error);
        })
  }
  handleUpdate = e => {
      console.log(this.props);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          var config = {
            headers: {'x-auth-token': localStorage.getItem('webToken')}
          };
          let url="http://localhost:4000/api/item/"+this.props.match.params.id;
          let data={
              "itemName":values.cuisineName,
              "itemDescription":values.cuisineDescription,
              "itemPrice":values.itemPrice,
              "itemCategory":values.itemCategory
          }
          axios.put(url,data,config)
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
    return (
    <Card className="form">
      <h1>Edit Cuisine</h1>
      <Form {...formItemLayout} onSubmit={this.handleUpdate} style={{"marginRight":"10%"}}>

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
            initialValue:this.state.itemName,
            rules: [{ required: true, message: 'Please input Cuisine Name', whitespace: true }],
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
            initialValue:this.state.itemDescription,
            rules: [{ required: true, message: 'Please input Cuisine Description', whitespace: true }],
            })(<TextArea />)}
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
            initialValue:this.state.itemPrice,
            rules: [{ required: true, message: 'Please input Cuisine Price' }],
            })(<InputNumber min={0} step={0.1}/>)}
            </Form.Item>

            <Form.Item label="Select Category" hasFeedback>
                {getFieldDecorator('itemCategory', {
                    initialValue:this.state.itemCategory,
                    rules: [{ required: true, message: 'Please select Cuisine Category!' }],
                })(
            <Select placeholder="Please select Cuisine Category">
              <Option value="Breakfast">Breakfast</Option>
              <Option value="Lunch">Lunch</Option>
              <Option value="Appetizer">Appetizer</Option>
            </Select>,
          )}
        </Form.Item>

        <h1 style={{"color":"red"}}>{this.state.error}</h1>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit" style={{"marginLeft":"280px"}}>
                Update Cuisine
            </Button>
            </Form.Item>

      </Form>
    </Card>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(EditCuisineForm);

export default withRouter(WrappedRegistrationForm);
          