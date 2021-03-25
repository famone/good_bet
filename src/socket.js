export default class Socket
{
	static firePlayerOnlineEvent(socket, player) {
		socket.emit('NewPlayer', {
			'player_name': player.username,
			'casino_id': player.casino_id,
			'player_id': player.id,
			'hall_id': player.node_id,
			'route': '/route',
		})
	}

	static firePlayerRealGameEvent(socket, player) {
		socket.emit('NewPlayer', {
			'player_name': player.username,
			'casino_id': player.casino_id,
			'player_id': player.id,
			'hall_id': player.node_id,
			'route': 'game/realGame',
		})
	}
}