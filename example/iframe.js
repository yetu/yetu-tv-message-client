/**
 @author Matthias Heyder, Elisa Hilprecht
*/
var changeBoxColor = function(boxNumber){
	document.getElementsByClassName('iframe-changebox')[boxNumber].style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
};

var changeIndex = function(direction){

	if(direction && direction === 'up'){
		document.getElementById('index-value').innerHTML++;
	} else if(direction && direction === 'down') {
		document.getElementById('index-value').innerHTML--;
	}
};

var myUpHandler = function(){
	changeBoxColor(0);
	changeIndex('up');
};
var myDownHandler = function(){
	changeBoxColor(1);
	changeIndex('down');
};
var myLeftHandler = function(){
	changeBoxColor(2);
};
var myRightHandler = function(){
	changeBoxColor(3);
};
var myEnterHandler = function(){
	changeBoxColor(4)
};
var myBackHandler = function(){
	changeBoxColor(5);
};
var myMenuHandler = function(){
	changeBoxColor(6);
};
var myPlayHandler = function(){
	changeBoxColor(7);
};
var myRewindHandler = function(){
	changeBoxColor(8);
};
var myForwardHandler = function(){
	changeBoxColor(9);
};

var myMessageSender = function(){
    var text = document.getElementsByTagName("textarea")[0].value;

    document.getElementsByTagName("textarea")[0].placeholder = "Your message: '" + text + "' has been sent to yetu.";
    document.getElementsByTagName("textarea")[0].value = "";

	yetu.sendMessage(text);
};

var myQuitSender = function(){
    yetu.sendQuit();
};

var myIndexSender = function(){
    yetu.sendFeedItemIndex(+document.getElementById('index-value').innerHTML);
};

var myMessageReceiver = function(data){
	if(document.getElementById('iframe-cover-overlay')!==null){
		document.getElementById('iframe-cover-overlay').remove();
	}
	alert("The following message was received from yetu TV Experience:\n"+data.message);
};

yetu.onAnyActionDetected = function(){

    yetu.onAnyActionDetected = function(){};

		if(document.getElementById('iframe-cover-overlay')!==null){
      document.getElementById('iframe-cover-overlay').remove();
		}

    yetu.onActionUp = myUpHandler;
    yetu.onActionDown = myDownHandler;
    yetu.onActionLeft = myLeftHandler;
    yetu.onActionRight = myRightHandler;
    yetu.onActionEnter = myEnterHandler;
    yetu.onActionBack = myBackHandler;
		yetu.onActionMenu = myMenuHandler;
    yetu.onActionPlay = myPlayHandler;
    yetu.onActionRewind = myRewindHandler;
    yetu.onActionForward = myForwardHandler;
};

yetu.onReceiveMessage = myMessageReceiver;

window.onload = function(){
    document.getElementById('iframe-cover-overlay').onclick = function(e){
        e.stopPropagation();
    };
};
