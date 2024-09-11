import { useQuery } from '@apollo/client';
import { GET_LEADER_BOARD } from '../utils/queries';

import cat from '../assets/cat.png';
import koala from '../assets/koala.png';
import penguin from '../assets/penguin.png';

const avatarStyle = {
    width: '5em',
    height: '5em',
};

export default function LeaderBoardPage() {
    const { loading, data } = useQuery(GET_LEADER_BOARD);

    const sample = [
        {
            _id: 0,
            username: 'Eric',
            wins: 1,
            avatar: cat,
        },
        {
            _id: 1,
            username: 'Ben',
            wins: 2,
            avatar: koala,
        },
        {
            _id: 2,
            username: 'John',
            wins: 3,
            avatar: penguin,
        },
    ]

    const leaderBoard = data?.leaderBoard || sample;
    // const leaderBoard = sample;

    console.log("Leaderboard log:", leaderBoard)

    const leaderBoardSorted = [...leaderBoard].sort(function(a, b) {
        return (b.wins - a.wins)
    });

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Player</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderBoardSorted.map((player) => (
                            <tr key={player._id}>
                                <td>
                                    <img src={player.avatar} style={avatarStyle}/>
                                </td>
                                <td>{player.username}</td>
                                <td>{player.wins}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
        </>
    )
}