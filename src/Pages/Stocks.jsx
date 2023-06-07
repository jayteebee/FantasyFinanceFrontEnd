import React, { useState } from "react";
import FetchWatchlistOnly from "../Components/Watchlist/FetchWatchlistOnly";
import Balance from "../Components/Funding/Balance";
import FetchAllStocksFromIndustry from "../Components/Industry/FetchStocks/FetchStocks";
import FetchAllIndustries from "../Components/Industry/FetchAll/FetchAllIndustries";
import FetchStocks from "../Components/Industry/FetchStocks/FetchStocks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Stocks = ({
  setStockPurchased,
  stockPurchased,
  setUpdatedBalance,
  updatedBalance,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
  };
<Balance
            setUpdatedBalance={setUpdatedBalance}
            updatedBalance={updatedBalance}
          />
  return (
    <Container>
      <Row>
        <Col md={3}>
          
          <FetchAllIndustries
            onIndustrySelect={handleIndustrySelect}
            setStockPurchased={setStockPurchased}
            stockPurchased={stockPurchased}
          />

        </Col>

        <Col md={4}>
        <h2>Stocks</h2>
          <FetchAllStocksFromIndustry
            industry={selectedIndustry}
            setStockPurchased={setStockPurchased}
            setUpdatedBalance={setUpdatedBalance}
            updatedBalance={updatedBalance}
          />
        </Col>

        

      </Row>
    </Container>
  );
};

export default Stocks;
