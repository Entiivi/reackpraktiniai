import { useState, useEffect } from "react";
import GuessForm from "./GuessForm";
import Message from "./Message";

export default function GuessGame() {
    const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [attempts, setAttempts] = useState(0);

    // Generate a random number between 1 and 100
    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Handle user guess
    const handleGuess = () => {
        const userGuess = parseInt(guess, 10);
        setAttempts(attempts + 1);

        if (isNaN(userGuess)) {
            setMessage("Įveskite galiojantį skaičių!");
            return;
        }

        if (userGuess < targetNumber) {
            setMessage("Bandyk didesnį skaičių!");
        } else if (userGuess > targetNumber) {
            setMessage("Bandyk mažesnį skaičių!");
        } else {
            setMessage(`Teisingai! Atspėjai per ${attempts + 1} bandymus.`);
        }
    };

    // Reset the game
    const resetGame = () => {
        setTargetNumber(generateRandomNumber());
        setGuess("");
        setMessage("");
        setAttempts(0);
    };

    return (
        <div className="guess-game">
            <h2>Skaičių spėjimo žaidimas</h2>
            <GuessForm guess={guess} setGuess={setGuess} handleGuess={handleGuess} />
            <Message message={message} />
            {message.includes("Teisingai") && (
                <button onClick={resetGame}>Žaisti dar kartą</button>
            )}
            <p>Bandymų skaičius: {attempts}</p>
        </div>
    );
}
