import completeDeck from '../utils/completeDeck';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Hand from '../components/Hand';
import SpecialHand from '../components/SpecialHand';
import bjTable from '../assets/bjtable.jpg';
import { useGameContext } from '../utils/GlobalState';
import { 
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
} from "../utils/actions";

export default function Game() {
    const [state, dispatch] = useGameContext();

    const cardStyle = {
        width: '100%',
        height: '85vh',
        backgroundImage: `url(${bjTable})`,
        backgroundSize: "100% 100%",
    };
    const [gameDeck, setGameDeck] = useState(completeDeck);

    // const [playerHand, setPlayerHand] = useState([]);
    // const [playerSpecialHand, setPlayerSpecialHand] = useState([]);
    // const [playerCanHit, setPlayerCanHit] = useState(true);
    // const [playerHandValue, setPlayerHandValue] = useState(0);

    // const [dealerHand, setDealerHand] = useState([]);
    // const [dealerHandValue, setDealerHandValue] = useState(0);
    // const [dealerCanHit, setDealerCanHit] = useState(true);

    // const [gameOver, setGameOver] = useState(false);
    // const [result, setResult] = useState({type: "", message: ""});
    // const [newGame, setNewGame] = useState(false);

    const alternateHandCards = ["+2", "reverse" , "skip", "black lotus", "charizard",
    "dark magician", "abomb", "goojf", "babe ruth"];

    //get random card and remove it from the deck and update the state
    const getRandomCard = (noSpecials) => {
        let randIndex = Math.floor(Math.random() * gameDeck.length);
        let card = gameDeck[randIndex];
        if (noSpecials) {
            while (alternateHandCards.some(substring => card.valueOfCard.includes(substring))) {
                randIndex = Math.floor(Math.random() * gameDeck.length);
                card = gameDeck[randIndex];
            }
        }
        const updatedDeck = gameDeck.filter((_, index) => index !== randIndex);

        //deck update
        setGameDeck(updatedDeck);

        //rand card
        return card;
    };

    const gameStart = () => {
        const playerCards = [getRandomCard(true), getRandomCard(true)];
        const dealerCard = getRandomCard(true);

        if (dealerCard.card === 'tarot') {
            // setDealerCanHit(false);
            dispatch({
                type: TOGGLE_DEALER_CAN_HIT
            });
        }


        playerCards.map((card) => {
            if (card.card === 'tarot') {
                // setPlayerCanHit(false);
                dispatch({
                    type: TOGGLE_PLAYER_CAN_HIT
                });
            }
        });

        // Check for tarot cards and calculate playerHandValue accordingly
        let newPlayerValue = 0;
        if (playerCards[0].card === 'tarot') {
            const card1 = parseInt(playerCards[0].valueOfCard);
            if (playerCards[1].card === 'tarot') {
                const card2 = parseInt(playerCards[1].valueOfCard);
                newPlayerValue = (card1 > card2) ? (card1) : (card2);
            } else {
                newPlayerValue = card1;
            }
        } else {
            newPlayerValue = calcHandValue(playerCards);
        }
        
        const newDealerValue = calcHandValue([dealerCard]);
        
        // Set all state variables
        dispatch({
            type: START_GAME,
            playerHand: playerCards,
            dealerCard: dealerCard,
            playerHandValue: newPlayerValue,
            dealerHandValue: newDealerValue
        })
        // setPlayerHand(playerCards);
        // setDealerHand([dealerCard]);
        // setPlayerHandValue(newPlayerValue);
        // setDealerHandValue(newDealerValue);
    };

    const dealCardToPlayer = () => {
        // const gameSavingCards = ["charizard", "dark magician", "abomb", "goojf", "babe ruth"];

        const card = getRandomCard(false);
        console.log(card);

        // Checks for special cards and sends them to the special hand
        if (alternateHandCards.some(substring => card.valueOfCard.includes(substring))) {
            // const newSpecialHand = [...playerSpecialHand, card];
            // setPlayerSpecialHand(newSpecialHand);
            dispatch({
                type: ADD_SPECIAL_CARD,
                card: card,
            })
        } else {
            const newJJHand = [...state.playerHand, card];
            // setPlayerHand(newJJHand);
            dispatch({
                type: ADD_PLAYER_CARD,
                card: card,
            });
            const newHandValue = calcHandValue(newJJHand);
            // setPlayerHandValue(newHandValue);
            dispatch({
                type: UPDATE_PLAYER_SCORE,
                score: newHandValue,
            });

            if (newHandValue >= 21 || card.card === 'tarot') {
                // setPlayerCanHit(false);
                dispatch({
                    type: TOGGLE_PLAYER_CAN_HIT,
                });
            }
        }
    };

    // If the dealer can hit they get a card, otherwise the game ends
    const playerStand = () => {
        if (state.dealerCanHit) {
            const card = getRandomCard(true);
            const newDealerHand = [...state.dealerHand, card];
            const newHandValue = calcHandValue(newDealerHand);
            // setDealerHand(newDealerHand);
            dispatch({
                type: ADD_DEALER_CARD,
                card: card,
            })
            // setDealerHandValue(newHandValue);
            dispatch({
                type: UPDATE_DEALER_SCORE,
                score: newHandValue,
            })
            console.log(newDealerHand);
            console.log(state.dealerHandValue);
            if (newHandValue >= 17 || card.card === 'tarot') {
                // setDealerCanHit(false);
                dispatch({
                    type: TOGGLE_DEALER_CAN_HIT,
                });
            }
        } else {
            // setGameOver(true);
            dispatch({
                type: TOGGLE_GAME_OVER,
            });
            
            // if (state.dealerHandValue > 21) {
            //     handleGameOver({type: "player", message: "Dealer busts, player wins"});
            // } else if (dealerHandValue > playerHandValue) {
            //     handleGameOver({type: "dealer", message: "Dealer wins"});
            // } else {
            //     handleGameOver({type: "player", message: "player wins"});
            // }

            const dealerScore = state.dealerHandValue;
            const playerScore = state.playerHandValue;

            switch(true) {
                case (dealerScore > 21 && playerScore > 21):
                    handleGameOver({type: 'draw', message: 'Double bust, draw'});
                    break;
                case (dealerScore > 21):
                    handleGameOver({type: 'win', message: 'Dealer busts, player wins'});
                    break;
                case (playerScore > 21):
                    handleGameOver({type: 'loss', message: 'Player busts, dealer wins'});
                    break;
                case (dealerScore === playerScore):
                    handleGameOver({type: 'draw', message: 'Draw'});
                    break;
                case (dealerScore > playerScore):
                    handleGameOver({type: 'loss', message: 'Dealer wins'});
                    break;
                case (playerScore > dealerScore):
                    handleGameOver({type: 'win', message: 'Player wins'});
                    break;
                default:
                    handleGameOver({type: '?', message: 'Results inconclusive'});
                    break;
            }
        }
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

    const handleGameOver = (result) => {
        // setGameOver(true);
        // setResult(result);
        // setNewGame(true);
        dispatch({
            type: GAME_OVER,
            result: result,
        });
    };

    const resetGame = () => {
        // setPlayerHand([]);
        // setDealerHand([]);
        // setPlayerCanHit(true);
        // setDealerCanHit(true);
        // setPlayerHandValue(0);
        // setDealerHandValue(0);
        // setGameOver(false);
        // setResult({type: "", message: ""});
        // setNewGame(false);
        // setGameDeck(completeDeck);
        dispatch({
            type: RESET_GAME,
        });
    };

    useEffect(()=> {
        if (state.playerHand.length === 0 && state.dealerHand.length === 0) {
            gameStart();
        };

        // if (playerHandValue === 21) {
        //     handleGameOver({type: "player", message: "player wins"});
        // } else if (dealerHandValue === 21) {
        //     handleGameOver({type: "dealer", message: "dealer wins"});
        // };

        // if (gameOver && dealerHand.length <= 5 ){ 
        //     switch(true) {
        //         case playerHandValue === 21:
        //             setResult({type: "player", message: "player wins"});
        //             break;
        //         case playerHandValue > 21:
        //             setResult({type: "dealer", message: "Player busts, dealer wins"});
        //             break;
        //         case dealerHandValue < playerHandValue:
        //             playerStand();
        //             break;
        //         case dealerHandValue === playerHandValue && dealerHand.length <= 5:
        //             setResult({type: "", message: "draw"});
        //             setNewGame(true);
        //             break;
        //         case dealerHandValue > playerHandValue && dealerHandValue <= 21:
        //             setResult({type: "dealer", message: "dealer wins"});
        //             setNewGame(true);
        //             break;
        //         default:
        //             break;
        //     }
        // };
    }, [state.playerHand, state.dealerHand, state.gameOver]);

    return (        
        <>
        <div className='card align-items-center justify-content-center' style={cardStyle}>
            <div>

            </div>   
            <div>
                <Hand cards={state.dealerHand} owner={"Dealer's Hand"} handValue={state.dealerHandValue}/>
                {state.gameOver && (<div><h2>{state.result.message}</h2></div>)}
            {!state.newGame ? (
                <>
                    <Button className='mx-5 fw-bold' onClick={dealCardToPlayer} variant='primary' size='lg' disabled={!state.playerCanHit}>Hit</Button>
                    <Button className='fw-bold' onClick={playerStand} variant='danger' size='lg'>Stand</Button>
                </>
            ) : (
                <Button onClick={resetGame}>Reset</Button>
            )}
                <Hand cards={state.playerHand} owner={"Player's Hand"} handValue={state.playerHandValue}/>
                <SpecialHand cards={state.playerSpecialHand} />
            </div>
        </div>
        </>
    );
}