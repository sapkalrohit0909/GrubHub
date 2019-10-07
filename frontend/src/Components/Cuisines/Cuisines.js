import React,{Component}from 'react';
import Cuisine from './Cuisine/Cuisine';
import axios from 'axios';
import {Row,Button} from 'antd';
import {Link, withRouter} from 'react-router-dom';
class Cuisines extends Component {
    state={
      cuisines:[],
      error:""
    }
    componentDidMount=()=>{
      if(!localStorage.getItem('webToken')){
        this.props.history.push('/');
      }
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/item/"+this.props.itemType+"/"+localStorage.getItem("restId");
      axios.get(url,config)
        .then((response)=>{
          console.log("inside");
          console.log(response);
          this.setState({cuisines:[...response.data]});
        })
        .catch((error)=>{
          if(error.response){
            this.setState({error:error.response.data})
          }
          console.log(error);
        })
    }
    deleteHandler=(id)=>{
      var config = {
        headers: {'x-auth-token': localStorage.getItem('webToken')}
      };
      let url="http://localhost:4000/api/item/"+id;
      axios.delete(url,config)
        .then((response)=>{
          url="http://localhost:4000/api/item/"+this.props.itemType+"/"+localStorage.getItem("restId");
          axios.get(url,config)
            .then((response)=>{
              console.log("inside");
              console.log(response);
              this.setState({cuisines:[...response.data]});
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
    editHandler=(id)=>{
      this.props.history.push("/owner/cuisines/edit/"+id);
    }
    render() {
      let cuisinesList=this.state.cuisines.map((cuisine)=>{
        return <Cuisine
        itemName={cuisine.itemName}
        itemPrice={cuisine.itemPrice}
        itemDescription={cuisine.itemDescription}
        itemImage={cuisine.itemImage}
        category={cuisine.itemCategory}
        deleteHandler={()=>this.deleteHandler(cuisine._id)}
        editHandler={()=>this.editHandler(cuisine._id)}
        key={cuisine._id}
        /> ;
      });
      return (
        <div>
          <Row>
          <Link to="/owner/cuisines/breakfast"><Button style={{"margin":"10px","marginLeft":"10px"}}>Breakfast Items</Button></Link>
          <Link to="/owner/cuisines/lunch"><Button style={{"margin":"10px","marginLeft":"10px"}}>Lunch Items</Button></Link>
          <Link to="/owner/cuisines/appetizer"><Button style={{"margin":"10px","marginLeft":"10px"}}>Appetizers</Button></Link>
          <Link to="/owner/cuisines/add"><Button style={{"paddingLeft":"10px","right":"0px"}} type="primary">Add New Cuisine</Button></Link>
          </Row>
          {this.state.error}
          {cuisinesList}
        </div>
      );
    }
  }

  export default withRouter(Cuisines);