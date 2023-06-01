import './SingleCard.css';

export default function SingleCard({ card, handleChoice, flipped, disabled, level }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    };

    const cardBackSrc = `/img/${level}/${level}-cover.jpg`;

    return (
        <div className={`card ${card.matched ? 'matched' : ''}`} onClick={handleClick}>
            <div className={flipped ? 'flipped' : ''}>
                <img className="front" src={flipped || card.matched ? card.src : card.src} alt="card front" />
                <img className="back" src={cardBackSrc} alt="card back" />
            </div>
        </div>
    );
}
