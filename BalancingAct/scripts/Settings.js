class Settings {
	_showGroupTotals = true;
	_darkMode = true;
	_language = "en";
	_lastDifficulty = 0;

	getShowTotals() {
		return this._showGroupTotals;
	}

	setShowTotals(showTotals) {
		this._showGroupTotals = showTotals;
	}

	getDarkMode() {
		return this._darkMode;
	}

	setDarkMode(dark) {
		this._darkMode = dark;
	}

	getLanguage() {
		return this._language;
	}

	setLanguage(lang) {
		this._language = lang;
	}

	getDifficulty() {
		return this._lastDifficulty;
	}

	setDifficulty(diff) {
		this._lastDifficulty = diff;
	}

	saveSettings() {
		let settings = {groupTotals: this._showGroupTotals, dark: this._darkMode, language: this._language, difficulty: this._lastDifficulty};
		let settingsString = JSON.stringify(settings);

		localStorage.setItem('gameSettings', settingsString);
	}

	loadSettings() {
		let settings = JSON.parse(localStorage.getItem('gameSettings'));

		if(settings != undefined && settings != null) {
			this._showGroupTotals = settings.groupTotals;
			this._darkMode = settings.dark;
			this._language = settings.language;
			this._lastDifficulty = settings.difficulty;
		}

	}
}