import React,{Component}from 'react';
import {Row,Col,Card,Button,Form,Upload,Icon} from 'antd';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class ProfileOwner extends Component{
    state={
        _id:"",
        name:"",
        email:"",
        restaurantName:"",
        restaurantZip:"",
        profileImage:"",
        shoulShow:false
    }
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
                email:response.data.email,
                restaurantName:response.data.restaurantName,
                restaurantZip:response.data.restaurantZip,
                profileImage:response.data.profileImage,
            });
          })
          .catch((error)=>{
            if(error.response){
              this.setState({error:error.response.data})
            }
            console.log(error);
          })
    }
    editHandler=()=>{
        this.props.history.push("/owner/profile/edit");
    }
    normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      };
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
            var config = {
            headers: {'x-auth-token': localStorage.getItem('webToken')}
            };
            let url="http://localhost:4000/api/owner/uploadProfilePicture";
            let data=new FormData();
            data.append( "profilePicture",values.upload[0].originFileObj);
            axios.post(url,data,config)
            .then((response)=>{
                // console.log(response);
                var config1 = {
                    headers: {'x-auth-token': localStorage.getItem('webToken')}
                    };
                  let url="http://localhost:4000/api/owner/me"
                  axios.get(url,config1)
                    .then((response)=>{
                        console.log(response);
                      this.setState({_id:response.data._id ,
                          name:response.data.name,
                          email:response.data.email,
                          restaurantName:response.data.restaurantName,
                          restaurantZip:response.data.restaurantZip,
                          profileImage:response.data.profileImage,
                          shoulShow:!this.state.shoulShow
                      });
                    })
                    .catch((error)=>{
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
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        };
        let uploadPhoto=null;
        let changePhotoButton=(<Button onClick={()=>{this.setState({shoulShow:!this.state.shoulShow})}}>Change Profile Picture</Button>);
        if(this.state.shoulShow){
            uploadPhoto=(
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Upload" extra="">
                    {getFieldDecorator('upload', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        rules: [{ required: true, message: 'Please Select profile Photo' }],
                    })(
                        <Upload name="logo" listType="picture">
                        <Button>
                            <Icon type="upload" /> Click to upload Profile Photo
                        </Button>
                        </Upload>,
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Upload Photo
                    </Button>
                </Form.Item>
                </Form>
            );
            changePhotoButton=null;
        }
        console.log(this.state.profileImage);
        return (
            <Card style={{"height":"100%","border":"none"}}>

                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div style={{"height":"200px","width":"200px","marginLeft":"22%","marginBottom":"10px"}}>
                            <img src={"http://localhost:4000/"+this.state.profileImage} alt="profile" style={{"width":"100%","height":"100%","borderRadius":"100px"}}></img>
                        </div>
                        {uploadPhoto}
                        {changePhotoButton}
                    </Col>
                    <Col span={8}>
                        <Button style={{"width":"150px","height":"70px"}} type="danger" onClick={this.editHandler}>Edit Profile</Button>
                    </Col>
                </Row>
                <Row>
                    <Card style={{"margin":"20px","height":"100px","backgroundColor":"rgb(237, 234, 228)"}}>
                        <h4>Name: {this.state.name}</h4>
                    </Card>
                    <Card style={{"margin":"20px","height":"100px","backgroundColor":"rgb(237, 234, 228)"}}>
                        <h4>Email Id: {this.state.email}</h4>
                    </Card>
                    <Card style={{"margin":"20px","height":"100px","backgroundColor":"rgb(237, 234, 228)"}}>
                        <h4>Restaurant Name: {this.state.restaurantName}</h4>
                    </Card>
                    <Card style={{"margin":"20px","height":"100px","backgroundColor":"rgb(237, 234, 228)"}}>
                        <h4>Restaurant Zip:{this.state.restaurantZip}</h4>
                    </Card>
                    <Button style={{"width":"150px","height":"70px"}} type="danger" onClick={this.editHandler}>Edit Profile</Button>
                </Row>
            </Card>
          );
        }
}
const WrappedDemo = Form.create({ name: 'validate_other' })(ProfileOwner);
export default withRouter(WrappedDemo);
