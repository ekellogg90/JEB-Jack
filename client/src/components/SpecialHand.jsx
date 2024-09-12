import Card from "./Card";
import cardIMGInfo from '../utils/cardIMGInfo';
import { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { useGameContext } from '../utils/GlobalState';
import calcHandValue from '../utils/calcHandValue';
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
    SWAP_CARDS,
    DEALER_DRAW_TWO,
} from "../utils/actions";

export default function SpecialHand({cards}) {
    const [state, dispatch] = useGameContext();

    // Open and close Babe Ruth modal
    const [showBR, setShowBR] = useState(false);
    const handleCloseBR = () => setShowBR(false);
    const handleShowBR = () => setShowBR(true);

    // Open and close Dark Magician modal
    const [showDM1, setShowDM1] = useState(false);
    const handleCloseDM1 = () => setShowDM1(false);
    const handleShowDM1 = () => setShowDM1(true);

    // Open and close Dark Magician modal
    const [showDM2, setShowDM2] = useState(false);
    const handleCloseDM2 = () => setShowDM2(false);
    const handleShowDM2 = () => setShowDM2(true);

    // State variable to hold on to player card chosen for Dark Magician's card swapping
    const [dmPlayerCard, setDmPlayerCard] = useState({});

    const specialCardIMGarr = cardIMGInfo(state.playerSpecialHand);
    const playerCardIMGarr = cardIMGInfo(state.playerHand);
    const dealerCardIMGarr = cardIMGInfo(state.dealerHand);

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

    const handleRemoveCard = (card, actor) => {
        handleCloseBR();
        switch(actor) {
            case 'dealer':
                dispatch({
                    type: REMOVE_DEALER_CARD,
                    card: card,
                });
                if (card.card === 'tarot') {
                    dispatch({
                        type: TOGGLE_DEALER_CAN_HIT
                    })
                }
                break;
            case 'player':
                dispatch({
                    type: REMOVE_PLAYER_CARD,
                    card: card,
                });
                if (card.card === 'tarot') {
                    dispatch({
                        type: TOGGLE_PLAYER_CAN_HIT
                    })
                }
                break;
            default:
                break;
        }
    }

    const handleDMPlayerCard = (card) => {
        handleCloseDM1();
        setDmPlayerCard(card);
        handleShowDM2();
    }

    const handleSwapCards = (dealerCard) => {
        handleCloseDM2();
        const playerCard = dmPlayerCard;
        dispatch({
            type: SWAP_CARDS,
            playerCard: playerCard,
            dealerCard: dealerCard,
        });
    }

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
                handleShowDM1();
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
                handleShowBR();
                break;
            default:
                break;
        }
    };

    return (
    <div>
        <Modal
            id="babeRuthModal"
            show={showBR}
            onHide={handleCloseBR}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Knock a card out of the park!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Dealer's Hand</p>
                    {dealerCardIMGarr.map((card, index) => (
                        <div key={index} onClick={(e) => handleRemoveCard(state.dealerHand[index], 'dealer', e)}>
                            <Card
                                deckName={card.deckName}
                                cardIndex={card.cardIndex}
                            />
                        </div>
                    ))}
                </div>
                <div>
                    <p>Player's Hand</p>
                    {playerCardIMGarr.map((card, index) => (
                        <div key={index} onClick={(e) => handleRemoveCard(state.playerHand[index], 'player', e)}>
                            <Card
                                deckName={card.deckName}
                                cardIndex={card.cardIndex}
                            />
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>

        <Modal
            id="darkMagicianModal1"
            show={showDM1}
            onHide={handleCloseDM1}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Pick a card to swap with the dealer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Player's Hand</p>
                    {playerCardIMGarr.map((card, index) => (
                        <div key={index} onClick={(e) => handleDMPlayerCard(state.playerHand[index], e)}>
                            <Card
                                deckName={card.deckName}
                                cardIndex={card.cardIndex}
                            />
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>

        <Modal
            id="darkMagicianModal2"
            show={showDM2}
            onHide={handleCloseDM2}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Pick one of the dealer's cards to swap with yours</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>Dealer's Hand</p>
                    {dealerCardIMGarr.map((card, index) => (
                        <div key={index} onClick={(e) => handleSwapCards(state.dealerHand[index], e)}>
                            <Card
                                deckName={card.deckName}
                                cardIndex={card.cardIndex}
                            />
                        </div>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
        <h2 className="text-white fs-2 mt-3">Player's Special Hand</h2>
        <div>
            {specialCardIMGarr.map((card, index) => (
                <div key={index} title={cards[index].tooltip} onClick={(e) => handleSpecialCards(state.playerSpecialHand[index].valueOfCard, e)}>
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
