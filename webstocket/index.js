let Rx = require('rxjs/Rx'),
	Chance = require('chance'),
	server = require('websocket').server,
	http = require('http');

const chance = new Chance();
const socket = new server({
	httpServer: http.createServer().listen(1337)
});

socket.on('request', function(request) {
	var connection = request.accept(null, request.origin);
	
	connection.on('message', function(message) {
		console.log(message.utf8Data);
		connection.sendUTF(JSON.stringify('hello'));
		
		Rx.Observable.interval(1000)
			.map(i => {
				return Array.from({length: chance.integer({min: 1, max: 10})}, _ => chance.integer({min: 0, max: 100}) / 100);
			})
			.subscribe(data => {
				const str = JSON.stringify({data});
				console.info(data, str);
				connection.sendUTF(str);
			});
	});
	
	connection.on('close', function(connection) {
		console.log('connection closed');
	});
}); 