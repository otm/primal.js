describe("Observable", function() {
	function isFunction(el) {
		return Object.prototype.toString.call(el) == '[object Function]';
	}
	var Test = function(){
		primal.observable(this, Test);
	};
	

	var test, callbacks, call;

	beforeEach(function() {
		test = new Test();

		callbacks = {
			someActionFirst: jasmine.createSpy(),
			someActionSecond: jasmine.createSpy(),
			anotherAction: jasmine.createSpy(),
			click: jasmine.createSpy(),
			click2: jasmine.createSpy()
		};

		test.addEvent('someAction', callbacks.someActionFirst);
		test.addEvent('someAction', callbacks.someActionSecond);
		test.addEvent('anotherAction', callbacks.anotherAction);

		test.addEvents({
			onClick: callbacks.click,
			action3: callbacks.click2
		});
		
	});
	it("Add Event", function() {
		//expect(isFunction(test.addEvent)).toBeTruthy();

		expect(test.$events.someAction).toBeTruthy();
		expect(test.$events.anotherAction).toBeTruthy();

		expect(test.$events.someAction.length).toBe(2);
	});
	
	it("Add Events", function() {
		expect(isFunction(test.addEvents)).toBeTruthy();

		expect(test.$events.click).toBeTruthy();
		expect(test.$events.action3).toBeTruthy();

		expect(test.$events.click.length).toBe(1);
	});

	it("Fire Event", function() {
		test.fireEvent('anotherAction', 'test');

		expect(callbacks.anotherAction).toHaveBeenCalled();
		expect(callbacks.anotherAction).toHaveBeenCalledWith('test');

		expect(callbacks.someActionSecond).not.toHaveBeenCalled();

		test.fireEvent('someAction', [1, 2, 3]);

		expect(callbacks.someActionFirst).toHaveBeenCalled();
		expect(callbacks.someActionFirst).toHaveBeenCalledWith(1,2,3);

		expect(callbacks.someActionSecond).toHaveBeenCalled();

	});

	it("Remove Event", function() {
		test.removeEvent('someAction', callbacks.someActionFirst);
		expect(test.$events.someAction.length).toBe(1);
		
		test.fireEvent('someAction');
		expect(callbacks.someActionFirst).not.toHaveBeenCalled();
		expect(callbacks.someActionSecond).toHaveBeenCalled();
	});

	it("Remove Events", function() {
		test.removeEvents('someAction');
		expect(test.$events.someAction.length).toBe(0);
		
		test.fireEvent('someAction');
		expect(callbacks.someActionFirst).not.toHaveBeenCalled();
		expect(callbacks.someActionSecond).not.toHaveBeenCalled();

		test.removeEvents({
			click: callbacks.click,
			anotherAction: callbacks.anotherAction,
			action3: callbacks.click
		});
		expect(test.$events.click.length).toBe(0);
		expect(test.$events.anotherAction.length).toBe(0);
		expect(test.$events.action3.length).toBe(1);

		test.fireEvent('action3');
		expect(callbacks.click2).toHaveBeenCalled();

		test.fireEvent('click');
		expect(callbacks.click).not.toHaveBeenCalled();

	});
});
	
