// 52 standard
const cards = ["spade", "heart", "diamond", "club"];
const valueOfCards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const standardCards = cards.flatMap((card) => valueOfCards.map((valueOfCard) => ({card, valueOfCard})));

//uno
/* const unoCards = [{card: "uno", valueOfCard: "green 1"}, {card: "uno", valueOfCard: "yellow 2"},
{card: "uno", valueOfCard: "blue 3"}, {card: "uno", valueOfCard: "green 4"}, {card: "uno", valueOfCard: "blue 5"},
{card: "uno", valueOfCard: "green 6"}, {card: "uno", valueOfCard: "red 7"}, {card: "uno", valueOfCard: "blue 8"},
{card: "uno", valueOfCard: "yellow 9"}, {card: "uno", valueOfCard: "green +2"}, {card: "uno", valueOfCard: "red +2"},
{card: "uno", valueOfCard: "green reverse"}, {card: "uno", valueOfCard: "red reverse"},
{card: "uno", valueOfCard: "green skip"}, {card: "uno", valueOfCard: "yellow skip"},]
WITH COLORS^
*/

const unoCards = [{card: "uno", valueOfCard: "1"}, {card: "uno", valueOfCard: "2"},
{card: "uno", valueOfCard: "3"}, {card: "uno", valueOfCard: "4"}, {card: "uno", valueOfCard: "5"},
{card: "uno", valueOfCard: "6"}, {card: "uno", valueOfCard: "7"}, {card: "uno", valueOfCard: "8"},
{card: "uno", valueOfCard: "9"}, {card: "uno", valueOfCard: "green +2", tooltip: "dealer must draw two"}, {card: "uno", valueOfCard: "red +2", tooltip: "dealer must draw two"},
{card: "uno", valueOfCard: "green reverse", tooltip: "switch hands with the dealer"}, {card: "uno", valueOfCard: "red reverse", tooltip: "switch hands with the dealer"},
{card: "uno", valueOfCard: "green skip", tooltip: "dealer can no longer draw cards"}, {card: "uno", valueOfCard: "yellow skip", tooltip: "dealer can no longer draw cards"},]

//tarot
const tarot = ["tarot"];
const tValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
"11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]

const tarotCards = tarot.flatMap((card) => tValues.map((valueOfCard) => ({card, valueOfCard})));

//mahjong
const mahjong = ["mahjong"];
const mValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

const mahjongTiles = mahjong.flatMap((card) => mValues.map((valueOfCard) => ({card, valueOfCard})));

//uniques
const uniqueCards = [{card: "mtg", valueOfCard: "black lotus", tooltip: "adds 1-3 to your score to benefit you most"}, {card: "pokemon", valueOfCard: "charizard", tooltip: "burns away dealers cards"},
{card: "ygo", valueOfCard: "dark magician", tooltip: "swap a card from your hand and the dealers"}, {card: "colin", valueOfCard: "abomb", tooltip: "resets game"},
{card: "monopoly", valueOfCard: "goojf", tooltip: "removes last card you drew"}, {card: "baseball", valueOfCard: "babe ruth", tooltip: "get rid of one of yours or the dealers cards"}];

//complete deck   NOTE: did not add 2 standard decks, may need to change later
const completeDeck = [...standardCards, ...unoCards, ...tarotCards, ...mahjongTiles, ...uniqueCards];

//maybe make dealer deck that exludes some complicated cards to make the dealer use

export default completeDeck;