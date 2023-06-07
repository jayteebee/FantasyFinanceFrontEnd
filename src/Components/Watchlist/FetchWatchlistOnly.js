import React, { useState, useEffect } from "react";
import {
    getAllUserWatchlists
  } from "../../API/watchlistAPI";
  import Button from "react-bootstrap/esm/Button";
  import { useNavigate } from "react-router-dom";


const FetchWatchlistOnly = () => {
    const userID = window.localStorage.getItem("userID");
    const [watchlists, setWatchlists] = useState(null);


    useEffect(() => {
        getAllUserWatchlists(userID)
          .then((data) => setWatchlists(data))
          .catch((err) => console.log("API Call Failed", err));
      }, []);

      const navigate = useNavigate();

      const navigateToWatchlist = () => {
        navigate("/Watchlist");
      }


  return (
    <div>
    
    {watchlists ? (
        watchlists.map((watchlist) => (
          <div>
            <Button
            variant="outline-light" size="sm"
            key={`watchlist-${watchlist.id}`}
              onClick={navigateToWatchlist}
            >
              {watchlist.name}
            </Button>
          </div>
        ))
      ) : (
        <p>Make Watchlists!</p>
      )}</div>
  )
}

export default FetchWatchlistOnly