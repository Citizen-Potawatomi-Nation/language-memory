import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from "./components/SingleCard";
import LevelSelect from "./components/LevelSelect";

const animalCards = [
    { "src": "/img/animals/bzhew.jpg", matched: false },
    { "src": "/img/animals/gagingezhi.jpg", matched: false },
    { "src": "/img/animals/gedgene.jpg", matched: false },
    { "src": "/img/animals/meingen.jpg", matched: false },
    { "src": "/img/animals/moewe.jpg", matched: false },
    { "src": "/img/animals/mozo.jpg", matched: false },
    { "src": "/img/animals/msegek.jpg", matched: false },
    { "src": "/img/animals/mzhewe.jpg", matched: false },
    { "src": "/img/animals/nijan.jpg", matched: false },
    { "src": "/img/animals/wakwshe.jpg", matched: false },
    { "src": "/img/animals/yabe.jpg", matched: false },
    { "src": "/img/animals/zhegak.jpg", matched: false }
]

const colorCards = [
    { "src": "/img/colors/black.jpg", matched: false },
    { "src": "/img/colors/blue.jpg", matched: false },
    { "src": "/img/colors/green.jpg", matched: false },
    { "src": "/img/colors/pink.jpg", matched: false },
    { "src": "/img/colors/purple.jpg", matched: false },
    { "src": "/img/colors/red.jpg", matched: false },
    { "src": "/img/colors/white.jpg", matched: false },
    { "src": "/img/colors/yellow.jpg", matched: false }
]
function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [level, setLevel] = useState(null)
    const [cardsPerRow, setCardsPerRow] = useState(6);
    const [maxWidth, setMaxWidth] = useState('1100px');

    const endGame = () => {
        setLevel(null);
        resetTurn();
        setMaxWidth('1100px');
    }

    const shuffleCards = () => {
        const cardImages = level === 'animals' ? animalCards : colorCards;
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)

        const cardCount = shuffledCards.length;

        let columns;
        let width;
        if (cardCount <= 4) {
            columns = 2;
            width = '275px';
        } else if (cardCount <= 16) {
            columns = 4;
            width = '825px';
        } else if (cardCount <= 24) {
            columns = 6;
            width = '1100px';
        } else {
            columns = Math.ceil(Math.sqrt(cardCount));
            width = `${columns * 200}px`;
        }

        setCardsPerRow(columns);
        setMaxWidth(width);
    }

    const handleChoice = (card) => {
        const flipSoundNumber = Math.floor(Math.random() * 6) + 1;
        const flipAudio = new Audio(`/flip${flipSoundNumber}.mp3`);
        flipAudio.play();

        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                const correctAudio = new Audio('/correct.mp3');
                correctAudio.play();

                correctAudio.onended = () => {
                    const audioSrc = choiceOne.src.replace('.jpg', '.mp3');
                    const audio = new Audio(audioSrc);
                    audio.play();
                };

                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true, src: card.src.replace('.jpg', '-w.jpg')}
                        } else {
                            return card
                        }
                    })
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        if (level) {
            shuffleCards();
        }
    }, [level])

    return (
        <div className="App" style={{ maxWidth }}>
            <h1>language match game</h1>
            {!level ? <LevelSelect setLevel={setLevel}/> : (
                <div>
                    <div className="tools">
                        <div className="tool-buttons">
                            <button onClick={shuffleCards}>
                                <i className="fa-sharp fa-solid fa-arrow-rotate-right"></i>
                                <span className="button-text">Restart</span>
                            </button>
                            <button onClick={endGame}>
                                <i className="fa-regular fa-cards-blank"></i>
                                <span className="button-text">Level Select</span>
                            </button>
                        </div>
                        <div className="scoreboard">
                            <p>Turns: {turns}</p>
                        </div>
                    </div>

                    <div className="card-grid" style={{ gridTemplateColumns: `repeat(${cardsPerRow}, 1fr)` }}>
                        {cards.map(card => (
                            <SingleCard
                                key={card.id}
                                card={card}
                                handleChoice={handleChoice}
                                flipped={card === choiceOne || card === choiceTwo || card.matched}
                                disabled={disabled}
                                level={level}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App