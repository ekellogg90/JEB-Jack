import { DRAW_CARD, CLEAR_HAND } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case DRAW_CARD:
            return {
                ...state,
                hand: [...state.hand, action.card],
            };
        case CLEAR_HAND:
            return {
                ...state,
                hand: [],
            };
        default:
            return state;
    }
};