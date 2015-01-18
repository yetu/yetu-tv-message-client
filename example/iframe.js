var changeBoxColor = function(name) {
	$('#' + name).css(
		'background-color',
		'#'+Math.floor(Math.random()*16777215).toString(16));
};

var changeIndex = function(direction){

	var currentIndex = parseInt($('#index-value').text(), 10);
	
	if(direction && direction === 'up'){
		currentIndex--;
	} else if(direction && direction === 'down') {
		currentIndex++;
	}

	if (currentIndex < 0) {
		currentIndex = 0;
	}

	$('#index-value').text(currentIndex);
};

var upHandler = function(){
	changeBoxColor('up');
	changeIndex('up');
};
var downHandler = function(){
	changeBoxColor('down');
	changeIndex('down');
};
var leftHandler = function(){
	changeBoxColor('left');
};
var rightHandler = function(){
	changeBoxColor('right');
};
var enterHandler = function(){
	changeBoxColor('enter');
};
var backHandler = function(){
	changeBoxColor('back');
};
var menuHandler = function(){
	changeBoxColor('menu');
};
var playHandler = function(){
	changeBoxColor('play');
};
var rewindHandler = function(){
	changeBoxColor('rewind');
};
var forwardHandler = function(){
	changeBoxColor('forward');
};

_yetu.any(function() {

	_yetu.any(null);

	$('.uuid').text(_yetu.id());

	if(typeof $('#iframe-cover-overlay').length !== 'undefined') {
		$('#iframe-cover-overlay').remove();
	}

	_yetu.on(_yetu.KEY.UP, upHandler);
	_yetu.on(_yetu.KEY.DOWN, downHandler);
	_yetu.on(_yetu.KEY.LEFT, leftHandler);
	_yetu.on(_yetu.KEY.RIGHT, rightHandler);
	_yetu.on(_yetu.KEY.ENTER, enterHandler);
	_yetu.on(_yetu.KEY.BACK, backHandler);
	_yetu.on(_yetu.KEY.MENU, menuHandler);
	_yetu.on(_yetu.KEY.PLAY, playHandler);
	_yetu.on(_yetu.KEY.REWIND, rewindHandler);
	_yetu.on(_yetu.KEY.FORWARD, forwardHandler);
});

$(window).ready(function(){

	$('#iframe-cover-overlay').click(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
	});

	$('#send-message').click(function(){

		var text = $("textarea").val();

		$("textarea").attr('placeholder', "Your message: '" + text + "' has been sent to yetu.");
		$("textarea").val('');

		_yetu.message(text);
	});

	$('#send-index').click(function() {
		_yetu.index($('#index-value').text());
	});

	$('#send-quit').click(function() {
		_yetu.quit();
	});
});