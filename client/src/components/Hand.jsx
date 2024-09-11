import Card from "./Card";
import cardIMGInfo from '../utils/cardIMGInfo';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function regularHand({cards,owner,handValue}) {
    const cardIMGarr = cardIMGInfo(cards);
    return (
    <div>
        <h2>{owner}: {handValue}</h2>
        <Container>
            <Row>
                {cardIMGarr.map((card, index) => (
                <Col>
                <Card 
                    key={index}
                    deckName={card.deckName}
                    cardIndex={card.cardIndex}
                />
                </Col>
            ))}  
            </Row>
        </Container>
            {cards.map((card, index) => (
                <div key={index}>
                    {card.card}:{card.valueOfCard}
                </div>
            ))}
        </div>
    );
}