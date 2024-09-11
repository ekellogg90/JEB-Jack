import completeDeck from '../utils/completeDeck';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Hand from '../components/Hand';

export default function Game() {
    const [gameDeck, setGameDeck] = useState(completeDeck);

    const [playerHand, setPlayerHand] = useState([]);
    const [playerSpecialHand, setPlayerSpecialHand] = useState([]);
    const [playerCanHit, setPlayerCanHit] = useState(true);
    const [playerHandValue, setPlayerHandValue] = useState(0);

    const [dealerHand, setDealerHand] = useState([]);
    const [dealerHandValue, setDealerHandValue] = useState(0);
    const [dealerCanHit, setDealerCanHit] = useState(true);

    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState({type: "", message: ""});
    const [newGame, setNewGame] = useState(false);

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
        let dealerCard = getRandomCard(true);

        if (dealerCard.card === 'tarot') {
            setDealerCanHit(false);
        }

        // Checks for special cards to send to the player's special hand
        playerCards.map((card) => {
            if (card.card === 'tarot') {
                setPlayerCanHit(false);
            }
        });

        // Get each hand's score
        const newPlayerValue = calcHandValue(playerCards);
        const newDealerValue = calcHandValue([dealerCard]);
        
        // Set all state variables
        setPlayerHand(playerCards);
        setDealerHand([dealerCard]);
        setPlayerHandValue(newPlayerValue);
        setDealerHandValue(newDealerValue);
    };

    const dealCardToPlayer = () => {
        // const gameSavingCards = ["charizard", "dark magician", "abomb", "goojf", "babe ruth"];

        const card = getRandomCard(false);
        console.log(card);

        // Checks for special cards and sends them to the special hand
        if (alternateHandCards.some(substring => card.valueOfCard.includes(substring))) {
            const newSpecialHand = [...playerSpecialHand, card];
            setPlayerSpecialHand(newSpecialHand);
        } else {
            const newJJHand = [...playerHand, card];
            setPlayerHand(newJJHand);
            const newHandValue = calcHandValue(newJJHand)
            setPlayerHandValue(newHandValue);
            if (newHandValue >= 21 || card.card === 'tarot') {
                setPlayerCanHit(false);
            }
        }
    };

    // If the dealer can hit they get a card, otherwise the game ends
    const playerStand = () => {
        if (dealerCanHit) {
            let card = getRandomCard(true);
            const newDealerHand = [...dealerHand, card];
            const newHandValue = calcHandValue(newDealerHand);
            setDealerHand(newDealerHand);
            setDealerHandValue(newHandValue);
            console.log(newDealerHand);
            console.log(dealerHandValue);
            if (newHandValue >= 17 || card.card === 'tarot') {
                setDealerCanHit(false);
            }
        } else {
            //maybe delay this so the user can use their special cards after the dealer gets their cards
            setGameOver(true);
            
            if (dealerHandValue > 21) {
                handleGameOver({type: "player", message: "Dealer busts, player wins"});
            } else if (dealerHandValue > playerHandValue) {
                handleGameOver({type: "dealer", message: "Dealer wins"});
            } else {
                handleGameOver({type: "player", message: "player wins"});
            }
        }
    };

    const calcHandValue = (hand) => {
        let value = 0;
        let aceCount = 0;
        hand.forEach((card) => {
            if (card.card === 'tarot') {
                value = card.valueOfCard;
                return value;
            } else if (card.valueOfCard === "jack" || card.valueOfCard === "queen" || card.valueOfCard === "king") {
                value += 10;
            } else if (card.valueOfCard === "ace") {
                aceCount++;
                value += 11;
            } else {
                value += parseInt(card.valueOfCard)
            }
        });
        while (value > 21 && aceCount > 0) {
            value -= 10;
            aceCount--;
        }
        return value;
    };

    const handleGameOver = (result) => {
        setGameOver(true);
        setResult(result);
        setNewGame(true);
    };

    const resetGame = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setPlayerCanHit(true);
        setDealerCanHit(true);
        setPlayerHandValue(0);
        setDealerHandValue(0);
        setGameOver(false);
        setResult({type: "", message: ""});
        setNewGame(false);
        setGameDeck(completeDeck);
    };

    useEffect(()=> {
        if (playerHand.length === 0 && dealerHand.length === 0) {
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
    }, [playerHand, dealerHand, gameOver]);

    return (        
        <>
            <div>
            {gameOver && (<div><h2>{result.message}</h2></div>)}
            {!newGame ? (
                <>
                    <Button onClick={dealCardToPlayer} variant='success'disabled={!playerCanHit}>Hit</Button>
                    <Button onClick={playerStand} variant='danger'>Stand</Button>
                </>
            ) : (
                <Button onClick={resetGame}>Reset</Button>
            )}
            </div>   
            <div>
                <Hand cards={dealerHand} owner={"Dealer's Hand"} handValue={dealerHandValue}/>
                <Hand cards={playerHand} owner={"Player's Hand"} handValue={playerHandValue}/>
                <Hand cards={playerSpecialHand} owner={"Player's Special Hand"} handValue={playerSpecialHand.length}/>
            </div>
        </>
    );
}