import React from "react";
import { Card, Button, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
let cartItem = props => {
  return (
    <Card
      style={{
        height: "200px",
        border: "solid 1px black",
        borderRadius: "50px ",
        margin: "20px",
        backgroundColor: "rgb(242, 236, 235)"
      }}
    >
      <Row>
        <Col
          span={6}
          style={{ height: "150px", width: "150px", marginRight: "30px" }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <img
              src={"http://localhost:4000/" + props.itemImage}
              alt="cuisine"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            ></img>
          </div>
        </Col>
        <Col span={18}>
          <Row>
            <Row style={{ textAlign: "left" }}>
              <b>Cuisine Name:</b>
              {props.itemName}
            </Row>
            <Row style={{ textAlign: "left" }}>
              <b>Restaurant Name :</b> {props.restaurantName}
            </Row>
            <Row style={{ textAlign: "left" }}>
              <b>Cuisine Price :$</b> {props.itemPrice}
            </Row>
            <Row style={{ textAlign: "left" }}>
              <b>Quantity :</b> {props.quantity}
            </Row>
            <Row style={{ textAlign: "left" }}>
              <b>Cuisine Category :</b> {props.itemCategory}
            </Row>
          </Row>
          <Row align="bottom">
            <Col span={8}></Col>
            <Col span={8}>
              <Button
                type="danger"
                style={{ marginLeft: "20%", marginTop: "10%" }}
                onClick={props.rejectHandler}
              >
                Remove Item From Cart
              </Button>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default withRouter(cartItem);
