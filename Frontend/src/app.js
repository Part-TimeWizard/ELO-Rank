import React, { useState } from "react";

// Routes
import Ranking from './routes/ranking'
import AddGame from './routes/add_game'
import Games from './routes/games'

// Style
import "./style/app.css";

export default function App() {
    const [currView, setCurrView] = useState(0)

    return (
        <div>
            <h1> 
                {  (currView === 0 && "Ranking")
                || (currView === 1 && "Games")
                || (currView === 2 && "Add Game") }
            </h1>

            <div>
                <ul>
                   <li class = {currView === 0 ? "active" : ""} 
                       onClick={() => setCurrView(0)}>Ranking</li>
                   <li class = {currView === 1 ? "active" : ""} 
                       onClick={() => setCurrView(1)}>Games</li>
                   <li class = {currView === 2 ? "active" : ""} 
                       onClick={() => setCurrView(2)}>Add Game</li>
                </ul> 
            </div>

            {  (currView === 0 && <Ranking />)
                || (currView === 1 && <Games loadGames={true}/>)
                || (currView === 2 && <AddGame />) }
            <footer>
                <p>RustRank v1.0.0</p>
            </footer>
        </div>
    );
}