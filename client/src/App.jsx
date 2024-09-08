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

  //get random card and remove it from the deck and update the state
  const getRandomCard = () => {
    const randIndex = Math.floor(Math.random() * gameDeck.length);
    const card = gameDeck[randIndex]; 
    const updatedDeck = gameDeck.filter((_, index) => index !== randIndex);

    //deck update
    setGameDeck(updatedDeck);

    //rand card
    return card;
  }

  const dealCardToPlayer = () => {
    const alternateHandCards = ["+2", "reverse" , "skip", "black lotus", "charizard",
    "dark magician", "abomb", "goojf", "babe ruth"]
    const card = getRandomCard();
    if (alternateHandCards.some(substring => card.value.includes(substring))) {
      const newSpecialHand = [...playerSpecialHand, card];
      setPlayerSpecialHand(newSpecialHand);
    } else {
      const newJJHand = [...playerHand, card];
      setPlayerHand(newJJHand);
    }
  }

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
