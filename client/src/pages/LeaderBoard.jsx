export default function LeaderBoardPage() {
    const leaderBoard = [
        {
            id: 0,
            username: 'Eric',
            wins: 1
        },
        {
            id: 1,
            username: 'Ben',
            wins: 2
        },
        {
            id: 2,
            username: 'John',
            wins: 3
        },
    ]

    const leaderBoardSorted = leaderBoard.sort(function(a, b) {
        return (b.wins - a.wins)
    });

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Player</th>
                        <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderBoardSorted.map((player) => (
                        <tr>
                            <td>{player.username}</td>
                            <td>{player.wins}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}