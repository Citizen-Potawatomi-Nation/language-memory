import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled, level }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    const cardBackSrc = level === 'animals' ? '/img/animals/animal-cover.jpg' : '/img/colors/colors-cover.jpg';

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={flipped || card.matched ? card.src : card.src.replace('-w', '')} alt="card front" />
                <img className="back" onClick={handleClick} src={cardBackSrc} alt="card back" />
            </div>
        </div>
    )
}
