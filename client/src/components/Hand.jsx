import Card from "./Card";

export default function regularHand({cards,owner,handValue}) {
    return (
    <div>
        <h2>{owner}:{handValue}</h2>
        <div>
            {/* {cards.map((card, index) => (<Card key={index} card={card} />))} */}
            {cards.map((card, index) => (<div key={index}>{card.card}:{card.value}</div>))}
        </div>
    </div>);
}