import { gql } from '@apollo/client';

export const GET_LEADER_BOARD = gql`
    query leaderBoard {
        leaderBoard {
            _id
            username
            wins
        }
    }
`;
