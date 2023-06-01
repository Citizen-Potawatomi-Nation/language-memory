import { useEffect, useState, useCallback } from 'react'
import './App.css'
import SingleCard from "./components/SingleCard";
import LevelSelect from "./components/LevelSelect";

const cardsList = {
    animals: [
        { "src": "/img/animals/bzhew-w.jpg", matched: false },
        { "src": "/img/animals/gagingezhi-w.jpg", matched: false },
        { "src": "/img/animals/gedgene-w.jpg", matched: false },
        { "src": "/img/animals/meingen-w.jpg", matched: false },
        { "src": "/img/animals/moewe-w.jpg", matched: false },
        { "src": "/img/animals/mozo-w.jpg", matched: false },
        { "src": "/img/animals/msegek-w.jpg", matched: false },
        { "src": "/img/animals/mzhewe-w.jpg", matched: false },
        { "src": "/img/animals/nijan-w.jpg", matched: false },
        { "src": "/img/animals/wakwshe-w.jpg", matched: false },
        { "src": "/img/animals/yabe-w.jpg", matched: false },
        { "src": "/img/animals/zhegak-w.jpg", matched: false },
        { "src": "/img/animals/gdede.jpg", matched: false },
        { "src": "/img/animals/gnebek.jpg", matched: false },
        { "src": "/img/animals/gnozhe.jpg", matched: false },
        { "src": "/img/animals/kno.jpg", matched: false },
        { "src": "/img/animals/mko.jpg", matched: false },
        { "src": "/img/animals/mshike.jpg", matched: false },
        { "src": "/img/animals/zheshko.jpg", matched: false }
    ],
    colors: [
        { "src": "/img/colors/gizhgok-nade.jpg", matched: false },
        { "src": "/img/colors/mkedewa.jpg", matched: false },
        { "src": "/img/colors/mnwade.jpg", matched: false },
        { "src": "/img/colors/mskwa.jpg", matched: false },
        { "src": "/img/colors/skebgya.jpg", matched: false },
        { "src": "/img/colors/wabshkya.jpg", matched: false },
        { "src": "/img/colors/wjebgwa.jpg", matched: false },
        { "src": "/img/colors/wzawa_brown.jpg", matched: false },
        { "src": "/img/colors/wzawa_orange.jpg", matched: false },
        { "src": "/img/colors/wzawa_yellow.jpg", matched: false }
    ],
    bodyparts: [
        { "src": "/img/bodyparts/ndon.jpg", matched: false },
        { "src": "/img/bodyparts/njash.jpg", matched: false },
        { "src": "/img/bodyparts/njigwen.jpg", matched: false },
        { "src": "/img/bodyparts/nkaden.jpg", matched: false },
        { "src": "/img/bodyparts/nnech.jpg", matched: false },
        { "src": "/img/bodyparts/nnek.jpg", matched: false },
        { "src": "/img/bodyparts/nshkizhek.jpg", matched: false },
        { "src": "/img/bodyparts/nshtegwan.jpg", matched: false },
        { "src": "/img/bodyparts/ntog.jpg", matched: false },
        { "src": "/img/bodyparts/nzet.jpg", matched: false }
    ],
    opposites: [
        { "src": "/img/opposites/bkonya.jpg", "matchId": "1", matched: false },
        { "src": "/img/opposites/gizhget.jpg", "matchId": "1", matched: false },
        { "src": "/img/opposites/dbek-gizes.jpg", "matchId": "2", matched: false },
        { "src": "/img/opposites/gizes.jpg", "matchId": "2", matched: false },
        { "src": "/img/opposites/gzhate.jpg", "matchId": "3", matched: false },
        { "src": "/img/opposites/ksenya.jpg", "matchId": "3", matched: false },
        { "src": "/img/opposites/mno-bkonya.jpg", "matchId": "4", matched: false },
        { "src": "/img/opposites/mno-waben.jpg", "matchId": "4", matched: false },
        { "src": "/img/opposites/ndoki.jpg", "matchId": "5", matched: false },
        { "src": "/img/opposites/nneba.jpg", "matchId": "5", matched: false }
    ]
}

