import { getAllUserInfo, createUser, logIn, updateUserInfo, deleteUser } from "./API/userAPI";
import { createHolding, getAllUserHoldings, getSpecificUserHolding, deleteHolding } from "./API/holdingAPI";
import { addStockToWatchlist, createWatchlist, deleteWatchlist, getAllUserWatchlists, getSpecificStockFromWatchlist, getSpecificUserWatchlist, getStocksFromWatchlist } from "./API/watchlistAPI";
import { getAllIndustries, getAllStocksFromIndustry, getSpecificIndustry, getStockFromIndustry } from "./API/industryAPI";
import { balanceSheet, cashFlow, earnings, incomeStatement, news, overview } from "./API/AlphaVantage/fundamentalDataAPI";
import { tickerSearch, timeSeriesIntraday } from "./API/AlphaVantage/coreDataAPI";
import FetchAllIndustries from "./Components/Industry/FetchAll/FetchAllIndustries";
import FetchSpecificIndustries from "./Components/Industry/FetchSpecific/FetchSpecificIndustry";
import { useState } from "react";


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


  const [input, setInput] = useState({
    name: "",
    age: "",
    email: "",
    password: ""
  });
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const newUser = await createUser(input);
    setUser(newUser);
  } catch (err) {
    console.log("Error creating user: ", err);
  } finally {
    setInput({
      name: "",
      age: "",
      email: "",
      password: ""
    });
  }


}


const [input2, setInput2] = useState({
  name: "",
  age: "",
  email: "",
  password: ""
});
const handleChangeLI = (e) => {
  setInput2({
    ...input2,
    [e.target.name]: e.target.value
  });
};

const [user2, setUser2] = useState({});

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const newLogin = await logIn(input2);
    setUser2(newLogin);
  } catch (err) {
    console.log("Error creating user: ", err);
  } finally {
    setInput2({
      name: "",
      age: "",
      email: "",
      password: ""
    });
  }


}


  return (
    <div>
    <h1>Bonjour</h1>
     <FetchAllIndustries /> 

     <form onSubmit={handleSubmit}>
        <input type="text" value={input.name} name="name" placeholder="Username" onChange={handleChange} />
        <input type="text" value={input.age} name="age" placeholder="Age" onChange={handleChange} />
        <input type="text" value={input.email} name="email" placeholder="E-mail" onChange={handleChange} />
        <input type="text" value={input.password} name="password" placeholder="Password" onChange={handleChange} />

        <input type="submit" value="Sign Up" />
      </form>


      <form onSubmit={handleLogin}>
        <input type="text" value={input2.name} name="name" placeholder="Username" onChange={handleChangeLI} />
        <input type="text" value={input2.age} name="age" placeholder="Age" onChange={handleChangeLI} />
        <input type="text" value={input2.email} name="email" placeholder="E-mail" onChange={handleChangeLI} />
        <input type="text" value={input2.password} name="password" placeholder="Password" onChange={handleChangeLI} />

        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
}

export default App;
