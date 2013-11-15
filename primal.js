/*
  primal.js 0.0.1 | otm/primal.js | @license MIT
  (c) 2013 Nils Lagerkvist
*/
var primal = (function(){

  var primal = function(){};

  primal.version = '0.0.1';

  primal.isFunction = function (el) {
    return Object.prototype.toString.call(el) == '[object Function]';
  };

  primal.observable = function(instance, cls) {
   
    instance.$events = {};

    cls = (cls) ? cls.prototype : instance; 
    if (cls.$isObservable) return;
    cls.$isObservable = true;

    function removeOn(string){
      return string.replace(/^on([A-Z])/, function(full, first){
        return first.toLowerCase();
      });
    }

    cls.addEvent = function(type, fn) {
      if (!primal.isFunction(fn)){
        return this;
      }

      type = removeOn(type);

      (this.$events[type] = this.$events[type] || []).push(fn);

      return this;  
    };

    cls.addEvents = function(events){
      for (var type in events) this.addEvent(type, events[type]);
      return this;
    };

    cls.fireEvent = function(type, args, delay) {
      type = removeOn(type);
      var events = this.$events[type];

      if (!events) return this;
      
      args = (args instanceof Array) ? args : [args];

      events.forEach(function(fn){
        if (delay) setTimeout(function() { fn.apply(this, args); }, delay);
        else fn.apply(this, args);
      }, this); 

      return this;
    };
    
    cls.removeEvent = function(type, fn) {
      type = removeOn(type);

      var events = this.$events[type];
      var index = events.indexOf(fn);
      if (index !== -1) events.splice(index, 1);

      return this;
    };

    cls.removeEvents = function(events){
      var type;
      if (typeof(events) == 'object'){
        for (type in events) this.removeEvent(type, events[type]);
        return this;
      }

      if (events) events = removeOn(events);
      for (type in this.$events){
        if (events && events != type) continue;
        var fns = this.$events[type];
        for (var i = fns.length; i--;) if (i in fns){
          this.removeEvent(type, fns[i]);
        }
      }
      return this;
    };

    return instance;
  };

  primal.mediator = function(instance, cls){
    instance.$topics = {};

    cls = (cls) ? cls.prototype : instance; 
    if (cls.$isObservable) return;
    cls.$isObservable = true;

    cls.subscribe = function(topic, fn){
      if (!primal.isFunction(fn)){
        return this;
      }

      (this.$topics[topic] = this.$topics[topic] || []).push(fn);

      return this;  
    };

    cls.publish = function(topic, args, delay){
      var events = this.$topics[topic];

      if (!events) return this;
      
      args = (args instanceof Array) ? args : [args];

      events.forEach(function(fn){
        if (delay) setTimeout(function() { fn.apply(this, args); }, delay);
        else fn.apply(this, args);
      }, this); 

      return this;
    };

    cls.unsubscribe = function(topic, fn){
      var events = this.$topics[topic];
      var index = events.indexOf(fn);
      if (index !== -1) events.splice(index, 1);

      return this;
    };
    
    return instance;
  };

  return primal;
})();