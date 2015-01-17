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
	changeBoxColor(4);
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

	_yetu.message(text);
};

var myQuitSender = function(){
    _yetu.quit();
};

var myIndexSender = function(){
    _yetu.index(+document.getElementById('index-value').innerHTML);
};

_yetu.any(function() {

	_yetu.any(null);

	if(document.getElementById('iframe-cover-overlay')!==null) {
		document.getElementById('iframe-cover-overlay').remove();
	}

	_yetu.on(_yetu.KEY.UP, myUpHandler);
	_yetu.on(_yetu.KEY.DOWN, myDownHandler);
	_yetu.on(_yetu.KEY.LEFT, myLeftHandler);
	_yetu.on(_yetu.KEY.RIGHT, myRightHandler);
	_yetu.on(_yetu.KEY.ENTER, myEnterHandler);
	_yetu.on(_yetu.KEY.BACK, myBackHandler);
	_yetu.on(_yetu.KEY.MENU, myMenuHandler);
	_yetu.on(_yetu.KEY.PLAY, myPlayHandler);
	_yetu.on(_yetu.KEY.REWIND, myRewindHandler);
	_yetu.on(_yetu.KEY.FORWARD, myForwardHandler);
});

window.onload = function(){

    document.getElementById('iframe-cover-overlay').onclick = function(e){
        e.stopPropagation();
    };
};