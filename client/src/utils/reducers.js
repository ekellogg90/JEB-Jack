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
} from "./actions";
import completeDeck from '../utils/completeDeck';

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_DECK:
            return {
                ...state,
                gameDeck: [...action.deck]
            }
        case ADD_PLAYER_CARD:
            return {
                ...state,
                playerHand: [...state.playerHand, action.card],
            };
        case REMOVE_PLAYER_CARD:
            return {
                ...state,
                playerHand: state.playerHand.filter((card) => 
                    (card.card !== action.card.card && card.valueOfCard !== action.card.valueOfCard))
            };
        case CLEAR_PLAYER_HAND:
            return {
                ...state,
                playerHand: [],
                playerHandValue: 0,
            };
        case ADD_DEALER_CARD:
            return {
                ...state,
                dealerHand: [...state.dealerHand, action.card],
            };
        case REMOVE_DEALER_CARD:
            return {
                ...state,
                dealerHand: state.dealerHand.filter((card) => 
                    (card.card !== action.card.card && card.valueOfCard !== action.card.valueOfCard))
            };
        case CLEAR_DEALER_HAND:
            return {
                ...state,
                dealerHand: [],
                dealerHandValue: 0,
            };
        case ADD_SPECIAL_CARD:
            return {
                ...state,
                playerSpecialHand: [...state.playerSpecialHand, action.card],
            };
        case REMOVE_SPECIAL_CARD:
            return {
                ...state,
                playerSpecialHand: state.playerSpecialHand.filter((card) => 
                    (card.valueOfCard !== action.card)),
            };
        case TOGGLE_PLAYER_CAN_HIT:
            return {
                ...state,
                playerCanHit: !state.playerCanHit
            };
        case TOGGLE_DEALER_CAN_HIT:
            return {
                ...state,
                dealerCanHit: !state.dealerCanHit
            };
        case UPDATE_PLAYER_SCORE:
            return {
                ...state,
                playerHandValue: action.score
            };
        case UPDATE_DEALER_SCORE:
            return {
                ...state,
                dealerHandValue: action.score
            };
        case TOGGLE_GAME_OVER:
            return {
                ...state,
                gameOver: !state.gameOver
            };
        case TOGGLE_NEW_GAME:
            return {
                ...state,
                newGame: !state.newGame
            };
        case SET_RESULT:
            return {
                ...state,
                result: action.result
            };
        case GAME_OVER:
            return {
                ...state,
                gameOver: true,
                result: action.result,
                newGame: true,
            };
        case RESET_GAME:
            return {
                ...state,
                gameDeck: [...completeDeck],
                playerHand: [],
                dealerHand: [],
                playerCanHit: true,
                dealerCanHit: true,
                playerHandValue: 0,
                dealerHandValue: 0,
                gameOver: false,
                result: {type: '', message: ''},
                newGame: false,
            }
        case START_GAME:
            return {
                ...state,
                playerHand: [...action.playerHand],
                dealerHand: [action.dealerCard],
                playerHandValue: action.playerHandValue,
                dealerHandValue: action.dealerHandValue,
            }
        case SWAP_HANDS:
            return {
                ...state,
                playerHand: [...state.dealerHand],
                dealerHand: [...state.playerHand],
                playerHandValue: state.dealerHandValue,
                dealerHandValue: state.playerHandValue,
            }
        case DEALER_DRAW_TWO:
            return {
                ...state,
                dealerHand: [...state.dealerHand, action.card1, action.card2],
            };
        default:
            return state;
    }
};