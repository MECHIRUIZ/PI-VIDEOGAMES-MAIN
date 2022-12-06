import React from "react";
import { Link } from "react-router-dom";


export default function LandingPage (){
    return(
        <div>
            <h1>Welcome To the VideoGames PI</h1>
              <Link to= "/home">
                <button>Click to enter</button>
              </Link>
              <h5> Created by: Mercedes Dulma Ruiz</h5>
            
        </div>
    )
}