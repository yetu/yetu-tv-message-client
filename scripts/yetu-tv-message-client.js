/**
 * @author Matthias Heyder, Elisa Hilprecht
 * @version 1.1
 * @license MIT
 */

//(public)namespace of our app
var yetu = yetu || {};

//(private)namespace of our app
var _yetu = _yetu || {};

_yetu.constants = {
    quitTopic: 'control.quit',
    isReadyTopic: 'action.is.ready',
    indexTopic: 'control.index',
    messageTopic: 'message.to.yetu',
		id: '#'+Math.floor(Math.random()*16777215).toString(16)
};

_yetu.sendData = function(topic, data){
    try{
        flyer.wrapper.broadcast({
            channel: 'yetu',
            topic: topic + '.' + _yetu.constants.id,
            data: {
                title: (document.title || null),
                message: data
            }
        });
        return {
            sent : true,
            message: "Message has been sent "+JSON.stringify(data)
        };
    }
    catch(e){
        return {
            sent : false,
            message:  "Error on broadcasting the topic: " + topic,
						error: e
        };
    }
};

yetu.sendMessage = function(message){
    return _yetu.sendData(_yetu.constants.messageTopic,  message || '');
};

yetu.sendFeedItemIndex = function(index){
    return _yetu.sendData(_yetu.constants.indexTopic, {
        index : index || 0
    });
};

yetu.sendQuit = function(message){
    return _yetu.sendData(_yetu.constants.quitTopic, message || '');
};

_yetu.isReady = function(){
    return _yetu.sendData(_yetu.constants.isReadyTopic, '');
};

window.addEventListener('load', function(){
	if(_yetu && _yetu.isReady && typeof(_yetu.isReady) === 'function') {
      _yetu.isReady();
	}
}, false);

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.up.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionUp && typeof(yetu.onActionUp) === 'function'){
            yetu.onActionUp();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.down.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionDown && typeof(yetu.onActionDown) === 'function'){
            yetu.onActionDown();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.left.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionLeft && typeof(yetu.onActionLeft) === 'function'){
            yetu.onActionLeft();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.right.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionRight && typeof(yetu.onActionRight) === 'function'){
            yetu.onActionRight();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.enter.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionEnter && typeof(yetu.onActionEnter) === 'function'){
            yetu.onActionEnter();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.back.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionBack && typeof(yetu.onActionBack) === 'function'){
            yetu.onActionBack();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.menu.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionMenu && typeof(yetu.onActionMenu) === 'function'){
            yetu.onActionMenu();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.play.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionPlay && typeof(yetu.onActionPlay) === 'function'){
            yetu.onActionPlay();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.rewind.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionRewind && typeof(yetu.onActionRewind) === 'function'){
            yetu.onActionRewind();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.forward.' + _yetu.constants.id,
    callback: function(data, topic, channel){
				if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        if(yetu && yetu.onActionForward && typeof(yetu.onActionForward) === 'function'){
            yetu.onActionForward();
        }
    }
});
