import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bjTable from '../assets/bjtable.jpg';

export default function HomePage() {
    const cardStyle = {
        width: '100%',
        height: '87vh',
        backgroundImage: `url(${bjTable})`,
        backgroundSize: "100% 100%",
    };
    return (        
    <>
        <div>
            <div className="card align-items-center justify-content-center" style={cardStyle}>
            <h1 className="text-center mb-5 text-white">
                Welcome to JEB Jack
            </h1>
                <Link to='/game'>
                    <Button type='button' variant='danger'>
                        PLAY GAME
                    </Button>
                </Link>
            </div>
        </div>
    </>
    );
}