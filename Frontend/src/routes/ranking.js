/**
 * Page to display the rankings of each player
 * NJM
 */

import React, {useState, useEffect} from 'react'
import server from "../server"


// Styles
import styles from '../style/ranking.module.css'

export default function Ranking() {
    const [players, setPlayers] = useState([])

    useEffect(() => {
        server.getPlayers()
        .then((response) => {
            setPlayers(response.data)
        })
        .catch((err) => console.log(err))
    }, [])
    
    // Sort players NOTE: There has to be a cleaner way, but this will work
    var playerArray = Object.keys(players).map((player => {
        return (
            {
                name: player,
                rating: players[player].rating,
                wins: players[player].wins,
                losses: players[player].losses,
            }
        )
    }));

    playerArray.sort(function(a,b) {
        if( (a.wins === 0 && a.losses === 0) && (b.wins === 0 && b.losses === 0) ) {
            return b.name-a.name;
        } else if( a.wins === 0 && a.losses === 0 ) {
            return 1;
        } else if( b.wins === 0 && b.losses === 0 ) {
            return -1;
        }
        return b.rating === a.rating ? b.name - a.name : b.rating - a.rating
    });

    var currRanking = 1;
    var prevRating = null;

    return (
        <div>
            {playerArray.map((player, index) => {
                // Calculate the color
                var red = 238;
                var green = 13;
                var blue = 137;

                red = 255 - (((playerArray.length-index)/playerArray.length) * (255 - red));
                green = 255 - (((playerArray.length-index)/playerArray.length) * (255 - green));
                blue = 255 - (((playerArray.length-index)/playerArray.length) * (255 - blue));

                var newColor = "" + red + "," + green + "," + blue;
                if ( player.wins === 0 && player.losses === 0) {
                    return (
                        <div className={styles.card} 
                             style={{color: `rgb(${newColor})`,
                                     border: `1px solid rgb(${newColor})`}}>
                            <div className={styles.ranking}>
                                <h1 style={{color: `rgb(${newColor})`}}>*</h1>
                            </div>
                            <div className={styles.playerInfo}>
                                <h2 style={{color: `rgb(${newColor})`}}>{player.name}</h2>
                                <p>Wins: <code>{player.wins}</code> | Losses: <code>{player.losses}</code></p>
                                <p>Rating: <code>Not Rated</code></p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className={styles.card} 
                             style={{color: `rgb(${newColor})`,
                                     border: `1px solid rgb(${newColor})`}}>
                            <div className={styles.ranking}>
                                <h1 style={{color: `rgb(${newColor})`}}>{((player.rating === prevRating && currRanking) || ++currRanking) - 1}</h1>
                                <span>{prevRating = player.rating}</span>
                            </div>
                            <div className={styles.playerInfo}>
                                <h2 style={{color: `rgb(${newColor})`}}>{player.name}</h2>
                                <p>Wins: <code>{player.wins}</code> | Losses: <code>{player.losses}</code></p>
                                <p>Rating: <code>{player.rating}</code></p>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )

}
