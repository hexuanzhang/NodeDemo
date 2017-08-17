let Rx = require('rxjs/Rx'),
	Chance = require('chance'),
	server = require('websocket').server,
	http = require('http');

const chance = new Chance();
const socket = new server({
	httpServer: http.createServer().listen(1337)
});

socket.on('request', function(request) {
	console.info('connection', socket.connections.length);
	var connection = request.accept(null, request.origin);
	
	connection.on('message', function(message) {
		console.log(message.utf8Data);
		connection.sendUTF(JSON.stringify('hello'));
		
		Rx.Observable.interval(3000)
			.map(i => {
				return Array.from({length: chance.integer({min: 1, max: 10})}, (v, i) => {
					let num = chance.integer({min: 0, max: 100}) / 100;
					
					return {
						id: i,
						name: `下载任务 ${i}`,
						status: num,
						date: new Date().toLocaleDateString()
					}
				});
			})
			.subscribe(data => {
				connection.sendUTF(JSON.stringify({data}));
			});
	});
	
	connection.on('close', function(connection) {
		console.log('connection closed');
	});
}); 