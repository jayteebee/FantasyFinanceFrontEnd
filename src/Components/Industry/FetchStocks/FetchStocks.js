import React, { useState, useEffect } from "react";
import { getAllStocksFromIndustry } from "../../../API/industryAPI";
import { overview } from "../../../API/AlphaVantage/fundamentalDataAPI";

const FetchAllStocksFromIndustry = ({ industry, searchSpecificIndustry }) => {
  const [industryStocks, setIndustryStocks] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const userID = 1;

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

  return (
    <div>
      <div>
        {industryStocks
          ? industryStocks.map((stock) => (
              <div key={stock.id}>
                <button onClick={() => overviewAPICall(stock.symbol)}>
                  {stock.company_name}
                  &nbsp;|&nbsp;
                  {stock.symbol}
                </button>
              </div>
            ))
          : null}
      </div>

      {overviewData ? (
        <div>
          <h2>{overviewData.Name}</h2>
          <br />
          <p>{overviewData.Description}</p>
          <br />
          <p>{overviewData.Sector}</p>
          <br />
          <p>{overviewData.Exchange}</p>
          <br />
          <p>{overviewData.MarketCapitalization}</p>
          <br />
          <p>{overviewData.QuarterlyEarningsGrowthYOY}</p>
          <br />
          <p>{overviewData.QuarterlyRevenueGrowthYOY}</p>
        </div>
      ) : (
        <div>No Stocks Found</div>
      )}
    </div>
  );
};

export default FetchAllStocksFromIndustry;
