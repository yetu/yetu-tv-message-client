describe('message-client', function () {

	beforeEach(function(){
		//enable action handler
		yetu.onAnyActionDetected();
	});

	it('public namespace should exist', function () {
		expect(yetu).toBeDefined();
	});

	it('private namespace should exist', function () {
		expect(_yetu).toBeDefined();
	});

	it('should have all method', function () {
		expect(yetu.onAnyActionDetected).toBeDefined();
		expect(yetu.onActionBack).toBeDefined();
		expect(yetu.onActionUp).toBeDefined();
		expect(yetu.onActionDown).toBeDefined();
		expect(yetu.onActionLeft).toBeDefined();
		expect(yetu.onActionRight).toBeDefined();
		expect(yetu.onActionForward).toBeDefined();
		expect(yetu.onActionPlay).toBeDefined();
		expect(yetu.onActionEnter).toBeDefined();
		expect(yetu.onActionMenu).toBeDefined();
		expect(yetu.onActionRewind).toBeDefined();
		expect(yetu.sendFeedItemIndex).toBeDefined();
		expect(yetu.sendMessage).toBeDefined();
		expect(yetu.sendQuit).toBeDefined();
	});

	it('should send Message', function () {
		expect(_yetu.sendData).toBeDefined();
		spyOn(_yetu,'sendData');
		yetu.sendMessage('Test');
		expect(_yetu.sendData).toHaveBeenCalledWith(_yetu.constants.messageTopic,'Test');
	});

	it('should send Quit', function () {
		expect(_yetu.sendData).toBeDefined();
		spyOn(_yetu,'sendData');
		yetu.sendQuit('Test');
		expect(_yetu.sendData).toHaveBeenCalledWith(_yetu.constants.quitTopic,'Test');
	});

	it('should send Index', function () {
		expect(_yetu.sendData).toBeDefined();
		spyOn(_yetu,'sendData');
		yetu.sendFeedItemIndex(1);
		expect(_yetu.sendData).toHaveBeenCalledWith(_yetu.constants.indexTopic,{index:1});
	});

	it('should broadcast message', function () {
		expect(flyer.wrapper.broadcast).toBeDefined();
		spyOn(flyer.wrapper,'broadcast');
		_yetu.sendData(_yetu.constants.messageTopic, 'Test');
		expect(flyer.wrapper.broadcast).toHaveBeenCalled();
	});
});
