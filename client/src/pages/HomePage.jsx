import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bjTable from '../assets/bjtable.jpg';

export default function HomePage() {
    const cardStyle = {
        width: '100%',
        height: '85vh',
        backgroundImage: `url(${bjTable})`,
        backgroundSize: "100% 100%",
    };
    return (        
    <>
        <div className="container">
            <h1 className="text-center mb-2 mt-2 text-primary">
                Welcome to JEB Jack
            </h1>

            <div className="card align-items-center justify-content-center" style={cardStyle}>
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