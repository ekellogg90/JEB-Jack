// 52 standard
const cards = ["spade", "heart", "diamond", "club"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];

const standardCards = cards.flatMap((card) => values.map((value) => ({card, value})));

//uno
/* const unoCards = [{card: "uno", value: "green 1"}, {card: "uno", value: "yellow 2"},
{card: "uno", value: "blue 3"}, {card: "uno", value: "green 4"}, {card: "uno", value: "blue 5"},
{card: "uno", value: "green 6"}, {card: "uno", value: "red 7"}, {card: "uno", value: "blue 8"},
{card: "uno", value: "yellow 9"}, {card: "uno", value: "green +2"}, {card: "uno", value: "red +2"},
{card: "uno", value: "green reverse"}, {card: "uno", value: "red reverse"},
{card: "uno", value: "green skip"}, {card: "uno", value: "yellow skip"},]
WITH COLORS^
*/

const unoCards = [{card: "uno", value: "1"}, {card: "uno", value: "2"},
{card: "uno", value: "3"}, {card: "uno", value: "4"}, {card: "uno", value: "5"},
{card: "uno", value: "6"}, {card: "uno", value: "7"}, {card: "uno", value: "8"},
{card: "uno", value: "9"}, {card: "uno", value: "green +2"}, {card: "uno", value: "red +2"},
{card: "uno", value: "green reverse"}, {card: "uno", value: "red reverse"},
{card: "uno", value: "green skip"}, {card: "uno", value: "yellow skip"},]

//tarrot
const tarrot = "tarrot";
const tValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
"11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]

const tarrotCards = tarrot.flatMap((card) => tValues.map((value) => ({card, value})));

//majong
const mahjong = "mahjong";
const mValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

const mahjongTiles = mahjong.flatMap((card) => mValues.map((value) => ({card, value})));

//uniques
const uniqueCards = [{card: "mtg", value: "black lotus"}, {card: "pokemon", value: "charizard"},
{card: "ygo", value: "dark magician"}, {card: "colin", value: "abomb"},
{card: "monopoly", value: "goojf"}, {card: "baseball", value: "babe ruth"}];

//complete deck   NOTE: did not add 2 standard decks, may need to change later
const completeDeck = [...standardCards, ...unoCards, ...tarrotCards, ...mahjongTiles, ...uniqueCards];

//maybe make dealer deck that exludes some complicated cards to make the dealer use

export default completeDeck;