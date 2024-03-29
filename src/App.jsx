import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Stocks from "./Pages/Stocks";
import Profile from "./Pages/Profile";
import Portfolio from "./Pages/Portfolio";
import SignUpSignIn from "./Pages/SignUpSignIn";
import Watchlist from "./Pages/Watchlist";
import Holding from "./Pages/Holding";
import LogOut from "./Components/Profile/LogOut";
import Balance from "./Components/Funding/Balance";
import { useState } from "react";
import PrivateRoute from "./Components/Private/PrivateRoute";

import "./App.css";

function App() {
  const [stockPurchased, setStockPurchased] = useState(false);
  const [updatedBalance, setUpdatedBalance] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  <Balance updatedBalance={updatedBalance} />;

  return (
    <div>
      <div className="background">
        <Navigation
          setUpdatedBalance={setUpdatedBalance}
          updatedBalance={updatedBalance}
          setShowRegister={setShowRegister}
        />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              path="/"
              element={<Portfolio stockPurchased={stockPurchased} />}
            />
            <Route
              path="/Holding"
              element={<Holding stockPurchased={stockPurchased} />}
            />

            <Route
              path="/Stocks"
              element={
                <Stocks
                  setStockPurchased={setStockPurchased}
                  stockPurchased={stockPurchased}
                  setUpdatedBalance={setUpdatedBalance}
                  updatedBalance={updatedBalance}
                />
              }
            />

            <Route path="/Profile" element={<Profile />} />

            <Route path="/Watchlist" element={<Watchlist />} />
            <Route
              path="/LogOut"
              element={
                <LogOut
                  setUpdatedBalance={setUpdatedBalance}
                  setShowRegister={setShowRegister}
                  showRegister={showRegister}
                />
              }
            />
          </Route>

          <Route
            path="/login"
            element={
              <SignUpSignIn
                setShowRegister={setShowRegister}
                showRegister={showRegister}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

//
