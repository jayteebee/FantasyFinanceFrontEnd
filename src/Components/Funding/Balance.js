import React, { useState, useEffect } from "react";
import { getAllUserInfo, updateUserInfo } from "../../API/userAPI";
import Button from "react-bootstrap/Button";

const Balance = () => {
  const [userInfo, setUserInfo] = useState("");
  const userID = 1;

  const [balance, setBalance] = useState("");
  const [managingBalance, setManagingBalance] = useState(false);
  const [amount, setAmount] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  console.log("MANAGING BALANCE: ", managingBalance);

  useEffect(() => {
    getAllUserInfo(userID)
      .then((data) => {
        setUserInfo(data);
        setBalance(data.balance);

        console.log("BALANCE: ", balance);
      })
      .catch((err) => console.log("API Call Failed", err));
  }, []);

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
      <div>Balance</div>
      <div>
        <Button onClick={Deposit}>+</Button>
        <Button onClick={Withdraw}>-</Button>

        {userInfo &&
          (managingBalance ? (
            <div>
              <form onSubmit={handleBalanceUpdate}>
              {showDeposit &&
                <input
                  name="deposit"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              }
              {showWithdraw && 
                <input
                  name="withdraw"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                }
                <Button type="submit">Finalise</Button>
              </form>
            </div>
          ) : (
            <div> {userInfo.balance} </div>
          ))}
      </div>
    </div>
  );
};

export default Balance;
