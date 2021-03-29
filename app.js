const PORT = 3000;
const http = require('http');
//const session = require('express-session');

const express = require('express');
const render = require('template-literals-express');
const WebSocket = require('ws');
const app = express();


app.use(express.static('public'));
app.use(render({ root: 'views' }));

app.get('/', function (req, res) {
	res.rendel('minichat', {})
	})
	
	
const server = http.createServer(app);



const wss = new WebSocket.Server({ clientTracking: true, noServer: true});

// вещать для всех
function broadcast(obj){
wss.clients.forEach( function (client) {
	 if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(obj));
      }

})	
}

// итервал для пинг-понга. Обнаруживает и закрывает оборванные подключения
function noop(){}
const interval = setInterval( function ping () {
	
wss.clients.forEach( function each ( ws ) {
if( ws.isAlive === false )return ws.terminate();
ws.isAlive = false;
ws.ping( noop );	
})	
}, 30000);

function heartbeat () {
	this.isAlive = true;
	}


wss.on('connection', function ( ws, req ) {
console.log( "websock client opened!", req.url);

ws.isAlive = true;
ws.on( 'pong' , heartbeat);

 ws.on('message', function sock_msg(msg) {
	console.log('json:', msg );
	
	let message;
	let send_to_clients = false;
	try {
		message = JSON.parse( msg );
	}catch( error ) {
		console.log( error );
		return;
	};
	if(message.token == "token") send_to_clients = true;
	if(message.type == "username") {
			ws.name = message.name;
			broadcast({ type: "join", from: ws.name  });
			send_to_clients = false;
			}
if(send_to_clients) broadcast(msg);

ws.on('close', function ( ) {
console.log( "websocket closed" ); 
broadcast ({type: "leave", from: ws.name})
});
});
});


wss.on('close', function close () {
	clearInterval( interval );
	console.log("wss on close");
	});
	
function wsend(ws, obj) {

let json_obj;

try{
json_obj = JSON.stringify(obj );
if( ws.readyState === WebSocket.OPEN ) ws.send(json_obj);	
}catch(e){
	console.log('err in stringify: ', e); 
	}	
}
	
server.listen(PORT, function() {
	console.log( PORT );
	});
