import './LevelSelect.css'

function LevelSelect({ setLevel }) {
    return (
        <div className="level-select">
            <h2>Select a Level</h2>
            <img src="/img/animals-card.jpg" alt="animals" onClick={() => setLevel('animals')} />
            <img src="/img/colors-card.jpg" alt="colors" onClick={() => setLevel('colors')} />
        </div>
    );
}

export default LevelSelect;
