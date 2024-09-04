//when ss is used it means "sprite sheet"
const ssWidth = 5020;
const ssHeight = 5096;
const rows = 7;
const columns = 10;
const cardWidth = Math.floor((ssWidth - (columns + 1)) / columns); // 1 is the 1px boarder on all the sprites
const cardHeight = Math.floor((ssHeight - (rows + 1)) / rows); // same thing with 1 here

const canvas = document.createElement('canvas'); // will probably remove and change into the card component later but not sure how exatly this will work
const context = canvas.getContext('2d'); // rendering for <canvas> element

const ss = new Image();
ss.src = '../assets/sprite_sheets/regularDeck.png';

const cards = [];

ss.onLoad = () => {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col< columns; col++) {
            if (row === rows - 1 && col >= columns - 4) continue; // skips the last 4 spaces because they are blank

            //cord calculation for each sprite
            const x = col * (cardWidth + 1) + 1; //1 for 1px boarder
            const y = row * (cardHeight + 1) + 1;

            //drawing
            canvas.width = cardWidth;
            canvas.height = cardHeight;
            context.drawImage(ss, x, y, cardWidth, cardHeight, 0, 0, cardWidth, cardHeight);

            //storing
            const cardDataUrl = canvas.toDataURL();
            cards.push(cardDataUrl);

        }
    }
    console.log(cards);
}