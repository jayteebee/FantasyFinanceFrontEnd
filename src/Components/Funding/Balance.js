import React, { useState, useEffect } from "react";
import { getAllUserInfo, updateUserInfo } from "../../API/userAPI";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const Balance = ({ updatedBalance, setUpdatedBalance }) => {
  const [userInfo, setUserInfo] = useState("");
  const userID = window.localStorage.getItem("userID");

  const [balance, setBalance] = useState("");
  const [managingBalance, setManagingBalance] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);


  useEffect(() => {
    getAllUserInfo(userID)
      .then((data) => {
        setUserInfo(data);
        setBalance(data.balance);
      })
      .catch((err) => console.log("API Call Failed", err));
  }, [userID, updatedBalance]);

  const Deposit = (e) => {
    setShowDeposit(true);
    setShowWithdraw(false);
    setManagingBalance(true);
  };

  const Withdraw = (e) => {
    setShowWithdraw(true);
    setShowDeposit(false);
    setManagingBalance(true);
  };

  const handleBalanceUpdate = async (e) => {
    e.preventDefault();
    let updatedBalance;
    if (showDeposit) {
      updatedBalance = balance + parseInt(amount);
    } else if (showWithdraw) {
      updatedBalance = balance - parseInt(amount);
    }

    try {
      const updatedUserInfo = { ...userInfo, balance: updatedBalance };
      const response = await updateUserInfo(userID, updatedUserInfo);
      setUserInfo(response);
      setBalance(updatedBalance);
      setAmount(0);
      setShowWithdraw(false);
      setShowDeposit(false);
      setManagingBalance(false);
    } catch (err) {
      console.log("Error updating balance: ", err);
    }
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col xs="auto">
          <Button variant="outline-light" size="sm" onClick={Deposit}>
            +
          </Button>
        </Col>

        <Col xs="auto">
          {userInfo &&
            (managingBalance ? (
              <div>
                <Form onSubmit={handleBalanceUpdate} className="d-flex">
               
                  {showDeposit && (
                    <Form.Control
                      name="deposit"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      size="sm"
                    />
                  )}
                  {showWithdraw && (
                    <Form.Control
                      name="withdraw"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      size="sm"
                      style={{
                        backgroundColor: "black",
                        color: "gold",
                        borderColor: "white",
                        borderWidth: "1px"
                      }}
                    />
                  )}
                  <Button type="submit" variant="outline-light" size="sm">Finalise</Button>
                 
                </Form>
              </div>
            ) : (
              <div> ${userInfo.balance} </div>
            ))}
        </Col>

        <Col xs="auto">
          <Button variant="outline-light" size="sm" onClick={Withdraw}>
            -
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Balance;
