import React, {useState, useEffect} from "react";
import { resolveDecks } from "./ResolveDecks";

const Card = ({ deckName, cardIndex}) => {
    const [cardDataUrl, setCardDataUrl] = useState(null); //null may be best solution but not sure

    useEffect(() => {
        const loadCard = async () => {
            try {
                const decks = await resolveDecks();
                const deck = decks[deckName];

                if (deck && cardIndex < deck.length) {
                    setCardDataUrl(deck[cardIndex]);
                } else {
                    console.log('indexing error');
                }
            } catch (err) {
                console.log(err);
            }
        };
        loadCard();
    }, [deckName, cardIndex]);

    return (
        <div>
            {cardDataUrl ? (
                <img src={cardDataUrl} alt={`Card at index ${cardIndex}`} />
            ) : (
                <p>loading</p>
            )}
        </div>
    );
};

export default Card;
