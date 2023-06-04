import React, { useState } from "react";
import FetchAllWatchlists from "../Components/Watchlist/FetchAllWatchlists";
import Balance from "../Components/Funding/Balance";
import FetchAllStocksFromIndustry from "../Components/Industry/FetchStocks/FetchStocks";
import FetchAllIndustries from "../Components/Industry/FetchAll/FetchAllIndustries";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Stocks = () => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div>Industries</div>
          <FetchAllIndustries onIndustrySelect={handleIndustrySelect} />
          <FetchAllWatchlists />
        </Col>

        <Col md={8}>
          <Balance />
          <FetchAllStocksFromIndustry industry={selectedIndustry} />
        </Col>
      </Row>
    </Container>
  );
};

export default Stocks;
