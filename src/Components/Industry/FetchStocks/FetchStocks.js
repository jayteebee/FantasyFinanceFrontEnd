import React, { useState, useEffect } from "react";
import { getAllStocksFromIndustry } from "../../../API/industryAPI";
import { overview } from "../../../API/AlphaVantage/fundamentalDataAPI";
import BuyStock from "../../Transactions/BuyStock";
import SellStock from "../../Transactions/SellStock";
import Button from "react-bootstrap/Button";
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
    <div>
      <div className="scrollable-div">
        {industryStocks
          ? industryStocks.map((stock) => (
              <div key={stock.id}>
                <Button onClick={() => overviewAPICall(stock.symbol)}>
                  {stock.company_name}
                  &nbsp;|&nbsp;
                  {stock.symbol}
                </Button>
              </div>
            ))
          : null}
      </div>

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
            QuarterlyRevenueGrowthYOY: {overviewData.QuarterlyRevenueGrowthYOY}
          </p>
        </div>
      ) : (
        <div>No Stocks Found</div>
      )}

      {buyModal ? (
        <BuyStock
          overviewData={overviewData}
          industryStocks={industryStocks}
          setStockPurchased={setStockPurchased}
          stockPurchased={stockPurchased}
          setUpdatedBalance={setUpdatedBalance}
          updatedBalance={updatedBalance}
        />
      ) : null}
      {sellModal ? (
        <SellStock
          overviewData={overviewData}
          industryStocks={industryStocks}
          setStockPurchased={setStockPurchased}
          stockPurchased={stockPurchased}
          setUpdatedBalance={setUpdatedBalance}
          updatedBalance={updatedBalance}
        />
      ) : null}
      {watchlistModal ? <CreateWatchlist overviewData={overviewData} /> : null}
    </div>
  );
};

export default FetchAllStocksFromIndustry;
