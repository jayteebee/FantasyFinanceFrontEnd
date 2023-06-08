import React, { useState, useEffect } from "react";
import { getAllUserHoldings } from "../../API/holdingAPI";
import { Row, Col } from "react-bootstrap";

const FetchAllHoldings = ({ stockPurchased }) => {
  const userId = window.localStorage.getItem("userID");
  const [holdings, setHoldings] = useState(null);
  const [accPos, setAccPos] = useState([]);

  useEffect(() => {
    const accumulatedPosition = findAccumulatedPosition();
    setAccPos(accumulatedPosition);
  }, [holdings]);

  useEffect(() => {
    getAllUserHoldings(userId)
      .then((data) => setHoldings(data))
      .catch((err) => console.log("API Call Failed", err));
  }, [stockPurchased]);

  const findAccumulatedPosition = () => {
    if (holdings && holdings.length > 0) {
      const accPos = holdings.reduce((acc, curr) => {
        let existing = acc.find((item) => item.stock.id === curr.stock.id);
        if (existing) {
          existing = {
            ...existing,
            quantity: (existing.quantity += curr.quantity),
            purchase_price: (existing.purchase_price += curr.purchase_price),
          };
        } else {
          acc.push({
            ...curr,
            stock: { ...curr.stock },
          });
        }
        return acc;
      }, []);
      console.log("AccPos: ", accPos);
      return accPos;
    }
    return [];
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <div className="p-5">
            <div className="me-1">
              <div className="scrollable-div square border border-warning rounded p-5">
                <h2> Trades Made</h2>
                <div className="d-grid gap-3">
                  {holdings ? (
                    holdings.map((holding) => (
                      <div key={holding.id}
                      className="p-2 border"
                      >
                        Name: &nbsp;
                        
                          {holding.stock.company_name} | {holding.stock.symbol}
                       
                        <br />
                        Quantity: {holding.quantity} <br />
                        Purchase Price: {holding.purchase_price} <br />
                        Trade Executed At: {holding.created_at} <br />
                        <br />
                      </div>
                    ))
                  ) : (
                    <p>Make trades!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="p-5">
            <div className="me-1">
              <div className="scrollable-div square border border-warning rounded p-5">
                <h2> Current Holdings</h2>
                <div className="d-grid gap-3">
                  {accPos.length > 0 ? (
                    accPos.map((position) => (
                      <div key={position.id} className="p-2 border">
                        <p>
                          {position.stock.company_name} |{" "}
                          {position.stock.symbol}
                        </p>
                        <p>Quantity: {position.quantity}</p>
                        <p>Purchase Price: {position.purchase_price}</p>
                      </div>
                    ))
                  ) : (
                    <div>No Position Found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FetchAllHoldings;
