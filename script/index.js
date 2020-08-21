// TODO: 

// Array of objects for cards
// Cards value: 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A.
// Cards suits: Heart - червы, Spades - пики, Diamonds - Бубны, Clubs - трефы (крести).
// 
// 1. Даем классу Game поле с названием gameState. Изначально равен 0.
// 2. Когда каждый игрок сделает свой ход => Делаем gameState++ 
// 3. Вызываем функцию (Которую создадим) которая в завимисости от gameState выкладывает на стол карты
// 4. Если gameState === 1 то 3 карты, если gameState === 2 || gameState === 3 то 1 карту
// 5. финал. Если gameState === 4 то функция поймет что все круги игры прошли и вызовет функцию (Которую создадим)
// Которая проверит кто победил.
//
// Определяем состояние игры по количеству карт на столе <- High priority 
//
// Подумать: над реализацией комбинации карт
//
// Определиться со значением карт (со страшнинством карт)
//
// Класс игрок и его методы
// 
// Метод или класс партии игры, где будет отслеживаться действия игрока 
//
// Определяем кто является малым блаиндом. Так как нас 2 человека ходит тот, у кого
// Малый блайнд. Если более двух человек, то ходит человек, сидящий после 
// большого блайнда. Просто в нашем случае как раз Малый и является 
// сидящим после большого
//  big blind
//  small blind
//
//  .Pre-flop:
//  0) Игроки получают кнопку диллера, малый и большой блайнд
//  1) Игроки получают карты
//  2) Ставятся начальные ставки в зависимости от блайндов 
//  3) Игрок, сидяшщий после большого блаинда делает ход 
//  4) После всех ходов, деньги идут в банк, а дилер открывает флоп
//  .Flop:
//  5) Дилер открывает 3 карты
//  6) Первый ход делает человек, который сидит после человека, который делал ход на пре-флопе 
//  7) После всех ходов, деньги идут в банк, а дилер открывает терн
//  .Tern:
//  8) Дилер открывает 1 карту 
//  9) Первый ход делает человек, который сидит после человека, который делал ход на флопе 
// 10) После всех ходов, деньги идут в банк, а дилер открывает ривер
//  .River:
// 11) Дилер открывает 1 карту
// 12) Первый ход делает человек, который сидит после человека, который делал ход на риверe 
// 13) После всех ходов, деньги идут в банк, а дилер открывает просит вскрыть карты
// 14) Игрок с самой сильной комбинацией - забирает всё.
// 15) Карты перемешиваются, раздаются блайнды и кнопка и игра начинается снова 

class Card {
    constructor(cardValue, cardSuit) {
        this.cardValue = cardValue;
        this.cardSuit = cardSuit;
    }
}

class Deck {
    cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    cardSuits = ["Hearts", "Spades", "Diamonds", "Clubs"];
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

class Player {
    _maxCardsOnHands = 2;
    gameState = {
        cards: [],
        money: 1000,
        currentBet: 0,
    }
    positionState = {
        hasDealerButton: false,
        isSmallBlind: false,
        isBigBlind: false,
        isLeave: false,
        isCurrentMove: false,
    }
    constructor(name) {
        this.name = name;
    }
    // Default Method. In the begin of the game, players get cards.
    takeCards(deck) {
        for (let i = 0; i < this._maxCardsOnHands; i++) {
            this.gameState.cards[i] = deck.giveCard();
        }
    }
    // Player can just check. No bet/No Raise
    check() {
        console.log(this.name + ' has checked');
    }
    call() {
        // Player can raise the previous bet if he want. So next player should call this raise of fold.
    }
    raise(playerBet) {
        if (playerBet < this.gameState.currentBet) {
            return "ERROR";
        }
        this.gameState.currentBet += playerBet;
    }
    // Player can fold the cards. All money that he bets goes to bank. 
    fold() {
        this.cards = [];
        console.log(this.name + ' folds cards');
    }
}

class Game {
    constructor(smallBlind, bigBlind) {
        this.smallBlind = smallBlind;
        this.bigBlind = bigBlind;
    }
    players = [new Player("Pavel"), new Player("Konstantin"), new Player("Jenya"), new Player("David")];
    cardsOnTable = [];
    bank = 0;
    currentPlayer = 0;
    currentPlayerMove = 0;
    // Method that starts the game
    startGame() {
        this.players.forEach(player => console.log(player.name + ' has joined the game'))

        this.deck = new Deck();
        console.log("Deck has created");
        this.deck.shuffleCards();
        console.log("Deck has shuffle");

        this.players.map(player => {
            player.takeCards(this.deck);
            console.log(`${player.name} got cards`);
        })

        this.setBlinds();
        this.updateBlinds();
    }
    // Method that open the cards on the table (3: 1 time or 1: 2 times);
    openCard() {
        switch (this.cardsOnTable.length) {
            case 0: {
                for (let i = 0; i < 3; i++) {
                    this.cardsOnTable.push(this.deck.giveCard())
                }
                break;
            }
            case 5: {
                return;
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
                isLeave: false,
                isCurrentMove: false,
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
// In game contructor we sets values of blinds
const game = new Game(10, 20);
game.startGame();
