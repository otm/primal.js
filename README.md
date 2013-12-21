# primal.js

**primal** */ˈprʌɪm(ə)l/*<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; most important; primary or fundamental.

primal.js is a small utility library heavily inspired by riot.js and Mootools. Why primal.js when there is riot.js? The short explanation is that I prefer having the choice of extending the prototype. In addition, primal.js does not have any dependencies, and will never have, on external libraries for instance jQuery.

There are two ways to use primal, first by extending the prototype:
```javascript
var Car = function(){
    primal.observable(this, Car);
};
```
Or by extending an instance of an object:
```javascript
var car = primal.observable({});
```

## primal.observable(instance, class\*)
Handle events on native javascript object by extending them with primal.observable

* **instance** *(object)*- The object to extend
* __class\*__ *(constructor)* - Function to extend prototype on<br/>
\*_optional_

**Example:**
```javascript
var car = primal.observable({});
```

#### addEvent(event, fn)
Add an event listener to an object.

* **event** *(string)* - The event to listen to
* **fn** *(function)* - The function to call when the event is triggered

**Example:**
```javascript
car.addEvent('running', function(){...});
```

#### addEvents(options)
Add several events listeners to an object.

* **options** *(object)* - Object defining the events to listen to

**Example:**
```javascript
car.addEvents({
	running: function(){...},
    stoped: function(){...}
});
```

#### fireEvent(event, arg|[arg], delay)
Fire an event. Events can be triggered both from the object or from the outside.

* **event** *(string)* - The event to trigger
* **arg|[arg]** *(mixed|array)* - An argument or an array of arguments
* **delay** *(integer)* - The delay before triggering the event

**Example:**
```javascript
Car.prototype.start = function(){
	this.isStarted = true;
    this.fireEvent('running', [this.timesStarted, this.driver]);
};
```

#### removeEvent(event, function)
Remove an event listener from an object.

* **event** *(string)* - The event to remove from
* **fn** *(function)* - The function to remove 

**Example:**
```javascript
var eventListner = function(timeStarted, driver){...};

car.addEvent('running', eventListner);
...
car.removeEvent('running', eventListner);
```

#### removeEvents(event)
Remove all events of the specified type

* **event** *(string)* - The event to remove

**Example:**
```javascript
car.removeEvent('running');
```


## primal.mediator(instance, class\*)
Subscribe and publish messages.

* **instance** (object) - The object to extend
* __class\*__ *(optional)* - Function to extend prototype on

**Example:**
```javascript
mediator = primal.mediator({});
```

#### subscribe(topic, fn)
Subscribe to topic on the event mediator.

* **topic** *(string)* - The event to remove from
* **fn** *(function)* - The function to remove 

**Example:**
```javascript
var eventListner = function(){...};
car.subscribe('keyTurned', eventListner);
```

#### publish(topic, arg, delay)
Publish an message to the event mediator.

* **topic** *(string)* - The topic to publish
* **arg|[arg]** *(mixed|array)* - An argument or an array of arguments
* **delay** *(integer)* - The delay before triggering the event

**Example:**
```javascript
car.publish('keyTurned', []);
```

#### unsubscribe(topic, fn)
Unsubscibe, stop listening, to a topic on the event mediator.

* **topic** *(string)* - The event to remove from
* **fn** *(function)* - The function to remove 

**Example:**
```javascript
var eventListner = function(){...};
car.subscribe('keyTurned', eventListner);
...
car.unsubscribe('keyTurned', eventListner);
```

## License 
primal.js is licensed under the MIT license
