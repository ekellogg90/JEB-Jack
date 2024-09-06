//when ss is used it means "sprite sheet"
async function spriteSheetCardCutter(ssWidth, ssHeight, ssRows, ssCols, filePath, skipNum) {
    const cardWidth = Math.floor((ssWidth - (ssCols + 1)) / ssCols); // 1 is the 1px boarder on all the sprites
    const cardHeight = Math.floor((ssHeight - (ssRows + 1)) / ssRows); // same thing with 1 here

    const canvas = document.createElement('canvas'); // will probably remove and change into the card component later but not sure how exatly this will work
    const context = canvas.getContext('2d'); // rendering for <canvas> element

    const ss = new Image();
    ss.src = filePath;

    return new Promise((resolve) => {
        const cards = [];

        ss.onload = () => {
            for (let row = 0; row < ssRows; row++) {
                for (let col = 0; col< ssCols; col++) {
                    if (row === ssRows - 1 && col >= ssCols - skipNum) continue; // skips the last skipNum spaces because they are blank

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
            resolve(cards);
        };
    });
}

export const regularDeckPromise = spriteSheetCardCutter(5020, 5096, 7, 10, '../assets/sprite_sheets/regularDeck.png', 4);
export const specialDeck1Promise = spriteSheetCardCutter(4016, 4368, 6, 8, '../assets/sprite_sheets/specialDeck1.png', 7);
export const specialDeck2Promise = spriteSheetCardCutter(2008, 2184, 3, 4, '../assets/sprite_sheets/specialDeck2.png', 1);

export default { regularDeckPromise, specialDeck1Promise, specialDeck2Promise };