import React, { Component } from 'react';
import { Form, Icon, Input, Button,Card } from 'antd';
import axios from 'axios';
import './BuyersSignInPage.css'
import {Link} from 'react-router-dom';
class LoginForm extends Component {
    state={
        error:""
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let data={
                    email:values.userName,
                    password:values.password
                }
                axios.post("http://localhost:4000/api/buyer/signIn",data)
                .then((result)=>{
                    console.log(result);
                    localStorage.setItem("BuyerWebToken",result.data);
                    this.props.history.push("/buyer/profile");
                })
                .catch((error)=>{
                    if(error.response){
                        this.setState({error:error.response.data});
                    }
                    console.log(error);
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="loginBox">
                <Card title={<img src="https://s2.q4cdn.com/723557020/files/Grubhub-logo-251by107px@2x.png" alt="grubhub"></img>} bordered={false} style={{height:"520px","border":"solid 1px black","borderRadius":"5px"}}>
                    <h1 style={{paddingBottom:"0px",marginBottom:"0px"}}>Log In</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form"  style={{ "padding": "20px" }}>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your Email!' }],
                            })(
                                <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" type="email" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ "width": "100%","height":"50px","backgroundColor":"#007dc1"}}>
                                Sign In
                    </Button>
                                <h4 style={{"color":"red"}}>{this.state.error}</h4>
                           <Link to="/buyer/SignUp"><footer style={{textAlign:"left",color:"black"}}><a href="/">Click here to create new account</a></footer></Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}


const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedNormalLoginForm;