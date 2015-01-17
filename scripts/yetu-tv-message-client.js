//     yetu-tv-message-client.js 0.2.1
//     https://github.com/yetu/yetu-tv-message-client
//     (c) 2015 Yetu AG
//     Yetu Tv Message Client is freely distributed under the MIT license.

(function(flyer, JSON) {

	// Baseline setup
	// --------------

	// Enable code to run in strict mode
	'use strict';

	// Establish the root object, `window` in the browser
	var root = this;

	// Save the previous value of the `_yetu` variable.
	var previousYetu = root._yetu;

	// Create a safe reference to the Yetu object for use below.
	var _yetu = function(obj) {
		if (obj instanceof _yetu) return obj;
		if (!(this instanceof _yetu)) return new _yetu(obj);
		this._wrapped = obj;
	};

	// Export the Yetu object for the browser, add `_yetu` as a global object.
	root._yetu = _yetu;
	
	// Current version.
	_yetu.VERSION = '0.2.1';

	// Default channel for yetu communication
	_yetu.CHANNEL = 'yetu';

	// Default topic for yetu Remote Control
	_yetu.CONTROL_TOPIC = 'control';

	// Default topics to send information to yetu
	_yetu.READY_TOPIC = 'action.is.ready';
	_yetu.MESSAGE_TOPIC = 'message.to.yetu';
	_yetu.INDEX_TOPIC = _yetu.CONTROL_TOPIC + '.index';
	_yetu.QUIT_TOPIC = _yetu.CONTROL_TOPIC + '.quit';
	
	// Default topics handle all actions
	_yetu.ALL_TOPICS = _yetu.CONTROL_TOPIC + '.*';

	// Default topics to handle specific key of Yetu Remote Control
	_yetu.KEY = {};
	_yetu.KEY.UP = _yetu.CONTROL_TOPIC + '.up';
	_yetu.KEY.DOWN = _yetu.CONTROL_TOPIC + '.down';
	_yetu.KEY.LEFT = _yetu.CONTROL_TOPIC + '.left';
	_yetu.KEY.RIGHT = _yetu.CONTROL_TOPIC + '.right';
	_yetu.KEY.ENTER = _yetu.CONTROL_TOPIC + '.enter';
	_yetu.KEY.BACK = _yetu.CONTROL_TOPIC + '.back';
	_yetu.KEY.MENU = _yetu.CONTROL_TOPIC + '.menu';
	_yetu.KEY.PLAY = _yetu.CONTROL_TOPIC + '.play';
	_yetu.KEY.REWIND = _yetu.CONTROL_TOPIC + '.rewind';
	_yetu.KEY.FORWARD = _yetu.CONTROL_TOPIC + '.forward';

	// Stores the handlers add through `on` method
	var handlers = [];

	// Stored the callback called when the any action happen
	var any = null;

	// Broadcasts the `data` to the `topic` on the default channel 
	var send = function(topic, data) {
		try {
			
			flyer.wrapper.broadcast({
				channel: _yetu.CHANNEL,
				topic: topic,
				data: {
					title: (document.title || null),
					message: data
				}
			});
			
			return {
				sent : true,
				message: "Message has been sent " + JSON.stringify(data)
			};
		}
		catch(e) {
			return {
				sent : false,
				message:  "Error on broadcasting the topic: " + topic,
				error: e
			};
		}
	};

	// Notify the `READY_TOPIC` that
	// the yetu object is fully loaded
	var ready = function() {
		return send(_yetu.READY_TOPIC, '');
	};

	// Send a `message` to the owner in the `MESSAGE_TOPIC`
	_yetu.message = function(message) {
		return send(_yetu.MESSAGE_TOPIC,  message || '');
	};

	// Send the `index` to the `INDEX_TOPIC`
	_yetu.index = function(index) {
		return send(_yetu.INDEX_TOPIC, {index : index || 0});
	};

	// Send the `message` to the `QUIT_TOPIC`
	_yetu.quit = function(message) {
		return send(_yetu.QUIT_TOPIC, message || '');
	};

	_yetu.any = function(callback) {
		any = callback;
	};

	// Push to the handlers the current action and callback if the 
	// current action is already handled, change the callback
	_yetu.on = function(action, callback) {
		
		var index = _yetu.indexOf(action);
		if (index < 0) {
			handlers.push({action: action, callback: callback});
		} else {
			handlers[index].callback = callback;
		}
	};

	// Return the number of callbacks attached to the `handlers` object
	_yetu.size = function() {
		return handlers.length;
	};

	// Remove all callbacks including the one for any actions
	_yetu.clear = function() {
		any = null;
		_yetu.handlers = [];
	};

	// indexOf based on the browser implementation ECMA5
	// focused on find the action at the `handlers` object
	_yetu.indexOf = function(action, start) {
		for (var i = (start || 0), j = handlers.length; i < j; i++) {
			if (handlers[i].action === action) { return i; }
		}
		return -1;
	};

	// Extracts the result from a wrapped and chained object.
	_yetu.prototype.value = function() {
		return this._wrapped;
	};

	// AMD registration happens at the end for compatibility with AMD loaders
	// that may not enforce next-turn semantics on modules. Even though general
	// practice for AMD registration is to be anonymous, underscore registers
	// as a named module because, like jQuery, it is a base library that is
	// popular enough to be bundled in a third party lib, but not be part of
	// an AMD load request. Those cases could generate an error when an
	// anonymous define() is called outside of a loader request.
	if (typeof define === 'function' && define.amd) {
		define('underscore', [], function() {
			return _yetu;
		});
	}

	// subscribe to all actions of the yetu channel
	flyer.wrapper.subscribe({
		channel: _yetu.CHANNEL,
		topic: _yetu.ALL_TOPICS,
		callback: function(data, topic, channel) {
			
			// if the current topic isn't the `QUIT_TOPIC`
			if(topic !== _yetu.QUIT_TOPIC) {

				// if has a callback to any action call it
				if (any && typeof any == 'function') {
					any();
				}

				// check if the `handlers` object has a handler to the topic
				var index = _yetu.indexOf(topic);
				if (index >= 0) {
					handlers[index].callback();
				}
			}
		}
	});

	// Add a listener to window object, when the 
	// event get triggered by the browser call
	// the ready private function to broadcast the 
	// message to the channel
	root.addEventListener('load', function() {
		if(_yetu) {
			ready();
		}
	}, false);

}.call(this, flyer, JSON));