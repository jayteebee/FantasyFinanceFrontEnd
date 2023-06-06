import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createHolding } from "../../API/holdingAPI";
import { timeSeriesIntraday } from "../../API/AlphaVantage/coreDataAPI";
import { getAllUserInfo, updateUserInfo } from "../../API/userAPI";

const BuyStock = ({
  overviewData,
  industryStocks,
  setStockPurchased,
  setUpdatedBalance,
  updatedBalance,
}) => {
  const [overviewInfo, setOverviewInfo] = useState(overviewData);
  const industryData = industryStocks;
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(null);
  const userID = window.localStorage.getItem("userID");

  const [balance, setBalance] = useState(0);
  const [updatingBalance, setUpdatingBalance] = useState(0);

  useEffect(() => {
    getAllUserInfo(userID)
      .then((data) => {
        setBalance(data.balance);
        setUpdatingBalance(data.balance);
      })
      .catch((err) => console.log("API Call Failed", err));
  }, []);

  const findMatch = industryData.find(
    (name) => name.company_name === overviewInfo.Name
  );
  const stock = findMatch.id;

  let positionSize = quantity * price;



  const [trade, setTrade] = useState({
    quantity: null,
    purchase_price: null,
    stock_id: null,
  });

  useEffect(() => {
    timeSeriesIntraday(userID, overviewInfo.Symbol).then((data) => {
      const timeSeriesData = data["Time Series (1min)"];
      const mostRecentTimestamp = Object.keys(timeSeriesData).sort().pop();
      const mostRecentValue = timeSeriesData[mostRecentTimestamp]["1. open"];
      setPrice(mostRecentValue);
    });
  }, []);

  const openPosition = async () => {
    setTrade({
      quantity: quantity,
      purchase_price: positionSize,
      stock_id: stock,
    });
  };

  const confirmPosition = async () => {
    debugger;
    const holding = await createHolding(userID, trade);
    console.log("CH: ", holding);
    setTrade({
      quantity: null,
      purchase_price: null,
      stock_id: null,
    });
    const newBalance = balance - positionSize;
    await updateBalance(userID, newBalance);
    setBalance(newBalance);
    setUpdatingBalance(newBalance);
    setStockPurchased((prevState) => !prevState);
  };

  const updateBalance = async (userID, newBalance) => {
    const balanceUpdate = await updateUserInfo(userID, { balance: newBalance });
    setUpdatedBalance((prevState) => !prevState);
    console.log(
      "Balance Updated Succesfully. Balance is now: ",
      balanceUpdate.balance
    );
  };


  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Buy</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h5>{overviewInfo.Name}</h5>
          <p>{overviewInfo.Symbol}</p>
          <h5>{overviewInfo.Exchange}</h5>
          <h5>${price}</h5>
          Quantity:{" "}
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          Position Size: ${positionSize}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Exit Trade</Button>
          
          {trade.quantity && trade.purchase_price && trade.stock_id ? (
            <Button variant="primary" onClick={confirmPosition}>
              Confirm Position
            </Button>
          ) : (
            <Button variant="primary" onClick={openPosition}>
              {" "}
              Open Position
            </Button>
          )}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default BuyStock;


/* 
Holdings is currently trade history, with a record of all the trades made 
and at what price

there needs to be another feature, where it collects all stocks of the same
name and accumulates the total price/quantity of all the stocks.

It also needs to signpost if it was a buy or sell.
*/