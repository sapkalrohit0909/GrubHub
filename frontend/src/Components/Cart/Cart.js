import React, { Component } from "react";
import { Button} from "antd";
import CartItem from "../CartItem/CartItem";
import {  withRouter } from "react-router-dom";
import axios from "axios";
class Cart extends Component {
  state = {
    orders: [],
    error: "",
    total:0
  };
  componentDidMount = () => {
    if (!localStorage.getItem("BuyerWebToken")) {
      this.props.history.push("/");
    }
    var config = {
      headers: { "x-auth-token": localStorage.getItem("BuyerWebToken") }
    };
    let url = "http://localhost:4000/api/order/getCart";
    axios
      .get(url, config)
      .then(response => {
        let total=0;
        for(let i=0;i<response.data.length;i++){
            let price=parseInt(response.data[i].itemPrice)*parseInt(response.data[i].quantity); 
            total=total+price;
        }
        this.setState({ orders: [...response.data] ,total:total});
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data });
        }
        console.log(error);
      });
  };
  rejectHandler = orderId => {
    var config = {
      headers: { "x-auth-token": localStorage.getItem("BuyerWebToken") }
    };
    let url = "http://localhost:4000/api/order/removeFromCart/" + orderId;
    axios
      .delete(url, config)
      .then(response => {
        var config1 = {
          headers: { "x-auth-token": localStorage.getItem("BuyerWebToken") }
        };
        let url = "http://localhost:4000/api/order/getCart";
        axios
          .get(url, config1)
          .then(response => {
            let total=0;
            for(let i=0;i<response.data.length;i++){
                let price=parseInt(response.data[i].itemPrice)*parseInt(response.data[i].quantity); 
                total=total+price;
            }
            this.setState({ orders: [...response.data] ,total:total});
          })
          .catch(error => {
            if (error.response) {
              this.setState({ error: error.response.data });
            }
            console.log(error);
          });
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data });
        }
        console.log(error);
      });
  };
  checkOutHandler=()=>{
    var config = {
        headers: { "x-auth-token": localStorage.getItem("BuyerWebToken") }
      };
      let url = "http://localhost:4000/api/order/placeOrder";
      axios
        .post(url,{}, config)
        .then(response => {
          this.props.history.push('/buyer/menu');
        })
        .catch(error => {
          if (error.response) {
            this.setState({ error: error.response.data });
          }
          console.log(error);
        });
  }
  render() {
    let cartOrders = this.state.orders.map(order => {
        return (
          <CartItem
            itemName={order.itemName}
            itemPrice={order.itemPrice}
            quantity={order.quantity}
            key={order.orderId}
            itemImage={order.itemImage}
            restaurantName={order.restaurantName}
            itemCategory={order.itemCategory}
            rejectHandler={() => this.rejectHandler(order.orderId)}
          ></CartItem>
        );
      });
      let message="";
      let checkClass=false;
      let total=(
          <h3>Your Cart Total is :${this.state.total}</h3>
      );
      if(this.state.orders.length===0){
        checkClass=true;
        message=(
            <h3 style={{"textAlign":"center","marginTop":"200px"}}>Your Cart is Empty</h3>
        );
        total=null;
        }
    return <div>
        {total}
        <Button onClick={this.checkOutHandler} disabled={checkClass} type="primary" style={{"width":"200px",'textAlign':"center","height":"50px","marginTop":"20px"}}>Check Out</Button>
        {message}
    {cartOrders}
    </div>;
  }
}

export default withRouter(Cart);
