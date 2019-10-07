import React,{Component}from 'react';
import { Button ,Row} from 'antd';
import Order from './Order/Order';
import {Link,withRouter} from "react-router-dom";
import axios from "axios";
class Orders extends Component {
    state={
      orders:[],
      error:""
    }
    componentDidMount=()=>{
      if(!localStorage.getItem('webToken')){
        this.props.history.push('/');
      }
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/order/"+this.props.orderType;
      console.log(url);
      axios.get(url,config)
        .then((response)=>{
          console.log("inside");
          console.log(response);
          this.setState({orders:[...response.data]});
        })
        .catch((error)=>{
          if(error.response){
            this.setState({error:error.response.data})
          }
          console.log(error);
        })
    }
    acceptHandler=(id)=>{
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/order/acceptOrder/"+id;
      axios.post(url,{},config)
        .then((response)=>{
            url="http://localhost:4000/api/order/"+this.props.orderType;
            axios.get(url,config)
                  .then((response)=>{
                    console.log("inside");
                    console.log(response);
                    this.setState({orders:[...response.data]});
                  })
                  .catch((error)=>{
                    if(error.response){
                      this.setState({error:error.response.data})
                    }
                    console.log(error);
                  })

        })
        .catch((error)=>{
          console.log(error);
        })
    }
    rejectHandler=(id)=>{
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/order/declineOrder/"+id;
      axios.post(url,{},config)
        .then((response)=>{
          url="http://localhost:4000/api/order/"+this.props.orderType;
          axios.get(url,config)
                .then((response)=>{
                  console.log("inside");
                  console.log(response);
                  this.setState({orders:[...response.data]});
                })
                .catch((error)=>{
                  if(error.response){
                    this.setState({error:error.response.data})
                  }
                  console.log(error);
                })
        })
        .catch((error)=>{
          console.log(error.response.data);
        })
    }
    changeStatusHandler=(id,status)=>{
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/order/changeOrderStatus/"+id;
      axios.post(url,{"newStatus":status},config)
        .then((response)=>{
          var config1 = {
            headers: {'x-auth-token': localStorage.getItem('webToken')}
          };
          let url="http://localhost:4000/api/order/"+this.props.orderType;
          console.log(url);
          axios.get(url,config1)
            .then((response)=>{
              console.log("inside");
              console.log(response);
              this.setState({orders:[...response.data]});
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
    render() {
      console.log(this.state.orders);
      let result=this.state.orders.map((order)=>{
        return order;
      });
      console.log(result);
      let incomingOrders=this.state.orders.map((order)=>{
        return <Order
        itemName={order.itemName}
        itemPrice={order.itemPrice}
        quantity={order.quantity}
        orderStatus={order.orderStatus}
        buyerName={order.buyerName}
        PhoneNumber={order.PhoneNumber}
        key={order.orderId}
        itemImage={order.itemImage}
        orderId={order.orderId}
        changeStatusHandler={this.changeStatusHandler}
        acceptHandler={()=>this.acceptHandler(order.orderId)}
        rejectHandler={()=>this.rejectHandler(order.orderId)}
        /> ;
      });
      return (
        <div>
          <Row>
            <Link to="/owner/incomingorders"><Button style={{"margin":"10px","marginLeft":"10px"}}>Incoming Orders</Button></Link>
            <Link to="/owner/inprocessorders"><Button style={{"margin":"10px","marginLeft":"10px"}}>Manage Orders</Button></Link>
            <Link to="/owner/deliveredorders"><Button style={{"margin":"10px","marginLeft":"10px"}}>Delivered Orders</Button></Link>
          </Row>
          {incomingOrders}
        </div>
      );
    }
  }
  
  export default withRouter(Orders);