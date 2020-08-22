import Player from './Player'
import Deck from './Deck'
export default class Game {
    constructor(smallBlind, bigBlind) {
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
    }
    players = [new Player("Pavel"), new Player("Konstantin"), new Player("Jenya"), new Player("David")];
    cardsOnTable = [];
    bank = 0;
    currentPlayer = 0;
    currentPlayerMove = 0;
    currentBet = this.bigBlind;
    // Method that starts the game
    startGame() {
        this.startPart();
    }
    // Method that open the cards on the table (3: 1 time or 1: 2 times);
    startPart() {
        this.players.forEach(player => console.log(player.name + ' has joined the game'));

        // Начало партии
        const currentPartPlayers = [...this.players];

        this.deck = new Deck();
        console.log("Deck has created");
        this.deck.shuffleCards();
        console.log("Deck has shuffle");

        this.players.map(player => {
            player.takeCards(this.deck);
            console.log(`${player.name} got cards`);
        })

        this.setBlinds();

        // while (currentPartPlayers.length != 1 ||
        //     this.cardsOnTable === 5 &&
        //     currentPartPlayers.every(item => item.positionState.isMadeMove)) {
        //     // currentPartPlayers.filter(player => player.positionState.isCurrentMove)[0].call();

        //     console.log(currentPartPlayers === currentPartPlayers.filter(player => (player.gameState.playerBet === this.currentBet)))

        // }
        // currentPartPlayers.map(player => {
        //     player.gameState.playerBet = 10;
        // })
        // console.log(currentPartPlayers === currentPartPlayers.filter(player => (player.gameState.playerBet === this.currentBet)))

        // if(lenght) {...}

        // конец партии
        this.updateBlinds();
    }
    openCard() {
        switch (this.cardsOnTable.length) {
            case 0: {
                for (let i = 0; i < 3; i++) {
                    this.cardsOnTable.push(this.deck.giveCard())
                }
                break;
            }
            case 5: {
                break;
                // End part method
            }
            default: {
                this.cardsOnTable.push(this.deck.giveCard())
                break;
            }
        }
    }
    // Method that sets blinds
    setBlinds() {
        switch (this.currentPlayer) {
            case (this.players.length - 1): {
                this.players[this.players.length - 1].gameState.currentBet = this.smallBlind;
                this.players[this.players.length - 1].positionState.isSmallBlind = true;
                this.players[0].gameState.currentBet = this.bigBlind;
                this.players[0].positionState.isBigBlind = true;
                this.players[this.currentPlayer - 1].positionState.isCurrentMove = true;
                break;
            }
            case (this.players.length - 2): {
                this.players[this.currentPlayer].gameState.currentBet = this.smallBlind;
                this.players[this.currentPlayer].positionState.isSmallBlind = true;
                this.players[this.currentPlayer + 1].gameState.currentBet = this.bigBlind;
                this.players[this.currentPlayer + 1].positionState.isBigBlind = true;
                this.players[0].positionState.isCurrentMove = true;
                break;
            }
            default: {
                this.players[this.currentPlayer].gameState.currentBet = this.smallBlind;
                this.players[this.currentPlayer].positionState.isSmallBlind = true;
                this.players[this.currentPlayer + 1].gameState.currentBet = this.bigBlind;
                this.players[this.currentPlayer + 1].positionState.isBigBlind = true;
                this.players[this.currentPlayer + 2].positionState.isCurrentMove = true;
                break;
            }
        }
        // Players info for debugging
        this.players.forEach(player => {
            console.group(player.name + ' info:')
            console.log('current bet: ' + player.gameState.currentBet)
            console.log('is small blind: ' + player.positionState.isSmallBlind)
            console.log('is big blind: ' + player.positionState.isBigBlind)
            console.log('current money: ' + player.gameState.money)
            console.log('current move: ' + player.positionState.isCurrentMove)
            console.log('cards: ' + player.cards)
            console.groupEnd();
        });
    }
    // This method sets all (beside money) player's stats to default value 
    defaultBlind() {
        this.players.forEach(player => {
            player.gameState = {
                cards: [],
                money: player.gameState.money,
                currentBet: 0,
            }
            player.positionState = {
                hasDealerButton: false,
                isSmallBlind: false,
                isBigBlind: false,
                isLeave: player.positionState.isLeave,
                isCurrentMove: player.positionState.isCurrentMove,
            }
        })
    }
    // This method sets blinds to the next players
    updateBlinds() {
        this.defaultBlind();
        if (this.currentPlayer === this.players.length - 1) {
            this.currentPlayer = 0;
            this.setBlinds();
        }
        else {
            this.currentPlayer++;
            this.setBlinds();
        }
    }
}