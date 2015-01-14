/**
 * Author Matthias Heyder
 */

var appIDs = [];
var activeID;

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'action.is.ready.*',
    callback: function(data, topic, channel) {
				var ID = topic.substr(topic.indexOf('#'));
				appIDs.push(ID);
				activeID = ID;
				alert("the app: '" + data.title + "' identified as '" + appIDs + "' is ready for use and sent you: '" + data.message + "'");
				executeSubscribers();
    }
});

var executeSubscribers = function(){

	flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'message.to.yetu.' + activeID,
			callback: function(data, topic, channel) {
					alert("the app: '" + data.title + "' has sent you: '" + data.message + "'");
			}
	});

	flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'control.quit.' + activeID,
			callback: function(data, topic, channel) {
					alert("the app: '" + data.title + "' has just sent you a 'quit' signal");
			}
	});

	flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'control.index.' + activeID,
			callback: function(data, topic, channel) {
					alert("the app: '" + data.title + "' has just sent you the 'index' number " + data.message.index);
			}
	});
};

var myMultiClickHandler = function(key){
    console.log(key + " pressed");

    flyer.wrapper.broadcast({
      channel: 'yetu',
      topic: 'control.'+ key + '.' + activeID,
      data: {}
    });
};

var toggle = function(){
	//TODO: make this function more readable
	activeID = appIDs[+!appIDs.indexOf(activeID)];
};
