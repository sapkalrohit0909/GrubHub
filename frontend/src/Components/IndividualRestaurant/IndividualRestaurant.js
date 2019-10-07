import React from "react";
import { Card, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
let restaurant = props => {
  return (
    <Card
      style={{
        height: "200px",
        border: "solid 1px black",
        borderRadius: "50px ",
        margin: "20px",
        backgroundColor: "rgb(242, 236, 235)"
      }}
      onClick={props.getRestaurntHandler}
    >
      <Row>
        <Col
          span={6}
          style={{ height: "150px", width: "150px", marginRight: "30px" }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <img
              src={"http://localhost:4000/" + props.profileImage}
              alt="Restaurant"
              style={{ width: "100%", height: "100%", borderRadius: "10px" }}
            ></img>
          </div>
        </Col>
        <Col span={18}>
          <Row>
            <Row style={{ textAlign: "left" }}>
              <b>Restaurant Name:</b>
              {props.restaurantName}
            </Row>
            <Row style={{ textAlign: "left" }}>
              <b>Email :</b> {props.email}
            </Row>
            <Row style={{ textAlign: "left" }}>
              <b> Zip Code:</b> {props.restaurantZip}
            </Row>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default withRouter(restaurant);
