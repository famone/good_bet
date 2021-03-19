import player from "./store/Player";

class CasinoLocalStorage
{
	static getGuest() {
		let guest = localStorage.getItem('guest')

		return guest ? JSON.parse(guest) : null
	}

	static saveGuest(data) {
		localStorage.setItem("guest", JSON.stringify(data));
	}

	static deleteGuest() {
		localStorage.removeItem("guest");
	}

	static getPlayer() {
		let player = localStorage.getItem('player')

		return player ? JSON.parse(player) : null
	}

	static savePlayer(data) {
		localStorage.setItem("player", JSON.stringify(data))
	}

	static deletePlayer() {
		localStorage.removeItem("player");
	}

	static deleteUsers() {
		this.deleteGuest()
		this.deletePlayer()
	}

	static getSelectedLang() {
		return localStorage.getItem('selectedLang')
	}

	static setSelectedLang(lang) {
		localStorage.setItem('selectedLang', lang)
	}
}

export {CasinoLocalStorage}