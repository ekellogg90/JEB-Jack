import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'
import completeDeck from '../utils/completeDeck';

const GameContext = createContext();
const { Provider } = GameContext;

const GameProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
      gameDeck: [...completeDeck],
      playerHand: [],
      playerSpecialHand: [],
      playerCanHit: true,
      playerHandValue: 0,
      dealerHand: [],
      dealerHandValue: 0,
      dealerCanHit: true,
      gameOver: false,
      newGame: false,
      result: {type: '', message: ''},
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useGameContext = () => {
    return useContext(GameContext);
  };
  
  export { GameProvider, useGameContext };