import Card from "./Card";
import cardIMGInfo from '../utils/cardIMGInfo';
import { useGameContext } from '../utils/GlobalState';
import { 
    UPDATE_DECK,
    ADD_PLAYER_CARD,
    REMOVE_PLAYER_CARD,
    CLEAR_PLAYER_HAND,
    ADD_DEALER_CARD,
    REMOVE_DEALER_CARD,
    CLEAR_DEALER_HAND,
    ADD_SPECIAL_CARD,
    REMOVE_SPECIAL_CARD,
    TOGGLE_PLAYER_CAN_HIT,
    TOGGLE_DEALER_CAN_HIT,
    UPDATE_PLAYER_SCORE,
    UPDATE_DEALER_SCORE,
    TOGGLE_GAME_OVER,
    TOGGLE_NEW_GAME,
    SET_RESULT,
    GAME_OVER,
    RESET_GAME,
    START_GAME,
    SWAP_HANDS,
    DEALER_DRAW_TWO,
} from "../utils/actions";

export default function SpecialHand({cards}) {
    const [state, dispatch] = useGameContext();

    const cardIMGarr = cardIMGInfo(cards);

    const getRandomCard = (noSpecials) => {
        const alternateHandCards = ["+2", "reverse" , "skip", "black lotus", "charizard",
        "dark magician", "abomb", "goojf", "babe ruth"];
        let randIndex = Math.floor(Math.random() * state.gameDeck.length);
        let card = state.gameDeck[randIndex];
        if (noSpecials) {
            while (alternateHandCards.some(substring => card.valueOfCard.includes(substring))) {
                randIndex = Math.floor(Math.random() * state.gameDeck.length);
                card = state.gameDeck[randIndex];
            }
        }
        const updatedDeck = state.gameDeck.filter((_, index) => index !== randIndex);

        //deck update
        dispatch({
            type: UPDATE_DECK,
            deck: updatedDeck,
        });
        // setGameDeck(updatedDeck);

        //rand card
        return card;
    };

    const calcHandValue = (hand) => {
        let value = 0;
        let aceCount = 0;
        hand.forEach((card) => {
            if (card.card === 'tarot') {
                value = parseInt(card.valueOfCard);
                return value;
            } else if (card.valueOfCard === "jack" || card.valueOfCard === "queen" || card.valueOfCard === "king") {
                value += 10;
            } else if (card.valueOfCard === "ace") {
                aceCount++;
                value += 11;
            } else {
                value += parseInt(card.valueOfCard);
            }
        });
        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount--;
        }
        return value;
    };

    const handleSpecialCards = (card) => {
        console.log(card);
        dispatch({
            type: REMOVE_SPECIAL_CARD,
            card: card,
        });
        switch(card) {
            // UNO +2: force opponent to draw 2
            case "green +2":
            case "red +2":
                console.log('force opponent to draw 2');
                const card1 = getRandomCard(true);
                const card2 = getRandomCard(true);
                dispatch({
                    type: DEALER_DRAW_TWO,
                    card1: card1,
                    card2: card2,
                });
                const newDealerScore = calcHandValue([...state.dealerHand, card1, card2]);
                dispatch({
                    type: UPDATE_DEALER_SCORE,
                    score: newDealerScore,
                });
                if (newDealerScore > 21 || card1.card === 'tarot' || card2.card === 'tarot') {
                    dispatch({
                        type: TOGGLE_DEALER_CAN_HIT
                    });
                }
                break;
            // UNO reverse: swap dealer and player hands
            case "green reverse":
            case "red reverse":
                console.log('swap dealer and player hands');
                dispatch({
                    type: SWAP_HANDS,
                })
                break;
            // UNO skip: force dealer to stand
            case "green skip":
            case "yellow skip":
                console.log('force dealer to stand');
                dispatch({
                    type: TOGGLE_DEALER_CAN_HIT,
                })
                break;
            // MTG Black Lotus: add 1-3 to score
            case "black lotus":
                console.log('add 1-3 to score');
                let scoreToAdd = 0;
                switch(state.playerHandValue) {
                    case 20:
                        scoreToAdd = 1;
                        break;
                    case 19:
                        scoreToAdd = 2;
                        break;
                    default:
                        scoreToAdd = 3;
                        break;
                }
                const newScore = state.playerHandValue + scoreToAdd;
                dispatch({
                    type: UPDATE_PLAYER_SCORE,
                    score: newScore,
                });
                break;
            // Pokemon Charizard: burns dealers cards
            case "charizard":
                console.log('burns dealers cards, must draw new ones');
                dispatch({
                    type: CLEAR_DEALER_HAND,
                });
                break;
            // Yugioh Dark Magician: swap one of 
            case "dark magician":
                console.log('swap one of your cards with one of the dealers cards');
                break;
            // Atomic Bomb: resets the game
            case "abomb":
                console.log('game reset');
                dispatch({
                    type: RESET_GAME,
                });
                break;
            // Monopoly Get Out of Jail Free: save yourself from busting, removes last card
            case "goojf":
                console.log('save yourself from busting, removes last card');
                const cardToRemove = state.playerHand[(state.playerHand.length - 1)];
                dispatch({
                    type: REMOVE_PLAYER_CARD,
                    card: cardToRemove,
                });
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
        <h2 className="text-white fs-2 mt-3">Player's Special Hand</h2>
        <div>
            {cardIMGarr.map((card, index) => (
                <div key={index} title={cards[index].tooltip} onClick={(e) => handleSpecialCards(cards[index].valueOfCard, e)}>
                    <Card
                    deckName={card.deckName}
                    cardIndex={card.cardIndex}
                    />
                </div>
            ))}
            {/*cards.map((card, index) => (
                <div key={index} onClick={(e) => handleSpecialCards(card.valueOfCard, e)}>{card.card}:{card.valueOfCard}</div>
            ))*/}
        </div>
    </div>
    );
}
