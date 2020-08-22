import Card from './Card'
export default class Deck {
    cardSuits = ["Hearts", "Spades", "Diamonds", "Clubs"];
    cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    cards = [];

    constructor() {
        this.generateDeck();
    }
    // Method which takes cardValues and cardSuits and generate a Deck for Game.
    generateDeck() {
        for (let suit of this.cardSuits) {
            for (let value of this.cardValues) {
                this.cards.push(new Card(value, suit));
            }
        }
    }
    // Shuffle cards 
    shuffleCards() {
        this.cards.sort(() => Math.random() - 0.5);
    }
    // Method that give cards from Deck.
    giveCard() {
        return this.cards.pop();
    }
}