import completeDeck from '../utils/completeDeck';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Hand from '../components/Hand';

export default function Game() {
    const [gameDeck, setGameDeck] = useState(completeDeck);

    const [playerHand, setPlayerHand] = useState([]);
    const [playerSpecialHand, setPlayerSpecialHand] = useState([]);

    const [dealerHand, setDealerHand] = useState([]);

    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState({type: "", message: ""});
    const [newGame, setNewGame] = useState(false);

    //get random card and remove it from the deck and update the state
    const getRandomCard = () => {
        const randIndex = Math.floor(Math.random() * gameDeck.length);
        const card = gameDeck[randIndex]; 
        const updatedDeck = gameDeck.filter((_, index) => index !== randIndex);

        //deck update
        setGameDeck(updatedDeck);

        //rand card
        return card;
    };

    const dealCardToPlayer = () => {
        const alternateHandCards = ["+2", "reverse" , "skip", "black lotus", "charizard",
        "dark magician", "abomb", "goojf", "babe ruth"]; 

        const gameSavingCards = ["charizard", "dark magician", "abomb", "goojf", "babe ruth"];

        const card = getRandomCard();
        if (alternateHandCards.some(substring => card.value.includes(substring)) || card.card === "tarot") { // needs work still
            const newSpecialHand = [...playerSpecialHand, card];
            setPlayerSpecialHand(newSpecialHand);
        } else {
            const newJJHand = [...playerHand, card];
            setPlayerHand(newJJHand);
            const playerHandValue = calcHandValue(newJJHand);
            //console.log(newJJHand);
            //console.log(playerHandValue);
            if (playerHandValue > 21) {
                //lose
                if (gameSavingCards.some(substring => card.value.includes(substring))) {
                //player must play cards
                } else {
                    handleGameOver({type: "dealer", message: "Player busts, dealer wins"})
                }
            } else if (playerHandValue === 21) {
                handleGameOver({type: "player", message: "Player wins"})
            }
        }
    };

    const playerStand = () => {
        //maybe delay this so the user can use their special cards after the dealer gets their cards
        setGameOver(true);
        const card = getRandomCard(); 
        //will need logic for what cards the dealer can and cannot have
        const newDealerHand = [...dealerHand, card];
        setDealerHand(newDealerHand);
        const dealerHandValue = calcHandValue(newDealerHand);
        //console.log(newDealerHand);
        //console.log(dealerHandValue);
        if (dealerHandValue > 21) {
            handleGameOver({type: "player", message: "Dealer busts, player wins"})
        } else if (dealerHandValue === 21) {
            handleGameOver({type: "dealer", message: "Dealer wins"})
        }
    };

    const calcHandValue = (hand) => {
        let value = 0;
        let aceCount = 0;
        hand.forEach((card) => {
            if (card.value === "jack" || "queen" || "king") {
                value += 10;
            } else if (card.value === "ace") {
                aceCount++;
                value += 11;
            } else {
                value += parseInt(card.value)
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
        setPlayerSpecialHand([]);

        setDealerHand([]);

        setGameOver(false);
        setResult({type: "", message: ""});
        newGame(false);
        setGameDeck(completeDeck);
    };

    const playerHandValue = calcHandValue(playerHand);
    const dealerHandValue = calcHandValue(dealerHand);

    useEffect(()=> {
        if (playerHand.length === 0 && dealerHand === 0) {
            setPlayerHand([getRandomCard(), getRandomCard()]); // need to account for special cards

            setDealerHand([getRandomCard()]); // dealer really needs two cards but one needs to be flipped over
        };
        if (playerHandValue === 21) {
            handleGameOver({type: "player", message: "player wins"});
        } else if (dealerHandValue === 21) {
            handleGameOver({type: "dealer", message: "dealer wins"});
        };

        if (gameOver && dealerHand.length <= 5 ){ 
            switch(true) {
                case playerHandValue === 21:
                    setResult({type: "player", message: "player wins"});
                    break;
                case playerHandValue > 21:
                    setResult({type: "dealer", message: "Player busts, dealer wins"});
                    break;
                case dealerHandValue < playerHandValue:
                    playerStand();
                    break;
                case dealerHandValue === playerHandValue && dealerHand.length <= 5:
                    setResult({type: "", message: "draw"});
                    setNewGame(true);
                    break;
                case dealerHandValue > playerHandValue && dealerHandValue <= 21:
                    setResult({type: "dealer", message: "dealer wins"});
                    setNewGame(true);
                    break;
                default:
                    break;
            }
        };
    }, [playerHand, dealerHand, gameOver]);

    return (        
        <>
            <div>
            {gameOver && (<div><h2>{result.message}</h2></div>)}
            {!newGame ? (
                <>
                    <Button onClick={dealCardToPlayer}>Hit</Button>
                    <Button onClick={playerStand}>Stand</Button>
                </>
            ) : (
                <Button onClick={resetGame}>Reset</Button>
            )}
            </div>
                <Hand cards={playerHand} owner={"Dealer's Hand"} handValue={playerHandValue}/>
                <Hand cards={dealerHand} owner={"Player's Hand"} handValue={dealerHandValue}/>
                <div>Player's Special Hand</div>
            <div></div>
        </>
    );
}