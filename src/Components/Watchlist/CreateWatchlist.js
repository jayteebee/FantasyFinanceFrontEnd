import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createWatchlist, addStockToWatchlist } from "../../API/watchlistAPI";

const CreateWatchlist = ({ overviewData }) => {
  const userID = window.localStorage.getItem("userID");
  const [overviewInfo, setOverviewInfo] = useState(overviewData);
  const [isEditing, setIsEditing] = useState(false);
  const [watchlistInfo, setWatchlistInfo] = useState({
    name: "",
  });
  const [watchlistStockInfo, setWatchlistStockInfo] = useState({
    stock_symbol: overviewData.Symbol,
  })

  const editingClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setWatchlistInfo({
      ...watchlistInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAPICall = async (e) => {
    e.preventDefault();
    console.log("WATCHLIST INFO NAME",watchlistInfo.name);
   const createList = await createWatchlist(userID, {watchlist: {name: watchlistInfo.name}});
   console.log("CREATE LIST NAME",createList);
   const watchlistID = createList.id;
   const createStock = await addStockToWatchlist(userID, watchlistID, watchlistStockInfo.stock_symbol)
  console.log("CREATE STOCK",createStock);
  setIsEditing(false);
}

console.log("OVERVIEW INFO",overviewInfo);
console.log("WATCHLIST INFO",watchlistInfo);
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Watchlists</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h2>Create New Watchlist</h2>

          <h5>{overviewInfo.Name}</h5>
          <p>{overviewInfo.Symbol}</p>
          <h5>{overviewInfo.Exchange}</h5>
          

          {isEditing ? (
            <form onSubmit={handleAPICall}>
            <input
              name="name"
              value={watchlistInfo.name}
              placeholder="Enter Watchlist Name"
              onChange={handleChange}
            ></input>
            <Button type="submit" variant="primary" > Submit </Button>
            </form>
          ) : (
            <Button onClick={editingClick}> Create Watchlist </Button>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Exit Trade</Button>

          <Button variant="primary">Confirm Position</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default CreateWatchlist;



/**
 
const [watchlistStockInfo, setWatchlistStockInfo] = useState({
    company_name: overviewData.Name,
    stock_symbol: overviewData.Symbol,
    exchange: overviewData.Exchange,
    sector: overviewData.Sector,
    market_capitalization: overviewData.MarketCapitalization,
    description: overviewData.Description,
    Quarterly_Earnings_Growth_YOY: overviewData.QuarterlyEarningsGrowthYOY,
    Quarterly_Revenue_Growth_YOY: overviewData.QuarterlyRevenueGrowthYOY
  })
 
 */