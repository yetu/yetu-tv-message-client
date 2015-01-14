/**
 * Author Matthias Heyder
 */

var appID;

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'action.is.ready.*',
    callback: function(data, topic, channel) {
				appID = topic.substr(topic.indexOf('#'));
				alert("the app: '" + data.title + "' identified as '" + appID + "' is ready for use and sent you: '" + data.message + "'");
				executeSubscribers();
    }
});

var executeSubscribers = function(){

	flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'message.to.yetu.' + appID,
			callback: function(data, topic, channel) {
					alert("the app: '" + data.title + "' has sent you: '" + data.message + "'");
			}
	});

	flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'control.quit.' + appID,
			callback: function(data, topic, channel) {
					alert("the app: '" + data.title + "' has just sent you a 'quit' signal");
			}
	});

	flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'control.index.' + appID,
			callback: function(data, topic, channel) {
					alert("the app: '" + data.title + "' has just sent you the 'index' number " + data.message.index);
			}
	});
};

var myMultiClickHandler = function(key){
    console.log(key + " pressed");

    flyer.wrapper.broadcast({
      channel: 'yetu',
      topic: 'control.'+ key + '.' + appID,
      data: {}
    });
};
