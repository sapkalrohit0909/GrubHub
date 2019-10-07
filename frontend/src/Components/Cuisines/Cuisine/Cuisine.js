import React from 'react';
import { Card, Button ,Row,Col} from 'antd';
let cuisine=(props)=>{
  return (
      <Card style={{height:"200px","border":"solid 1px black","borderRadius":"50px ","margin":"20px","backgroundColor":"rgb(242, 236, 235)"}}>
        <Row>
          <Col span={6} style={{"height":"150px","width":"150px","marginRight":"30px"}}>
            <div style={{"width":"100%","height":"100%"}}><img src={"http://localhost:4000/"+props.itemImage} alt="cuisine" style={{"width":"100%","height":"100%","borderRadius":"10px"}}></img></div>
          </Col>
          <Col span={18} >
            <Row>
              <Row style={{"textAlign":"left"}}><b>Cuisine Name:</b>{props.itemName}</Row>
              <Row style={{"textAlign":"left"}}><b>Cuisine Price      :</b>   {props.itemPrice}</Row>
              <Row style={{"textAlign":"left"}}><b>Description        :</b>     {props.itemDescription}</Row>
              <Row style={{"textAlign":"left"}}><b>Category           :</b>        {props.category}</Row>
            </Row>
            <Row  align="bottom">
              <Col span={12}>
                <Button type="success" style={{"marginRight":"20%","marginTop":"10%"}} onClick={props.editHandler}>Edit Cuisine</Button> 
              </Col>
              <Col span={12}>
                <Button type="danger" style={{"marginLeft":"20%","marginTop":"10%"}} onClick={props.deleteHandler}>Delete Cuisine</Button> 
              </Col>
              
              
            </Row>
          </Col>
        </Row>
      </Card>
  );
}

export default cuisine;
