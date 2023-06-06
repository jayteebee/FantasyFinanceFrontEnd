import React, {useState, useEffect} from 'react'
import {getAllUserWatchlists, getStocksFromWatchlist} from '../../API/watchlistAPI'
import Button from 'react-bootstrap/esm/Button'

const FetchAllWatchlists = () => {
    const [watchlists, setWatchlists] = useState(null)
    const [watchlistStocks, setWatchlistStocks] = useState(null)
    const [showStocks, setShowStocks] = useState(false)
    const userID =  window.localStorage.getItem("userID");

    useEffect(() => {
        getAllUserWatchlists(userID)
        .then(data => setWatchlists(data))
        .catch(err => console.log("API Call Failed", err))
    }, [])
    
    const showWatchlistStocks = async (watchlist) => {
      const response = await getStocksFromWatchlist(userID, watchlist)
      .then (data => {
        setWatchlistStocks(data)
        console.log("DATA: ",data)
      })
      .catch((err) => console.log("API Call Failed", err));
      setShowStocks(true)
    }
  return (
    <div>

    <h2>Watchlists</h2> 
{watchlists ? watchlists.map(watchlist => (
<div key={`watchlist-${watchlist.id}`}>
<Button onClick={() => {showWatchlistStocks(watchlist.id)}}>
{watchlist.name}
</Button>



</div>
)): <p>Make Watchlists!</p>}

{showStocks ? watchlistStocks.map(stock => (
  <div key={`stock-${stock.id}`}>
  Name: {stock.company_name}
  Ticker Symbol: {stock.symbol}

  </div>
)) : <p>Buy Stocks, brokie.</p>}

    </div>
  )
}

export default FetchAllWatchlists


