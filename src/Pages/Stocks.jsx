import React from "react";
import FetchAllWatchlists from "../Components/Watchlist/FetchAllWatchlists";
import Balance from "../Components/Funding/Balance";
import FetchAllIndustries from "../Components/Industry/FetchAll/FetchAllIndustries";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Stocks = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div>Industries</div>
          <FetchAllIndustries />
        </Col>
<Col></Col>
        <Col>
          
          <Balance />
        </Col>

        <FetchAllWatchlists />
      </Row>
    </Container>
  );
};

export default Stocks;
