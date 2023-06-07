import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  getAllUserWatchlists,
  getStocksFromWatchlist,
} from "../../API/watchlistAPI";
import Button from "react-bootstrap/esm/Button";
import {
  overview,
  incomeStatement,
  balanceSheet,
  cashFlow,
  earnings,
} from "../../API/AlphaVantage/fundamentalDataAPI";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
 import "../../App.css"

const FetchAllWatchlists = () => {
  const [watchlists, setWatchlists] = useState(null);
  const [watchlistStocks, setWatchlistStocks] = useState(null);
  const [showStocks, setShowStocks] = useState(false);
  const [showAnalysisData, setShowAnalysisData] = useState(false);
  const [analysisOverview, setAnalysisOverview] = useState(null);
  const [analysisIncomeStatement, setAnalysisIncomeStatement] = useState(null);
  const [analysisBalanceSheet, setAnalysisBalanceSheet] = useState(null);
  const [analysisCashFlow, setAnalysisCashFlow] = useState(null);

  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    getAllUserWatchlists(userID)
      .then((data) => setWatchlists(data))
      .catch((err) => console.log("API Call Failed", err));
  }, []);

  const showWatchlistStocks = async (watchlist) => {
    const response = await getStocksFromWatchlist(userID, watchlist)
      .then((data) => {
        setWatchlistStocks(data);
        console.log("DATA: ", data);
      })
      .catch((err) => console.log("API Call Failed", err));
    setShowStocks(true);
  };

  const showAnalysis = async (symbol) => {
    // const overviewData = await overview(userID, symbol)
    //   .then((data) => {
    //     console.log("OVERVIEW DATA: ", data);
    //     setAnalysisOverview(data);
    //   })
    //   .catch((err) => console.log("API Call Failed", err));

    const incomeStatementData = await incomeStatement(userID, symbol)
      .then((incomeData) => {
        console.log("INCOME DATA: ", incomeData);
        setAnalysisIncomeStatement(incomeData);
      })
      .catch((err) => console.log("API Call Failed", err));

    const balanceSheetData = await balanceSheet(userID, symbol)
      .then((balanceData) => {
        console.log("BALANCE DATA: ", balanceData);
        setAnalysisBalanceSheet(balanceData);
      })
      .catch((err) => console.log("API Call Failed", err));

    // const cashFlowData = await cashFlow(userID, symbol)
    //   .then((cashFlowData) => {
    //     console.log("CASHFLOW DATA: ", cashFlowData);
    //     setAnalysisCashFlow(cashFlowData);
    //   })
    //   .catch((err) => console.log("API Call Failed", err));

    setShowAnalysisData(true);
  };

  return (
    <div>
      <Row>
        <h2>Watchlists And Analysis</h2>
        {watchlists ? (
          watchlists.map((watchlist) => (
            <div key={`watchlist-${watchlist.id}`}>
              <Button
                variant="outline-light"
                size="sm"
                onClick={() => {
                  showWatchlistStocks(watchlist.id);
                }}
              >
                {watchlist.name}
              </Button>
            </div>
          ))
        ) : (
          <p>Make Watchlists!</p>
        )}
        <div style={{ width: "25%", overflow: "auto" }}>
          {showStocks
            ? watchlistStocks.map((stock) => (
                <div key={`stock-${stock.id}`}>


                  <MDBTable responsive bordered borderColor="primary" small align="middle" className='table-dark square border border-white'>
                    <MDBTableHead>
                      <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Ticker Symbol</th>
                        <th scope='col'>Analysis</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      <tr>
                        <th scope='row'>{stock.company_name}</th>
                        <td>{stock.symbol}</td>
                        <td>
                          <Button
                            variant="outline-light"
                            size="sm"
                            onClick={() => showAnalysis(stock.symbol)}
                          >
                            Analysis
                          </Button>
                        </td>
                      </tr>
                    </MDBTableBody>
                  </MDBTable>


                </div>
              ))
            : null}
        </div>

        <div className="scrollable-div">
          <div>
            {showAnalysisData
              ? [
                  analysisIncomeStatement.annualReports.reduce(
                    (a, c) => (a.fiscalDateEnding > c.fiscalDateEnding ? a : c),
                    {}
                  ),
                ].map((report) => (
                  <div key={`income-statement-${report.id}`}>
                    <h2>Income Statement</h2>
                    <MDBTable responsive bordered borderColor="primary" small align="middle" className='table-dark square border border-white'>
  <MDBTableHead>
    <tr>
      <th scope='col'>Identifier</th>
      <th scope='col'>Data</th>
    </tr>
  </MDBTableHead>
  <MDBTableBody>
    <tr>
      <td>Gross Profit</td>
      <td>{report.grossProfit}</td>
    </tr>
    <tr>
      <td>Total Revenue</td>
      <td>{report.totalRevenue}</td>
    </tr>
    <tr>
      <td>Cost Of Revenue</td>
      <td>{report.costOfRevenue}</td>
    </tr>
    <tr>
      <td>Cost Of Goods And Services Sold</td>
      <td>{report.costofGoodsAndServicesSold}</td>
    </tr>
    <tr>
      <td>Operating Income</td>
      <td>{report.operatingIncome}</td>
    </tr>
    <tr>
      <td>Selling General And Administrative</td>
      <td>{report.sellingGeneralAndAdministrative}</td>
    </tr>
    <tr>
      <td>Research And Development</td>
      <td>{report.researchAndDevelopment}</td>
    </tr>
    <tr>
      <td>Operating Expenses</td>
      <td>{report.operatingExpenses}</td>
    </tr>
    <tr>
      <td>Investment Income Net</td>
      <td>{report.investmentIncomeNet}</td>
    </tr>
    <tr>
      <td>Net Interest Income</td>
      <td>{report.netInterestIncome}</td>
    </tr>
    <tr>
      <td>Interest Income</td>
      <td>{report.interestIncome}</td>
    </tr>
    <tr>
      <td>Interest Expense</td>
      <td>{report.interestExpense}</td>
    </tr>
    <tr>
      <td>Non Interest Income</td>
      <td>{report.nonInterestIncome}</td>
    </tr>
    <tr>
      <td>Other Non Operating Income</td>
      <td>{report.otherNonOperatingIncome}</td>
    </tr>
    <tr>
      <td>Depreciation</td>
      <td>{report.depreciation}</td>
    </tr>
    <tr>
      <td>Depreciation And Amortization</td>
      <td>{report.depreciationAndAmortization}</td>
    </tr>
    <tr>
      <td>Income Before Tax</td>
      <td>{report.incomeBeforeTax}</td>
    </tr>
    <tr>
      <td>Income Tax Expense</td>
      <td>{report.incomeTaxExpense}</td>
    </tr>
    <tr>
      <td>Interest And Debt Expense</td>
      <td>{report.interestAndDebtExpense}</td>
    </tr>
    <tr>
      <td>Net Income From Continuing Operations</td>
      <td>{report.netIncomeFromContinuingOperations}</td>
    </tr>
    <tr>
      <td>Comprehensive Income Net Of Tax</td>
      <td>{report.comprehensiveIncomeNetOfTax}</td>
    </tr>
    <tr>
      <td>EBIT</td>
      <td>{report.ebit}</td>
    </tr>
    <tr>
      <td>EBITDA</td>
      <td>{report.ebitda}</td>
    </tr>
    <tr>
      <td>Net Income</td>
      <td>{report.netIncome}</td>
    </tr>
  </MDBTableBody>
</MDBTable>

                  </div>
                ))
              : null}
          </div>

          <div>
            {showAnalysisData
              ? [
                  analysisBalanceSheet.annualReports.reduce(
                    (a, c) => (a.fiscalDateEnding > c.fiscalDateEnding ? a : c),
                    {}
                  ),
                ].map((report) => (
                  <div key={`report-${report.fiscalDateEnding}`}>
                    <h2>Balance Sheet</h2>
                    <MDBTable responsive bordered borderColor="primary" small align="middle" className='table-dark square border border-white'>
  <MDBTableHead>
    <tr>
      <th scope='col'>Identifier</th>
      <th scope='col'>Data</th>
    </tr>
  </MDBTableHead>
  <MDBTableBody>
    <tr>
      <td>Reported Currency</td>
      <td>{report.reportedCurrency}</td>
    </tr>
    <tr>
      <td>Total Assets</td>
      <td>{report.totalAssets}</td>
    </tr>
    <tr>
      <td>Total Current Assets</td>
      <td>{report.totalCurrentAssets}</td>
    </tr>
    <tr>
      <td>Cash And Cash Equivalents At Carrying Value</td>
      <td>{report.cashAndCashEquivalentsAtCarryingValue}</td>
    </tr>
    <tr>
      <td>Cash And Short Term Investments</td>
      <td>{report.cashAndShortTermInvestments}</td>
    </tr>
    <tr>
      <td>Inventory</td>
      <td>{report.inventory}</td>
    </tr>
    <tr>
      <td>Current Net Receivables</td>
      <td>{report.currentNetReceivables}</td>
    </tr>
    <tr>
      <td>Total Non Current Assets</td>
      <td>{report.totalNonCurrentAssets}</td>
    </tr>
    <tr>
      <td>Property Plant Equipment</td>
      <td>{report.propertyPlantEquipment}</td>
    </tr>
    <tr>
      <td>Accumulated Depreciation Amortization PPE</td>
      <td>{report.accumulatedDepreciationAmortizationPPE}</td>
    </tr>
    <tr>
      <td>Intangible Assets</td>
      <td>{report.intangibleAssets}</td>
    </tr>
    <tr>
      <td>Intangible Assets Excluding Goodwill</td>
      <td>{report.intangibleAssetsExcludingGoodwill}</td>
    </tr>
    <tr>
      <td>Goodwill</td>
      <td>{report.goodwill}</td>
    </tr>
    <tr>
      <td>Investments</td>
      <td>{report.investments}</td>
    </tr>
    <tr>
      <td>Long Term Investments</td>
      <td>{report.longTermInvestments}</td>
    </tr>
    <tr>
      <td>Short Term Investments</td>
      <td>{report.shortTermInvestments}</td>
    </tr>
    <tr>
      <td>Other Current Assets</td>
      <td>{report.otherCurrentAssets}</td>
    </tr>
    <tr>
      <td>Other Non Current Assets</td>
      <td>{report.otherNonCurrentAssets}</td>
    </tr>
    <tr>
      <td>Total Liabilities</td>
      <td>{report.totalLiabilities}</td>
    </tr>
    <tr>
      <td>Total Current Liabilities</td>
      <td>{report.totalCurrentLiabilities}</td>
    </tr>
    <tr>
      <td>Current Accounts Payable</td>
      <td>{report.currentAccountsPayable}</td>
    </tr>
    <tr>
      <td>Deferred Revenue</td>
      <td>{report.deferredRevenue}</td>
    </tr>
    <tr>
      <td>Current Debt</td>
      <td>{report.currentDebt}</td>
    </tr>
    <tr>
      <td>Short Term Debt</td>
      <td>{report.shortTermDebt}</td>
    </tr>
    <tr>
      <td>Total Non Current Liabilities</td>
      <td>{report.totalNonCurrentLiabilities}</td>
    </tr>
    <tr>
      <td>Capital Lease Obligations</td>
      <td>{report.capitalLeaseObligations}</td>
    </tr>
    <tr>
      <td>Long Term Debt</td>
      <td>{report.longTermDebt}</td>
    </tr>
    <tr>
      <td>Current Long Term Debt</td>
      <td>{report.currentLongTermDebt}</td>
    </tr>
    <tr>
      <td>Long Term Debt Noncurrent</td>
      <td>{report.longTermDebtNoncurrent}</td>
    </tr>
    <tr>
      <td>Short Long Term Debt Total</td>
      <td>{report.shortLongTermDebtTotal}</td>
    </tr>
    <tr>
      <td>Other Current Liabilities</td>
      <td>{report.otherCurrentLiabilities}</td>
    </tr>
    <tr>
      <td>Other Non Current Liabilities</td>
      <td>{report.otherNonCurrentLiabilities}</td>
    </tr>
    <tr>
      <td>Total Shareholder Equity</td>
      <td>{report.totalShareholderEquity}</td>
    </tr>
    <tr>
      <td>Treasury Stock</td>
      <td>{report.treasuryStock}</td>
    </tr>
    <tr>
      <td>Retained Earnings</td>
      <td>{report.retainedEarnings}</td>
    </tr>
    <tr>
      <td>Common Stock</td>
      <td>{report.commonStock}</td>
    </tr>
    <tr>
      <td>Common Stock Shares Outstanding</td>
      <td>{report.commonStockSharesOutstanding}</td>
    </tr>
  </MDBTableBody>
</MDBTable>

                  </div>
                ))
              : null}
          </div>
        </div>
      </Row>
    </div>
  );
};