function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [level, setLevel] = useState(null)
    const [cardsPerRow, setCardsPerRow] = useState(4);
    const [maxWidth, setMaxWidth] = useState('800px');

    const endGame = () => {
        setLevel(null);
        resetTurn();
        setMaxWidth('1100px');
    }

    const shuffleCards = useCallback(() => {
        const cardImages = cardsList[level];
        const selectedCards = [];
        const selectedMatchIds = [];

        if (level === 'opposites') {
            cardImages.forEach((card) => {
                if (!selectedMatchIds.includes(card.matchId)) {
                    selectedCards.push(card);
                    const matchingCard = cardImages.find((c) => c.matchId === card.matchId && c !== card);
                    if (matchingCard) {
                        selectedCards.push(matchingCard);
                        selectedMatchIds.push(card.matchId);
                    }
                }
            });
        } else {
            const availableCards = [...cardImages];
            while (selectedCards.length < 16) {
                const randomIndex = Math.floor(Math.random() * availableCards.length);
                const randomCard = availableCards[randomIndex];
                selectedCards.push(randomCard);
                selectedCards.push({ ...randomCard, id: Math.random() });
                availableCards.splice(randomIndex, 1);
            }
        }

        const shuffledCards = selectedCards.sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);

        setCardsPerRow(4);
        setMaxWidth('800px');
    }, [level]);




    const handleChoice = (card) => {
        const flipSoundNumber = Math.floor(Math.random() * 6) + 1;
        const flipAudio = new Audio(`/flip${flipSoundNumber}.mp3`);
        flipAudio.volume = 0.5; // Adjust the volume here (0.5 means 50% volume)

        const playFlipAudio = () => {
            flipAudio.play();
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        };

        if (choiceOne && choiceTwo) {
            setDisabled(true);
            let isMatch;

            if (choiceOne.matchId && choiceTwo.matchId) {
                isMatch = choiceOne.matchId === choiceTwo.matchId;
            } else {
                isMatch = choiceOne.src === choiceTwo.src;
            }

            if (isMatch) {
                const audioSrc = (choiceOne.matchId ? choiceOne.matchId : choiceOne.src).replace('.jpg', '.mp3');
                const audio = new Audio(audioSrc);
                audio.volume = 0.2;
                audio.addEventListener('ended', () => {
                    setCards((prevCards) => {
                        return prevCards.map((card) => {
                            if (
                                card.src === choiceOne.src ||
                                (card.matchId && card.matchId === choiceOne.matchId)
                            ) {
                                return { ...card, matched: true };
                            } else {
                                return card;
                            }
                        });
                    });
                    setTimeout(() => resetTurn(), 1000);
                });
                audio.play();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        } else {
            playFlipAudio();
        }
    };


    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            let isMatch;

            if (choiceOne.matchId && choiceTwo.matchId) {
                isMatch = choiceOne.matchId === choiceTwo.matchId;
            } else {
                isMatch = choiceOne.src === choiceTwo.src;
            }

            if (isMatch) {
                const audioSrc = (choiceOne.matchId ? choiceOne.matchId : choiceOne.src).replace('.jpg', '.mp3');
                const audio = new Audio(audioSrc);
                audio.play();

                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src || (card.matchId && card.matchId === choiceOne.matchId)) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                });
                setTimeout(() => resetTurn(), 1000);
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setTimeout(() => setDisabled(false), 500);  // wait for 500 ms (or the time of your flip animation) before enabling the cards again
    }

    useEffect(() => {
        if (level) {
            shuffleCards();
        }
    }, [level, shuffleCards]);

    return (
        <div className="App" style={{ maxWidth: level ? '800px' : '1140px' }}>
            <h1>Bodéwadmimwen Match Game</h1>
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