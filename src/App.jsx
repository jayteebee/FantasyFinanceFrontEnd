import { getAllUserInfo, createUser, updateUserInfo, deleteUser } from "./API/userAPI";
import { createHolding, getAllUserHoldings, getSpecificUserHolding } from "./API/holdingAPI";
import { getAllUserWatchlists, getSpecificStockFromWatchlist, getSpecificUserWatchlist, getStocksFromWatchlist } from "./API/watchlistAPI";
import { getAllIndustries, getSpecificIndustry, getStockFromIndustry } from "./API/industryAPI";
import { balanceSheet, cashFlow, earnings, incomeStatement, news, overview } from "./API/AlphaVantage/fundamentalDataAPI";
import { tickerSearch, timeSeriesIntraday } from "./API/AlphaVantage/coreDataAPI";

function App() {

  // ** userAPI **

  // console.log(getAllUserInfo(1)) - working!
  // console.log(updateUserInfo(1, { age: 22 })) - working!

  // console.log(createUser({name: "JethroTB", age: 22, email: "apollo@gmail.com", trading_style: "cautios", experience_level: "intermediate", balance: 1000000})) 
  // console.log(deleteUser(2))


  //  ** holdingAPI **

  // console.log(getAllUserHoldings(1)) - working!
  // console.log(getSpecificUserHolding(1, 1)) - working!

  // console.log(createHolding(1, {quantity: 20, purchase_price: 22, stock_id: 50})) - working!

  // ** watchlistAPI **

  // console.log(getAllUserWatchlists(1)) - working!
  // console.log(getSpecificUserWatchlist(1,1)) - working!
  // console.log(getStocksFromWatchlist(1,1)) - working!
  // console.log(getSpecificStockFromWatchlist(1,1,"NVDA")) - working!

  // ** industryAPI **

  // console.log(getAllIndustries()) - working!
  // console.log(getSpecificIndustry(19)) - working!
  // console.log(getStockFromIndustry(1,1)) - working!

  // ** fundamentalDataAPI **

  // console.log(news(1, "TSLA")) - working!
  // console.log(overview(1, "TSLA")) - working!
  // console.log(incomeStatement(1, "TSLA")) - working!
  // console.log(balanceSheet(1, "TSLA")) - working!
  // console.log(cashFlow(1, "TSLA")) - working!
  // console.log(earnings(1, "TSLA")) - working!

  // ** coreDataAPI **

  // console.log(timeSeriesIntraday(1, "TSLA")) - working!
  // console.log(tickerSearch(1, "tesla")) - working!

  return (
    <div>
    <h1>Bonjour</h1>
    
    </div>
  );
}

export default App;
