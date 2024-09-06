import { useQuery } from '@apollo/client';
import { GET_LEADER_BOARD } from '../utils/queries';

export default function LeaderBoardPage() {
    const { loading, data } = useQuery(GET_LEADER_BOARD);

    const sample = [
        {
            _id: 0,
            username: 'Eric',
            wins: 1
        },
        {
            _id: 1,
            username: 'Ben',
            wins: 2
        },
        {
            _id: 2,
            username: 'John',
            wins: 3
        },
    ]

    const leaderBoard = data?.leaderBoard || sample;

    console.log(leaderBoard)

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
                            <th scope="col">Player</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderBoardSorted.map((player) => (
                            <tr key={player._id}>
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