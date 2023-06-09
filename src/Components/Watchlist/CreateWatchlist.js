import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { createWatchlist, addStockToWatchlist } from "../../API/watchlistAPI";
import { getAllUserWatchlists } from "../../API/watchlistAPI";

const CreateWatchlist = ({ overviewData, setWatchlistModal }) => {
  const userID = window.localStorage.getItem("userID");
  const [overviewInfo, setOverviewInfo] = useState(overviewData);
  const [isEditing, setIsEditing] = useState(false);
  const [watchlistInfo, setWatchlistInfo] = useState({
    name: "",
  });
  const [watchlistStockInfo, setWatchlistStockInfo] = useState({
    stock_symbol: overviewData.Symbol,
  });
  const [watchlists, setWatchlists] = useState(null);
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);

  useEffect(() => {
    getAllUserWatchlists(userID)
      .then((data) => setWatchlists(data))
      .catch((err) => console.log("API Call Failed", err));
  }, []);

  console.log("watchlists: ", watchlists);

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
    const createList = await createWatchlist(userID, {
      watchlist: { name: watchlistInfo.name },
    });
    const watchlistID = createList.id;
    const createStock = await addStockToWatchlist(
      userID,
      watchlistID,
      watchlistStockInfo.stock_symbol
    );
    console.log("CREATE STOCK", createStock);
    setIsEditing(false);
  };

  const saveStockToWatchlist = async () => {
    const addStock = await addStockToWatchlist(
      userID,
      selectedWatchlist,
      watchlistStockInfo.stock_symbol
    );
  };

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="p-5 ">
        <div className="me-1 ">
          <Modal.Dialog >
            <Modal.Header className="formBackground" 
              closeButton
              onClick={() => {
                setWatchlistModal(false);
              }}
            >
             
            </Modal.Header>

            <Modal.Body className="formBackground" style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}} >
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
                  <Button type="submit" variant="outline-light"
                  size="sm">
                    {" "}
                    Submit{" "}
                  </Button>
                </form>
              ) : (
                <Button
                variant="outline-light"
                  size="sm"
                onClick={editingClick}> Create Watchlist </Button>
              )}

              <h2>Add Stock To Watchlist</h2>
              <Dropdown>
                <Dropdown.Toggle variant="outline-light"
                size="sm" id="dropdown-basic">
                  Select Watchlist
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {watchlists
                    ? watchlists.map((watchlist) => (
                        <Dropdown.Item
                          key={watchlist.id}
                          onClick={() => setSelectedWatchlist(watchlist.id)}
                        >
                          {watchlist.name}
                        </Dropdown.Item>
                      ))
                    : null}
                </Dropdown.Menu>
              </Dropdown>
              <Button
              variant="outline-success"
                  size="sm"
              onClick={() => saveStockToWatchlist(selectedWatchlist)}>
                Save Stock To Watchlist
              </Button>
            </Modal.Body>
            
            <Modal.Footer style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Button
                variant="secondary"
                onClick={() => {
                  setWatchlistModal(false);
                }}
              >
                Exit
              </Button>

              <Button
                variant="success"
                onClick={() => {
                  setWatchlistModal(false);
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      </div>
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
 
  PRE DEPLOY
 */
