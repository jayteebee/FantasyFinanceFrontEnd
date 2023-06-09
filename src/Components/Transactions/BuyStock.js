import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import { createHolding } from "../../API/holdingAPI";
import { timeSeriesIntraday } from "../../API/AlphaVantage/coreDataAPI";
import { getAllUserInfo, updateUserInfo } from "../../API/userAPI";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";

const BuyStock = ({
  overviewData,
  industryStocks,
  setStockPurchased,
  setUpdatedBalance,
  updatedBalance,
  setBuyModal,
}) => {
  const [overviewInfo, setOverviewInfo] = useState(overviewData);
  const industryData = industryStocks;
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(null);
  const userID = window.localStorage.getItem("userID");
  console.log("industryStocks***", industryData);
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
  console.log("FINDMATCH", findMatch);
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
    setAlertTog(true);
  };

  const updateBalance = async (userID, newBalance) => {
    const balanceUpdate = await updateUserInfo(userID, { balance: newBalance });
    setUpdatedBalance((prevState) => !prevState);
    console.log(
      "Balance Updated Succesfully. Balance is now: ",
      balanceUpdate.balance
    );
  };

  const [alertTog, setAlertTog] = useState(false)

const alertToggle = () => {
  setAlertTog(false)
  setBuyModal(false)
}

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="p-5 ">
        <div className="me-1 ">
          <Modal.Dialog>
            <Modal.Header
              className="formBackground"
              closeButton
              onClick={() => {
                setBuyModal(false);
              }}
            >
              <Modal.Title>Buy</Modal.Title>
            </Modal.Header>

            <Modal.Body
              className="formBackground"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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

            <Modal.Footer
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="secondary"
                onClick={() => {
                  setBuyModal(false);
                }}
              >
                Exit Trade
              </Button>

              {trade.quantity && trade.purchase_price && trade.stock_id ? (
                <Button variant="primary" onClick={confirmPosition}>
                  Confirm Position
                </Button>
              ) : (
                <Button variant="success" onClick={openPosition}>
                  {" "}
                  Open Position
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>

      {alertTog ? (
        <div style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"}}>
        <div className="p-5 ">
        <Alert variant="primary" style={{display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"}} >
      Succesfully opened a position with {overviewInfo.Name}, good luck! <br />
      <Button variant="secondary" onClick={alertToggle}>Close</Button>
    </Alert>
    </div>
    </div>
    ) : null}
      
    </div>
  );
};

export default BuyStock;

/* 

It also needs to signpost if it was a buy or sell.
*/
