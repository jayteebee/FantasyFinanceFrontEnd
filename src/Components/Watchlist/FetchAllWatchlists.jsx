import React, {useState, useEffect} from 'react'
import {getAllUserWatchlists} from '../../API/watchlistAPI'

const FetchAllWatchlists = () => {
    const [watchlists, setWatchlists] = useState(null)
    const userID = 1

    useEffect(() => {
        getAllUserWatchlists(userID)
        .then(data => setWatchlists(data))
        .catch(err => console.log("API Call Failed", err))
    }, [])
    

  return (
    <div>
    <div>FetchAllWatchlists</div> 
{watchlists ? watchlists.map(watchlist => (
<div key={watchlist.id}>
<button>
{watchlist.name}
</button>
{watchlist.stocks.map(stock => (
    <div>
    {stock.company_name} | {stock.symbol}

    </div>
))


}

</div>
)): <p>Make Watchlists!</p>}

    </div>
  )
}

export default FetchAllWatchlists