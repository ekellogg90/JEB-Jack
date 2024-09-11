export default function cardIMGInfo(cards) {
    const cardIMGarr = [];
    for (let card of cards) {
        switch (card.card) {
            case "club":
                switch (card.valueOfCard) {
                    case "10":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "0"});
                        break;
                    case "2":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "4"});
                        break;
                    case "3":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "8"});
                        break;
                    case "4":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "14"});
                        break;
                    case "5":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "18"});
                        break;
                    case "6":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "23"});
                        break;
                    case "7":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "27"});
                        break;
                    case "8":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "32"});
                        break;
                    case "9":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "36"});
                        break;
                    case "ace":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "41"});
                        break;
                    case "jack":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "48"});
                        break;
                    case "king":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "57"});
                        break;
                    case "queen":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "59"});
                        break;
                    default:
                        break;
                }
                break;
            case "diamond":
                switch (card.valueOfCard) {
                    case "10":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "1"});
                        break;
                    case "2":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "5"});
                        break;
                    case "3":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "10"});
                        break;
                    case "4":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "15"});
                        break;
                    case "5":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "19"});
                        break;
                    case "6":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "24"});
                        break;
                    case "7":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "28"});
                        break;
                    case "8":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "33"});
                        break;
                    case "9":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "37"});
                        break;
                    case "ace":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "42"});
                        break;
                    case "jack":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "50"});
                        break;
                    case "king":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "58"});
                        break;
                    case "queen":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "62"});
                        break;
                    default:
                        break;
                }
                break;
            case "heart":
                switch (card.valueOfCard) {
                    case "10":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "2"});
                        break;
                    case "2":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "6"});
                        break;
                    case "3":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "11"});
                        break;
                    case "4":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "16"});
                        break;
                    case "5":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "21"});
                        break;
                    case "6":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "25"});
                        break;
                    case "7":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "29"});
                        break;
                    case "8":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "34"});
                        break;
                    case "9":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "38"});
                        break;
                    case "ace":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "43"});
                        break;
                    case "jack":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "53"});
                        break;
                    case "king":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "19"});
                        break;
                    case "queen":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "64"});
                        break;
                    default:
                        break;
                }
                break;
            case "spade":
                switch (card.valueOfCard) {
                    case "10":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "3"});
                        break;
                    case "2":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "7"});
                        break;
                    case "3":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "12"});
                        break;
                    case "4":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "17"});
                        break;
                    case "5":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "22"});
                        break;
                    case "6":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "26"});
                        break;
                    case "7":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "31"});
                        break;
                    case "8":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "35"});
                        break;
                    case "9":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "39"});
                        break;
                    case "ace":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "45"});
                        break;
                    case "jack":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "55"});
                        break;
                    case "king":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "39"});
                        break;
                    case "queen":
                        cardIMGarr.push({deckName: "regularDeck", cardIndex: "66"});
                        break;
                    default:
                        break;
                    }
                    break;
                case "uno":
                    switch (card.valueOfCard) {
                        case "1":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "10"});
                            break;
                        case "2":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "40"});
                            break;
                        case "3":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "2"});
                            break;
                        case "4":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "9"});
                            break;
                        case "5":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "4"});
                            break;
                        case "6":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "12"});
                            break;
                        case "7":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "17"});
                            break;
                        case "8":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "3"});
                            break;
                        case "9":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "31"});
                            break;
                        case "green +2":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "8"});
                            break;
                        case "red +2":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "14"});
                            break;
                        case "green reverse":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "11"});
                            break;
                        case "red reverse":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "16"});
                            break;
                        case "green skip":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "13"});
                            break;
                        case "yellow skip":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "39"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "tarot":
                    switch (card.valueOfCard) {
                        case "0":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "23"});
                            break;
                        case "1":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "28"});
                            break;
                        case "2":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "15"});
                            break;
                        case "3":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "35"});
                            break;
                        case "4":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "24"});
                            break;
                        case "5":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "22"});
                            break;
                        case "6":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "32"});
                            break;
                        case "7":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "29"});
                            break;
                        case "8":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "18"});
                            break;
                        case "9":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "26"});
                            break;
                        case "10":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "34"});
                            break;
                        case "11":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "20"});
                            break;
                        case "12":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "37"});
                            break;
                        case "13":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "36"});
                            break;
                        case "14":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "25"});
                            break;
                        case "15":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "21"});
                            break;
                        case "16":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "33"});
                            break;
                        case "17":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "30"});
                            break;
                        case "18":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "19"});
                            break;
                        case "19":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "27"});
                            break;
                        case "20":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "38"});
                            break;
                        case "21":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "7"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "mtg":
                    switch (card.valueOfCard) {
                        case "black lotus":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "1"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "pokemon":
                    switch (card.valueOfCard) {
                        case "charizard":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "5"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "ygo":
                    switch (card.valueOfCard) {
                        case "dark magician":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "6"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "colin":
                    switch (card.valueOfCard) {
                        case "abomb":
                            cardIMGarr.push({deckName: "specialDeck1", cardIndex: "0"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "monopoly":
                    switch (card.valueOfCard) {
                        case "goojf":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "9"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "baseball":
                    switch (card.valueOfCard) {
                        case "babe ruth":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "10"});
                            break;
                        default:
                            break;
                    }
                    break;
                case "mahjong":
                    switch (card.valueOfCard) {
                        case "1":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "0"});
                            break;
                        case "2":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "1"});
                            break;
                        case "3":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "2"});
                            break;
                        case "4":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "3"});
                            break;
                        case "5":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "4"});
                            break;
                        case "6":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "5"});
                            break;
                        case "7":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "6"});
                            break;
                        case "8":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "7"});
                            break;
                        case "9":
                            cardIMGarr.push({deckName: "specialDeck2", cardIndex: "8"});
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
        }   
    }
    return cardIMGarr;
}