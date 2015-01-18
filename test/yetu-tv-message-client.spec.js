describe('message-client', function () {

	beforeEach(function(){
		// clear action handlers
		_yetu.clear();
	});

	it('should exist', function () {
		expect(_yetu).toBeDefined();
	});
	
	it('should have an valid UUID at start', function () {
		expect(_yetu.id()).toBeDefined();
		expect(_yetu.id().length).toEqual(36);
	});

	it('should not have handlers at start', function () {
		expect(_yetu.size()).toEqual(0);
	});

	it('should bind handlers when call on', function () {
		_yetu.on(_yetu.KEY.UP, function() {});
		expect(_yetu.size()).toEqual(1);
	});

	it('should clear handlers when call clear', function () {
		_yetu.on(_yetu.KEY.UP, function() {});
		expect(_yetu.size()).toEqual(1);
		_yetu.clear();
		expect(_yetu.size()).toEqual(0);
	});

	it('should find the right index', function () {
		
		_yetu.on(_yetu.KEY.UP, function() {});
		_yetu.on(_yetu.KEY.DOWN, function() {});
		_yetu.on(_yetu.KEY.RIGHT, function() {});
		
		expect(_yetu.size()).toEqual(3);
		expect(_yetu.indexOf(_yetu.wrap(_yetu.KEY.DOWN))).toEqual(1);
	});

	it('should call the right handler', function () {
		
		var cb = {callback: function() { }};

		spyOn(cb, 'callback');

		_yetu.on(_yetu.KEY.UP, cb.callback);
		expect(_yetu.size()).toEqual(1);

		_yetu.receive({}, _yetu.wrap(_yetu.KEY.UP), _yetu.CHANNEL);
		expect(cb.callback).toHaveBeenCalled();
	});

	it('should send Message', function () {
		spyOn(flyer.wrapper,'broadcast');
		_yetu.message('Test');
		expect(flyer.wrapper.broadcast).toHaveBeenCalled();
		expect(flyer.wrapper.broadcast.calls.mostRecent().args[0].topic).toEqual(_yetu.wrap(_yetu.MESSAGE_TOPIC));
	});

	it('should send Quit', function () {
		spyOn(flyer.wrapper,'broadcast');
		_yetu.quit('Test');
		expect(flyer.wrapper.broadcast).toHaveBeenCalled();
		expect(flyer.wrapper.broadcast.calls.mostRecent().args[0].topic).toEqual(_yetu.wrap(_yetu.QUIT_TOPIC));
	});

	it('should send Index', function () {
		spyOn(flyer.wrapper,'broadcast');
		_yetu.index(1);
		expect(flyer.wrapper.broadcast).toHaveBeenCalled();
		expect(flyer.wrapper.broadcast.calls.mostRecent().args[0].topic).toEqual(_yetu.wrap(_yetu.INDEX_TOPIC));
	});

	it('should broadcast message', function () {
		expect(flyer.wrapper.broadcast).toBeDefined();
		spyOn(flyer.wrapper,'broadcast');
		_yetu.message('Test');
		expect(flyer.wrapper.broadcast).toHaveBeenCalled();
		expect(flyer.wrapper.broadcast.calls.mostRecent().args[0].data.message).toEqual('Test');
	});
});
