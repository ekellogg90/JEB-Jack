import Card from "./Card";

export default function regularHand({cards,owner,handValue}) {
    const cardIMGarr = cardIMGInfo(cards);
    return (
    <div>
        <h2>{owner}:{handValue}</h2>
        <div>
            {cardIMGarr.map((card, index) => (
            <Card key={index}
            deckName={card.deckName}
            cardIndex={card.cardIndex}
            />
            ))}
        </div>
    </div>
    );
}