import { regularDeckPromise, specialDeck1Promise, specialDeck2Promise } from './spriteSheets';

export async function resolveDecks() {
    try {
        const regularDeck = await regularDeckPromise;
        const specialDeck1 = await specialDeck1Promise;
        const specialDeck2 = await specialDeck2Promise;

        //console.log('Regular Deck:', regularDeck);
        //console.log('Special Deck 1:', specialDeck1);
        //console.log('Special Deck 2:', specialDeck2);

        return { regularDeck, specialDeck1, specialDeck2}
    } catch (err) {
        console.error('Error loading decks:', err);
    }
};