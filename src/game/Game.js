export default class Game {
  constructor() {
    this.lockMode = false;
    this.firstCard = null;
    this.secondCard = null;

    this.techs = [
        'bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ];

    this.cards = null;
  }

  setCard(id) {
    let card = this.cards.filter(card => card.id === id)[0];
    if (card.flipped || this.lockMode) {
        return false;
    }

    if (!this.firstCard) {
        this.firstCard = card;
        this.firstCard.flipped = true;
        return true;
    } else {
        this.secondCard = card;
        this.secondCard.flipped = true;
        this.lockMode = true;
        return true;
    }
  }

  checkMatch() {
    if (!this.firstCard || !this.secondCard) {
        return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  }

  clearCards() {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  }

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  }

  checkGameOver() {
    return this.cards.filter(card => !card.flipped).length === 0;
  }

  createCardsFromTechs() {
    this.cards = [];

    this.techs.forEach((tech) => {
        this.cards.push(this.createPairFromTech(tech));
    });

    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    return this.cards;
  }

  createPairFromTech(tech) {
    return [{
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false,
    }, {
      id: this.createIdWithTech(tech),
      icon: tech,
      flipped: false,
    }];
  }

  createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 1000);
  }

  shuffleCards() {
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[randomIndex], this.cards[currentIndex]] 
        = [this.cards[currentIndex], this.cards[randomIndex]];
    }
  }

  flipCard(cardId, gameOverCallback, noMatchCallback) {
    if (this.setCard(cardId) && this.secondCard) {
      if (this.checkMatch()) {
        this.clearCards();
        this.checkGameOver();
        if (this.checkGameOver()) {
            gameOverCallback();
        }
      }
      else {
        setTimeout(() => {
            this.unflipCards();
            noMatchCallback();
        }, 1000);
      }
    }
  }
}
