export default function GuessForm({ guess, setGuess, handleGuess }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleGuess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Įveskite skaičių (1-100)"
                min="1"
                max="100"
            />
            <button type="submit">Spėti</button>
        </form>
    );
}
