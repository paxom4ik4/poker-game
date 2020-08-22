export default class Player {
    _maxCardsOnHands = 2;
    gameState = {
        cards: [],
        money: 1000,
        playerBet: 0
    }
    positionState = {
        hasDealerButton: false,
        isSmallBlind: false,
        isBigBlind: false,
        isLeave: false,
        isCurrentMove: false,
        isMadeMove: false,
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
    call(currentBet) {
        if (this.gameState.moeney >= currentBet) {
            this.gameState.money -= currentBet;
            this.gameStat.playerBet = currentBet;
            this.positionState.isMadeMove = true;
        } else {
            this.gameState.playerBet = this.gameState.money;
            this.gameState.money -= this.gameState.money;
            this.positionState.isMadeMove = true;
        }
        // Player can raise the previous bet if he want. So next player should call this raise of fold.
    }
    raise(playerBet) {
        if (playerBet < this.gameState.currentBet) {
            return "ERROR";
        }
        this.gameState.playerBet += playerBet;
        let players = game.players;

        // Всем кроме этого плеера сделать поле isMadeMove: false !!!
    }
    // Player can fold the cards. All money that he bets goes to bank. 
    fold() {
        this.cards = [];
        this.positionState.isLeave = true;
        console.log(this.name + ' folds cards');
    }
}
