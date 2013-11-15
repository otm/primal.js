describe("Observable", function() {
	function isFunction(el) {
		return Object.prototype.toString.call(el) == '[object Function]';
	}

	var test, callbacks, call;

	beforeEach(function() {
		primal.mediator(window, Window);

		callbacks = {
			someActionFirst: jasmine.createSpy(),
			someActionSecond: jasmine.createSpy(),
			anotherAction: jasmine.createSpy(),
		};

		window.subscribe('someAction', callbacks.someActionFirst);
		window.subscribe('someAction', callbacks.someActionSecond);
		window.subscribe('anotherAction', callbacks.anotherAction);
	});

	it("Subscribe topic", function() {
		expect(isFunction(window.subscribe)).toBeTruthy();

		expect(window.$topics.someAction).toBeTruthy();
		expect(window.$topics.anotherAction).toBeTruthy();

		expect(window.$topics.someAction.length).toBe(2);
	});

	it("Publish topic", function() {
		window.publish('anotherAction', 'test');

		expect(callbacks.anotherAction).toHaveBeenCalled();
		expect(callbacks.anotherAction).toHaveBeenCalledWith('test');

		expect(callbacks.someActionSecond).not.toHaveBeenCalled();

		window.publish('someAction', [1, 2, 3]);

		expect(callbacks.someActionFirst).toHaveBeenCalled();
		expect(callbacks.someActionFirst).toHaveBeenCalledWith(1,2,3);

		expect(callbacks.someActionSecond).toHaveBeenCalled();
	});

	it("Unsubscribe topic", function() {
		window.unsubscribe('someAction', callbacks.someActionFirst);
		expect(window.$topics.someAction.length).toBe(1);
		
		window.publish('someAction');
		expect(callbacks.someActionFirst).not.toHaveBeenCalled();
		expect(callbacks.someActionSecond).toHaveBeenCalled();
	});


});