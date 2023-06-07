import React, { useState, useEffect } from "react";
import { getAllStocksFromIndustry } from "../../../API/industryAPI";
import { overview } from "../../../API/AlphaVantage/fundamentalDataAPI";
import BuyStock from "../../Transactions/BuyStock";
import SellStock from "../../Transactions/SellStock";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import CreateWatchlist from "../../Watchlist/CreateWatchlist";

const FetchAllStocksFromIndustry = ({
  industry,
  setStockPurchased,
  stockPurchased,
  setUpdatedBalance,
  updatedBalance,
}) => {
  const [industryStocks, setIndustryStocks] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [buyModal, setBuyModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [watchlistModal, setWatchlistModal] = useState(false);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    const industryName = industry;
    if (industryName) {
      getAllStocksFromIndustry(industryName.id)
        .then((data) => {
          setIndustryStocks(data);
        })
        .catch((err) => console.log("API Call Failed", err));
    } else {
      console.log("No Industry Selected");
    }
  }, [industry]);

  const overviewAPICall = async (symbol) => {
    overview(userID, symbol)
      .then((data) => {
        setOverviewData(data);
      })
      .catch((err) => console.log("API Call Failed", err));
  };

  const showBuyModal = () => {
    setWatchlistModal(false);
    setSellModal(false);
    setBuyModal(true);
  };
  const showSellModal = () => {
    setWatchlistModal(false);
    setBuyModal(false);
    setSellModal(true);
  };

  const showWatchlistModal = () => {
    setSellModal(false);
    setBuyModal(false);
    setWatchlistModal(true);
  };

  return (
    <div style={{ display: "flex", flexDirection:"row", justifyContent:"space-evenly"}}>
      <div className="half-scrollable-div" style={{ width:"45%"}}>
        {industryStocks
          ? industryStocks.map((stock) => (
              <div key={stock.id}>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={() => overviewAPICall(stock.symbol)}
                >
                  {stock.company_name}
                  &nbsp;|&nbsp;
                  {stock.symbol}
                </Button>
              </div>
            ))
          : null}
      </div>

      <div className="half-scrollable-div" style={{ width:"45%"}}>
        {overviewData ? (
          <div>
            <h2>{overviewData.Name}</h2>
            <Button onClick={showBuyModal}>Buy</Button>
            <Button onClick={showSellModal}>Sell</Button>
            <Button onClick={showWatchlistModal}>Add To Watchlist</Button>
            <br />
            <p>Description: {overviewData.Description}</p>
            <br />
            <p>Sector: {overviewData.Sector}</p>
            <br />
            <p>Exchange: {overviewData.Exchange}</p>
            <br />
            <p>Market Capitalization: ${overviewData.MarketCapitalization}</p>
            <br />
            <p>
              QuarterlyEarningsGrowthYOY:{" "}
              {overviewData.QuarterlyEarningsGrowthYOY}
            </p>
            <br />
            <p>
              QuarterlyRevenueGrowthYOY:{" "}
              {overviewData.QuarterlyRevenueGrowthYOY}
            </p>
          </div>
        ) : null}
        </div>
        {buyModal ? (
          <div >
          <BuyStock 
            overviewData={overviewData}
            industryStocks={industryStocks}
            setStockPurchased={setStockPurchased}
            stockPurchased={stockPurchased}
            setUpdatedBalance={setUpdatedBalance}
            updatedBalance={updatedBalance}
            setBuyModal={setBuyModal}
          />
          </div>
        ) : null}
        {sellModal ? (
          <SellStock
            overviewData={overviewData}
            industryStocks={industryStocks}
            setStockPurchased={setStockPurchased}
            stockPurchased={stockPurchased}
            setUpdatedBalance={setUpdatedBalance}
            updatedBalance={updatedBalance}
            setSellModal={setSellModal}
          />
        ) : null}
        {watchlistModal ? (
          <CreateWatchlist overviewData={overviewData} />
        ) : null}
      
    </div>
  );
};

export default FetchAllStocksFromIndustry;
