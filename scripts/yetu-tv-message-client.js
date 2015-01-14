/**
 * @author Matthias Heyder, Elisa Hilprecht
 * @version 0.2.0
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
    messageTopic: 'message.to.yetu'
};

_yetu.sendData = function(topic, data){
    try{
        flyer.wrapper.broadcast({
            channel: 'yetu',
            topic: topic,
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
    return _yetu.sendData(_yetu.constants.quitTopic, message || '')
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
    topic: 'control.*',
    callback: function(data, topic, channel){
        if(topic !== 'control.quit'){
					if(yetu && yetu.onAnyActionDetected && typeof(yetu.onAnyActionDetected) === 'function'){
						yetu.onAnyActionDetected();
					}
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.up',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionUp && typeof(yetu.onActionUp) === 'function'){
            yetu.onActionUp();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.down',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionDown && typeof(yetu.onActionDown) === 'function'){
            yetu.onActionDown();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.left',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionLeft && typeof(yetu.onActionLeft) === 'function'){
            yetu.onActionLeft();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.right',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionRight && typeof(yetu.onActionRight) === 'function'){
            yetu.onActionRight();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.enter',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionEnter && typeof(yetu.onActionEnter) === 'function'){
            yetu.onActionEnter();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.back',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionBack && typeof(yetu.onActionBack) === 'function'){
            yetu.onActionBack();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.menu',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionMenu && typeof(yetu.onActionMenu) === 'function'){
            yetu.onActionMenu();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.play',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionPlay && typeof(yetu.onActionPlay) === 'function'){
            yetu.onActionPlay();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.rewind',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionRewind && typeof(yetu.onActionRewind) === 'function'){
            yetu.onActionRewind();
        }
    }
});

flyer.wrapper.subscribe({
    channel: 'yetu',
    topic: 'control.forward',
    callback: function(data, topic, channel){
        if(yetu && yetu.onActionForward && typeof(yetu.onActionForward) === 'function'){
            yetu.onActionForward();
        }
    }
});
