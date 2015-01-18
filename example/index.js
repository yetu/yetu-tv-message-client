$(window).ready(function(){

	'use strict';

	var ids = [];
	var active = null;

	flyer.wrapper.subscribe({
		channel: 'yetu',
		topic: 'action.is.ready.*',
		callback: function(data, topic, channel) {
			
			var _id = topic.substr(topic.lastIndexOf('.')+1);
			if (ids.indexOf(_id) < 0) {
			
				ids.push(_id);
				executeSubscribers(_id);

				$('#uuid-select').append('<option val="'+_id+'">'+_id+'</option>');
				alert("the app: '" + data.title + "' identified as '" + _id + "' is ready for use and sent you: '" + data.message + "'");
			}
		}
	});

	var executeSubscribers = function(id) {

		flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'message.to.yetu.' + id,
			callback: function(data, topic, channel) {
				alert("the app: '" + data.title + "' has sent you: '" + data.message + "'");
			}
		});

		flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'control.quit.' + id,
			callback: function(data, topic, channel) {
				alert("the app: '" + data.title + "' has just sent you a 'quit' signal");
			}
		});

		flyer.wrapper.subscribe({
			channel: 'yetu',
			topic: 'control.index.' + id,
			callback: function(data, topic, channel) {
				alert("the app: '" + data.title + "' has just sent you the 'index' number " + data.message.index);
			}
		});
	};

	$('.iframe-changebox').click(function(event){

		event.preventDefault();
		event.stopImmediatePropagation();

		var key = $(this).attr('rel');
		var uuid = $('#uuid-select').val();

		if (typeof key !== 'undefined' && typeof uuid !== 'undefined') {

			flyer.wrapper.broadcast({
				channel: 'yetu',
				topic: 'control.'+key+'.'+uuid,
				data: {}
			});
		}
	});
});