class Settings {
	_showGroupTotals = true;
	_darkMode = true;
	_language = "en";

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

	saveSettings() {
		let settings = {groupTotals: this._showGroupTotals, dark: this._darkMode, language: this._language};
		let settingsString = JSON.stringify(settings);

		localStorage.setItem('gameSettings', settingsString);
	}

	loadSettings() {
		let settings = JSON.parse(localStorage.getItem('gameSettings'));

		if(settings != undefined && settings != null) {
			this._showGroupTotals = settings.groupTotals;
			this._darkMode = settings.dark;
			this._language = settings.language;
		}

	}
}