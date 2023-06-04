import { getAllUserInfo, createUser, logIn, updateUserInfo, deleteUser } from "./API/userAPI";
import { createHolding, getAllUserHoldings, getSpecificUserHolding, deleteHolding } from "./API/holdingAPI";
import { addStockToWatchlist, createWatchlist, deleteWatchlist, getAllUserWatchlists, getSpecificStockFromWatchlist, getSpecificUserWatchlist, getStocksFromWatchlist } from "./API/watchlistAPI";
import { getAllIndustries, getAllStocksFromIndustry, getSpecificIndustry, getStockFromIndustry } from "./API/industryAPI";
import { balanceSheet, cashFlow, earnings, incomeStatement, news, overview } from "./API/AlphaVantage/fundamentalDataAPI";
import { tickerSearch, timeSeriesIntraday } from "./API/AlphaVantage/coreDataAPI";
import {Routes, Route} from "react-router-dom";
import Navigation from "./Components/Navigation";
import Stocks from "./Pages/Stocks";
import Profile from "./Pages/Profile";
import Portfolio from "./Pages/Portfolio";
import SignUpSignIn from "./Pages/SignUpSignIn";
import Watchlist from "./Pages/Watchlist";


function App() {

  // ** userAPI **

  // console.log(getAllUserInfo(1)) - working!
  // console.log(updateUserInfo(1, { age: 22 })) - working!

  // Not working!
  // console.log(createUser()) 
  // console.log(deleteUser(2))


  //  ** holdingAPI **

  // console.log(getAllUserHoldings(1)) - working!
  // console.log(getSpecificUserHolding(1, 1)) - working!
  // console.log(createHolding(1, {quantity: 20, purchase_price: 22, stock_id: 50})) - working!
 
  // Not working!
  // console.log(deleteHolding(1,9))

  // ** watchlistAPI **

  // console.log(getAllUserWatchlists(1)) - working!
  // console.log(getSpecificUserWatchlist(1,1)) - working!
  // console.log(getStocksFromWatchlist(1,1)) - working!
  // console.log(getSpecificStockFromWatchlist(1,1,"NVDA")) - working!
  // console.log(createWatchlist(1, {name: "Crazy Commodities", stock_name: "Nvidia", stock_symbol: "NVDA"})) - working!
  // console.log(addStockToWatchlist(1, 1, "NVDA")) - working!
// console.log(deleteWatchlist(1,2)) - working!

  // ** industryAPI **

  // console.log(getAllIndustries()) - working!
  // console.log(getSpecificIndustry(19)) - working!
  // console.log(getStockFromIndustry(1,1)) - working!
  // console.log(getAllStocksFromIndustry(1)) - working!

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
    <Navigation />
    <Routes>
    <Route path="/" element={<Portfolio />} />
    <Route path="/Stocks" element={<Stocks />} />
    <Route path="/Profile" element={<Profile />} />
    <Route path="/login" element={<SignUpSignIn />} />
    <Route path="/Watchlist" element={<Watchlist />} />
    
    </Routes>

    
    

    </div>
  );
}

export default App;
