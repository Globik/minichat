var socket;
var myUsername;

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
console.log("aha, sending some data");
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
	var t;
	try{
		t = JSON.parse(evt.data);
		}catch(e) {
			console.error("json parse err");
			return;
			}

if(t.type == "msg") {
	insert_message(t);
}else if(t.type == "join") {
	insert_message({from: t.from, msg: "входит в чат."});
	}else if(t.type == "leave") {
	insert_message({from: t.from, msg: "выходит из чата"});		
	}else{}
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

d.from = myUsername;
wsend(d);	

if(el)el.className = "puls";
chatTxt.value = "";
}

function send_name(el) {
if(!nameUser.value) {
	alert("заполни поле");
	return;
	}
let data  = {}
data.name = nameUser.value;
myUsername = data.name;
vax("post", "/login", data, on_send_name, on_send_name_error, el, false);
}

function on_send_name_error( l, el) {
	alert(l);
	}
function on_send_name(l, el) {
	open_socket();
	}
	
	
function insert_message(obj) {
	
let m=document.createElement('div');
m.className = "chat-div";
m.innerHTML ='<span class="chat-user">' + obj.from +': </span><span class="chat-message">' + obj.msg +'</span>';
chatContainer.appendChild(m);
chatContainer.scrollTop = chatContainer.clientHeight + chatContainer.scrollHeight;
}







