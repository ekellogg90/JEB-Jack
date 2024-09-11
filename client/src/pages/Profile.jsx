import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { Link } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '88vh',
}

const avatarStyle = {
    width: '5em',
    height: '5em',
};

const cardStyle = {
    width: '18rem',
    height: '18rem',

};

export default function Profile() {

    const { loading, data } = useQuery(GET_ME);

    if (loading) {
        return <h2>LOADING...</h2>;
    }
    
    const userData = data?.me || {};
    console.log("Profile log:", userData);

    return (        
        <>
            <div className="container-fluid pt-2 mb-5 bg-success" style={containerStyle}>
                <div className="row justify-content-center">
                    <div className="card me-4 align-items-center bg-warning bg-gradient" style={cardStyle}>
                        <img src={userData.avatar} alt="User Avatar" style={avatarStyle} className="card-img-top mt-2" />
                        <div className="card-body text-center d-flex flex-column">
                            <h5 className="card-title text-black fs-2">{userData.username}</h5>
                            <p className="card-text mt-3 text-black fs-5">{userData.wins
                                    ? `You have ${userData.wins} ${userData.wins === 1 ? 'win!' : 'wins!'}:`
                                    : 'You have no wins yet!'}</p>
                            <Link to="/game" className="btn btn-primary d-grid gap-2 mt-auto">Play Game</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
