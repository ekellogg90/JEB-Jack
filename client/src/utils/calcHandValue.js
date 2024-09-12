const calcHandValue = (hand) => {
    let value = 0;
    let aceCount = 0;
    hand.forEach((card) => {
        if (card.card === 'tarot') {
            value = parseInt(card.valueOfCard);
            return value;
        } else if (card.valueOfCard === "jack" || card.valueOfCard === "queen" || card.valueOfCard === "king") {
            value += 10;
        } else if (card.valueOfCard === "ace") {
            aceCount++;
            value += 11;
        } else {
            value += parseInt(card.valueOfCard);
        }
    });
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
};

export default calcHandValue;
