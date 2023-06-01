import { useState } from 'react';
import './LevelSelect.css'

function LevelSelect({ setLevel }) {
    const [flippedCard, setFlippedCard] = useState(null);
    const [enlargedCard, setEnlargedCard] = useState(null);

    const handleCardClick = (level) => {
        setFlippedCard(level);
        setTimeout(() => {
            setEnlargedCard(level);
        }, 500); // adjust as needed
    };

    const handleButtonClick = (level) => {
        setLevel(level);
        setFlippedCard(null);
        setEnlargedCard(null);
    }

    const closeCard = (event) => {
        event.stopPropagation();
        setFlippedCard(null);
        setEnlargedCard(null);
    };

    return (
        <>
            <h2>Select a Level</h2>
            <div className="level-select">
                {['animals', 'colors', 'bodyparts', 'opposites'].map((level, index) => (
                    <div key={index} className="level-card-wrapper">
                        <div
                            className={`level-card ${flippedCard === level ? 'flipped' : ''} ${enlargedCard === level ? 'enlarged' : ''}`}
                            onClick={() => handleCardClick(level)}
                        >
                            <img src={`/img/${level}-card.jpg`} alt={level} className="front" />
                            <div className="back">
                                <img src="/img/blank-card.jpg" alt="blank" />
                                {enlargedCard === level && (
                                    <>
                                        <button onClick={() => handleButtonClick(level)}>
                                            Start Game
                                        </button>
                                        <span
                                            className="close-btn"
                                            alt="Close"
                                            onClick={(e) => { e.stopPropagation(); setEnlargedCard(null); setFlippedCard(null); }}
                                        >x</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default LevelSelect;
