import React, { useState, useEffect } from "react";
import { getAllUserHoldings } from "../API/holdingAPI";
import { news } from "../API/AlphaVantage/fundamentalDataAPI";
import { Row, Col } from "react-bootstrap";
import "../App.css";

const Portfolio = ({ stockPurchased }) => {
  const userId = window.localStorage.getItem("userID");
  const [holdings, setHoldings] = useState(null);
  const [accPos, setAccPos] = useState([]);
  const [newsData, setNewsData] = useState(null);

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

  useEffect(() => {
    news(userId, "AAPL")
      .then((data) => {
        setNewsData(data);
      })
      .catch((err) => console.log("API Call Failed", err));
  }, []);

  return (
    <div>
      <Row>
        <Col>
        <div className="p-5">
          <div className="me-1">
            <div className="scrollable-div square border border-warning rounded p-5" style={{height:"50vh"}}>
              <h2> Current Holdings</h2>
              <div className="d-grid gap-3">
              {accPos.length > 0 ? (
                accPos.map((position) => (
                  <div key={position.id}
                  className="p-2 border"
                  >
                    <p>
                      {position.stock.company_name} | {position.stock.symbol}
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
        
        <Col>
        <div className=" p-5">
          <div className="scrollable-div square border border-warning rounded p-5" style={{height:"50vh"}}>
            <h2>News</h2>
            <div className="d-grid gap-3">
              {newsData
                ? newsData.feed.map((newsItem) => (
                    <div
                      key={newsItem.id}
                      className="p-2 border"
                      
                    >
                      <a
                        href={newsItem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {newsItem.title}
                      </a>
                      <br />
                    </div>
                  ))
                : null}
            </div>
          </div>
         </div> 
        </Col>
      </Row>
    </div>
  );
};

export default Portfolio;
