
var q = {};
if(document.location.href && document.location.href.split('?').length>1){
	document.location.href.split('?')[1].split('&').forEach(function(i){
	    q[i.split('=')[0]]=decodeURIComponent(i.split('=')[1]);
	});
}

console.log(q)

host=q["host"]||document.location.hostname
port=q["port"]||document.location.port
count=q["count"]||20
msg=q["msg"]||"Message #i"
delay=q["delay"]||100

url="ws://"+host+":"+port+"/"

document.body.innerHTML+="WS URL "+url+"</br>"

var ws = new WebSocket("ws://"+host+":"+port+"/");

got=0
ws.onopen = function() {
    document.body.innerHTML+="<b>Opened</b><br>"
    i=0
    function sendMsg(){
	i++
	m=msg.replace("\#i",i)
	ws.send(m);
        document.body.innerHTML+="Sent "+m+"</br>"
	if (i<count){
		setTimeout(function(){
		sendMsg()
		},delay)
	} else {
        	document.body.innerHTML+="Sent all messages</br>"
	}
    }

   sendMsg()

};

ws.onmessage = function (evt) {
    got++
    document.body.innerHTML+="<b>Got "+evt.data+"</b><br>"
    if(got>count){
    	document.body.innerHTML+="<b>Success</b><br>"
    }
};

ws.onclose = function() {
    document.body.innerHTML+="<b>Closed</b><br>"
};

ws.onerror = function(err) {
    document.body.innerHTML+="<b>Error:"+err.toString()+"</b><br>"
};
