// model.js
class NumberGuessingModel {
    constructor(maxAttempts = 5) {
        this.maxAttempts = maxAttempts;
        this.reset();
    }

    reset() {
        this.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.attemptsLeft = this.maxAttempts;
        this.guessedCorrectly = false;
    }

    makeGuess(guess) {
        if (this.guessedCorrectly || this.attemptsLeft <= 0) return;

        if (guess === this.targetNumber) {
            this.guessedCorrectly = true;
            return 'correct';
        } else {
            this.attemptsLeft--;
            if (this.attemptsLeft === 0) {
                return 'lost';
            }
            return guess < this.targetNumber ? 'low' : 'high';
        }
    }

    getAttemptsLeft() {
        return this.attemptsLeft;
    }

    isGameOver() {
        return this.guessedCorrectly || this.attemptsLeft <= 0;
    }

    isGameWon() {
        return this.guessedCorrectly;
    }
}

// view.js
class NumberGuessingView {
    constructor() {
        this.attemptsCount = document.getElementById('attemptsCount');
        this.guessInput = document.getElementById('guessInput');
        this.guessButton = document.getElementById('guessButton');
        this.resultMessage = document.getElementById('resultMessage');
        this.attempts = document.getElementById('attempts');
    }

    updateAttempts(attempts) {
        this.attemptsCount.textContent = attempts;
    }

    updateMessage(message) {
        this.resultMessage.textContent = message;
    }

    clearInput() {
        this.guessInput.value = '';
    }
}

// controller.js
class NumberGuessingController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.guessButton.addEventListener('click', () => this.handleGuess());
    }

    handleGuess() {
        const guess = parseInt(this.view.guessInput.value, 10);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.view.updateMessage('Por favor, ingresa un número válido entre 1 y 100.');
            return;
        }

        const result = this.model.makeGuess(guess);

        if (this.model.isGameWon()) {
            this.view.updateMessage(`¡Ganaste! El número era ${this.model.targetNumber}.`);
        } else if (this.model.isGameOver()) {
            this.view.updateMessage(`Perdiste. El número era ${this.model.targetNumber}.`);
        } else {
            this.view.updateAttempts(this.model.getAttemptsLeft());
            if (result === 'low') {
                this.view.updateMessage('Demasiado bajo. Intenta nuevamente.');
            } else if (result === 'high') {
                this.view.updateMessage('Demasiado alto. Intenta nuevamente.');
            }
        }

        this.view.clearInput();
    }
}

// game.js
const model = new NumberGuessingModel();
const view = new NumberGuessingView();
const controller = new NumberGuessingController(model, view);

// Inicializar vista con el número de intentos restantes
view.updateAttempts(model.getAttemptsLeft());