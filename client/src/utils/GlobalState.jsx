import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const GameContext = createContext();
const { Provider } = GameContext;

const GameProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
      deck: [],
      playerHand: [],
      playerHandSpecial: [],
      dealerHand: [],
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useGameContext = () => {
    return useContext(GameContext);
  };
  
  export { GameProvider, useGameContext };