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

export const GET_ME = gql`
    query me { 
        me {
           _id
           username
           wins
           avatar
        }
    }
`;
