var socket;
var myUsername;
var tokens;

if(window.location.protocol === "https:"){
new_uri = 'wss:';
}else{
new_uri = 'ws:';
}
var loc1 = location.hostname + ':' + location.port;
var loc2 = location.hostname;
var loc3 = loc1 || loc2;

function wsend(obj ) {
	if(!socket) return;
let a;
try{
socket.send(JSON.stringify(obj));
}catch(e){
	console.log('err in stringify: ', e); 
	}	
}

function open_socket() {
	if( socket ) {
		return;
		}
socket = new WebSocket(new_uri+'//'+loc3);

socket.onopen = function () {

wsend({type: "username", name: myUsername});
}
socket.onerror = function( e ) {
console.log( "websocket error ", e );
}
socket.onmessage = function( evt ) {
	console.log(evt.data)
	let t;
	try{
		t = JSON.parse(evt.data);
		}catch(e) {
			console.error("json parse error", e);
			return;
			}

if(t.type == "msg") {
	insert_message(t);
}else if(t.type == "join") {
	insert_message({from: t.from, msg: "входит в чат."});
	}else if(t.type == "leave") {
	insert_message({from: t.from, msg: "выходит из чата"});		
	}else{
		console.log("unknown type: ", t.type);
		}
}

socket.onclose = function() {
console.log( "Websocket closed" );
socket = null;
}
}

function sendi(ev){
if(ev.key==="Enter"){
send_up();
}
}
chatTxt.addEventListener('keydown', sendi, false);

function send_up(el){

if(!chatTxt.value)return;
let d={};
d.type = "msg";
d.msg = chatTxt.value;
d.tokens = tokens;
d.from = myUsername;
wsend(d);	
chatTxt.value = "";
}

function send_name(el) {
if(!nameUser.value) {
	alert("Введите свое имя");
	return;
	}
tokens = tokenStr.value;
myUsername = nameUser.value;
open_socket();
}

	
	
function insert_message(obj) {
let m = document.createElement('div');
m.className = "chat-div";
m.innerHTML ='<span class="chat-user">' + obj.from +': </span><span class="chat-message">' + obj.msg +'</span>';
chatContainer.appendChild(m);
chatContainer.scrollTop = chatContainer.clientHeight + chatContainer.scrollHeight;
}







