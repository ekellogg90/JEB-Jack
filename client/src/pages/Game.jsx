// import completeDeck from '../utils/completeDeck';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Hand from '../components/Hand';
import SpecialHand from '../components/SpecialHand';
import calcHandValue from '../utils/calcHandValue';
import bjTable from '../assets/bjtable.jpg';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_WIN } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import { useGameContext } from '../utils/GlobalState';
import { 
    UPDATE_DECK,
    ADD_PLAYER_CARD,
    ADD_DEALER_CARD,
    ADD_SPECIAL_CARD,
    TOGGLE_PLAYER_CAN_HIT,
    TOGGLE_DEALER_CAN_HIT,
    UPDATE_PLAYER_SCORE,
    UPDATE_DEALER_SCORE,
    TOGGLE_GAME_OVER,
    GAME_OVER,
    RESET_GAME,
    START_GAME,
    FILL_SPECIAL_HAND,
} from "../utils/actions";

export default function Game() {
    const [state, dispatch] = useGameContext();

    const [addWin, { error }] = useMutation(ADD_WIN);
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};

    const cardStyle = {
        width: '100%',
        height: '87vh',
        backgroundImage: `url(${bjTable})`,
        backgroundSize: "100% 100%",
    };

    const alternateHandCards = ["+2", "reverse" , "skip", "black lotus", "charizard",
    "dark magician", "abomb", "goojf", "babe ruth"];

    //get random card and remove it from the deck and update the state
    const getRandomCard = (noSpecials) => {
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

        //rand card
        return card;
    };

    const gameStart = () => {
        const playerCards = [getRandomCard(true), getRandomCard(true)];
        const dealerCard = getRandomCard(true);

        if (dealerCard.card === 'tarot') {
            dispatch({
                type: TOGGLE_DEALER_CAN_HIT
            });
        }


        playerCards.map((card) => {
            if (card.card === 'tarot') {
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
    };

    const dealCardToPlayer = () => {

        const card = getRandomCard(false);
        console.log(card);

        // Checks for special cards and sends them to the special hand
        if (alternateHandCards.some(substring => card.valueOfCard.includes(substring))) {
            dispatch({
                type: ADD_SPECIAL_CARD,
                card: card,
            })
        } else {
            const newJJHand = [...state.playerHand, card];
            dispatch({
                type: ADD_PLAYER_CARD,
                card: card,
            });
            const newHandValue = calcHandValue(newJJHand);
            dispatch({
                type: UPDATE_PLAYER_SCORE,
                score: newHandValue,
            });

            if (newHandValue >= 21 || card.card === 'tarot') {
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
            dispatch({
                type: ADD_DEALER_CARD,
                card: card,
            })
            dispatch({
                type: UPDATE_DEALER_SCORE,
                score: newHandValue,
            })
            console.log(newDealerHand);
            console.log(state.dealerHandValue);
            if (newHandValue >= 17 || card.card === 'tarot') {
                dispatch({
                    type: TOGGLE_DEALER_CAN_HIT,
                });
            }
        } else {
            dispatch({
                type: TOGGLE_GAME_OVER,
            });

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

    const handleGameOver = (result) => {
        if (result.type === 'win') {
            const _id = userData._id;
            addWin({
                variables: {_id}
            });
        }
        dispatch({
            type: GAME_OVER,
            result: result,
        });
    };

    const resetGame = () => {
        dispatch({
            type: RESET_GAME,
        });
    };

    useEffect(()=> {
        if (state.playerHand.length === 0 && state.dealerHand.length === 0) {
            gameStart();
        };
    }, [state.playerHand, state.dealerHand, state.gameOver]);

    const cheat = () => {
        dispatch({
            type: FILL_SPECIAL_HAND,
        });
    }

    return (        
        <>
        <div className='card align-items-center justify-content-center' style={cardStyle}> 
            {/* <Button onClick={cheat}>Cheat</Button> */}
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
            <Container>
                <Row>
                    <Col>
                        <Hand cards={state.playerHand} owner={"Player's Hand"} handValue={state.playerHandValue}/>
                    </Col>
                    <Col>
                        <SpecialHand cards={state.playerSpecialHand} />
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
        </>
    );
}