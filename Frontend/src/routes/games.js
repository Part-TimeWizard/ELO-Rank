/**
 * Lists all of the games played and the scores.
 * Note: Example of how to contact the server (NY)
 * NJM + NY
 */

import React, {useState, useEffect} from "react";
import server from "../server"

// Styles
import styles from '../style/games.module.css'


export default function Games(props) {
    const [games, setGames] = useState([])
    
    useEffect(() => {
        server.getGames()
            .then((response) => {
                setGames(response.data)
            })
            .catch((err) => console.log(err))
    }, [])

    if (games === null) {
        return(<></>);
    }

    return (
        <div>
            {Object.values(games).reverse().map((game, index) => {
                // Calculate the color
                var red = 238;
                var green = 13;
                var blue = 137;

                red = 255 - (((Math.sin(index/2.0 + Math.PI/2)/2.0) + .5) * (255 - red));
                green = 255 - (((Math.sin(index/2.0 + Math.PI/2)/2.0) + .5) * (255 - green));
                blue = 255 - (((Math.sin(index/2.0 + Math.PI/2)/2.0) + .5) * (255 - blue));

                var newColor = "" + red + "," + green + "," + blue;

                return(
                    <div className={styles.card}
                         style={{color: `rgb(${newColor})`,
                                border: `1px solid rgb(${newColor})`}}>
                            
                            <div className={styles.scores}>
                                <div>
                                    <h2 style={{color: `rgb(${newColor})`}}>{game.t1_p1}</h2>
                                    <h2 style={{color: `rgb(${newColor})`}}>{game.t1_p2}</h2>
                                    <h1 style={{color: `rgb(${newColor})`}}>{game.t1_score}</h1>
                                </div>

                                <div class={styles.vs}>vs.</div>

                                <div>
                                    <h2 style={{color: `rgb(${newColor})`}}>{game.t2_p1}</h2>
                                    <h2 style={{color: `rgb(${newColor})`}}>{game.t2_p2}</h2>
                                    <h1 style={{color: `rgb(${newColor})`}}>{game.t2_score}</h1>
                                </div>
                            </div>

                            {game.notes !== '' &&
                             <p><b>Notes:</b> {game.notes} </p>}

                            <p class={styles.date}> {game.date} </p>






                        
                        





                    </div>
                )})}
        </div>
    );
}