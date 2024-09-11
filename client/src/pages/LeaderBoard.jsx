import { useQuery } from '@apollo/client';
import { GET_LEADER_BOARD } from '../utils/queries';

const avatarStyle = {
    width: '5em',
    height: '5em',
};

export default function LeaderBoardPage() {
    const { loading, data } = useQuery(GET_LEADER_BOARD);

    const leaderBoard = data?.leaderBoard || [];

    console.log("Leaderboard log:", leaderBoard)

    const leaderBoardSorted = [...leaderBoard].sort(function(a, b) {
        return (b.wins - a.wins)
    });

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="table table-success table-striped">
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
                                <td className='align-middle'>
                                    <img src={player.avatar} style={avatarStyle}/>
                                </td>
                                <td className='align-middle fs-5'>{player.username}</td>
                                <td className='align-middle fs-5'>{player.wins}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}