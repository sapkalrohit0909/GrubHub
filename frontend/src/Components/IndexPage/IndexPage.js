import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import grubHubBackground from '../../Assets/images/grubhubBackGround.jpg';
import {Button} from 'antd';
import './IndexPage.css';
class IndexPage extends Component{
    onClickBuyer=()=>{
        this.props.history.push("/buyer/SignIn");    
    }
    onClickOwner=()=>{
        this.props.history.push("/owner/SignIn");    
    }

    render(){
        return (
            <div style={{"height":"100vh","width":"100%","backgroundImage":`url(${grubHubBackground})`,"backgroundRepeat": "no-repeat","backgroundPosition": "center"}}>
                    <div style={{
                        "width":"600px",
                        "paddingTop":"20%",
                        "margin":"auto",
                    }}> 
                        <Button  style={{"height":"200px","width":"200px" ,"backgroundColor":"red","margin":"30px","borderRadius":"100px"}} onClick={this.onClickOwner}><h4 style={{"color":"white"}}>Owner</h4></Button>
                        <Button type="primary" style={{"height":"200px","width":"200px", "margin":"30px","borderRadius":"100px"}} onClick={this.onClickBuyer}><h4 style={{"color":"white"}}>Buyer</h4 ></Button>
                    </div>
            </div>
        );
    }
}
export default withRouter(IndexPage);

