/**
 * Page to add games into the ranking system
 * NJM & nouryehia
 */

import React, {useState, useEffect} from 'react'
import server from "../server"

// Styles
import '../style/add_game.css'

export default function AddGame() {
    const [t1p1, setT1p1] = useState('Player 1');
    const [t1p2, setT1p2] = useState('Player 2');
    const [t2p1, setT2p1] = useState('Player 1');
    const [t2p2, setT2p2] = useState('Player 2');
    const [s1, setS1] = useState('Score');
    const [s2, setS2] = useState('Score');
    const [names, setNames] = useState([]);
    const [notes, setNotes] = useState("");

    const handleT1p1 = (e) => setT1p1(e.target.value);
    const handleT1p2 = (e) => setT1p2(e.target.value);
    const handleT2p1 = (e) => setT2p1(e.target.value);
    const handleT2p2 = (e) => setT2p2(e.target.value);
    const handleS1 = (e) => setS1(e.target.value);
    const handleS2 = (e) => setS2(e.target.value);
    const handleNotes = (e) => setNotes(e.target.value);

    const handleSubmit = () => {
        server.addGame(t1p1, t1p2, t2p1, t2p2, s1, s2, notes)
            .then(() => {
                window.location.reload(false);
            })
            .catch((err) => console.log(err));
        
    }

    const disableButton = () => {
        return t1p1 === 'Player 1' || t1p2 === 'Player 2' ||
               t2p1 === 'Player 1' || t2p2 === 'Player 2' ||
               s1 === 'Score' || s2 === 'Score';
    }

    const scores = Array(21);
    for (var i = 0; i < scores.length; ++i) scores[i] = i;

    useEffect(() => {
        server.getNames()
            .then((response) => {
                setNames(response.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div class='container'>
            <div class='hContainer'>
                <div class='statsContainer'>
                    <h2>Team 1</h2>
                    <select onChange={handleT1p1}>
                        <option value='Player 1'>Player 1</option>
                        {names.map((name) => {
                            return <option value={name}>{name}</option>
                        })}
                    </select>
                    <select onChange={handleT1p2}>
                        <option value='Player 2'>Player 2</option>
                        {names.map((name) => {
                            return <option value={name}>{name}</option>
                        })}
                    </select>
                    <select onChange={handleS1}>
                        <option value='Score'>Score</option>
                        {scores.map((score) => {
                            return <option value={score}>{score}</option>
                        })}
                    </select>
                    
                </div>

                <div class='vs'>vs.</div>

                <div class='statsContainer'>
                    <h2>Team 2</h2>
                    <select onChange={handleT2p1}>
                        <option value='Player 1'>Player 1</option>
                        {names.map((name) => {
                            return <option value={name}>{name}</option>
                        })}
                    </select>
                    <select onChange={handleT2p2}>
                        <option value='Player 2'>Player 2</option>
                        {names.map((name) => {
                            return <option value={name}>{name}</option>
                        })}
                    </select>
                    <select onChange={handleS2}>
                        <option value='Score'>Score</option>
                        {scores.map((score) => {
                            return <option value={score}>{score}</option>
                        })}
                    </select>
                </div>
            </div>
            <div class = "notesContainer">
                <h2>Notes</h2>
                <textarea onChange={handleNotes}
                          placeholder='Enter any notes about the game here, such
                                       as shut-outs, headshots, whether Parth was
                                       wearing a wig or not, etc.'/>
            </div>
            

            <div class = 'text'>Submitting the score will update the ranking.</div>

            <button disabled={disableButton()} onClick={handleSubmit}>
                Submit Score
            </button>
        </div>
    )
}