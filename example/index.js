/**
 * Author Matthias Heyder
 */
flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'message.to.yetu',
    callback: function(data, topic, channel) {
        alert("the app: '" + data.title + "' has sent you: '" + data.message + "'");

    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'action.is.ready',
    callback: function(data, topic, channel) {
        alert("the app: '" + data.title + "' is ready for use and sent you: '" + data.message + "'");
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.quit',
    callback: function(data, topic, channel) {
        alert("the app: '" + data.title + "' has just sent you a 'quit' signal");
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.index',
    callback: function(data, topic, channel) {
        alert("the app: '" + data.title + "' has just sent you the 'index' number " + data.message.index);
    }
});

var myMultiClickHandler = function(key){
		if(key==="message"){
			console.log(key + " send");
			flyer.wrapper.broadcast({
				channel: 'yetu',
				topic: 'message.from.yetu',
				data: {
					message: document.getElementById('message-input').value
				}
			});
		}
		else{
			console.log(key + " pressed");
			flyer.wrapper.broadcast({
				channel: 'yetu',
				topic: 'control.'+key,
				data: {}
			});
		}

};

