class Stats {
	#gamesPlayed = [0,0,0,0,0];
	#gamesWon = [0,0,0,0,0];
	#bestTimes = [undefined,undefined,undefined,undefined,undefined];

	loadStats() {
		let stats = JSON.parse(localStorage.getItem('gameStats'));

		if(stats != undefined && stats != null) {
			this.#gamesPlayed = stats.played;
			this.#gamesWon = stats.won;
			this.#bestTimes = stats.best;
		}

	}

	saveStats() {
		let stats = {played: this.#gamesPlayed, won: this.#gamesWon, best: this.#bestTimes}
		let statsString = JSON.stringify(stats);

		localStorage.setItem('gameStats', statsString);
	}

	addPlay(difficulty) {
		this.#gamesPlayed[difficulty]++;
		this.saveStats();
	}

	addWin(difficulty, time) {
		this.#gamesWon[difficulty]++;

		if(this.#bestTimes[difficulty] === null || time < this.#bestTimes[difficulty]) {
			this.#bestTimes[difficulty] = time;
		}

		this.saveStats();
	}

	resetStats() {
		this.#gamesPlayed = [0,0,0,0,0];
		this.#gamesWon = [0,0,0,0,0];
		this.#bestTimes = [undefined,undefined,undefined,undefined,undefined];
		this.saveStats();
	}

	getGamesPlayed(difficulty) {
		return this.#gamesPlayed[difficulty];
	}

	getGamesWon(difficulty) {
		return this.#gamesWon[difficulty];
	}

	getBestTime(difficulty) {
		return this.#bestTimes[difficulty];
	}

}