import React, { useState, useEffect } from 'react';
import { resolveDecks } from './ResolveDecks';

const Card = ({ deckName, cardIndex }) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCards = async () => {
            try {
                const decks = await resolveDecks();
                const deck = decks[deckName];
                if (deck) {
                    setCards(deck);
                } else {
                    setError('Deck not found');
                }
            } catch (err) {
                setError('Failed to load deck');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadCards();
    }, [deckName]);

    //for testing but also useful
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!cards || cardIndex >= cards.length) {
        return <p>Card not found</p>;
    }

    const card = cards[cardIndex];

    return <div>{card}</div>;
};

export default Card;