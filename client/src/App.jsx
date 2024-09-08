import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GameProvider } from './utils/GlobalState';

import completeDeck from './utils/completeDeck';
import { useState } from 'react';


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [gameDeck, setGameDeck] = useState(completeDeck);

  const [playerHand, setPlayerHand] = useState([]);
  const [playerSpecialHand, setPlayerSpecialHand] = useState([]);

  const [dealerHand, setDealerHand] = useState([]);

  const [gameOver, setGameOver] = useState(false);

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
    "dark magician", "abomb", "goojf", "babe ruth"]; //maybe need to add tarrot
    const card = getRandomCard();
    if (alternateHandCards.some(substring => card.value.includes(substring))) { //potentially || card.card === "tarrot"
      const newSpecialHand = [...playerSpecialHand, card];
      setPlayerSpecialHand(newSpecialHand);
    } else {
      const newJJHand = [...playerHand, card];
      setPlayerHand(newJJHand);
      const playerHandValue = calcHandValue(newJJHand);
      if (playerHandValue > 21) {
        //lose
      } else if (playerHandValue === 21) {
        //win or tie
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
    if (dealerHandValue > 21) {
      //lose
    } else if (dealerHandValue === 21) {
      //win or tie
    }
  };

  const calcHandValue = (hand) => {
    let value = 0;
    let aceCount = 0;
    hand.forEach((card) => {
      if (card.value === "jack" || "queen" || "king") {
        value += 10;
      } else if (card.value === "ace"){
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

  return (
    <ApolloProvider client={client}>
      <GameProvider>
        <Navbar />
        <Outlet />
      </GameProvider>
    </ApolloProvider>
  )
}

export default App;
