const minichat = function(n){
	return `<!DOCTYPE html>
<html lang = "en">
<head>
<meta charset = "utf-8" />
<meta name = "viewport" content = "width=device-width, initial-scale = 1" />
<style>
#chatTxt{
width: 90%;
height: 100px;
margin: 0 auto;
}
#chatContainer{
width:90%;
margin: 0 auto;
height: 200px;
}
</style>
</head>
<body>
<h3>Mini chat</h3>
<div>
<div><label for="nameUser"><strong>Ваше имя, пожалуйста</strong></label>
<input id="nameUser" type="text" placeholder="имя">
</div>
<div><label for="tokenStr"><strong></strong></label>
<input type="text" id="tokenStr" value="token">
<div>
<div>
<button onclick="send_name(this);">Войти в чат</button>
</div>
</div>
<hr>
<div id="chatContainer"></div>
<div>
<textarea id="chatTxt" type="text" placeholder="type your message"></textarea>
</div>
<div><button onclick="send_up(this);">send</button></div><hr>


<script src="minichat.js"></script>

</body>
</html>`;
	}
	
	module.exports = {minichat};