export default FetchAllWatchlists;

/* 

  <div>
        {showAnalysisData ? (
          <div key={`overview-${analysisOverview.id}`}>
            <h2>Overview</h2>
            Name: {analysisOverview.Name} <br />
            Ticker Symbol: {analysisOverview.Symbol} <br />
            Sector: {analysisOverview.Sector} <br />
            Exchange: {analysisOverview.Exchange} <br />
            Industry: {analysisOverview.Industry} <br />
            Description: {analysisOverview.Description} <br />
          </div>
        ) : null}
      </div>

 <div>
        {showAnalysisData
          ? [
              analysisCashFlow.annualReports.reduce(
                (a, c) => (a.fiscalDateEnding > c.fiscalDateEnding ? a : c),
                {}
              ),
            ].map((report) => (
              <div key={`report-${report.fiscalDateEnding}`}>
                <h2>Cash Flow Report</h2>
                Fiscal Date Ending: {report.fiscalDateEnding} <br />
                Reported Currency: {report.reportedCurrency} <br />
                Operating Cashflow: {report.operatingCashflow} <br />
                Payments For Operating Activities:{" "}
                {report.paymentsForOperatingActivities} <br />
                Proceeds From Operating Activities:{" "}
                {report.proceedsFromOperatingActivities} <br />
                Change In Operating Liabilities:{" "}
                {report.changeInOperatingLiabilities} <br />
                Change In Operating Assets: {
                  report.changeInOperatingAssets
                }{" "}
                <br />
                Depreciation Depletion And Amortization:{" "}
                {report.depreciationDepletionAndAmortization} <br />
                Capital Expenditures: {report.capitalExpenditures} <br />
                Change In Receivables: {report.changeInReceivables} <br />
                Change In Inventory: {report.changeInInventory} <br />
                Profit Loss: {report.profitLoss} <br />
                Cashflow From Investment: {report.cashflowFromInvestment} <br />
                Cashflow From Financing: {report.cashflowFromFinancing} <br />
                Proceeds From Repayments Of Short Term Debt:{" "}
                {report.proceedsFromRepaymentsOfShortTermDebt} <br />
                Payments For Repurchase Of Common Stock:{" "}
                {report.paymentsForRepurchaseOfCommonStock} <br />
                Payments For Repurchase Of Equity:{" "}
                {report.paymentsForRepurchaseOfEquity} <br />
                Payments For Repurchase Of Preferred Stock:{" "}
                {report.paymentsForRepurchaseOfPreferredStock} <br />
                Dividend Payout: {report.dividendPayout} <br />
                Dividend Payout Common Stock: {
                  report.dividendPayoutCommonStock
                }{" "}
                <br />
                Dividend Payout Preferred Stock:{" "}
                {report.dividendPayoutPreferredStock} <br />
                Proceeds From Issuance Of Common Stock:{" "}
                {report.proceedsFromIssuanceOfCommonStock} <br />
                Proceeds From Issuance Of Long Term Debt And Capital Securities
                Net:{" "}
                {
                  report.proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet
                }{" "}
                <br />
                Proceeds From Issuance Of Preferred Stock:{" "}
                {report.proceedsFromIssuanceOfPreferredStock} <br />
                Proceeds From Repurchase Of Equity:{" "}
                {report.proceedsFromRepurchaseOfEquity} <br />
                Proceeds From Sale Of Treasury Stock:{" "}
                {report.proceedsFromSaleOfTreasuryStock} <br />
                Change In Cash And Cash Equivalents:{" "}
                {report.changeInCashAndCashEquivalents} <br />
                Change In Exchange Rate: {report.changeInExchangeRate} <br />
                Net Income: {report.netIncome} <br />
              </div>
            ))
          : null}
          
      </div>

*/
