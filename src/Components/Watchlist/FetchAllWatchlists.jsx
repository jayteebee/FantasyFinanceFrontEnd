import React, { useState, useEffect } from "react";
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

    setShowAnalysisData(true)
  };

  return (
    <div>
      <h2>Watchlists And Analysis</h2>
      {watchlists ? (
        watchlists.map((watchlist) => (
          <div key={`watchlist-${watchlist.id}`}>
            <Button
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

      {showStocks
        ? watchlistStocks.map((stock) => (
            <div key={`stock-${stock.id}`}>
              Name: {stock.company_name}
              Ticker Symbol: {stock.symbol}
              <Button onClick={() => showAnalysis(stock.symbol)}>
                Analysis
              </Button>
            </div>
          ))
        : null}

    
<div>
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
                Gross Profit: {report.grossProfit} <br />
                Total Revenue: {report.totalRevenue} <br />
                Cost Of Revenue: {report.costOfRevenue} <br />
                Cost Of Goods And Services Sold:{" "}
                {report.costofGoodsAndServicesSold} <br />
                Operating Income: {report.operatingIncome} <br />
                Selling General And Administrative:{" "}
                {report.sellingGeneralAndAdministrative} <br />
                Research And Development: {report.researchAndDevelopment} <br />
                Operating Expenses: {report.operatingExpenses} <br />
                Investment Income Net: {report.investmentIncomeNet} <br />
                Net Interest Income: {report.netInterestIncome} <br />
                Interest Income: {report.interestIncome} <br />
                Interest Expense: {report.interestExpense} <br />
                Non Interest Income: {report.nonInterestIncome} <br />
                Other Non Operating Income: {
                  report.otherNonOperatingIncome
                }{" "}
                <br />
                Depreciation: {report.depreciation} <br />
                Depreciation And Amortization:{" "}
                {report.depreciationAndAmortization} <br />
                Income Before Tax: {report.incomeBeforeTax} <br />
                Income Tax Expense: {report.incomeTaxExpense} <br />
                Interest And Debt Expense: {report.interestAndDebtExpense}{" "}
                <br />
                Net Income From Continuing Operations:{" "}
                {report.netIncomeFromContinuingOperations} <br />
                Comprehensive Income Net Of Tax:{" "}
                {report.comprehensiveIncomeNetOfTax} <br />
                EBIT: {report.ebit} <br />
                EBITDA: {report.ebitda} <br />
                Net Income: {report.netIncome} <br />
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
                Reported Currency: {report.reportedCurrency} <br />
                Total Assets: {report.totalAssets} <br />
                Total Current Assets: {report.totalCurrentAssets} <br />
                Cash And Cash Equivalents At Carrying Value:{" "}
                {report.cashAndCashEquivalentsAtCarryingValue} <br />
                Cash And Short Term Investments:{" "}
                {report.cashAndShortTermInvestments} <br />
                Inventory: {report.inventory} <br />
                Current Net Receivables: {report.currentNetReceivables} <br />
                Total Non Current Assets: {report.totalNonCurrentAssets} <br />
                Property Plant Equipment: {report.propertyPlantEquipment} <br />
                Accumulated Depreciation Amortization PPE:{" "}
                {report.accumulatedDepreciationAmortizationPPE} <br />
                Intangible Assets: {report.intangibleAssets} <br />
                Intangible Assets Excluding Goodwill:{" "}
                {report.intangibleAssetsExcludingGoodwill} <br />
                Goodwill: {report.goodwill} <br />
                Investments: {report.investments} <br />
                Long Term Investments: {report.longTermInvestments} <br />
                Short Term Investments: {report.shortTermInvestments} <br />
                Other Current Assets: {report.otherCurrentAssets} <br />
                Other Non Current Assets: {report.otherNonCurrentAssets} <br />
                Total Liabilities: {report.totalLiabilities} <br />
                Total Current Liabilities: {report.totalCurrentLiabilities}{" "}
                <br />
                Current Accounts Payable: {report.currentAccountsPayable} <br />
                Deferred Revenue: {report.deferredRevenue} <br />
                Current Debt: {report.currentDebt} <br />
                Short Term Debt: {report.shortTermDebt} <br />
                Total Non Current Liabilities:{" "}
                {report.totalNonCurrentLiabilities} <br />
                Capital Lease Obligations: {report.capitalLeaseObligations}{" "}
                <br />
                Long Term Debt: {report.longTermDebt} <br />
                Current Long Term Debt: {report.currentLongTermDebt} <br />
                Long Term Debt Noncurrent: {report.longTermDebtNoncurrent}{" "}
                <br />
                Short Long Term Debt Total: {report.shortLongTermDebtTotal}{" "}
                <br />
                Other Current Liabilities: {report.otherCurrentLiabilities}{" "}
                <br />
                Other Non Current Liabilities:{" "}
                {report.otherNonCurrentLiabilities} <br />
                Total Shareholder Equity: {report.totalShareholderEquity} <br />
                Treasury Stock: {report.treasuryStock} <br />
                Retained Earnings: {report.retainedEarnings} <br />
                Common Stock: {report.commonStock} <br />
                Common Stock Shares Outstanding:{" "}
                {report.commonStockSharesOutstanding} <br />
              </div>
            ))
          : null}
      </div>

     </div>
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
