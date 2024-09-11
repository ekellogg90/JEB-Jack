import Card from "./Card";
import cardIMGInfo from '../utils/cardIMGInfo';
import { Button } from 'react-bootstrap';

export default function SpecialHand({cards}) {
    const cardIMGarr = cardIMGInfo(cards);

    const handleSpecialCards = (card) => {
        console.log(card);
        switch(card) {
            case "+2":
                console.log('force opponent to draw 2');
                break;
            case "reverse":
                console.log('?');
                break;
            case "skip":
                console.log('draw 1 and choose if you want to keep it');
                break;
            case "black lotus":
                console.log('add 1-3 to score');
                break;
            case "charizard":
                console.log('burns dealers cards, must draw new ones');
                break;
            case "dark magician":
                console.log('swap one of your cards with one of the dealers cards');
                break;
            case "abomb":
                console.log('game reset');
                break;
            case "goojf":
                console.log('saves a bust, removes card that made you bust');
                break;
            case "babe ruth":
                console.log('knocks a card out the park, either players or dealers');
                break;
            default:
                break;
        }
    
    };

    return (
    <div>
        <h2>Player's Special Hand</h2>
        <div>
            {/* {cardIMGarr.map((card, index) => (
            <Card key={index}
            deckName={card.deckName}
            cardIndex={card.cardIndex}
            />
            ))} */}
            {cards.map((card, index) => (
                <div key={index} onClick={(e) => handleSpecialCards(card.valueOfCard, e)}>{card.card}:{card.valueOfCard}</div>
            ))}
        </div>
    </div>
    );
}
