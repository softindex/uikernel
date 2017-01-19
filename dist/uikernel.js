var UIKernel =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	__webpack_require__(1);
	__webpack_require__(2);
	const variables = __webpack_require__(4);

	const Module = {
	  applyGridFilters: __webpack_require__(5),
	  Grid: __webpack_require__(124),
	  Form: __webpack_require__(148),
	  createValidator: __webpack_require__(152).create,
	  exportGridData: __webpack_require__(170),
	  toJSON: __webpack_require__(171),
	  Models: {
	    Grid: {
	      Xhr: __webpack_require__(172),
	      Collection: __webpack_require__(181)
	    },
	    Events: __webpack_require__(149),
	    Form: __webpack_require__(182),
	    FormXhr: __webpack_require__(184),
	    ValidationErrors: __webpack_require__(139),
	    List: {
	      Xhr: __webpack_require__(185)
	    }
	  },
	  AbstractModels: {
	    Form: __webpack_require__(183),
	    Grid: __webpack_require__(173),
	    List: __webpack_require__(186)
	  },
	  Adapters: {
	    Grid: {
	      ToFormUpdate: __webpack_require__(187),
	      ToFormCreate: __webpack_require__(188)
	    }
	  },
	  Editors: {
	    Select: __webpack_require__(189),
	    SuggestBox: __webpack_require__(190),
	    DatePicker: __webpack_require__(192),
	    Checkbox: __webpack_require__(193),
	    Number: __webpack_require__(194)
	  },
	  ArgumentsError: __webpack_require__(151),
	  ThrottleError: __webpack_require__(119),
	  Validators: {
	    boolean: __webpack_require__(196),
	    date: __webpack_require__(197),
	    enum: __webpack_require__(198),
	    set: __webpack_require__(199),
	    float: __webpack_require__(195),
	    regExp: __webpack_require__(200),
	    notNull: __webpack_require__(201),
	    number: __webpack_require__(202),
	    notEmpty: __webpack_require__(203)
	  },
	  Mixins: {
	    Form: __webpack_require__(204)
	  },
	  _get: variables.get,
	  _set: variables.set
	};

	module.exports = Module;


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (typeof window !== 'undefined' && typeof window.setImmediate !== 'function') {
	  window.setImmediate = function () {
	    var head = {};
	    var tail = head;
	    var ID = Math.random();

	    function onMessage(e) {
	      if (e.data !== ID) {
	        return;
	      }
	      head = head.next;
	      var func = head.func;
	      delete head.func;
	      func();
	    }

	    if (window.addEventListener) {
	      window.addEventListener('message', onMessage, false);
	    } else {
	      window.attachEvent('onmessage', onMessage);
	    }
	    return window.postMessage ? function (func) {
	      tail = tail.next = { func: func };
	      window.postMessage(ID, '*');
	    } : function (func) {
	      setTimeout(func, 0);
	    };
	  }();
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };

	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var variables = {};

	exports.default = {
	  get: function get(key) {
	    return variables[key];
	  },
	  set: function set(key, value) {
	    variables[key] = value;
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Defines filter values while reading Grid model data
	 *
	 * @param {AbstractGridModel} model       Grid model
	 * @param {Object}            filters     Filter values
	 */
	function applyGridFilters(model, filters) {
	  return _utils2.default.decorate(model, {
	    read: (0, _callbackify2.default)(function (options) {
	      options.filters = filters;
	      return (0, _toPromise2.default)(model.read.bind(model))(options);
	    })
	  });
	} /**
	   * Copyright (с) 2015-present, SoftIndex LLC.
	   * All rights reserved.
	   *
	   * This source code is licensed under the BSD-style license found in the
	   * LICENSE file in the root directory of this source tree.
	   */

	exports.default = applyGridFilters;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var functionsNames = []; /**
	                          * Copyright (с) 2015-present, SoftIndex LLC.
	                          * All rights reserved.
	                          *
	                          * This source code is licensed under the BSD-style license found in the
	                          * LICENSE file in the root directory of this source tree.
	                          */

	var toPromise = function toPromise(func, hideWarning) {
	  var funcName = func.name;
	  return function () {
	    for (var _len = arguments.length, mainArguments = Array(_len), _key = 0; _key < _len; _key++) {
	      mainArguments[_key] = arguments[_key];
	    }

	    var promise = void 0;
	    var callbackPromise = new _promise2.default(function (resolve, reject) {
	      mainArguments.push(function toPomiseCallback(err, data) {
	        if (err) {
	          return reject(err);
	        }
	        resolve(data);
	      });
	      promise = func.apply(undefined, mainArguments);
	    });

	    if (promise) {
	      if (promise.then && promise.catch) {
	        return promise;
	      }
	      _utils2.default.warn('The return value is not a function');
	    } else {
	      if (!hideWarning) {
	        if (!functionsNames.includes(funcName)) {
	          _utils2.default.warn('You are used callback in: \'' + funcName + '\'. Use promise instead');
	          functionsNames.push(funcName);
	        }
	      }
	      return callbackPromise;
	    }
	  };
	};

	exports.default = toPromise;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(8), __esModule: true };

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(54);
	__webpack_require__(58);
	module.exports = __webpack_require__(18).Promise;

/***/ },
/* 9 */
/***/ function(module, exports) {

	

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(11)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(14)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(12)
	  , defined   = __webpack_require__(13);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(15)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(32)
	  , Iterators      = __webpack_require__(33)
	  , $iterCreate    = __webpack_require__(34)
	  , setToStringTag = __webpack_require__(50)
	  , getPrototypeOf = __webpack_require__(52)
	  , ITERATOR       = __webpack_require__(51)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , core      = __webpack_require__(18)
	  , ctx       = __webpack_require__(19)
	  , hide      = __webpack_require__(21)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 17 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 18 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(20);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(22)
	  , createDesc = __webpack_require__(30);
	module.exports = __webpack_require__(26) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(23)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , toPrimitive    = __webpack_require__(29)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(26) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(26) && !__webpack_require__(27)(function(){
	  return Object.defineProperty(__webpack_require__(28)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(27)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(24)
	  , document = __webpack_require__(17).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(24);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 32 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(35)
	  , descriptor     = __webpack_require__(30)
	  , setToStringTag = __webpack_require__(50)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(51)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(23)
	  , dPs         = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(48)
	  , IE_PROTO    = __webpack_require__(45)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(28)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(49).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(22)
	  , anObject = __webpack_require__(23)
	  , getKeys  = __webpack_require__(37);

	module.exports = __webpack_require__(26) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(38)
	  , enumBugKeys = __webpack_require__(48);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(32)
	  , toIObject    = __webpack_require__(39)
	  , arrayIndexOf = __webpack_require__(42)(false)
	  , IE_PROTO     = __webpack_require__(45)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(40)
	  , defined = __webpack_require__(13);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(41);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(39)
	  , toLength  = __webpack_require__(43)
	  , toIndex   = __webpack_require__(44);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(12)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(12)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(46)('keys')
	  , uid    = __webpack_require__(47);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(17)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 47 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17).document && document.documentElement;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(22).f
	  , has = __webpack_require__(32)
	  , TAG = __webpack_require__(51)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(46)('wks')
	  , uid        = __webpack_require__(47)
	  , Symbol     = __webpack_require__(17).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(32)
	  , toObject    = __webpack_require__(53)
	  , IE_PROTO    = __webpack_require__(45)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(13);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(55);
	var global        = __webpack_require__(17)
	  , hide          = __webpack_require__(21)
	  , Iterators     = __webpack_require__(33)
	  , TO_STRING_TAG = __webpack_require__(51)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(56)
	  , step             = __webpack_require__(57)
	  , Iterators        = __webpack_require__(33)
	  , toIObject        = __webpack_require__(39);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(14)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(15)
	  , global             = __webpack_require__(17)
	  , ctx                = __webpack_require__(19)
	  , classof            = __webpack_require__(59)
	  , $export            = __webpack_require__(16)
	  , isObject           = __webpack_require__(24)
	  , aFunction          = __webpack_require__(20)
	  , anInstance         = __webpack_require__(60)
	  , forOf              = __webpack_require__(61)
	  , speciesConstructor = __webpack_require__(65)
	  , task               = __webpack_require__(66).set
	  , microtask          = __webpack_require__(68)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;

	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(51)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();

	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};

	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(69)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(50)($Promise, PROMISE);
	__webpack_require__(70)(PROMISE);
	Wrapper = __webpack_require__(18)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(71)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(41)
	  , TAG = __webpack_require__(51)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(19)
	  , call        = __webpack_require__(62)
	  , isArrayIter = __webpack_require__(63)
	  , anObject    = __webpack_require__(23)
	  , toLength    = __webpack_require__(43)
	  , getIterFn   = __webpack_require__(64)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(23);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(33)
	  , ITERATOR   = __webpack_require__(51)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(59)
	  , ITERATOR  = __webpack_require__(51)('iterator')
	  , Iterators = __webpack_require__(33);
	module.exports = __webpack_require__(18).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(23)
	  , aFunction = __webpack_require__(20)
	  , SPECIES   = __webpack_require__(51)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(19)
	  , invoke             = __webpack_require__(67)
	  , html               = __webpack_require__(49)
	  , cel                = __webpack_require__(28)
	  , global             = __webpack_require__(17)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(41)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(17)
	  , macrotask = __webpack_require__(66).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(41)(process) == 'process';

	module.exports = function(){
	  var head, last, notify;

	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };

	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(21);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(17)
	  , core        = __webpack_require__(18)
	  , dP          = __webpack_require__(22)
	  , DESCRIPTORS = __webpack_require__(26)
	  , SPECIES     = __webpack_require__(51)('species');

	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(51)('iterator')
	  , SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }

	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _values = __webpack_require__(73);

	var _values2 = _interopRequireDefault(_values);

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _typeof2 = __webpack_require__(83);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _toConsumableArray2 = __webpack_require__(100);

	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _keys = __webpack_require__(105);

	var _keys2 = _interopRequireDefault(_keys);

	var _slicedToArray2 = __webpack_require__(109);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _entries = __webpack_require__(116);

	var _entries2 = _interopRequireDefault(_entries);

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _ThrottleError = __webpack_require__(119);

	var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseClone(obj, isDeep) {
	  var cloned = void 0;
	  var es6types = ['[object Set]', '[object WeakSet]', '[object Map]', '[object WeakMap]'];

	  if (!(obj instanceof Object) || obj instanceof Date || obj instanceof Function || obj instanceof RegExp) {
	    return obj;
	  }

	  if (Array.isArray(obj)) {
	    cloned = [];
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = (0, _getIterator3.default)(obj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var el = _step.value;

	        cloned.push(isDeep ? baseClone(el, true) : el);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  } else if (es6types.includes(obj.toString())) {
	    cloned = new obj.constructor(obj);
	  } else {
	    cloned = {};
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
	            field = _step2$value[0],
	            value = _step2$value[1];

	        cloned[field] = isDeep ? baseClone(value, true) : value;
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  }
	  return cloned;
	}

	/**
	 * Check if two arrays intersection exists
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	exports.isIntersection = function (a, b) {
	  var c = void 0;
	  if (a.length > b.length) {
	    c = a;
	    a = b;
	    b = c;
	  }
	  var _iteratorNormalCompletion3 = true;
	  var _didIteratorError3 = false;
	  var _iteratorError3 = undefined;

	  try {
	    for (var _iterator3 = (0, _getIterator3.default)(a), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	      var el = _step3.value;

	      if (b.includes(el)) {
	        return true;
	      }
	    }
	  } catch (err) {
	    _didIteratorError3 = true;
	    _iteratorError3 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion3 && _iterator3.return) {
	        _iterator3.return();
	      }
	    } finally {
	      if (_didIteratorError3) {
	        throw _iteratorError3;
	      }
	    }
	  }

	  return false;
	};

	/**
	 * Define object size
	 *
	 * @param   {Object}    obj     Object
	 * @return  {number}    Object size
	 */
	exports.size = function (obj) {
	  return (0, _keys2.default)(obj).length;
	};

	/**
	 * Element position (isEqual checking)
	 *
	 * @param   {Array}   arr   Array
	 * @param   {*}       item  Element item
	 * @return  {number}
	 */
	exports.indexOf = function (arr, item) {
	  for (var i = 0; i < arr.length; i++) {
	    if (exports.isEqual(arr[i], item)) {
	      return i;
	    }
	  }
	  return -1;
	};

	exports.throttle = function (func) {
	  return function () {
	    if (typeof arguments[arguments.length - 1] === 'function') {
	      return throttleCallback(func).apply(this, arguments);
	    } else {
	      return throttlePromise(func).apply(this, arguments);
	    }
	  };

	  function throttleCallback(func) {
	    var worked = false;
	    var nextArguments = void 0;

	    return function run() {
	      var ctx = this; // Function context
	      var cb = arguments[arguments.length - 1];
	      var argumentsArray = [].slice.call(arguments);

	      function nextWorker() {
	        worked = false;
	        if (nextArguments) {
	          var args = nextArguments;
	          nextArguments = null;
	          run.apply(ctx, args);
	          return true;
	        }
	        return false;
	      }

	      if (worked) {
	        // Set as the next call
	        nextArguments = arguments;
	        return;
	      }

	      worked = true;

	      var cbWrapper = function cbWrapper() {
	        if (!nextWorker() && typeof cb === 'function') {
	          cb.apply(null, arguments);
	        }
	      };

	      if (typeof cb === 'function') {
	        argumentsArray[argumentsArray.length - 1] = cbWrapper;
	        func.apply(this, argumentsArray.concat(nextWorker));
	      } else {
	        func.apply(this, argumentsArray.concat(cbWrapper, nextWorker));
	      }
	    };
	  }

	  function throttlePromise(func) {
	    var worked = false;
	    var nextArguments = void 0;
	    var nextResolve = void 0;

	    /**
	     * @throws {ThrottleError} Too many function call
	     */
	    return function run() {
	      var _this = this;

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      var parentStack = '\n' + exports.getStack();

	      return new _promise2.default(function (resolve, reject) {
	        if (worked) {
	          nextArguments = args;
	          if (nextResolve) {
	            var error = new _ThrottleError2.default();
	            error.stack += parentStack;
	            nextResolve(_promise2.default.reject(error));
	          }
	          nextResolve = resolve;
	          return;
	        }

	        worked = true;

	        func.apply(_this, args).then(function (result) {
	          worked = false;
	          if (nextArguments) {
	            nextResolve(run.apply(undefined, (0, _toConsumableArray3.default)(nextArguments)));
	            nextArguments = null;

	            var _error = new _ThrottleError2.default();
	            _error.stack += parentStack;
	            reject(_error);
	            return;
	          }
	          resolve(result);
	        }).catch(function (err) {
	          worked = false;
	          reject(err);
	        });
	      });
	    };
	  }
	};

	exports.parseValueFromEvent = function (event) {
	  if (event && (typeof event === 'undefined' ? 'undefined' : (0, _typeof3.default)(event)) === 'object' && event.target && ['INPUT', 'TEXTAREA', 'SELECT'].indexOf(event.target.tagName) >= 0) {
	    switch (event.target.type) {
	      case 'checkbox':
	        return event.target.checked;
	    }
	    return event.target.value;
	  }
	  return event;
	};

	exports.decorate = function (obj, decor) {
	  function Decorator() {
	    (0, _assign2.default)(this, decor);

	    for (var i in obj) {
	      if (typeof obj[i] === 'function' && !decor[i]) {
	        this[i] = obj[i].bind(obj);
	      }
	    }
	  }
	  Decorator.prototype = obj;
	  Decorator.prototype.constructor = Decorator;
	  return new Decorator();
	};

	/**
	 * Checking at equals params
	 *
	 * @param a
	 * @param b
	 * @returns {boolean}
	 */
	exports.isEqual = function (a, b) {
	  if (a === null || b === null || a === undefined || b === undefined || typeof a === 'function' || typeof b === 'function' || a instanceof RegExp || b instanceof RegExp) {
	    return a === b;
	  }
	  if (a === b || a.valueOf() === b.valueOf() || a !== a && b !== b) {
	    return true;
	  }
	  if (Array.isArray(a) && (!Array.isArray(b) || a.length !== b.length) || !((typeof a === 'undefined' ? 'undefined' : (0, _typeof3.default)(a)) === 'object')) {
	    return false;
	  }

	  var p = (0, _keys2.default)(a);
	  return (0, _keys2.default)(b).every(function (i) {
	    return p.indexOf(i) >= 0;
	  }) && p.every(function (i) {
	    return exports.isEqual(a[i], b[i]);
	  });
	};

	/**
	 * Clone object
	 *
	 * @param obj
	 * @returns {*}
	 */
	exports.clone = function (obj) {
	  return baseClone(obj, false);
	};

	exports.cloneDeep = function (obj) {
	  return baseClone(obj, true);
	};

	exports.isEmpty = function (value) {
	  if (!value) {
	    return true;
	  }
	  if (Array.isArray(value)) {
	    return value.length === 0;
	  }
	  if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
	    return (0, _keys2.default)(value).length === 0;
	  }
	  return false;
	};

	exports.isDefined = function (value) {
	  return value !== null && value !== undefined && value !== '';
	};

	exports.forEach = function (obj, func, ctx) {
	  for (var i in obj) {
	    func.call(ctx, obj[i], i);
	  }
	};

	exports.pluck = function (arr, field) {
	  return arr.map(function (item) {
	    return item[field];
	  });
	};

	exports.find = function (arr, func) {
	  for (var i in arr) {
	    if (func(arr[i], i)) {
	      return arr[i];
	    }
	  }
	  return null;
	};

	exports.findIndex = function (obj, func) {
	  for (var i in obj) {
	    if (func(obj[i], i)) {
	      return i;
	    }
	  }
	  return -1;
	};

	exports.omit = function (obj, predicate) {
	  var result = {};
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;

	  try {
	    for (var _iterator4 = (0, _getIterator3.default)((0, _entries2.default)(obj)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
	          field = _step4$value[0],
	          value = _step4$value[1];

	      if (typeof predicate === 'string' && predicate !== field || Array.isArray(predicate) && !predicate.includes(field) || typeof predicate === 'function' && !predicate(value, field)) {
	        result[field] = value;
	      }
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }

	  return result;
	};

	exports.escape = function (string) {
	  var reUnescaped = /[&<>"'`]/g;
	  var escapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    '\'': '&#39;',
	    '`': '&#96;'
	  };
	  string = '' + (string === null ? '' : string.toString());
	  if (string && reUnescaped.test(string)) {
	    return string.replace(reUnescaped, function (chr) {
	      return escapes[chr];
	    });
	  }
	  return string;
	};

	exports.zipObject = function (keys, values) {
	  var result = {};
	  for (var i = 0; i < keys.length; i++) {
	    result[keys[i]] = values[i];
	  }
	  return result;
	};

	exports.pick = function (obj, keys, defaultValue) {
	  return keys.reduce(function (result, key) {
	    if (obj.hasOwnProperty(key)) {
	      result[key] = obj[key];
	    } else if (defaultValue !== undefined) {
	      result[key] = defaultValue;
	    }
	    return result;
	  }, {});
	};

	exports.reduce = function (obj, func, value) {
	  for (var i in obj) {
	    value = func(value, obj[i], i);
	  }
	  return value;
	};

	exports.union = function () {
	  var elements = {};

	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  var _iteratorNormalCompletion5 = true;
	  var _didIteratorError5 = false;
	  var _iteratorError5 = undefined;

	  try {
	    for (var _iterator5 = (0, _getIterator3.default)(args), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	      var arg = _step5.value;
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = (0, _getIterator3.default)(arg), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var el = _step6.value;

	          elements[el] = el;
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError5 = true;
	    _iteratorError5 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion5 && _iterator5.return) {
	        _iterator5.return();
	      }
	    } finally {
	      if (_didIteratorError5) {
	        throw _iteratorError5;
	      }
	    }
	  }

	  return (0, _values2.default)(elements);
	};

	exports.at = function (obj, keys) {
	  var result = [];
	  if (!Array.isArray(keys)) {
	    return [obj[keys]];
	  }
	  var _iteratorNormalCompletion7 = true;
	  var _didIteratorError7 = false;
	  var _iteratorError7 = undefined;

	  try {
	    for (var _iterator7 = (0, _getIterator3.default)(keys), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	      var key = _step7.value;

	      result.push(obj[key]);
	    }
	  } catch (err) {
	    _didIteratorError7 = true;
	    _iteratorError7 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion7 && _iterator7.return) {
	        _iterator7.return();
	      }
	    } finally {
	      if (_didIteratorError7) {
	        throw _iteratorError7;
	      }
	    }
	  }

	  return result;
	};

	exports.pairs = function (obj) {
	  var result = [];
	  for (var i in obj) {
	    result.push([i, obj[i]]);
	  }
	  return result;
	};

	exports.toDate = function (value) {
	  var date = void 0;

	  if (typeof value === 'number') {
	    return new Date(value);
	  }

	  if (typeof value === 'string') {
	    date = new Date(value);
	    date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000); // Convert UTC to local time
	    return date;
	  }

	  return new Date(value);
	};

	exports.without = function (arr, el) {
	  var result = [];
	  for (var i = 0; i < arr.length; i++) {
	    if (Array.isArray(el) ? exports.isIntersection(arr[i], el) : arr[i] === el) {
	      continue;
	    }
	    result.push(arr[i]);
	  }
	  return result;
	};

	exports.last = function (arr) {
	  return arr[arr.length - 1];
	};

	exports.getRecordChanges = function (model, data, changes, newChanges) {
	  var result = (0, _assign2.default)({}, changes, newChanges);

	  for (var i in result) {
	    if (exports.isEqual(data[i], result[i])) {
	      delete result[i];
	    }
	  }

	  (0, _assign2.default)(result, exports.pick(data, model.getValidationDependency((0, _keys2.default)(result))));

	  return result;
	};

	exports.getStack = function () {
	  return new Error().stack.split('\n').slice(2) // Error message, getStack
	  .join('\n');
	};

	exports.warn = function (message) {
	  console.warn(message, '\n', exports.getStack());
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	module.exports = __webpack_require__(18).Object.values;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(16)
	  , $values = __webpack_require__(76)(false);

	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(37)
	  , toIObject = __webpack_require__(39)
	  , isEnum    = __webpack_require__(77).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	module.exports = __webpack_require__(18).Object.assign;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(16);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(81)});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(37)
	  , gOPS     = __webpack_require__(82)
	  , pIE      = __webpack_require__(77)
	  , toObject = __webpack_require__(53)
	  , IObject  = __webpack_require__(40)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(27)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 82 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(84);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(87);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(54);
	module.exports = __webpack_require__(86).f('iterator');

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(51);

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(89);
	__webpack_require__(9);
	__webpack_require__(98);
	__webpack_require__(99);
	module.exports = __webpack_require__(18).Symbol;

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(17)
	  , has            = __webpack_require__(32)
	  , DESCRIPTORS    = __webpack_require__(26)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(31)
	  , META           = __webpack_require__(90).KEY
	  , $fails         = __webpack_require__(27)
	  , shared         = __webpack_require__(46)
	  , setToStringTag = __webpack_require__(50)
	  , uid            = __webpack_require__(47)
	  , wks            = __webpack_require__(51)
	  , wksExt         = __webpack_require__(86)
	  , wksDefine      = __webpack_require__(91)
	  , keyOf          = __webpack_require__(92)
	  , enumKeys       = __webpack_require__(93)
	  , isArray        = __webpack_require__(94)
	  , anObject       = __webpack_require__(23)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(29)
	  , createDesc     = __webpack_require__(30)
	  , _create        = __webpack_require__(35)
	  , gOPNExt        = __webpack_require__(95)
	  , $GOPD          = __webpack_require__(97)
	  , $DP            = __webpack_require__(22)
	  , $keys          = __webpack_require__(37)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(96).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(77).f  = $propertyIsEnumerable;
	  __webpack_require__(82).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(15)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(21)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(47)('meta')
	  , isObject = __webpack_require__(24)
	  , has      = __webpack_require__(32)
	  , setDesc  = __webpack_require__(22).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(27)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(17)
	  , core           = __webpack_require__(18)
	  , LIBRARY        = __webpack_require__(15)
	  , wksExt         = __webpack_require__(86)
	  , defineProperty = __webpack_require__(22).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(37)
	  , toIObject = __webpack_require__(39);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(37)
	  , gOPS    = __webpack_require__(82)
	  , pIE     = __webpack_require__(77);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(41);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(39)
	  , gOPN      = __webpack_require__(96).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(38)
	  , hiddenKeys = __webpack_require__(48).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(77)
	  , createDesc     = __webpack_require__(30)
	  , toIObject      = __webpack_require__(39)
	  , toPrimitive    = __webpack_require__(29)
	  , has            = __webpack_require__(32)
	  , IE8_DOM_DEFINE = __webpack_require__(25)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(26) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91)('asyncIterator');

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(91)('observable');

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(101);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(103);
	module.exports = __webpack_require__(18).Array.from;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(19)
	  , $export        = __webpack_require__(16)
	  , toObject       = __webpack_require__(53)
	  , call           = __webpack_require__(62)
	  , isArrayIter    = __webpack_require__(63)
	  , toLength       = __webpack_require__(43)
	  , createProperty = __webpack_require__(104)
	  , getIterFn      = __webpack_require__(64);

	$export($export.S + $export.F * !__webpack_require__(71)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(22)
	  , createDesc      = __webpack_require__(30);

	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(106), __esModule: true };

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(107);
	module.exports = __webpack_require__(18).Object.keys;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(53)
	  , $keys    = __webpack_require__(37);

	__webpack_require__(108)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(16)
	  , core    = __webpack_require__(18)
	  , fails   = __webpack_require__(27);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _isIterable2 = __webpack_require__(110);

	var _isIterable3 = _interopRequireDefault(_isIterable2);

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	__webpack_require__(10);
	module.exports = __webpack_require__(112);

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(59)
	  , ITERATOR  = __webpack_require__(51)('iterator')
	  , Iterators = __webpack_require__(33);
	module.exports = __webpack_require__(18).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	__webpack_require__(10);
	module.exports = __webpack_require__(115);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(23)
	  , get      = __webpack_require__(64);
	module.exports = __webpack_require__(18).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	module.exports = __webpack_require__(18).Object.entries;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(16)
	  , $entries = __webpack_require__(76)(true);

	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _create = __webpack_require__(120);

	var _create2 = _interopRequireDefault(_create);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	function ThrottleError() {
	  this.message = 'Too many function call';
	  Error.captureStackTrace(this, ThrottleError);
	}

	ThrottleError.prototype = (0, _create2.default)(Error.prototype);
	ThrottleError.prototype.constructor = ThrottleError;

	exports.default = ThrottleError;
	module.exports = exports['default'];

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(122);
	var $Object = __webpack_require__(18).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(35)});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (func) {
	  var hideWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  var funcName = func.name;

	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var lastArgumentIndex = args.length - 1;
	    var cb = args[lastArgumentIndex];

	    if (typeof cb === 'function' && cb.name !== 'toPomiseCallback' && !hideWarning) {
	      if (!functionsNames.includes(funcName)) {
	        _utils2.default.warn('You are used callback in: \'' + funcName + '\'. Use promise instead');
	        functionsNames.push(funcName);
	      }

	      var result = func.apply(this, args);
	      if (result && result.then) {
	        result.then(function (data) {
	          cb(null, data);
	        }).catch(function (err) {
	          cb(err);
	        });
	      }
	    } else {
	      return func.apply(this, args);
	    }
	  };
	};

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var functionsNames = []; /**
	                          * Copyright (с) 2015-present, SoftIndex LLC.
	                          * All rights reserved.
	                          *
	                          * This source code is licensed under the BSD-style license found in the
	                          * LICENSE file in the root directory of this source tree.
	                          */

	module.exports = exports['default'];

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _columns = __webpack_require__(127);

	var _columns2 = _interopRequireDefault(_columns);

	var _pagination = __webpack_require__(128);

	var _pagination2 = _interopRequireDefault(_pagination);

	var _statuses = __webpack_require__(129);

	var _statuses2 = _interopRequireDefault(_statuses);

	var _sorting = __webpack_require__(133);

	var _sorting2 = _interopRequireDefault(_sorting);

	var _data = __webpack_require__(134);

	var _data2 = _interopRequireDefault(_data);

	var _editor = __webpack_require__(145);

	var _editor2 = _interopRequireDefault(_editor);

	var _ui = __webpack_require__(146);

	var _ui2 = _interopRequireDefault(_ui);

	var _select = __webpack_require__(147);

	var _select2 = _interopRequireDefault(_select);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	/**
	 * React table component
	 */

	var RESET_MODEL = 1 << 0;
	var RESET_VIEW_COLUMNS = 1 << 1;
	var RESET_SORT = 1 << 2;
	var RESET_VIEW_COUNT = 1 << 3;

	var GridComponent = _react2.default.createClass((0, _extends3.default)({
	  displayName: 'GridComponent'
	}, _columns2.default, _pagination2.default, _statuses2.default, _sorting2.default, _data2.default, _editor2.default, _ui2.default, _select2.default, {

	  propTypes: function () {
	    var sortElementProp = _react2.default.PropTypes.shape({
	      column: _react2.default.PropTypes.string,
	      direction: _react2.default.PropTypes.string
	    });
	    var sortProp = _react2.default.PropTypes.oneOfType([sortElementProp, _react2.default.PropTypes.arrayOf(sortElementProp)]);
	    return {
	      className: _react2.default.PropTypes.string,
	      model: _react2.default.PropTypes.shape({
	        read: _react2.default.PropTypes.func.isRequired,
	        update: _react2.default.PropTypes.func,
	        isValidRecord: _react2.default.PropTypes.func,
	        getValidationDependency: _react2.default.PropTypes.func,
	        on: _react2.default.PropTypes.func.isRequired,
	        off: _react2.default.PropTypes.func.isRequired
	      }),
	      viewColumns: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.object]),
	      // sort: React.PropTypes.object,
	      page: _react2.default.PropTypes.number,
	      defaultViewCount: _react2.default.PropTypes.number,
	      viewCount: _react2.default.PropTypes.number,
	      viewVariants: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number),
	      onChangeViewCount: _react2.default.PropTypes.func,
	      onError: _react2.default.PropTypes.func,
	      onPageLoad: _react2.default.PropTypes.func,
	      height: _react2.default.PropTypes.number,
	      onSorting: _react2.default.PropTypes.func,
	      defaultSort: function defaultSort(props, propName) {
	        if (!props.defaultSort) {
	          return;
	        }
	        var validProp = sortProp(props, propName);
	        if (validProp) {
	          return validProp;
	        }
	        if (props.hasOwnProperty('sort')) {
	          return Error('You can not set "defaultSort" when specified "sort" prop');
	        }
	      },
	      sort: function sort(props, propName) {
	        if (!props.sort) {
	          return;
	        }
	        var validProp = sortProp(props, propName);
	        if (validProp) {
	          return validProp;
	        }
	        if (!props.onSorting) {
	          return Error('You need to define prop "onSorting" when set "sort"');
	        }
	      },
	      saveFullRecord: _react2.default.PropTypes.bool,
	      partialErrorChecking: _react2.default.PropTypes.bool,
	      warningsValidator: _react2.default.PropTypes.shape({
	        isValidRecord: _react2.default.PropTypes.func,
	        getValidationDependency: _react2.default.PropTypes.func
	      })
	    };
	  }(),
	  getDefaultProps: function getDefaultProps() {
	    return {
	      page: 0,
	      defaultViewCount: 0,
	      partialErrorChecking: false
	    };
	  },
	  getInitialState: function getInitialState() {
	    this._loadData = _utils2.default.throttle(this._loadData);
	    this._validateRow = _utils2.default.throttle(this._validateRow);
	    this._checkWarnings = _utils2.default.throttle(this._checkWarnings);
	    return {
	      page: this.props.page,
	      viewCount: this.props.defaultViewCount,
	      count: 0,
	      statusMap: {
	        new: 1 << 0
	      },
	      statuses: {},
	      sort: this._getDefaultSort(),
	      data: null,
	      changes: {},
	      warnings: {},
	      errors: {},
	      totals: {},
	      recordsInfo: {},
	      mainIds: [],
	      partialErrorChecking: this.props.partialErrorChecking,
	      editor: {},
	      colsWithEscapeErrors: {},
	      selectBlackListMode: false,
	      selected: []
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this._isMounted = true;
	    if (this.props.model) {
	      this.props.model.on('create', this._onRecordCreated);
	      this.props.model.on('update', this._setData);
	    }
	    this.updateTable();
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._isMounted = false;
	    if (this.props.model) {
	      this.props.model.off('create', this._onRecordCreated);
	      this.props.model.off('update', this._setData);
	    }
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var oldProps = this.props;
	    var reset = 0;

	    if (!_utils2.default.isEqual(this.props.model, nextProps.model)) {
	      reset |= RESET_MODEL;
	    }
	    if (!_utils2.default.isEqual(this.props.viewColumns, nextProps.viewColumns)) {
	      reset |= RESET_VIEW_COLUMNS;
	    }
	    if (!_utils2.default.isEqual(this.props.sort, nextProps.sort)) {
	      reset |= RESET_SORT;
	    }
	    if (this.props.viewCount !== nextProps.viewCount) {
	      reset |= RESET_VIEW_COUNT;
	    }

	    if (!reset) {
	      return;
	    }

	    this.setState({}, function () {
	      if (reset & RESET_SORT || reset & RESET_MODEL || reset & RESET_VIEW_COUNT) {
	        if (reset & RESET_MODEL) {
	          this.state.data = null;
	          if (oldProps.model) {
	            oldProps.model.off('create', this._onRecordCreated);
	            oldProps.model.off('update', this._setData);
	          }
	          if (this.props.model) {
	            this.props.model.on('create', this._onRecordCreated);
	            this.props.model.on('update', this._setData);
	          }
	          this._setPage(0);
	        }
	        this.updateTable();
	      } else if (reset & RESET_VIEW_COLUMNS) {
	        this._renderBody();
	      }
	    });
	  },
	  renderScrollableGrid: function renderScrollableGrid(gridClassNames) {
	    var _this = this;

	    var header = this._formHeader();
	    return _react2.default.createElement(
	      'div',
	      { className: gridClassNames.join(' ') },
	      _react2.default.createElement(
	        'div',
	        { className: 'wrapper-dgrid-header' },
	        _react2.default.createElement(
	          'table',
	          { cellSpacing: '0', className: 'dgrid-header' },
	          _react2.default.createElement(
	            'colgroup',
	            null,
	            header.colGroup
	          ),
	          header.cols.map(function (row, colKey) {
	            return _react2.default.createElement(
	              'tr',
	              { key: colKey },
	              row.map(function (col, rowKey) {
	                return _react2.default.createElement('th', {
	                  key: rowKey,
	                  className: col.className,
	                  onClick: col.sort ? _this._sortCol.bind(_this, col.field) : _this._handleHeaderCellClick.bind(_this, col),
	                  colSpan: col.cols,
	                  rowSpan: col.rows,
	                  dangerouslySetInnerHTML: {
	                    __html: _this._getHeaderCellHTML(col.name || col.id)
	                  }
	                });
	              })
	            );
	          })
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        {
	          style: { maxHeight: this.props.height },
	          className: 'dgrid-body-wrapper dgrid-scrollable'
	        },
	        _react2.default.createElement(
	          'div',
	          { className: 'dgrid-body' },
	          _react2.default.createElement('div', { className: 'dgrid-loader', ref: 'loader' }),
	          _react2.default.createElement(
	            'table',
	            {
	              cellSpacing: '0',
	              ref: 'body',
	              onClick: this._handleBodyClick
	            },
	            _react2.default.createElement(
	              'colgroup',
	              null,
	              header.colGroup
	            ),
	            _react2.default.createElement('tbody', { className: 'dgrid-body-table', ref: 'tbody' })
	          )
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'wrapper-totals' },
	        this._renderTotals(this.props.height)
	      ),
	      this._renderPagination()
	    );
	  },
	  renderGrid: function renderGrid(gridClassNames) {
	    var _this2 = this;

	    var header = this._formHeader();
	    gridClassNames = gridClassNames.concat('dgrid-not-scrollable');
	    return _react2.default.createElement(
	      'div',
	      { className: gridClassNames.join(' ') },
	      _react2.default.createElement('div', { className: 'dgrid-loader', ref: 'loader' }),
	      _react2.default.createElement(
	        'table',
	        {
	          cellSpacing: '0',
	          className: 'dgrid-body-table',
	          ref: 'body',
	          onClick: this._handleBodyClick
	        },
	        _react2.default.createElement(
	          'colgroup',
	          null,
	          header.colGroup
	        ),
	        _react2.default.createElement(
	          'thead',
	          null,
	          header.cols.map(function (row, colKey) {
	            return _react2.default.createElement(
	              'tr',
	              { key: colKey },
	              row.map(function (col, rowKey) {
	                return _react2.default.createElement('th', {
	                  key: rowKey,
	                  className: col.className,
	                  onClick: col.sort ? _this2._sortCol.bind(_this2, col.field) : _this2._handleHeaderCellClick.bind(_this2, col),
	                  colSpan: col.cols,
	                  rowSpan: col.rows,
	                  dangerouslySetInnerHTML: {
	                    __html: _this2._getHeaderCellHTML(col.name || col.id)
	                  }
	                });
	              })
	            );
	          })
	        ),
	        _react2.default.createElement('tbody', { className: 'dgrid-body-table', ref: 'tbody' }),
	        this._renderTotals(this.props.height)
	      ),
	      this._renderPagination()
	    );
	  },
	  render: function render() {
	    var gridClassNames = ['data-grid'];

	    if (this.props.className) {
	      gridClassNames.push(this.props.className);
	    }

	    if (!this.props.height) {
	      return this.renderGrid(gridClassNames);
	    }

	    return this.renderScrollableGrid(gridClassNames);
	  }
	}));

	exports.default = GridComponent;
	module.exports = exports['default'];

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 126 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var GridColumnsMixin = {
	  /**
	   * Column visibility flag
	   *
	   * @param   {string}    id  Column ID
	   * @returns {boolean}   Column visibility
	   * @private
	   */
	  _isViewColumn: function _isViewColumn(id) {
	    if (!this.props.viewColumns) {
	      return true;
	    }

	    if (Array.isArray(this.props.viewColumns)) {
	      return this.props.viewColumns.indexOf(id) > -1;
	    }

	    return this.props.viewColumns[id];
	  },

	  /**
	   * Collect data for table header display
	   *
	   * @returns {Object} Formed data
	   * @private
	   */
	  _formHeader: function _formHeader() {
	    var rows = [[/* top */], [/* bottom */]];
	    var colGroup = [];
	    var lastParent = { name: '' };

	    for (var columnId in this.props.cols) {
	      // Skip column if it's invisible
	      if (!this._isViewColumn(columnId)) {
	        continue;
	      }

	      colGroup.push(_react2.default.DOM.col({
	        key: columnId,
	        width: this.props.cols[columnId].width,
	        className: this._getColumnClass(columnId)
	      }));

	      var classNames = [this._getColumnClass(columnId)];
	      var addInfo = {
	        id: columnId,
	        name: this.props.cols[columnId].name,
	        onClick: this.props.cols[columnId].onClick,
	        onClickRefs: this.props.cols[columnId].onClickRefs,
	        cols: 1,
	        rows: 1
	      };

	      var sortParams = this._getSortParams(columnId);
	      if (sortParams) {
	        classNames.push('dgrid-' + sortParams.direction);
	        addInfo.field = sortParams.column;
	        addInfo.sort = sortParams.direction;
	      }

	      addInfo.className = classNames.join(' ');

	      if (this.props.cols[columnId].parent) {
	        if (this.props.cols[columnId].parent !== lastParent.name) {
	          lastParent = rows[0][rows[0].push({
	            name: this.props.cols[columnId].parent,
	            cols: 1, rows: 1
	          }) - 1];
	        } else {
	          lastParent.cols++;
	        }
	        rows[1].push(addInfo);
	      } else {
	        lastParent = { name: '' };
	        addInfo.rows = 2;
	        rows[0].push(addInfo);
	      }
	    }
	    return { cols: rows, colGroup: colGroup };
	  },

	  /**
	   * Get the names of the parameters that are required to display the grid
	   *
	   * @return {string[]}
	   * @private
	   */
	  _getFieldsToRender: function _getFieldsToRender() {
	    var i = void 0;
	    var cols = this.props.cols;
	    var columns = [];
	    for (i in cols) {
	      columns = _utils2.default.union(columns, cols[i].render.slice(0, cols[i].render.length - 1));
	    }
	    return columns;
	  },

	  /**
	   * Does the parameters to display grid
	   *
	   * @param   {string}  field
	   * @return  {boolean}
	   * @private
	   */
	  _isFieldAffectsRender: function _isFieldAffectsRender(field) {
	    var i = void 0;
	    var cols = this.props.cols;
	    for (i in cols) {
	      if (cols[i].render.indexOf(field) >= 0) {
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Get a dependent column
	   *
	   * @param   {string}    field
	   * @return  {string[]}
	   * @private
	   */
	  _getDependentColumns: function _getDependentColumns(field) {
	    var i = void 0;
	    var cols = this.props.cols;
	    var columns = [];

	    for (i in cols) {
	      if (cols[i].render.indexOf(field) < 0) {
	        continue;
	      }
	      columns.push(i);
	    }
	    return columns;
	  },

	  _getColumnClass: function _getColumnClass(id) {
	    return this.props.cols[id].className;
	  }
	};

	exports.default = GridColumnsMixin;
	module.exports = exports['default'];

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GridPaginationMixin = {
	  /**
	   * Change event handler of displayed rows count in a table
	   *
	   * @param {Event} event
	   */
	  handleChangeViewCount: function handleChangeViewCount(event) {
	    var count = this.props.viewVariants[event.target.value];
	    if (this._isViewCountPropsMode()) {
	      this.props.onChangeViewCount(count);
	      return;
	    }
	    this.setViewCount(count);
	  },

	  /**
	   * Move to first page event handler
	   *
	   * @param {Event} event
	   */
	  handleFirstPage: function handleFirstPage(event) {
	    event.preventDefault();
	    this.setPage(0);
	  },

	  /**
	   * Move to last page event handler
	   *
	   * @param {Event} event
	   */
	  handleLastPage: function handleLastPage(event) {
	    event.preventDefault();
	    this.setPage(this.getPagesCount() - 1);
	  },

	  /**
	   * Move to previous page event handler
	   *
	   * @param {Event} event
	   */
	  handlePrevPage: function handlePrevPage(event) {
	    event.preventDefault();
	    this.setPage(this.state.page - 1);
	  },

	  /**
	   * Move to next page event handler
	   *
	   * @param {Event} event
	   */
	  handleNextPage: function handleNextPage(event) {
	    event.preventDefault();
	    this.setPage(this.state.page + 1);
	  },

	  /**
	   * Refresh table handler
	   *
	   */
	  handleRefreshTable: function handleRefreshTable(event) {
	    event.preventDefault();
	    this.updateTable();
	  },

	  /**
	   * Get current page index number
	   *
	   * @return {number}
	   */
	  getCurrentPage: function getCurrentPage() {
	    return this.state.page;
	  },

	  getCountRecords: function getCountRecords() {
	    return this.state.count;
	  },

	  /**
	   * Move to other page
	   *
	   * @param {number}  page     Page index number
	   */
	  setPage: function setPage(page) {
	    this._setPage(page);
	    this.updateTable();
	  },

	  /**
	   * Set displayed elements count
	   *
	   * @param {number} viewCount
	   */
	  setViewCount: function setViewCount(viewCount) {
	    if (this._isViewCountPropsMode()) {
	      throw Error('You can not use function "setViewCount" when set prop "viewCount"');
	    }

	    this.state.viewCount = viewCount;
	    this.state.page = this._checkPage(this.state.page, viewCount, this.state.count);
	    this.updateTable();
	  },

	  /**
	   * Get pages count
	   *
	   * @return {number}
	   */
	  getPagesCount: function getPagesCount() {
	    var viewCount = this.getViewCount();
	    return viewCount ? Math.ceil(this.state.count / viewCount) : 1;
	  },

	  getViewCount: function getViewCount() {
	    if (this._isViewCountPropsMode()) {
	      return this.props.viewCount;
	    }
	    return this.state.viewCount;
	  },

	  _setPage: function _setPage(page) {
	    this.state.page = this._checkPage(page, this.state.viewCount, this.state.count);
	  },

	  _checkPage: function _checkPage(page, view, count) {
	    if (page * view >= count) {
	      page = view ? Math.ceil(count / view) - 1 : 0;
	    }
	    return Math.max(0, page);
	  },

	  _isViewCountPropsMode: function _isViewCountPropsMode() {
	    return this.props.hasOwnProperty('viewCount');
	  },

	  _renderPagination: function _renderPagination() {
	    var viewCount = this.getViewCount();
	    return viewCount ? _react2.default.createElement(
	      'div',
	      { className: 'dgrid-footer' },
	      this.props.viewVariants ? [_react2.default.createElement(
	        'div',
	        { key: '0' },
	        'Page Size'
	      ), _react2.default.createElement(
	        'div',
	        { key: '1' },
	        _react2.default.createElement(
	          'select',
	          {
	            value: this.props.viewVariants.indexOf(viewCount),
	            onChange: this.handleChangeViewCount
	          },
	          this.props.viewVariants.map(function (option, key) {
	            return _react2.default.createElement(
	              'option',
	              { key: key, value: key },
	              option
	            );
	          }, this)
	        )
	      )] : null,
	      _react2.default.createElement('a', { href: '#', className: 'btn-first-page', onClick: this.handleFirstPage }),
	      _react2.default.createElement('a', { href: '#', className: 'btn-prev-page', onClick: this.handlePrevPage }),
	      this.state.count ? _react2.default.createElement(
	        'div',
	        null,
	        this.state.page * viewCount + 1,
	        ' - ',
	        Math.min((this.state.page + 1) * viewCount, this.state.count),
	        ' of ',
	        this.state.count
	      ) : null,
	      _react2.default.createElement('a', { href: '#', className: 'btn-next-page', onClick: this.handleNextPage }),
	      _react2.default.createElement('a', { href: '#', className: 'btn-last-page', onClick: this.handleLastPage }),
	      _react2.default.createElement('a', { href: '#', className: 'btn-refresh-page', onClick: this.handleRefreshTable })
	    ) : null;
	  }
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	exports.default = GridPaginationMixin;
	module.exports = exports['default'];

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _reactDom = __webpack_require__(132);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Grid mixin, responsible for row statuses processing
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var GridStatusesMixin = {

	  /**
	   * Add record status
	   *
	   * @param {*}    recordId    Record ID
	   * @param {string}           status      Record status
	   */
	  addRecordStatus: function addRecordStatus(recordId, status) {
	    var row = (0, _stringify2.default)(recordId);

	    // If list does not contain the record, mark its status as empty
	    if (!this.state.statuses.hasOwnProperty(row)) {
	      this.state.statuses[row] = {
	        id: recordId,
	        sum: 0
	      };
	    }

	    this.state.statuses[row].sum |= this._getStatusBit(status);

	    this._updateRow(row);
	  },

	  /**
	   * Add status to records group
	   *
	   * @param {Array}      group   Record IDs array
	   * @param {string}     status  Status
	   */
	  addRecordStatusGroup: function addRecordStatusGroup(group, status) {
	    var i = void 0;
	    var bit = this._getStatusBit(status);
	    var row = void 0;

	    for (i in group) {
	      row = (0, _stringify2.default)(group[i]);
	      if (!this.state.statuses.hasOwnProperty(row)) {
	        this.state.statuses[row] = {
	          id: group[i],
	          sum: 0
	        };
	      }
	      this.state.statuses[row].sum |= bit;
	    }

	    // TODO You can do without a full page reload
	    this.updateTable();
	  },

	  /**
	   * Remove record status
	   *
	   * @param {*}       recordId    Record ID
	   * @param {string}  status      Record status
	   */
	  removeRecordStatus: function removeRecordStatus(recordId, status) {
	    var bit = this._getStatusBit(status);
	    var row = (0, _stringify2.default)(recordId);

	    // Cancel method execution if record has no statuses
	    if (!this.state.statuses[row]) {
	      return;
	    }

	    // Remove status if record has it
	    if (this.state.statuses[row].sum & bit) {
	      this.state.statuses[row].sum ^= bit;
	      if (!this.state.statuses[row].sum) {
	        // Remove table record if it's extra
	        if (!this._isMainRow(row)) {
	          this._removeRecord(row);
	        }
	        delete this.state.statuses[row];
	      }
	    }

	    // Remove element's class
	    $((0, _reactDom.findDOMNode)(this.refs.body)).find('tr[key=' + row + ']').removeClass(status);
	  },

	  /**
	   * Check record status presence
	   *
	   * @param   {*}       recordId    Record ID
	   * @param   {number}  status      Record status
	   * @returns {boolean} Record has status flag
	   */
	  hasRecordStatus: function hasRecordStatus(recordId, status) {
	    var row = (0, _stringify2.default)(recordId);
	    if (this.state.statuses[row]) {
	      return (this.state.statuses[row].sum & this._getStatusBit(status)) > 0;
	    }
	    return false;
	  },

	  /**
	   * Get all record IDs that have the status
	   *
	   * @param {number}  status  Status
	   * @returns {Array} Record IDs array
	   */
	  getAllWithStatus: function getAllWithStatus(status) {
	    var i = void 0;
	    var records = [];
	    var bit = this._getStatusBit(status);

	    for (i in this.state.statuses) {
	      if (this.state.statuses[i].sum & bit) {
	        records.push(this.state.statuses[i].id);
	      }
	    }
	    return records;
	  },

	  /**
	   * Remove records status
	   *
	   * @param {string}      status  Status
	   */
	  removeRecordStatusAll: function removeRecordStatusAll(status) {
	    var i = void 0;
	    var bit = this._getStatusBit(status);

	    for (i in this.state.statuses) {
	      if (this.state.statuses[i].sum & bit) {
	        this.state.statuses[i].sum ^= bit;
	      }
	      if (!this.state.statuses[i].sum) {
	        if (!this._isMainRow(i) && !this._isChanged(i)) {
	          this._removeRecord(i);
	        }
	        delete this.state.statuses[i];
	      }
	    }
	    $((0, _reactDom.findDOMNode)(this.refs.body)).find('.dgrid-body tr.' + status).removeClass(status);
	  },

	  /**
	   * Get all status names that are applyed to the row
	   *
	   * @param   {string}    row    Row ID
	   * @return  {Array}  Status names array
	   * @private
	   */
	  _getRowStatusNames: function _getRowStatusNames(row) {
	    var names = [];
	    var statuses = this.state.statuses[row] && this.state.statuses[row].sum;

	    if (!statuses) {
	      return [];
	    }

	    for (var i in this.state.statusMap) {
	      if (statuses & this.state.statusMap[i]) {
	        names.push(i);
	      }
	    }

	    return names;
	  },

	  /**
	   * Get status as a bit using its text name
	   *
	   * @param       {string}    statusName  Status name
	   * @return      {number}    Bit
	   * @private
	   */
	  _getStatusBit: function _getStatusBit(statusName) {
	    var status = void 0;
	    var offset = void 0;

	    if (this.state.statusMap.hasOwnProperty(statusName)) {
	      status = this.state.statusMap[statusName];
	    } else {
	      // TODO offset stored in the state, I remove the utils.size
	      offset = _utils2.default.size(this.state.statusMap);
	      if (offset > 30) {
	        throw Error('Status quantity exceeds 30');
	      }
	      status = this.state.statusMap[statusName] = 1 << offset;
	    }

	    return status;
	  },

	  /**
	   * Get record IDs that have a status
	   *
	   * @return {Array}
	   * @private
	   */
	  _getRecordsWithStatus: function _getRecordsWithStatus() {
	    var ids = [];
	    var i = void 0;

	    for (i in this.state.statuses) {
	      ids.push(this.state.statuses[i].id);
	    }
	    return ids;
	  }
	};

	exports.default = GridStatusesMixin;
	module.exports = exports['default'];

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(131), __esModule: true };

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(18)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 132 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GridSortingMixin = {
	  /**
	   * Sort by column
	   *
	   * @param {string} column
	   * @param {string} direction
	   */
	  sort: function sort(column, direction) {
	    if (this._isSortingPropsMode()) {
	      throw Error('You can not use function "sort" when set prop "sort"');
	    }

	    var sort = {
	      column: column,
	      direction: direction
	    };

	    if (this.props.multipleSorting) {
	      this.state.sort.push(sort);
	    } else {
	      this.state.sort = sort;
	    }

	    this.setPage(0);

	    if (this.props.onSorting) {
	      this.props.onSorting(this.state.sort, column, direction);
	    }
	  },

	  /**
	   * Get sort direction
	   *
	   * @return {object|object[]}
	   */
	  getSortDirection: function getSortDirection() {
	    if (this._isSortingPropsMode()) {
	      return this.props.sort;
	    }
	    return this.state.sort;
	  },

	  /**
	   * Reset to default sort parameters
	   */
	  resetSorting: function resetSorting() {
	    if (this._isSortingPropsMode()) {
	      throw Error('You can not use function "resetSorting" when set prop "sort"');
	    }

	    this._resetSorting();
	    this.forceUpdate();
	  },

	  /**
	   * Reset to default sort parameters
	   * @private
	   */
	  _resetSorting: function _resetSorting() {
	    var sort = this._getDefaultSort();

	    if (this._isSortingPropsMode()) {
	      this.onSorting(sort);
	      return;
	    }

	    this.state.sort = sort;
	  },

	  /**
	   * Use column name for table sort
	   *
	   * @param {string} column  Column name
	   * @private
	   */
	  _sortCol: function _sortCol(column) {
	    var newOrder = void 0;
	    var cycle = this.props.cols[column].sortCycle;
	    var newSorts = _utils2.default.clone(this.getSortDirection());
	    var sortElement = { column: column };
	    var currentSortIndex = void 0;
	    var currentSort = void 0;

	    if (this.props.multipleSorting) {
	      // Find an element among the other sorts
	      currentSortIndex = _utils2.default.findIndex(newSorts, function (sort) {
	        return sort.column === column;
	      });

	      if (currentSortIndex >= 0) {
	        currentSort = newSorts[currentSortIndex];

	        // Determine the direction of sorting
	        if (currentSortIndex < newSorts.length - 1) {
	          newOrder = cycle[0];
	        } else {
	          // If the item is the last one, select the next direction of sorting
	          newOrder = cycle[(cycle.indexOf(currentSort.direction) + 1) % cycle.length];
	        }

	        if (newOrder === 'default') {
	          // Remove item from the sorts
	          newSorts.splice(currentSortIndex, 1);
	        } else if (currentSortIndex === newSorts.length - 1) {
	          // Set new direction, if the last element
	          currentSort.direction = newOrder;
	        } else {
	          // Move the item to the end, if it is already in sorts
	          newSorts.splice(currentSortIndex, 1);
	          sortElement.direction = newOrder;
	          newSorts.push(sortElement);
	        }
	      } else {
	        // Add new element
	        sortElement.direction = newOrder = cycle[0];
	        newSorts.push(sortElement);
	      }
	    } else {
	      if (newSorts && newSorts.column === column) {
	        // Select the next direction of sorting
	        newOrder = cycle[(cycle.indexOf(newSorts.direction) + 1) % cycle.length];
	      } else {
	        newOrder = cycle[0];
	      }
	      if (newOrder === 'default') {
	        newSorts = null;
	      } else {
	        sortElement.direction = newOrder;
	        newSorts = sortElement;
	      }
	    }

	    if (this.props.onSorting) {
	      this.props.onSorting(newSorts, column, newOrder);
	    }

	    if (!this._isSortingPropsMode()) {
	      this.state.sort = newSorts;
	      this.setPage(0);
	    }
	  },

	  /**
	   * Get initial sort state
	   *
	   * @returns {Array} Initial sort state
	   * @private
	   */
	  _getDefaultSort: function _getDefaultSort() {
	    if (this.props.defaultSort) {
	      return _utils2.default.cloneDeep(this.props.defaultSort);
	    }
	    return null;
	  },

	  /**
	   * Get current mode and column sort parameter
	   *
	   * @param   column                                  Column ID
	   * @returns {{field: {string}, sort: {string}}|{}}  Sort parameter and mode
	   * @private
	   */
	  _getSortParams: function _getSortParams(column) {
	    var params = { column: column };
	    var sorts = this.getSortDirection();
	    var sortIndex = void 0;

	    if (!this.props.cols[column].sortCycle) {
	      return null;
	    }

	    if (!sorts) {
	      params.direction = 'default';
	      return params;
	    }

	    if (this.props.multipleSorting) {
	      sortIndex = _utils2.default.findIndex(sorts, function (sort) {
	        return sort.column === params.column;
	      });

	      if (sortIndex < 0 || sortIndex < sorts.length - 1) {
	        params.direction = 'default';
	      } else {
	        params.direction = sorts[sortIndex].direction;
	      }
	      return params;
	    }

	    if (sorts.column === column) {
	      params.direction = sorts.direction;
	    } else {
	      params.direction = 'default';
	    }

	    return params;
	  },

	  /**
	   * Does sorting using props
	   *
	   * @return {boolean}
	   * @private
	   */
	  _isSortingPropsMode: function _isSortingPropsMode() {
	    return this.props.hasOwnProperty('sort');
	  },

	  /**
	   * Convert sorting to array
	   *
	   * @return {Object[]|Object} sorts
	   * @private
	   */
	  _sortingToArray: function _sortingToArray() {
	    function toArray(sort) {
	      return [sort.column, sort.direction];
	    }

	    var direction = this.getSortDirection();
	    if (!direction) {
	      return null;
	    }

	    if (this.props.multipleSorting) {
	      if (!direction.length) {
	        return null;
	      }
	      return direction.map(toArray);
	    }

	    return [toArray(direction)];
	  }
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	// import React from 'react';
	exports.default = GridSortingMixin;
	module.exports = exports['default'];

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _keys = __webpack_require__(105);

	var _keys2 = _interopRequireDefault(_keys);

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var GridDataMixin = {
	  /**
	   * Change table record
	   * This method marks changed fields and validates them
	   *
	   * @param {*}         recordId    Record ID
	   * @param {Object}    data        Changed data
	   * @param {Function}  cb          CallBack function
	   */
	  set: function set(recordId, data, cb) {
	    //TODO cb does't used
	    var row = this._getRowID(recordId);
	    this._setRowChanges(row, _utils2.default.cloneDeep(data), cb);
	  },

	  /**
	   * Get record data
	   *
	   * @param recordId
	   * @return {Object}
	   */
	  getRecord: function getRecord(recordId) {
	    var row = this._getRowID(recordId);
	    return _utils2.default.cloneDeep(this._getRecord(row));
	  },

	  /**
	   * Get record changes object
	   *
	   * @param   {*} recordId Record ID
	   * @return  {Object}
	   */
	  getRecordChanges: function getRecordChanges(recordId) {
	    var row = this._getRowID(recordId);
	    return this._getRecordChanges(row);
	  },

	  /**
	   * Get record warnings object
	   *
	   * @param   {*} recordId  Record ID
	   * @return  {ValidationErrors}
	   * @private
	   */
	  getRecordWarnings: function getRecordWarnings(recordId) {
	    var row = this._getRowID(recordId);
	    return this.state.warnings[row] || new _ValidationErrors2.default();
	  },

	  /**
	   * Get validation warnings
	   *
	   * @return {Array|null}
	   */
	  getWarnings: function getWarnings() {
	    var result = [];
	    for (var i in this.state.warnings) {
	      result.push([this.state.recordsInfo[i].id, this.state.warnings[i]]);
	    }
	    return result.length ? result : null;
	  },

	  /**
	   * Get record errors object
	   *
	   * @param   {*} recordId  Record ID
	   * @return  {ValidationErrors}
	   * @private
	   */
	  getRecordErrors: function getRecordErrors(recordId) {
	    var row = this._getRowID(recordId);
	    return this._getRecordErrors(row);
	  },

	  /**
	   * Get validation errors
	   *
	   * @return {Array|null}
	   */
	  getErrors: function getErrors() {
	    var result = [];
	    for (var i in this.state.errors) {
	      result.push([this.state.recordsInfo[i].id, this.state.errors[i]]);
	    }
	    return result.length ? result : null;
	  },

	  /**
	   * Get table model
	   *
	   * @returns {AbstractGridModel}
	   */
	  getModel: function getModel() {
	    return this.props.model;
	  },

	  /**
	   * Save grid changes
	   *
	   * @param {Function} cb CallBack function
	   */
	  save: (0, _callbackify2.default)((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	    var _this = this;

	    var errors, changes, data;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            errors = this.getErrors();

	            // Collect all valid changes

	            changes = _utils2.default.reduce(this.state.changes, function (result, rowChanges, row) {
	              if (!errors || !errors[row]) {
	                if (_this.props.saveFullRecord) {
	                  result[row] = _this._getRecord(row);
	                } else {
	                  result[row] = {};
	                  (0, _assign2.default)(result[row], rowChanges, _utils2.default.pick(_this.state.data[row], _this.props.model.getValidationDependency((0, _keys2.default)(result[row]))));
	                }
	              }
	              return result;
	            }, {});

	            // Cancel new record display

	            this.removeRecordStatusAll('new');

	            // Pass changes to table model processing
	            _context.next = 5;
	            return (0, _toPromise2.default)(this.props.model.update.bind(this.props.model))(this._dataObjectToArray(changes));

	          case 5:
	            data = _context.sent;

	            if (this._isMounted) {
	              _context.next = 8;
	              break;
	            }

	            return _context.abrupt('return');

	          case 8:

	            this.state.partialErrorChecking = false;

	            data.forEach(function (record) {
	              var row = _this._getRowID(record[0]);

	              // Skip records that are user changed while data processing
	              if (!_utils2.default.isEqual(_this.state.changes[row], changes[row])) {
	                return;
	              }

	              // Process validation errors
	              if (record[1] instanceof _ValidationErrors2.default) {
	                _this.state.errors[row] = record[1];
	                return;
	              }

	              // Cancel changed data status of the parameters, that are changed
	              _utils2.default.forEach(changes[row], function (value, field) {
	                if (_utils2.default.isEqual(value, this.state.changes[row][field])) {
	                  delete this.state.changes[row][field];
	                }
	              }, _this);

	              // Clear changed data row if it's empty
	              if (_utils2.default.isEmpty(_this.state.changes[row])) {
	                delete _this.state.changes[row];
	                if (!_this._isMainRow(row)) {
	                  _this._removeRecord(row);
	                }
	              }
	            });

	            this._renderBody();

	            return _context.abrupt('return', data);

	          case 12:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }))),

	  /**
	   * Clear record changes
	   *
	   * @param {*} recordId Record ID
	   */
	  clearRecordChanges: function clearRecordChanges(recordId) {
	    var row = this._getRowID(recordId);

	    delete this.state.changes[row];
	    delete this.state.warnings[row];
	    delete this.state.errors[row];

	    this._updateRow(row);
	  },

	  /**
	   * Clear all table changes
	   */
	  clearAllChanges: function clearAllChanges() {
	    var i = void 0;
	    for (i in this.state.data) {
	      if (!this._isMainRow(i)) {
	        delete this.state.data[i];
	        delete this.state.recordsInfo[i];
	      }
	    }
	    this.state.changes = {};
	    this.state.statuses = {};
	    this.state.warnings = {};
	    this.state.errors = {};
	    this.state.partialErrorChecking = this.props.partialErrorChecking;

	    this._renderBody();
	  },

	  /**
	   * Reset to initial table state
	   */
	  reset: function reset() {
	    this._setPage(0);
	    if (!this._isSortingPropsMode()) {
	      this._resetSorting();
	    }
	    this.updateTable();
	  },

	  /**
	   * Get record changes object
	   *
	   * @param   {string}        row     Row ID
	   * @return  {Object}
	   */
	  _getRecordChanges: function _getRecordChanges(row) {
	    if (this.state.changes.hasOwnProperty(row)) {
	      return _utils2.default.cloneDeep(this.state.changes[row]);
	    }
	    return {};
	  },

	  /**
	   * Set record data
	   *
	   * @param {*}       recordId  Record ID
	   * @param {Object}  data      Data
	   * @private
	   */
	  _setRecordData: function _setRecordData(recordId, data) {
	    if (!this._isRecordLoaded(recordId)) {
	      return;
	    }

	    // TODO done through _dataArrayToObject
	    var field = void 0;
	    var row = this._getRowID(recordId);

	    // Apply and redraw all record changes
	    for (field in data) {
	      this.state.data[row][field] = _utils2.default.cloneDeep(data[field]);
	      this._renderBinds(row, field);
	    }
	  },

	  /**
	   * Table row has warning flag
	   *
	   * @param   {string}        row     Row ID
	   * @param   {Array|string}  fields
	   * @returns {boolean}
	   * @private
	   */
	  _hasWarning: function _hasWarning(row, fields) {
	    return this._checkFieldInValidation(row, fields, this.state.warnings);
	  },

	  /**
	   * Table row has error flag
	   *
	   * @param   {string}        row     Row ID
	   * @param   {Array|string}  fields
	   * @returns {boolean}
	   * @private
	   */
	  _hasError: function _hasError(row, fields) {
	    return this._checkFieldInValidation(row, fields, this.state.errors);
	  },

	  /**
	   * Table row has error in "validation" object
	   *
	   * @param   {string}        row
	   * @param   {Array|string}  fields
	   * @param   {Validation}    validation
	   * @returns {boolean}
	   * @private
	   */
	  _checkFieldInValidation: function _checkFieldInValidation(row, fields, validation) {
	    var i = void 0;

	    if (!validation[row]) {
	      return false;
	    }

	    if (this.state.partialErrorChecking && !this.state.changes.hasOwnProperty(row)) {
	      return false;
	    }

	    if (!Array.isArray(fields)) {
	      fields = [fields];
	    }

	    for (i = 0; i < fields.length; i++) {
	      if (validation[row].hasError(fields[i])) {
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Table row changed flag
	   *
	   * @param   {string}        row         Row ID
	   * @param   {Array|string}  [fields]
	   * @return  {boolean}
	   * @private
	   */
	  _isChanged: function _isChanged(row, fields) {
	    var i = void 0;
	    if (!this.state.changes[row]) {
	      return false;
	    }

	    if (fields) {
	      if (!Array.isArray(fields)) {
	        fields = [fields];
	      }
	      for (i = 0; i < fields.length; i++) {
	        if (this.state.changes[row].hasOwnProperty(fields[i])) {
	          return true;
	        }
	      }
	      return false;
	    }

	    return true;
	  },

	  /**
	   * Get table row errors object
	   *
	   * @param   {string} row  Row ID
	   * @return  {ValidationErrors}
	   * @private
	   */
	  _getRecordErrors: function _getRecordErrors(row) {
	    return this.state.errors[row] || new _ValidationErrors2.default();
	  },

	  /**
	   * Pass changes to the table
	   * This method marks changed fields
	   *
	   * @param {string}      row         Row ID
	   * @param {Object}      data        Changed data
	   * @private
	   */
	  _setRowChanges: function _setRowChanges(row, data) {
	    var changes = this.state.changes;

	    if (!changes[row]) {
	      changes[row] = {};
	    }

	    changes[row] = _utils2.default.getRecordChanges(this.props.model, this.state.data[row], changes[row], data);

	    if (_utils2.default.isEmpty(changes[row])) {
	      delete changes[row];
	    } else {
	      // Redraw the changes in the row
	      _utils2.default.forEach(changes[row], function (value, field) {
	        this._renderBinds(row, field);
	      }, this);
	    }
	  },

	  /**
	   * Get table record
	   *
	   * @param {string} row Row ID
	   * @returns {Object} Required table data record
	   * @private
	   */
	  _getRecord: function _getRecord(row) {
	    if (this.state.data[row]) {
	      return (0, _assign2.default)({}, this.state.data[row], this.state.changes[row]);
	    }
	    return null;
	  },

	  /**
	   * Set table data
	   *
	   * @param {Array}  changes  Changes
	   * @private
	   */
	  _setData: function _setData(changes) {
	    var i = void 0;

	    // Apply all changes
	    for (i = 0; i < changes.length; i++) {
	      this._setRecordData(changes[i][0], changes[i][1]);
	    }
	  },

	  /**
	   * Get record field title that changes column Editor
	   *
	   * @param       {string}        id  Column ID
	   * @returns     {Array|string}     Fields that change Editor
	   * @private
	   */
	  _getBindParam: function _getBindParam(id) {
	    return this.props.cols[id].editorField || id;
	  },

	  /**
	   * This method converts data array to the object with keys presented as record ID hash
	   *
	   * @param   {Array}    arr     Data array
	   * @returns {Object}    Object result
	   * @private
	   */
	  _dataArrayToObject: function _dataArrayToObject(arr) {
	    var i = void 0;
	    var records = {};
	    var info = {};
	    var row = void 0;

	    for (i = 0; i < arr.length; i++) {
	      row = (0, _stringify2.default)(arr[i][0]);
	      records[row] = arr[i][1];
	      info[row] = {
	        id: arr[i][0],
	        index: i // Sort index
	      };
	    }

	    return {
	      records: records,
	      info: info
	    };
	  },

	  /**
	   * This method converts data object to the array with keys presented as record ID hash
	   *
	   * @param   {Object}  obj     Data object
	   * @returns {Array}   Array result
	   * @private
	   */
	  _dataObjectToArray: function _dataObjectToArray(obj) {
	    var i = void 0;
	    var arr = [];

	    for (i in obj) {
	      arr.push([this.state.recordsInfo[i].id, _utils2.default.clone(obj[i])]);
	    }

	    return arr;
	  },

	  /**
	   * Is main table row flag
	   *
	   * @param   {string}    row     Row ID
	   * @return  {boolean}
	   * @private
	   */
	  _isMainRow: function _isMainRow(row) {
	    return this.state.mainIds.indexOf(row) >= 0;
	  },

	  _isRecordLoaded: function _isRecordLoaded(recordId) {
	    // TODO Can be optimized
	    var row = (0, _stringify2.default)(recordId);
	    return this.state.data.hasOwnProperty(row);
	  },

	  /**
	   * Get table row ID having record ID
	   *
	   * @param   {*}       recordId    Record ID
	   * @return  {string}  Row ID
	   * @private
	   */
	  _getRowID: function _getRowID(recordId) {
	    var row = (0, _stringify2.default)(recordId);

	    if (!this.state.data.hasOwnProperty(row)) {
	      throw Error('Record with the ID is not contained in the table.');
	    }

	    return row;
	  },

	  /**
	   * Load model data
	   *
	   * @param {Object}      settings    Request parameters
	   * @param {Function}    cb          CallBack function
	   * @private
	   */
	  _loadData: function () {
	    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(settings) {
	      var data;
	      return _regenerator2.default.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              data = void 0;
	              _context2.prev = 1;
	              _context2.next = 4;
	              return this.props.model.read(settings);

	            case 4:
	              data = _context2.sent;
	              _context2.next = 11;
	              break;

	            case 7:
	              _context2.prev = 7;
	              _context2.t0 = _context2['catch'](1);

	              if (_context2.t0 && this.props.onError) {
	                this.props.onError(_context2.t0);
	              }
	              throw _context2.t0;

	            case 11:

	              if (this.props.onPageLoad) {
	                this.props.onPageLoad(data);
	              }
	              return _context2.abrupt('return', data);

	            case 13:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, this, [[1, 7]]);
	    }));

	    function _loadData(_x) {
	      return _ref2.apply(this, arguments);
	    }

	    return _loadData;
	  }(),

	  /**
	   * Find record IDs that need to be displayed additionally
	   *
	   * @return {Array} Additional IDs array
	   * @private
	   */
	  _getAdditionalIds: function _getAdditionalIds() {
	    var additionalIds = this._getRecordsWithStatus();
	    var id = void 0;
	    for (var row in this.state.changes) {
	      id = this.state.recordsInfo[row].id;
	      if (additionalIds.indexOf(id) < 0) {
	        additionalIds.push(id);
	      }
	    }
	    return additionalIds;
	  },

	  _removeRecord: function _removeRecord(recordId, cb) {
	    this._removeTR(recordId);
	    this.unselectRecord(recordId, true);
	    delete this.state.data[recordId];
	    delete this.state.recordsInfo[recordId];
	    delete this.state.changes[recordId];
	    delete this.state.warnings[recordId];
	    delete this.state.errors[recordId];
	    delete this.state.editor[recordId];
	    this.setState({
	      data: this.state.data,
	      changes: this.state.changes,
	      warnings: this.state.warnings,
	      errors: this.state.errors,
	      editor: this.state.editor
	    }, cb ? cb.bind(this) : null);
	  },

	  _checkWarnings: function () {
	    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(row) {
	      return _regenerator2.default.wrap(function _callee3$(_context3) {
	        while (1) {
	          switch (_context3.prev = _context3.next) {
	            case 0:
	              if (this.props.warningsValidator) {
	                _context3.next = 2;
	                break;
	              }

	              return _context3.abrupt('return');

	            case 2:
	              return _context3.abrupt('return', this._checkValidatorErrors(row, this.props.warningsValidator, this.state.warnings));

	            case 3:
	            case 'end':
	              return _context3.stop();
	          }
	        }
	      }, _callee3, this);
	    }));

	    function _checkWarnings(_x2) {
	      return _ref3.apply(this, arguments);
	    }

	    return _checkWarnings;
	  }(),

	  _validateRow: function _validateRow(row) {
	    return this._checkValidatorErrors(row, this.props.model, this.state.errors);
	  },

	  /**
	   * Check errors in "validator" object
	   *
	   * @param {string}        row         Row ID
	   * @param {Validator}     validator   Validator object
	   * @param {Validation[]}  result      Result object
	   * @private
	   */
	  _checkValidatorErrors: function () {
	    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(row, validator, result) {
	      var _this2 = this;

	      var record, validErrors;
	      return _regenerator2.default.wrap(function _callee4$(_context4) {
	        while (1) {
	          switch (_context4.prev = _context4.next) {
	            case 0:
	              record = this._getRecordChanges(row);
	              _context4.next = 3;
	              return validator.isValidRecord(record);

	            case 3:
	              validErrors = _context4.sent;


	              if (_utils2.default.isEqual(record, this._getRecordChanges(row))) {
	                if (validErrors.isEmpty()) {
	                  delete result[row];
	                } else {
	                  result[row] = validErrors;
	                }

	                (0, _keys2.default)(record).forEach(function (field) {
	                  _this2._renderBinds(row, field);
	                });
	              }

	            case 5:
	            case 'end':
	              return _context4.stop();
	          }
	        }
	      }, _callee4, this);
	    }));

	    function _checkValidatorErrors(_x3, _x4, _x5) {
	      return _ref4.apply(this, arguments);
	    }

	    return _checkValidatorErrors;
	  }(),

	  _onRecordCreated: function _onRecordCreated(recordId) {
	    var _this3 = this;

	    this.updateTable().then(function () {
	      if (_this3._isRecordLoaded(recordId)) {
	        _this3._checkWarnings(_this3._getRowID(recordId));
	      }
	    });
	  }
	};

	exports.default = GridDataMixin;
	module.exports = exports['default'];

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(136);


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;

	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;

	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;

	module.exports = __webpack_require__(137);

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */

	!(function(global) {
	  "use strict";

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }

	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  runtime.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  runtime.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }

	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  runtime.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;

	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }

	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }

	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );

	          if (record.type === "throw") {
	            context.delegate = null;

	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }

	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;

	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }

	          context.delegate = null;
	        }

	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;

	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }

	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }

	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          var info = {
	            value: record.arg,
	            done: context.done
	          };

	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;

	  function doneResult() {
	    return { value: undefined, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }

	      return ContinueSentinel;
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (fn) {
	  return function () {
	    var gen = fn.apply(this, arguments);
	    return new _promise2.default(function (resolve, reject) {
	      function step(key, arg) {
	        try {
	          var info = gen[key](arg);
	          var value = info.value;
	        } catch (error) {
	          reject(error);
	          return;
	        }

	        if (info.done) {
	          resolve(value);
	        } else {
	          return _promise2.default.resolve(value).then(function (value) {
	            step("next", value);
	          }, function (err) {
	            step("throw", err);
	          });
	        }
	      }

	      return step("next");
	    });
	  };
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _keys = __webpack_require__(105);

	var _keys2 = _interopRequireDefault(_keys);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ValidationErrors = function () {
	  /**
	   * Field errors control manager
	   * @constructor
	   */
	  function ValidationErrors() {
	    (0, _classCallCheck3.default)(this, ValidationErrors);

	    this._fields = {};
	  }

	  /**
	   * Convert JSON to ValidationErrors object
	   *
	   * @param   {Object}      jsonObject
	   * @return  {ValidationErrors}
	   * @static
	   */


	  (0, _createClass3.default)(ValidationErrors, [{
	    key: 'add',


	    /**
	     * Add an error
	     *
	     * @param {string}        field       Field name
	     * @param {String}        errorText   Error text
	     * @return {ValidationErrors}
	     */
	    value: function add(field, errorText) {
	      if (!this._fields[field]) {
	        this._fields[field] = [];
	      }
	      if (!this._fields[field].includes(errorText)) {
	        this._fields[field].push(errorText);
	      }
	      return this;
	    }

	    /**
	     * Field has error flag
	     *
	     * @param   {string}      field     Field name
	     * @returns {boolean}
	     */

	  }, {
	    key: 'hasError',
	    value: function hasError(field) {
	      return this._fields.hasOwnProperty(field);
	    }

	    /**
	     * Get field errors
	     *
	     * @param   {string}      field     Field name
	     * @returns {Array|null}  Errors array or null
	     */

	  }, {
	    key: 'getFieldErrors',
	    value: function getFieldErrors(field) {
	      return this._fields[field] || null;
	    }

	    /**
	     * Get field names array, that contain errors
	     *
	     * @returns {string[]|null}
	     */

	  }, {
	    key: 'getFailedFields',
	    value: function getFailedFields() {
	      var fields = (0, _keys2.default)(this._fields);
	      return fields.length ? fields : null;
	    }

	    /**
	     * Errors absence check
	     *
	     * @returns {boolean} Errors presence
	     */

	  }, {
	    key: 'isEmpty',
	    value: function isEmpty() {
	      return _utils2.default.isEmpty(this._fields);
	    }

	    /**
	     * Clear specific field errors
	     *
	     * @param   {string}  field  Field name
	     * @returns {ValidationErrors}
	     */

	  }, {
	    key: 'clearField',
	    value: function clearField(field) {
	      delete this._fields[field];
	      return this;
	    }

	    /**
	     * Clear errors list
	     *
	     * @return {ValidationErrors}
	     */

	  }, {
	    key: 'clear',
	    value: function clear() {
	      this._fields = {};
	      return this;
	    }

	    /**
	     * Convert errors to JSON
	     *
	     * @return {Array}
	     */

	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this._fields;
	    }

	    /**
	     * Clone object
	     *
	     * @return {ValidationErrors}
	     */

	  }, {
	    key: 'clone',
	    value: function clone() {
	      return ValidationErrors.createFromJSON(this.toJSON());
	    }
	  }]);
	  return ValidationErrors;
	}(); /**
	      * Copyright (с) 2015-present, SoftIndex LLC.
	      * All rights reserved.
	      *
	      * This source code is licensed under the BSD-style license found in the
	      * LICENSE file in the root directory of this source tree.
	      */

	ValidationErrors.createFromJSON = function (jsonObject) {
	  var validationErrors = new ValidationErrors();
	  validationErrors._fields = jsonObject ? _utils2.default.clone(jsonObject) : {};
	  return validationErrors;
	};

	ValidationErrors.merge = function () {
	  var jsonErrors = [{}];

	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)(args), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var arg = _step.value;

	      jsonErrors.push(arg.toJSON());
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return ValidationErrors.createFromJSON(_assign2.default.apply(Object, jsonErrors));
	};

	exports.default = ValidationErrors;
	module.exports = exports['default'];

/***/ },
/* 140 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(142);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(143), __esModule: true };

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(144);
	var $Object = __webpack_require__(18).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(16);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(26), 'Object', {defineProperty: __webpack_require__(22).f});

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(132);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// eslint-disable-line no-unused-vars
	var findDOMNode = _reactDom2.default.findDOMNode; /**
	                                                   * Copyright (с) 2015-present, SoftIndex LLC.
	                                                   * All rights reserved.
	                                                   *
	                                                   * This source code is licensed under the BSD-style license found in the
	                                                   * LICENSE file in the root directory of this source tree.
	                                                   */

	var GridEditorMixin = {

	  /**
	   * Display Editor in a table cell
	   *
	   * @param {HTMLElement} element     Cell DOM element
	   * @param {string}      row         Row ID
	   * @param {string}      column      Column ID
	   * @private
	   */
	  _renderEditor: function _renderEditor(element, row, column) {
	    var _this = this;

	    var binds = this._getBindParam(column);
	    var record = this._getRecord(row);
	    var $element = $(element);
	    var value = _utils2.default.at(record, binds);
	    var focusDone = false;

	    if (!Array.isArray(binds)) {
	      value = value[0];
	    }

	    // Prevent recreate of the opened Editor
	    if (this._isEditorVisible(row, column)) {
	      return;
	    }

	    var editorContext = {
	      updateField: function updateField(field, nextValue) {
	        var data = {};
	        data[field] = nextValue;
	        _this._setRowChanges(row, data);
	      }
	    };

	    var props = {
	      onChange: function onChange(values) {
	        _this._onChangeEditor(row, column, values, editorContext, element);
	      },
	      onFocus: function onFocus() {
	        _this._onFocusEditor(row, column);
	      },
	      onBlur: function onBlur() {
	        // Remove Editor
	        if (focusDone) {
	          _reactDom2.default.unmountComponentAtNode(element);
	          delete _this.state.editor[row + '_' + column];
	          $element.removeClass('dgrid-input-wrapper');
	          _this._onBlurEditor(row, column);
	        }
	      },
	      value: value
	    };

	    editorContext.props = props;

	    // Display Editor
	    var Component = this.props.cols[column].editor.call(editorContext, record);

	    if (!Component) {
	      return;
	    }

	    this.state.editor[row + '_' + column] = _reactDom2.default.render(Component, element, function () {
	      $element.addClass('dgrid-input-wrapper');

	      if (typeof this.focus === 'function') {
	        this.focus();
	      } else {
	        findDOMNode(this).focus();
	      }
	      focusDone = true;
	    });
	  },

	  _onChangeEditor: function _onChangeEditor(row, column, values, editorContext, element) {
	    var binds = this._getBindParam(column);

	    values = _utils2.default.cloneDeep(_utils2.default.parseValueFromEvent(values));

	    var record = this._getRecord(row);
	    var context = _utils2.default.cloneDeep(editorContext);
	    context.props.value = values;
	    var Component = this.props.cols[column].editor.call(context, record);
	    this.state.editor[row + '_' + column] = _reactDom2.default.render(Component, element);

	    if (!Array.isArray(binds)) {
	      binds = [binds];
	      values = [values];
	    }

	    this._setRowChanges(row, _utils2.default.zipObject(binds, values));
	  },

	  _onFocusEditor: function _onFocusEditor(row, column) {
	    if (!this.state.errors[row]) {
	      return;
	    }

	    var binds = this._getBindParam(column);
	    if (!Array.isArray(binds)) {
	      binds = [binds];
	    }

	    binds.forEach(function (field) {
	      this.state.errors[row].clearField(field);
	    }, this);
	    if (this.state.errors[row].isEmpty()) {
	      delete this.state.errors[row];
	    }
	  },

	  _onBlurEditor: function _onBlurEditor(row, column) {
	    this._updateField(row, column);
	    this._checkWarnings(row);

	    // TODO Deprecated prop realtime in v0.17
	    if (this.props.autoSubmit || this.props.realtime) {
	      if (this.props.realtime) {
	        console.warn('Deprecated: Grid prop "realtime" renamed to "autoSubmit"');
	      }
	      this.save(this.props.onRealtimeSubmit);
	    } else {
	      this._validateRow(row);
	    }
	  },

	  _isEditorVisible: function _isEditorVisible(row, column) {
	    return Boolean(this.state.editor[row + '_' + column]);
	  }
	};

	exports.default = GridEditorMixin;
	module.exports = exports['default'];

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(83);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _keys = __webpack_require__(105);

	var _keys2 = _interopRequireDefault(_keys);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _reactDom = __webpack_require__(132);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GridUIMixin = {
	  /**
	   * Table content click event handler
	   *
	   * @param {Event} event
	   */
	  _handleBodyClick: function _handleBodyClick(event) {
	    var $target = $(event.target);
	    var $refParent = $target.parents('[ref]');
	    var element = void 0;

	    if ($target.hasClass('dgrid-cell')) {
	      element = event.target;
	    } else {
	      element = $target.parents('td.dgrid-cell').get(0);
	    }

	    if (element && !$refParent.attr('disabled')) {
	      this._handleCellClick(event, element, $refParent.attr('ref') || event.target.getAttribute('ref'));
	    }
	  },

	  /**
	   * Cell click handler
	   *
	   * @param {Event}           event       Event object
	   * @param {HTMLElement}     element     Cell DOM element
	   * @param {string}          ref         Click handler name in the table configuration
	   */
	  _handleCellClick: function _handleCellClick(event, element, ref) {
	    var colId = $(element).attr('key');
	    var row = $(element).parent().attr('key');
	    var columnConfig = this.props.cols[colId];
	    var recordId = this.state.recordsInfo[row].id;
	    var record = this._getRecord(row);

	    // Trigger click handler on the table configuration
	    if (ref) {
	      columnConfig.onClickRefs[ref](event, recordId, record, this);
	    } else if (columnConfig.onClick) {
	      columnConfig.onClick(event, recordId, record, this);
	    }

	    // Open cell editor
	    if (this.props.cols[colId].editor) {
	      this._renderEditor(element, row, colId);
	    }
	  },

	  _handleHeaderCellClick: function _handleHeaderCellClick(col, event) {
	    var $target = $(event.target);
	    var $refParent = $target.parents('[ref]');
	    var ref = $refParent.attr('ref') || event.target.getAttribute('ref');
	    var handler = void 0;

	    if (ref && col.onClickRefs) {
	      handler = col.onClickRefs[ref];
	      if (handler) {
	        return handler(event, this);
	      }
	    }

	    if (col.onClick) {
	      col.onClick(event, this);
	    }
	  },

	  /**
	   * Fetch server data
	   */
	  updateTable: (0, _callbackify2.default)((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	    var viewCount, obj, page, data, extra, recordIds;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            this._showLoader(true);

	            if (this.props.model) {
	              _context.next = 3;
	              break;
	            }

	            return _context.abrupt('return');

	          case 3:
	            viewCount = this.getViewCount();
	            _context.next = 6;
	            return this._loadData({
	              limit: viewCount,
	              offset: this.state.page * viewCount,
	              sort: this._sortingToArray(),
	              fields: this._getFieldsToRender(),
	              extra: this._getAdditionalIds()
	            });

	          case 6:
	            obj = _context.sent;

	            if (this._isMounted) {
	              _context.next = 9;
	              break;
	            }

	            return _context.abrupt('return');

	          case 9:
	            if (!(this.getViewCount() && !obj.hasOwnProperty('count'))) {
	              _context.next = 11;
	              break;
	            }

	            throw new Error('Incorrect response from GridModel. "response.count" not defined');

	          case 11:

	            // If required page is not included in the range of existing pages,
	            // request existing in a moment page
	            page = this._checkPage(this.state.page, this.getViewCount(), obj.count);

	            if (!(page !== this.state.page)) {
	              _context.next = 16;
	              break;
	            }

	            this.state.page = page;
	            this.updateTable();
	            return _context.abrupt('return');

	          case 16:
	            data = this._dataArrayToObject(obj.records);
	            extra = this._dataArrayToObject(obj.extraRecords || []);
	            recordIds = (0, _keys2.default)(data.records).concat((0, _keys2.default)(extra.records));
	            _context.next = 21;
	            return (0, _toPromise2.default)(this.setState.bind(this), true)({
	              data: (0, _assign2.default)({}, data.records, extra.records),
	              mainIds: (0, _keys2.default)(data.records),
	              count: obj.count,
	              totals: obj.totals,
	              recordsInfo: (0, _assign2.default)({}, extra.info, data.info),
	              errors: _utils2.default.pick(this.state.errors, recordIds),
	              changes: _utils2.default.pick(this.state.changes, recordIds),
	              statuses: _utils2.default.pick(this.state.statuses, recordIds)
	            });

	          case 21:

	            this._renderBody();
	            this._showLoader(false);

	          case 23:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }))),

	  /**
	   * Show/hide loading icon
	   *
	   * @param {boolean} show True - Show, False - Hide
	   * @private
	   */
	  _showLoader: function _showLoader(show) {
	    if (show) {
	      $((0, _reactDom.findDOMNode)(this.refs.loader)).addClass('dgrid-loader');
	    } else {
	      $((0, _reactDom.findDOMNode)(this.refs.loader)).removeClass('dgrid-loader');
	    }
	  },

	  _getHeaderCellHTML: function _getHeaderCellHTML(columnName) {
	    var cellHtml = typeof columnName === 'function' ? columnName(this) : columnName;
	    if (cellHtml === undefined) {
	      return '';
	    }
	    return cellHtml;
	  },

	  _escapeRecord: function _escapeRecord(columnId, record) {
	    var field = void 0;
	    var type = void 0;
	    var i = void 0;
	    var escapedRecord = {};
	    var column = this.props.cols[columnId];
	    var needEscaping = !column.hasOwnProperty('escape') || column.escape;
	    var fields = column.render.slice(0, -1);

	    for (i = 0; i < fields.length; i++) {
	      field = fields[i];
	      type = (0, _typeof3.default)(record[field]);

	      if (needEscaping) {
	        if (type === 'string') {
	          escapedRecord[field] = _utils2.default.escape(record[field]);
	          continue;
	        }

	        if (type === 'object' && record[field] && !this.state.colsWithEscapeErrors[columnId]) {
	          this.state.colsWithEscapeErrors[columnId] = true;
	          console.error('UIKernel.Grid warning: \nYou send record with fields of Object type in escaped column "' + columnId + '". \nTo use Objects, set column config "escape" to false, \nand escape "' + columnId + '" field in render function by yourself');
	        }
	      }

	      escapedRecord[field] = record[field];
	    }

	    return escapedRecord;
	  },

	  /**
	   * Get table cell HTML
	   *
	   * @param   {number}    columnId  Column ID
	   * @param   {Object}    record    Table record
	   * @param   {bool}      selected  "Selected" row status
	   * @returns {string}    Table cell HTML
	   * @private
	   */
	  _getCellHTML: function _getCellHTML(columnId, record, selected) {
	    var render = _utils2.default.last(this.props.cols[columnId].render);
	    var cellHtml = render(this._escapeRecord(columnId, record), selected);
	    return '' + (_utils2.default.isDefined(cellHtml) ? cellHtml : '');
	  },

	  /**
	   * Get table row HTML
	   *
	   * @param       {number}    row         Row ID
	   * @param       {string}    className   <TR> class attribute
	   * @returns     {string}    Table row HTML
	   * @private
	   */
	  _getRowHTML: function _getRowHTML(row, className) {
	    var colId = void 0;
	    var record = this._getRecord(row);
	    var selected = this.isSelected(this.state.recordsInfo[row].id);
	    var html = '<tr key="' + row + '" class="' + (className || '') + ' ' + this._getRowStatusNames(row).join(' ') + ' ' + (selected ? 'dgrid__row_selected' : '') + '">';
	    for (colId in this.props.cols) {
	      if (this._isViewColumn(colId)) {
	        html += '<td key="' + colId + '" class="dgrid-cell' + (this._getColumnClass(colId) ? ' ' + this._getColumnClass(colId) : '') + (this._isChanged(row, this._getBindParam(colId)) ? ' dgrid-changed' : '') + (this._hasError(row, this._getBindParam(colId)) ? ' dgrid-error' : '') + (this._hasWarning(row, this._getBindParam(colId)) ? ' dgrid-warning' : '') + '">' + this._getCellHTML(colId, record, selected) + '</td>';
	      }
	    }
	    return html + '</tr>';
	  },

	  /**
	   * Redraw table content totally
	   *
	   * @private
	   */
	  _renderBody: function _renderBody() {
	    if (!this.state.data) {
	      return;
	    }

	    var i = void 0;
	    var row = void 0;
	    var htmlExtra = '';
	    var htmlBody = '';
	    var sorted = _utils2.default.pairs(this.state.recordsInfo).sort(function (a, b) {
	      return a[1].index - b[1].index;
	    });

	    for (i = 0; i < sorted.length; i++) {
	      row = sorted[i][0];
	      if (this._isMainRow(row)) {
	        htmlBody += this._getRowHTML(row);
	      } else if (this._isChanged(row) || this._getRowStatusNames(row).length) {
	        htmlExtra += this._getRowHTML(row, 'others');
	      }
	    }

	    (0, _reactDom.findDOMNode)(this.refs.tbody).innerHTML = htmlExtra + htmlBody;
	  },

	  /**
	   * Display model changes
	   *
	   * @param {string} row      Row ID
	   * @param {string} param    Model parameter
	   * @private
	   */
	  _renderBinds: function _renderBinds(row, param) {
	    // If parameter does not affect on the redraw, do nothing
	    if (!this._isFieldAffectsRender(param)) {
	      return;
	    }

	    this._getDependentColumns(param).forEach(function (column) {
	      if (this._isViewColumn(column) && !this._isEditorVisible(row, column)) {
	        this._updateField(row, column);
	      }
	    }, this);
	  },

	  /**
	   * Get cell DOM element
	   *
	   * @param {number}  recordId   Record ID
	   * @param {number}  colId      Column ID
	   * @returns {HTMLElement} Cell DOM element
	   * @private
	   */
	  _getCellElement: function _getCellElement(recordId, colId) {
	    return (0, _reactDom.findDOMNode)(this.refs.body).find('tr[key=' + recordId + ']').find('td[key=' + colId + ']');
	  },

	  _removeTR: function _removeTR(recordId) {
	    $((0, _reactDom.findDOMNode)(this.refs.body)).find('tr[key=' + recordId + ']').remove();
	  },

	  _renderTotals: function _renderTotals(isScrollable) {
	    var totalsDisplayed = false;
	    var i = void 0;
	    var className = void 0;
	    var totalsRowHTML = '';
	    var header = this._formHeader();

	    // If data for result line display exists, form it
	    if (this.state.totals) {
	      for (i in this.props.cols) {
	        if (!this._isViewColumn(i)) {
	          continue;
	        }

	        className = this.props.cols[i].className;
	        if (className) {
	          totalsRowHTML += '<td class="' + className + '">';
	        } else {
	          totalsRowHTML += '<td>';
	        }

	        if (this.state.totals.hasOwnProperty(i)) {
	          totalsRowHTML += this._getCellHTML(i, this.state.totals, false);
	          totalsDisplayed = true;
	        }

	        totalsRowHTML += '</td>';
	      }
	    }

	    if (!totalsDisplayed) {
	      return null;
	    }

	    if (isScrollable) {
	      return _react2.default.createElement(
	        'table',
	        { cellSpacing: '0', className: 'dgrid-totals' },
	        _react2.default.createElement(
	          'colgroup',
	          null,
	          header.colGroup
	        ),
	        _react2.default.createElement('tr', { dangerouslySetInnerHTML: { __html: totalsRowHTML } })
	      );
	    }

	    return _react2.default.createElement(
	      'tfoot',
	      { className: 'dgrid-totals' },
	      _react2.default.createElement('tr', { dangerouslySetInnerHTML: { __html: totalsRowHTML } })
	    );
	  },

	  _updateField: function _updateField(row, column) {
	    $((0, _reactDom.findDOMNode)(this.refs.body)).find('tr[key=' + row + ']').find('td[key=' + column + ']').html(this._getCellHTML(column, this._getRecord(row))).removeClass('dgrid-changed dgrid-error dgrid-warning').addClass('' + (this._isChanged(row, this._getBindParam(column)) ? 'dgrid-changed' : '')).addClass('' + (this._hasError(row, this._getBindParam(column)) ? 'dgrid-error' : '')).addClass('' + (this._hasWarning(row, this._getBindParam(column)) ? 'dgrid-warning' : ''));
	  },

	  _updateRow: function _updateRow(row, cb) {
	    if (!this.state.data) {
	      return;
	    }

	    if (this.state.data[row]) {
	      this._renderBody();
	      if (cb) {
	        cb();
	      }
	    } else {
	      this.updateTable.then(cb.bind(null, null)).catch(cb);
	    }
	  }
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	exports.default = GridUIMixin;
	module.exports = exports['default'];

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Grid mixin, responsible for rows Select
	 */
	var GridSelectMixin = {
	  /**
	   * Select only these records
	   *
	   * @param {Array}   selectedIds       Record IDs
	   * @param {boolean} [blackListMode]   Is black list mode
	   */
	  setSelectedRecords: function setSelectedRecords(selectedIds, blackListMode) {
	    this.state.selected = _utils2.default.clone(selectedIds);
	    if (typeof blackListMode === 'boolean') {
	      this.state.selectBlackListMode = blackListMode;
	    }

	    this.forceUpdate();
	  },

	  /**
	   * Select a record
	   *
	   * @param {*}    recordId       Record ID
	   * @param {boolean}             [ignoreBlackList=false]     Ignore BlackList mode
	   */
	  selectRecord: function selectRecord(recordId, ignoreBlackList) {
	    var _this = this;

	    var row = (0, _stringify2.default)(recordId);

	    if (this.state.selectBlackListMode && !ignoreBlackList) {
	      return this.unselectRecord(recordId, true);
	    }

	    if (_utils2.default.indexOf(this.state.selected, recordId) < 0) {
	      this.state.selected.push(recordId);

	      if (this.state.selected.length === this.state.count) {
	        if (this.state.selectBlackListMode) {
	          this.unselectAll();
	        } else {
	          this.selectAll();
	        }
	        return;
	      }
	    }

	    this._updateRow(row, function (err) {
	      if (err) {
	        throw err;
	      }
	      _this._emitChangeSelectedNum();
	    });
	  },

	  /**
	   * Unselect record
	   *
	   * @param {number|string}   recordId                    Record ID
	   * @param {boolean}         [ignoreBlackList=false]     Ignore BlackList mode
	   */
	  unselectRecord: function unselectRecord(recordId, ignoreBlackList) {
	    var _this2 = this;

	    var row = (0, _stringify2.default)(recordId);

	    if (this.state.selectBlackListMode && !ignoreBlackList) {
	      return this.selectRecord(recordId, true);
	    }

	    var pos = _utils2.default.indexOf(this.state.selected, recordId);
	    if (pos >= 0) {
	      this.state.selected.splice(pos, 1);
	    }

	    this._updateRow(row, function (err) {
	      if (err) {
	        throw err;
	      }
	      _this2._emitChangeSelectedNum();
	    });
	  },

	  /**
	   * Is selected row flag in accordance with
	   * current select mode (whitelist/blacklist).
	   *
	   * @param   {number|string}     recordId    Record ID
	   * @returns {boolean}           Is selected row flag
	   */
	  isSelected: function isSelected(recordId) {
	    var selected = _utils2.default.indexOf(this.state.selected, recordId) >= 0;
	    if (this.state.selectBlackListMode) {
	      return !selected;
	    }
	    return selected;
	  },

	  /**
	   * Switch "select"
	   *
	   * @param {*}   recordId  Record ID
	   */
	  toggleSelected: function toggleSelected(recordId) {
	    if (this.isSelected(recordId)) {
	      this.unselectRecord(recordId);
	    } else {
	      this.selectRecord(recordId);
	    }
	  },

	  /**
	   * Switch records selection mode
	   */
	  toggleSelectAll: function toggleSelectAll() {
	    if (this.state.selectBlackListMode) {
	      this.unselectAll();
	    } else {
	      this.selectAll();
	    }
	  },

	  /**
	   * Select all records
	   * Switches records selection mode to "blacklist"
	   */
	  selectAll: function selectAll() {
	    this.state.selectBlackListMode = true;
	    this.state.selected = [];
	    this._renderBody();
	    this._emitChangeSelectedNum();
	  },

	  /**
	   * Unselect all records status
	   * Switches records selection mode to "whitelist"
	   */
	  unselectAll: function unselectAll() {
	    this.state.selectBlackListMode = false;
	    this.state.selected = [];
	    this._renderBody();
	    this._emitChangeSelectedNum();
	  },

	  /**
	   * Get current records selection mode
	   *
	   * @returns {boolean} Records selection mode. true - Blacklist; false - Whitelist
	   */
	  isSelectBlackMode: function isSelectBlackMode() {
	    return this.state.selectBlackListMode;
	  },

	  /**
	   * Get all selected records
	   *
	   * @returns {Array}   Record IDs array
	   */
	  getAllSelected: function getAllSelected() {
	    return _utils2.default.clone(this.state.selected);
	  },

	  _getAllSelected: function _getAllSelected() {
	    return this.state.selected;
	  },

	  /**
	   * Trigger selected records count change handler
	   *
	   * @private
	   */
	  _emitChangeSelectedNum: function _emitChangeSelectedNum() {
	    if (this.props.onSelectedChange) {
	      var selectedCount = this.state.selected.length;
	      if (this.state.selectBlackListMode) {
	        selectedCount = this.getCountRecords() - selectedCount;
	      }
	      this.props.onSelectedChange(this.getAllSelected(), selectedCount);
	    }
	  }
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	exports.default = GridSelectMixin;
	module.exports = exports['default'];

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _Events = __webpack_require__(149);

	var _Events2 = _interopRequireDefault(_Events);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _ThrottleError = __webpack_require__(119);

	var _ThrottleError2 = _interopRequireDefault(_ThrottleError);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var FormService = function () {
	  function FormService() {
	    (0, _classCallCheck3.default)(this, FormService);

	    this._data = null;
	    this._changes = null;
	    this._errors = new _ValidationErrors2.default();
	    this._warnings = new _ValidationErrors2.default();
	    this._globalError = null;
	    this._warningsValidator = null;
	    this._eventEmitter = new _Events2.default();
	    this._isNotInitialized = true;
	    this.validateForm = _utils2.default.throttle(this.validateForm.bind(this));
	    this._onModelChange = this._onModelChange.bind(this);
	    this.clearChanges = this.clearChanges.bind(this);
	    this.clearError = this.clearError.bind(this);
	    this.updateField = this.updateField.bind(this);
	    this._getData = this._getData.bind(this);
	    this._getChanges = this._getChanges.bind(this);
	  }

	  /**
	   * Initialize form
	   *
	   * @param {Object}            settings                                Configuration
	   * @param {Array}             settings.fields                         Fields list, that are required to display
	   * @param {FormModel}         settings.model                          Model of form
	   * @param {Object}            [settings.data]                         Preset data
	   * @param {Object}            [settings.changes                       Preset changes
	   * @param {bool}              [settings.submitAll=false]              Send all form for validity check
	   * @param {bool}              [settings._partialErrorChecking=false]   Activate partial gradual form validation
	   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
	   * @param {Validator}         [settings.warningsValidator]            Warningss validator for fields
	   */


	  (0, _createClass3.default)(FormService, [{
	    key: 'init',
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(settings) {
	        var data;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                if (settings.model) {
	                  _context.next = 2;
	                  break;
	                }

	                throw Error('You must specify the model form in this.init()');

	              case 2:

	                this._data = settings.data || null;
	                this._changes = settings.changes || {};
	                this.showDependentFields = settings.showDependentFields || false;
	                this._partialErrorChecking = settings._partialErrorChecking; // Current mode
	                this._partialErrorCheckingDefault = settings._partialErrorChecking; // Default mode
	                this.model = settings.model; // FormModel
	                this.fields = settings.fields;
	                this.submitAll = settings.submitAll;
	                this._warningsValidator = settings.warningsValidator || new _common2.default();

	                this.validating = false;
	                this.pendingClearErrors = [];
	                this.submitting = false;
	                this._isNotInitialized = false;

	                if (this._data) {
	                  _context.next = 29;
	                  break;
	                }

	                data = void 0;
	                _context.prev = 17;
	                _context.next = 20;
	                return (0, _toPromise2.default)(settings.model.getData.bind(settings.model))(settings.fields);

	              case 20:
	                data = _context.sent;
	                _context.next = 28;
	                break;

	              case 23:
	                _context.prev = 23;
	                _context.t0 = _context['catch'](17);

	                this._globalError = _context.t0;
	                this._setState();
	                return _context.abrupt('return');

	              case 28:
	                this._data = data;

	              case 29:

	                this.model.on('update', this._onModelChange);
	                this._setState();

	                _context.prev = 31;
	                _context.next = 34;
	                return this.validateForm();

	              case 34:
	                _context.next = 40;
	                break;

	              case 36:
	                _context.prev = 36;
	                _context.t1 = _context['catch'](31);

	                if (_context.t1 instanceof _ThrottleError2.default) {
	                  _context.next = 40;
	                  break;
	                }

	                throw _context.t1;

	              case 40:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this, [[17, 23], [31, 36]]);
	      }));

	      function init(_x) {
	        return _ref.apply(this, arguments);
	      }

	      return init;
	    }()
	  }, {
	    key: 'getAll',
	    value: function getAll() {
	      var isLoaded = this._isLoaded();

	      if (!isLoaded) {
	        return {
	          isLoaded: isLoaded,
	          data: {},
	          originalData: {},
	          changes: {},
	          errors: new _ValidationErrors2.default(),
	          globalError: null,
	          isSubmitting: false
	        };
	      }

	      return {
	        isLoaded: isLoaded,
	        data: this._getData(),
	        originalData: this._data,
	        changes: this._getChangesFields(),
	        errors: this._getValidationErrors(),
	        globalError: this._globalError,
	        isSubmitting: this.isSubmitting
	      };
	    }

	    /**
	     * Update form value. Is used as the Editors onSubmit handler.
	     * Causes component redraw.
	     *
	     * @param {string|string[]}  fields  Parameters
	     * @param {*}                values   Event or data
	     */

	  }, {
	    key: 'updateField',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(fields, values) {
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                if (!this._isNotInitialized) {
	                  _context2.next = 2;
	                  break;
	                }

	                return _context2.abrupt('return');

	              case 2:

	                values = _utils2.default.parseValueFromEvent(values);

	                if (!Array.isArray(fields)) {
	                  fields = [fields];
	                  values = [values];
	                }
	                _context2.next = 6;
	                return this.set(_utils2.default.zipObject(fields, values));

	              case 6:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function updateField(_x2, _x3) {
	        return _ref2.apply(this, arguments);
	      }

	      return updateField;
	    }()
	  }, {
	    key: 'addChangeListener',
	    value: function addChangeListener(func) {
	      this._eventEmitter.on('update', func);
	    }
	  }, {
	    key: 'removeChangeListener',
	    value: function removeChangeListener(func) {
	      this._eventEmitter.off('update', func);
	      if (this._eventEmitter.listenerCount('update') === 0 && !this._isNotInitialized) {
	        this.model.off('update', this._onModelChange);
	      }
	    }
	  }, {
	    key: 'removeAllListeners',
	    value: function removeAllListeners() {
	      this._eventEmitter.removeAllListeners('update');
	      this.model.off('update', this._onModelChange);
	    }
	  }, {
	    key: 'clearError',
	    value: function clearError(field) {
	      var _this = this;

	      if (this._isNotInitialized) {
	        return;
	      }

	      if (this.validating) {
	        this.pendingClearErrors.push(field);
	      }

	      if (Array.isArray(field)) {
	        field.forEach(function (oneField) {
	          _this._errors.clearField(oneField);
	          _this._warnings.clearField(oneField);
	        });
	      } else {
	        this._errors.clearField(field);
	        this._warnings.clearField(field);
	      }

	      this._setState();
	    }
	  }, {
	    key: 'validateField',
	    value: function validateField(fields, values) {
	      this.updateField(fields, values);
	      try {
	        this.validateForm();
	      } catch (e) {
	        if (!(e instanceof _ThrottleError2.default)) {
	          throw e;
	        }
	      }
	    }

	    /**
	     * Set data in the form
	     *
	     * @param {Object}    data              Data
	     * @param {bool}      [validate=false]  Validate form
	     */

	  }, {
	    key: 'set',
	    value: function () {
	      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(data, validate) {
	        return _regenerator2.default.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                if (this._isLoaded()) {
	                  _context3.next = 2;
	                  break;
	                }

	                return _context3.abrupt('return');

	              case 2:

	                this._changes = _utils2.default.getRecordChanges(this.model, this._data, this._changes, data);

	                this._setState();

	                if (!validate) {
	                  _context3.next = 14;
	                  break;
	                }

	                _context3.prev = 5;
	                _context3.next = 8;
	                return this.validateForm();

	              case 8:
	                _context3.next = 14;
	                break;

	              case 10:
	                _context3.prev = 10;
	                _context3.t0 = _context3['catch'](5);

	                if (_context3.t0 instanceof _ThrottleError2.default) {
	                  _context3.next = 14;
	                  break;
	                }

	                throw _context3.t0;

	              case 14:
	              case 'end':
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this, [[5, 10]]);
	      }));

	      function set(_x4, _x5) {
	        return _ref3.apply(this, arguments);
	      }

	      return set;
	    }()
	  }, {
	    key: 'submitData',
	    value: function () {
	      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(data) {
	        return _regenerator2.default.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                if (!this._isNotInitialized) {
	                  _context4.next = 2;
	                  break;
	                }

	                return _context4.abrupt('return');

	              case 2:
	                _context4.next = 4;
	                return this.set(data);

	              case 4:
	                _context4.next = 6;
	                return this.submit();

	              case 6:
	                return _context4.abrupt('return', _context4.sent);

	              case 7:
	              case 'end':
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function submitData(_x6) {
	        return _ref4.apply(this, arguments);
	      }

	      return submitData;
	    }()

	    /**
	     * Send form data to the model
	     *
	     */

	  }, {
	    key: 'submit',
	    value: function () {
	      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
	        var _this2 = this;

	        var changes, data, err, newChanges, actualChanges, validationError;
	        return _regenerator2.default.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                if (!this._isNotInitialized) {
	                  _context5.next = 2;
	                  break;
	                }

	                return _context5.abrupt('return');

	              case 2:
	                if (!this.isSubmitting) {
	                  _context5.next = 4;
	                  break;
	                }

	                return _context5.abrupt('return');

	              case 4:

	                this.isSubmitting = true;

	                changes = this._getChanges();


	                this._globalError = null;
	                this._partialErrorChecking = false;

	                this._setState();

	                // Send changes to model
	                data = void 0;
	                err = void 0;
	                _context5.prev = 11;
	                _context5.next = 14;
	                return this.model.submit(changes);

	              case 14:
	                data = _context5.sent;
	                _context5.next = 20;
	                break;

	              case 17:
	                _context5.prev = 17;
	                _context5.t0 = _context5['catch'](11);

	                err = _context5.t0;

	              case 20:

	                this.isSubmitting = false;

	                newChanges = this._getChanges();
	                actualChanges = _utils2.default.isEqual(changes, newChanges);
	                validationError = err instanceof _ValidationErrors2.default;
	                // Replacing empty error to null

	                if (validationError && err.isEmpty()) {
	                  err = null;
	                }

	                if (err) {
	                  if (validationError) {
	                    if (actualChanges) {
	                      this._errors = err;
	                    }
	                  } else {
	                    this._globalError = err;
	                  }
	                } else if (actualChanges) {
	                  this._errors = new _ValidationErrors2.default();
	                  this._changes = {};
	                } else {
	                  _utils2.default.forEach(changes, function (value, field) {
	                    if (_utils2.default.isEqual(value, newChanges[field])) {
	                      delete _this2._changes[field];
	                    }
	                  });
	                }

	                this._setState();

	                if (!err) {
	                  _context5.next = 29;
	                  break;
	                }

	                throw err;

	              case 29:
	                return _context5.abrupt('return', data);

	              case 30:
	              case 'end':
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this, [[11, 17]]);
	      }));

	      function submit() {
	        return _ref5.apply(this, arguments);
	      }

	      return submit;
	    }()
	  }, {
	    key: 'clearFieldChanges',
	    value: function clearFieldChanges(field) {
	      if (this._isNotInitialized) {
	        return;
	      }

	      this._errors.clearField(field);
	      this._warnings.clearField(field);
	      delete this._changes[field];
	      this._setState();
	    }
	  }, {
	    key: 'clearChanges',
	    value: function clearChanges() {
	      if (this._isNotInitialized) {
	        return;
	      }

	      this._errors.clear();
	      this._warnings.clear();
	      this._changes = {};
	      this._globalError = false;
	      this._partialErrorChecking = this._partialErrorCheckingDefault;
	      this._setState();
	    }
	  }, {
	    key: 'setPartialErrorChecking',
	    value: function setPartialErrorChecking(value) {
	      this._partialErrorChecking = value;
	      this._setState();
	    }
	  }, {
	    key: 'getPartialErrorChecking',
	    value: function getPartialErrorChecking() {
	      return {
	        _partialErrorChecking: this._partialErrorChecking,
	        _partialErrorCheckingDefault: this._partialErrorCheckingDefault
	      };
	    }
	  }, {
	    key: 'validateForm',
	    value: function () {
	      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
	        var field, errorsWithPartialChecking;
	        return _regenerator2.default.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                if (!this._isNotInitialized) {
	                  _context6.next = 2;
	                  break;
	                }

	                return _context6.abrupt('return');

	              case 2:

	                this.validating = true;
	                this._globalError = null;

	                _context6.next = 6;
	                return _promise2.default.all([this._runValidator(this.model, this._getChanges, '_errors'), this._runValidator(this._warningsValidator, this._getData, '_warnings')]);

	              case 6:

	                this.validating = false;

	                field = void 0;

	                while (field = this.pendingClearErrors.pop()) {
	                  this._warnings.clearField(field);
	                  this._errors.clearField(field);
	                }

	                this._setState();

	                errorsWithPartialChecking = this._getValidationErrors();

	                if (errorsWithPartialChecking.isEmpty()) {
	                  _context6.next = 13;
	                  break;
	                }

	                return _context6.abrupt('return', errorsWithPartialChecking);

	              case 13:
	              case 'end':
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this);
	      }));

	      function validateForm() {
	        return _ref6.apply(this, arguments);
	      }

	      return validateForm;
	    }()

	    /**
	     * Check is data loaded
	     *
	     * @returns {boolean}
	     */

	  }, {
	    key: '_isLoaded',
	    value: function _isLoaded() {
	      return this && Boolean(this._data || this._globalError);
	    }

	    /**
	     * Get form changes
	     *
	     * @return {{}}
	     */

	  }, {
	    key: '_getChangesFields',
	    value: function _getChangesFields() {
	      // TODO _getChanges
	      var changes = {};
	      for (var field in this._changes) {
	        if (!this._isDependentField(field)) {
	          changes[field] = this._changes[field];
	        }
	      }
	      return changes;
	    }

	    /**
	     * Get form errors
	     *
	     * @returns {ValidationErrors} Form errors
	     */

	  }, {
	    key: '_getValidationErrors',
	    value: function _getValidationErrors() {
	      var errors = _ValidationErrors2.default.merge(this._errors, this._warnings);

	      // If gradual validation is on, we need
	      // to remove unchanged records from errors object
	      if (!this._partialErrorChecking) {
	        return errors;
	      }

	      // Look through all form fields
	      for (var field in this._data) {
	        // If field is unchanged, remove errors, that regard to this field
	        if (!this._changes.hasOwnProperty(field)) {
	          errors.clearField(field);
	        }
	      }

	      return errors;
	    }
	  }, {
	    key: '_setState',
	    value: function _setState() {
	      this._eventEmitter.trigger('update', this.getAll());
	    }

	    /**
	     * Model records changes handler
	     *
	     * @param {Object} changes  Changes
	     * @private
	     */

	  }, {
	    key: '_onModelChange',
	    value: function _onModelChange(changes) {
	      this._data = (0, _extends3.default)({}, this._data, changes);
	      this._setState();
	    }
	  }, {
	    key: '_getData',
	    value: function _getData() {
	      return (0, _assign2.default)({}, this._data, this._changes);
	    }
	  }, {
	    key: '_getChanges',
	    value: function _getChanges() {
	      // Send all data or just changed fields in addiction of form configuration
	      if (this.submitAll) {
	        return this._getData();
	      }
	      return this._changes;
	    }
	  }, {
	    key: '_isDependentField',
	    value: function _isDependentField(field) {
	      return this._changes.hasOwnProperty(field) && _utils2.default.isEqual(this._changes[field], this._data[field]);
	    }
	  }, {
	    key: '_runValidator',
	    value: function () {
	      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(validator, getData, output) {
	        var data, validErrors, err;
	        return _regenerator2.default.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                data = getData();
	                validErrors = void 0;
	                err = void 0;
	                _context7.prev = 3;
	                _context7.next = 6;
	                return validator.isValidRecord(data);

	              case 6:
	                validErrors = _context7.sent;
	                _context7.next = 12;
	                break;

	              case 9:
	                _context7.prev = 9;
	                _context7.t0 = _context7['catch'](3);

	                err = _context7.t0;

	              case 12:
	                if (_utils2.default.isEqual(data, getData())) {
	                  _context7.next = 14;
	                  break;
	                }

	                return _context7.abrupt('return');

	              case 14:

	                if (err) {
	                  this[output].clear();
	                } else {
	                  this[output] = validErrors;
	                }

	                if (err) {
	                  this._globalError = err;
	                }

	              case 16:
	              case 'end':
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this, [[3, 9]]);
	      }));

	      function _runValidator(_x7, _x8, _x9) {
	        return _ref7.apply(this, arguments);
	      }

	      return _runValidator;
	    }()
	  }]);
	  return FormService;
	}();

	exports.default = FormService;
	module.exports = exports['default'];

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _typeof2 = __webpack_require__(83);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Events control model
	 */
	var EventsModel = function () {
	  function EventsModel() {
	    (0, _classCallCheck3.default)(this, EventsModel);

	    this._subscribers = {};
	  }

	  /**
	   * Subscribe to inner model event
	   *
	   * @param {string}      event   Event ID
	   * @param {Function}    cb      CallBack function
	   */


	  (0, _createClass3.default)(EventsModel, [{
	    key: 'on',
	    value: function on(event, cb) {
	      if ((0, _typeof3.default)(this._subscribers[event]) !== 'object') {
	        this._subscribers[event] = [];
	      }
	      this._subscribers[event].push(cb);
	    }

	    /**
	     * Unsubscribe from inner model event
	     *
	     * @param {number}      event   Event ID
	     * @param {Function}    cb      CallBack function
	     */

	  }, {
	    key: 'off',
	    value: function off(event, cb) {
	      if (this._subscribers[event]) {
	        this._subscribers[event] = _utils2.default.without(this._subscribers[event], cb);
	      }
	    }

	    /**
	     * Trigger inner model event
	     *
	     * @param {number}  event   Event ID
	     * @param {...*}    params
	     */

	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (!this._subscribers[event] || !this._subscribers[event].length) {
	        return;
	      }

	      for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        params[_key - 1] = arguments[_key];
	      }

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(this._subscribers[event]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var subscriber = _step.value;

	          subscriber.apply(undefined, params);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    /**
	     * Returns the number of listeners listening to the event
	     *
	     * @param {string} event name
	     */

	  }, {
	    key: 'listenerCount',
	    value: function listenerCount(event) {
	      return this._subscribers[event] ? this._subscribers[event].length : 0;
	    }

	    /**
	     * Removes all listeners of the specified event
	     *
	     * @param {string} event name
	     */

	  }, {
	    key: 'removeAllListeners',
	    value: function removeAllListeners(event) {
	      this._subscribers[event] = [];
	    }
	  }]);
	  return EventsModel;
	}(); /**
	      * Copyright (с) 2015-present, SoftIndex LLC.
	      * All rights reserved.
	      *
	      * This source code is licensed under the BSD-style license found in the
	      * LICENSE file in the root directory of this source tree.
	      */

	exports.default = EventsModel;
	module.exports = exports['default'];

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _slicedToArray2 = __webpack_require__(109);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _entries = __webpack_require__(116);

	var _entries2 = _interopRequireDefault(_entries);

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _keys = __webpack_require__(105);

	var _keys2 = _interopRequireDefault(_keys);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _ArgumentsError = __webpack_require__(151);

	var _ArgumentsError2 = _interopRequireDefault(_ArgumentsError);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Validator = function () {
	  /**
	   * Validation check model
	   *
	   * @constructor
	   */
	  function Validator() {
	    (0, _classCallCheck3.default)(this, Validator);

	    this._settings = {
	      validators: {},
	      groupValidators: [],
	      asyncValidators: {},
	      asyncGroupValidators: [],
	      asyncDependenies: []
	    };

	    this.isValidRecord = this.isValidRecord.bind(this);
	    this.getValidationDependency = this.getValidationDependency.bind(this);
	  }

	  (0, _createClass3.default)(Validator, [{
	    key: 'field',


	    /**
	     * Add field sync validators
	     *
	     * @param {string}      field       Field name
	     * @param {...Function} validators  Field validators
	     * @returns {Validator} validator
	     */
	    value: function field(_field) {
	      if (!this._settings.validators[_field]) {
	        this._settings.validators[_field] = [];
	      }

	      for (var _len = arguments.length, validators = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        validators[_key - 1] = arguments[_key];
	      }

	      this._settings.validators[_field] = this._settings.validators[_field].concat(validators);
	      return this;
	    }

	    /**
	     * Specify multiple sync validators for fields group
	     *
	     * @param {Array}      fields              Fields array
	     * @param {Function}   validatorFunction   Validator function
	     * @returns {Validator} validator
	     */

	  }, {
	    key: 'fields',
	    value: function fields(_fields, validatorFunction) {
	      this._settings.groupValidators.push({
	        fields: _fields,
	        fn: validatorFunction
	      });
	      return this;
	    }

	    /**
	     * Point which fields server validation needs
	     *
	     * @param {Array}   fields   Fields array
	     * @returns {Validator} validator
	     */

	  }, {
	    key: 'asyncDependence',
	    value: function asyncDependence(fields) {
	      this._settings.asyncDependenies.push(fields);
	      return this;
	    }

	    /**
	     * Add field async validators
	     *
	     * @param {string}     field               Field name
	     * @param {Function}   validatorFunction   Validator function
	     * @returns {Validator} validator
	     */

	  }, {
	    key: 'asyncField',
	    value: function asyncField(field, validatorFunction) {
	      if (!this._settings.asyncValidators[field]) {
	        this._settings.asyncValidators[field] = [];
	      }
	      this._settings.asyncValidators[field].push(validatorFunction);
	      return this;
	    }

	    /**
	     * Specify multiple async validators for fields group
	     *
	     * @param {Array}      fields              Fields array
	     * @param {Function}   validatorFunction   Validator function
	     * @returns {Validator} validator
	     */

	  }, {
	    key: 'asyncFields',
	    value: function asyncFields(fields, validatorFunction) {
	      this._settings.asyncGroupValidators.push({
	        fields: fields,
	        fn: validatorFunction
	      });
	      return this;
	    }

	    /**
	     * Get all dependent fields validation needs
	     *
	     * @param {Array}   fields    Fields array
	     * @returns {Array} fields
	     */

	  }, {
	    key: 'getValidationDependency',
	    value: function getValidationDependency(fields) {
	      var result = [];
	      var length = void 0;
	      var groups = _utils2.default.pluck(this._settings.groupValidators.concat(this._settings.asyncGroupValidators), 'fields').concat(this._settings.asyncDependenies);

	      while (length !== result.length) {
	        length = result.length;

	        for (var i = 0; i < groups.length; i++) {
	          if (!_utils2.default.isIntersection(groups[i], fields) && !_utils2.default.isIntersection(groups[i], result)) {
	            continue;
	          }
	          for (var j = 0; j < groups[i].length; j++) {
	            var field = groups[i][j];
	            if (fields.indexOf(field) >= 0 || result.indexOf(field) >= 0) {
	              continue;
	            }
	            result.push(field);
	          }
	        }
	      }
	      return result;
	    }
	  }], [{
	    key: 'create',
	    value: function create() {
	      return new Validator();
	    }
	  }]);
	  return Validator;
	}();

	/**
	 * Check client record validity
	 *
	 * @param {Object}  record   Record
	 * @returns {ValidationErrors|null} Record validity
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	Validator.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
	    var fields, errors, awaitStack, promises, dependentFields, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, _field2, value, validators, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, validator, _error, asyncValidators, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, asyncValidator, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, groupValidator, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, asyncGroupValidator, asyncErrors, error, field;

	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            fields = (0, _keys2.default)(record);
	            errors = new _ValidationErrors2.default();
	            awaitStack = [];
	            promises = [];
	            dependentFields = this.getValidationDependency(fields);

	            if (!dependentFields.length) {
	              _context.next = 7;
	              break;
	            }

	            throw new _ArgumentsError2.default('Not enough fields for validator: ' + dependentFields.join(', '));

	          case 7:

	            // Add sync and async validators
	            _iteratorNormalCompletion = true;
	            _didIteratorError = false;
	            _iteratorError = undefined;
	            _context.prev = 10;
	            _iterator = (0, _getIterator3.default)((0, _entries2.default)(record));

	          case 12:
	            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
	              _context.next = 70;
	              break;
	            }

	            _step$value = (0, _slicedToArray3.default)(_step.value, 2), _field2 = _step$value[0], value = _step$value[1];
	            validators = this._settings.validators[_field2];

	            if (!validators) {
	              _context.next = 35;
	              break;
	            }

	            _iteratorNormalCompletion4 = true;
	            _didIteratorError4 = false;
	            _iteratorError4 = undefined;
	            _context.prev = 19;

	            for (_iterator4 = (0, _getIterator3.default)(validators); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	              validator = _step4.value;
	              _error = validator(value);

	              if (_error) {
	                errors.add(_field2, _error);
	              }
	            }
	            _context.next = 27;
	            break;

	          case 23:
	            _context.prev = 23;
	            _context.t0 = _context['catch'](19);
	            _didIteratorError4 = true;
	            _iteratorError4 = _context.t0;

	          case 27:
	            _context.prev = 27;
	            _context.prev = 28;

	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	              _iterator4.return();
	            }

	          case 30:
	            _context.prev = 30;

	            if (!_didIteratorError4) {
	              _context.next = 33;
	              break;
	            }

	            throw _iteratorError4;

	          case 33:
	            return _context.finish(30);

	          case 34:
	            return _context.finish(27);

	          case 35:
	            asyncValidators = this._settings.asyncValidators[_field2];

	            if (!asyncValidators) {
	              _context.next = 67;
	              break;
	            }

	            _iteratorNormalCompletion5 = true;
	            _didIteratorError5 = false;
	            _iteratorError5 = undefined;
	            _context.prev = 40;
	            _iterator5 = (0, _getIterator3.default)(asyncValidators);

	          case 42:
	            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
	              _context.next = 53;
	              break;
	            }

	            asyncValidator = _step5.value;

	            awaitStack.push(_field2);
	            _context.t1 = promises;
	            _context.next = 48;
	            return (0, _toPromise2.default)(asyncValidator)(value);

	          case 48:
	            _context.t2 = _context.sent;

	            _context.t1.push.call(_context.t1, _context.t2);

	          case 50:
	            _iteratorNormalCompletion5 = true;
	            _context.next = 42;
	            break;

	          case 53:
	            _context.next = 59;
	            break;

	          case 55:
	            _context.prev = 55;
	            _context.t3 = _context['catch'](40);
	            _didIteratorError5 = true;
	            _iteratorError5 = _context.t3;

	          case 59:
	            _context.prev = 59;
	            _context.prev = 60;

	            if (!_iteratorNormalCompletion5 && _iterator5.return) {
	              _iterator5.return();
	            }

	          case 62:
	            _context.prev = 62;

	            if (!_didIteratorError5) {
	              _context.next = 65;
	              break;
	            }

	            throw _iteratorError5;

	          case 65:
	            return _context.finish(62);

	          case 66:
	            return _context.finish(59);

	          case 67:
	            _iteratorNormalCompletion = true;
	            _context.next = 12;
	            break;

	          case 70:
	            _context.next = 76;
	            break;

	          case 72:
	            _context.prev = 72;
	            _context.t4 = _context['catch'](10);
	            _didIteratorError = true;
	            _iteratorError = _context.t4;

	          case 76:
	            _context.prev = 76;
	            _context.prev = 77;

	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }

	          case 79:
	            _context.prev = 79;

	            if (!_didIteratorError) {
	              _context.next = 82;
	              break;
	            }

	            throw _iteratorError;

	          case 82:
	            return _context.finish(79);

	          case 83:
	            return _context.finish(76);

	          case 84:

	            // Add sync and async group validators
	            _iteratorNormalCompletion2 = true;
	            _didIteratorError2 = false;
	            _iteratorError2 = undefined;
	            _context.prev = 87;
	            for (_iterator2 = (0, _getIterator3.default)(this._settings.groupValidators); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	              groupValidator = _step2.value;

	              if (_utils2.default.isIntersection(groupValidator.fields, fields)) {
	                groupValidator.fn(record, errors);
	              }
	            }

	            _context.next = 95;
	            break;

	          case 91:
	            _context.prev = 91;
	            _context.t5 = _context['catch'](87);
	            _didIteratorError2 = true;
	            _iteratorError2 = _context.t5;

	          case 95:
	            _context.prev = 95;
	            _context.prev = 96;

	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }

	          case 98:
	            _context.prev = 98;

	            if (!_didIteratorError2) {
	              _context.next = 101;
	              break;
	            }

	            throw _iteratorError2;

	          case 101:
	            return _context.finish(98);

	          case 102:
	            return _context.finish(95);

	          case 103:
	            _iteratorNormalCompletion3 = true;
	            _didIteratorError3 = false;
	            _iteratorError3 = undefined;
	            _context.prev = 106;
	            _iterator3 = (0, _getIterator3.default)(this._settings.asyncGroupValidators);

	          case 108:
	            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
	              _context.next = 120;
	              break;
	            }

	            asyncGroupValidator = _step3.value;

	            if (!_utils2.default.isIntersection(asyncGroupValidator.fields, fields)) {
	              _context.next = 117;
	              break;
	            }

	            awaitStack.push(null);
	            _context.t6 = promises;
	            _context.next = 115;
	            return (0, _toPromise2.default)(asyncGroupValidator.fn)(record, errors);

	          case 115:
	            _context.t7 = _context.sent;

	            _context.t6.push.call(_context.t6, _context.t7);

	          case 117:
	            _iteratorNormalCompletion3 = true;
	            _context.next = 108;
	            break;

	          case 120:
	            _context.next = 126;
	            break;

	          case 122:
	            _context.prev = 122;
	            _context.t8 = _context['catch'](106);
	            _didIteratorError3 = true;
	            _iteratorError3 = _context.t8;

	          case 126:
	            _context.prev = 126;
	            _context.prev = 127;

	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }

	          case 129:
	            _context.prev = 129;

	            if (!_didIteratorError3) {
	              _context.next = 132;
	              break;
	            }

	            throw _iteratorError3;

	          case 132:
	            return _context.finish(129);

	          case 133:
	            return _context.finish(126);

	          case 134:
	            _context.next = 136;
	            return _promise2.default.all(promises);

	          case 136:
	            asyncErrors = _context.sent;

	            while (asyncErrors.length) {
	              error = asyncErrors.pop();
	              field = awaitStack.pop();


	              if (error && field) {
	                errors.add(field, error);
	              }
	            }

	            return _context.abrupt('return', errors);

	          case 139:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[10, 72, 76, 84], [19, 23, 27, 35], [28,, 30, 34], [40, 55, 59, 67], [60,, 62, 66], [77,, 79, 83], [87, 91, 95, 103], [96,, 98, 102], [106, 122, 126, 134], [127,, 129, 133]]);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	exports.default = Validator;
	module.exports = exports['default'];

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _create = __webpack_require__(120);

	var _create2 = _interopRequireDefault(_create);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	function ArgumentsError(message) {
	  this.message = message;
	  this.status = this.statusCode = 422;
	  Error.captureStackTrace(this, ArgumentsError);
	}

	ArgumentsError.prototype = (0, _create2.default)(Error.prototype);
	ArgumentsError.prototype.constructor = ArgumentsError;

	exports.default = ArgumentsError;
	module.exports = exports["default"];

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _defaultXhr = __webpack_require__(162);

	var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ClientValidator = function (_Validator) {
	  (0, _inherits3.default)(ClientValidator, _Validator);

	  /**
	   * Get validator.
	   *
	   * @param {string}  serverValidationUrl
	   * @param {{}}      xhr
	   *
	   * @return {Validator}
	   */
	  function ClientValidator(serverValidationUrl, xhr) {
	    (0, _classCallCheck3.default)(this, ClientValidator);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (ClientValidator.__proto__ || (0, _getPrototypeOf2.default)(ClientValidator)).call(this));

	    _this._settings.serverValidationUrl = serverValidationUrl;
	    _this._settings.xhr = xhr || _defaultXhr2.default;
	    return _this;
	  }

	  (0, _createClass3.default)(ClientValidator, null, [{
	    key: 'create',
	    value: function create(serverValidationUrl, xhr) {
	      return new ClientValidator(serverValidationUrl, xhr);
	    }
	  }]);
	  return ClientValidator;
	}(_common2.default); /**
	                      * Copyright (с) 2015-present, SoftIndex LLC.
	                      * All rights reserved.
	                      *
	                      * This source code is licensed under the BSD-style license found in the
	                      * LICENSE file in the root directory of this source tree.
	                      */

	ClientValidator.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
	    var xhrResult, validationErrors;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            if (this._settings.serverValidationUrl) {
	              _context.next = 4;
	              break;
	            }

	            _context.next = 3;
	            return _common2.default.prototype.isValidRecord.call(this, record);

	          case 3:
	            return _context.abrupt('return', _context.sent);

	          case 4:
	            xhrResult = void 0;
	            _context.prev = 5;
	            _context.next = 8;
	            return (0, _toPromise2.default)(this._settings.xhr.bind(this._settings))({
	              method: 'POST',
	              headers: { 'Content-type': 'application/json' },
	              body: (0, _stringify2.default)(record),
	              uri: this._settings.serverValidationUrl
	            });

	          case 8:
	            xhrResult = _context.sent;
	            _context.next = 20;
	            break;

	          case 11:
	            _context.prev = 11;
	            _context.t0 = _context['catch'](5);

	            if (!(_context.t0.statusCode === 413)) {
	              _context.next = 19;
	              break;
	            }

	            _context.next = 16;
	            return _common2.default.prototype.isValidRecord.call(this, record);

	          case 16:
	            validationErrors = _context.sent;

	            if (validationErrors.isEmpty()) {
	              _context.next = 19;
	              break;
	            }

	            return _context.abrupt('return', validationErrors);

	          case 19:
	            throw _context.t0;

	          case 20:
	            return _context.abrupt('return', _ValidationErrors2.default.createFromJSON(JSON.parse(xhrResult)));

	          case 21:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[5, 11]]);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	exports.default = ClientValidator;
	module.exports = exports['default'];

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(154), __esModule: true };

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(155);
	module.exports = __webpack_require__(18).Object.getPrototypeOf;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(53)
	  , $getPrototypeOf = __webpack_require__(52);

	__webpack_require__(108)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(83);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(158);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(120);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(83);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(159), __esModule: true };

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(160);
	module.exports = __webpack_require__(18).Object.setPrototypeOf;

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(16);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(161).set});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(24)
	  , anObject = __webpack_require__(23);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(19)(Function.call, __webpack_require__(97).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _variables = __webpack_require__(4);

	var _variables2 = _interopRequireDefault(_variables);

	var _xhr = __webpack_require__(163);

	var _xhr2 = _interopRequireDefault(_xhr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var defaultXhr = function defaultXhr(settings, cb) {
	  return new _promise2.default(function (resolve, reject) {
	    (0, _xhr2.default)(settings, function (err, response, body) {
	      if (response.statusCode !== 200) {
	        if (!err) {
	          err = new Error();
	          err.statusCode = response.statusCode;
	          err.message = 'Status Code: ' + err.statusCode;
	        }
	        if (body) {
	          try {
	            var parsedBody = JSON.parse(body);
	            err.message = parsedBody.message || body;
	          } catch (e) {
	            err.message = body;
	          }
	        }
	        reject(err);
	      }

	      if (cb) {
	        cb(err, body);
	      }
	      resolve(body);
	    });
	  });
	};

	if (!_variables2.default.get('xhr')) {
	  _variables2.default.set('xhr', defaultXhr);
	}

	exports.default = function (settings, cb) {
	  return _variables2.default.get('xhr')(settings, cb);
	};

	module.exports = exports['default'];

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var window = __webpack_require__(164)
	var isFunction = __webpack_require__(165)
	var parseHeaders = __webpack_require__(166)
	var xtend = __webpack_require__(169)

	module.exports = createXHR
	createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
	createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

	forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
	    createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
	        options = initParams(uri, options, callback)
	        options.method = method.toUpperCase()
	        return _createXHR(options)
	    }
	})

	function forEachArray(array, iterator) {
	    for (var i = 0; i < array.length; i++) {
	        iterator(array[i])
	    }
	}

	function isEmpty(obj){
	    for(var i in obj){
	        if(obj.hasOwnProperty(i)) return false
	    }
	    return true
	}

	function initParams(uri, options, callback) {
	    var params = uri

	    if (isFunction(options)) {
	        callback = options
	        if (typeof uri === "string") {
	            params = {uri:uri}
	        }
	    } else {
	        params = xtend(options, {uri: uri})
	    }

	    params.callback = callback
	    return params
	}

	function createXHR(uri, options, callback) {
	    options = initParams(uri, options, callback)
	    return _createXHR(options)
	}

	function _createXHR(options) {
	    if(typeof options.callback === "undefined"){
	        throw new Error("callback argument missing")
	    }

	    var called = false
	    var callback = function cbOnce(err, response, body){
	        if(!called){
	            called = true
	            options.callback(err, response, body)
	        }
	    }

	    function readystatechange() {
	        if (xhr.readyState === 4) {
	            loadFunc()
	        }
	    }

	    function getBody() {
	        // Chrome with requestType=blob throws errors arround when even testing access to responseText
	        var body = undefined

	        if (xhr.response) {
	            body = xhr.response
	        } else {
	            body = xhr.responseText || getXml(xhr)
	        }

	        if (isJson) {
	            try {
	                body = JSON.parse(body)
	            } catch (e) {}
	        }

	        return body
	    }

	    function errorFunc(evt) {
	        clearTimeout(timeoutTimer)
	        if(!(evt instanceof Error)){
	            evt = new Error("" + (evt || "Unknown XMLHttpRequest Error") )
	        }
	        evt.statusCode = 0
	        return callback(evt, failureResponse)
	    }

	    // will load the data & process the response in a special response object
	    function loadFunc() {
	        if (aborted) return
	        var status
	        clearTimeout(timeoutTimer)
	        if(options.useXDR && xhr.status===undefined) {
	            //IE8 CORS GET successful response doesn't have a status field, but body is fine
	            status = 200
	        } else {
	            status = (xhr.status === 1223 ? 204 : xhr.status)
	        }
	        var response = failureResponse
	        var err = null

	        if (status !== 0){
	            response = {
	                body: getBody(),
	                statusCode: status,
	                method: method,
	                headers: {},
	                url: uri,
	                rawRequest: xhr
	            }
	            if(xhr.getAllResponseHeaders){ //remember xhr can in fact be XDR for CORS in IE
	                response.headers = parseHeaders(xhr.getAllResponseHeaders())
	            }
	        } else {
	            err = new Error("Internal XMLHttpRequest Error")
	        }
	        return callback(err, response, response.body)
	    }

	    var xhr = options.xhr || null

	    if (!xhr) {
	        if (options.cors || options.useXDR) {
	            xhr = new createXHR.XDomainRequest()
	        }else{
	            xhr = new createXHR.XMLHttpRequest()
	        }
	    }

	    var key
	    var aborted
	    var uri = xhr.url = options.uri || options.url
	    var method = xhr.method = options.method || "GET"
	    var body = options.body || options.data || null
	    var headers = xhr.headers = options.headers || {}
	    var sync = !!options.sync
	    var isJson = false
	    var timeoutTimer
	    var failureResponse = {
	        body: undefined,
	        headers: {},
	        statusCode: 0,
	        method: method,
	        url: uri,
	        rawRequest: xhr
	    }

	    if ("json" in options && options.json !== false) {
	        isJson = true
	        headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
	        if (method !== "GET" && method !== "HEAD") {
	            headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
	            body = JSON.stringify(options.json === true ? body : options.json)
	        }
	    }

	    xhr.onreadystatechange = readystatechange
	    xhr.onload = loadFunc
	    xhr.onerror = errorFunc
	    // IE9 must have onprogress be set to a unique function.
	    xhr.onprogress = function () {
	        // IE must die
	    }
	    xhr.onabort = function(){
	        aborted = true;
	    }
	    xhr.ontimeout = errorFunc
	    xhr.open(method, uri, !sync, options.username, options.password)
	    //has to be after open
	    if(!sync) {
	        xhr.withCredentials = !!options.withCredentials
	    }
	    // Cannot set timeout with sync request
	    // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
	    // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
	    if (!sync && options.timeout > 0 ) {
	        timeoutTimer = setTimeout(function(){
	            if (aborted) return
	            aborted = true//IE9 may still call readystatechange
	            xhr.abort("timeout")
	            var e = new Error("XMLHttpRequest timeout")
	            e.code = "ETIMEDOUT"
	            errorFunc(e)
	        }, options.timeout )
	    }

	    if (xhr.setRequestHeader) {
	        for(key in headers){
	            if(headers.hasOwnProperty(key)){
	                xhr.setRequestHeader(key, headers[key])
	            }
	        }
	    } else if (options.headers && !isEmpty(options.headers)) {
	        throw new Error("Headers cannot be set on an XDomainRequest object")
	    }

	    if ("responseType" in options) {
	        xhr.responseType = options.responseType
	    }

	    if ("beforeSend" in options &&
	        typeof options.beforeSend === "function"
	    ) {
	        options.beforeSend(xhr)
	    }

	    xhr.send(body)

	    return xhr


	}

	function getXml(xhr) {
	    if (xhr.responseType === "document") {
	        return xhr.responseXML
	    }
	    var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
	    if (xhr.responseType === "" && !firefoxBugTakenEffect) {
	        return xhr.responseXML
	    }

	    return null
	}

	function noop() {}


/***/ },
/* 164 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 165 */
/***/ function(module, exports) {

	module.exports = isFunction

	var toString = Object.prototype.toString

	function isFunction (fn) {
	  var string = toString.call(fn)
	  return string === '[object Function]' ||
	    (typeof fn === 'function' && string !== '[object RegExp]') ||
	    (typeof window !== 'undefined' &&
	     // IE8 and below
	     (fn === window.setTimeout ||
	      fn === window.alert ||
	      fn === window.confirm ||
	      fn === window.prompt))
	};


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	var trim = __webpack_require__(167)
	  , forEach = __webpack_require__(168)
	  , isArray = function(arg) {
	      return Object.prototype.toString.call(arg) === '[object Array]';
	    }

	module.exports = function (headers) {
	  if (!headers)
	    return {}

	  var result = {}

	  forEach(
	      trim(headers).split('\n')
	    , function (row) {
	        var index = row.indexOf(':')
	          , key = trim(row.slice(0, index)).toLowerCase()
	          , value = trim(row.slice(index + 1))

	        if (typeof(result[key]) === 'undefined') {
	          result[key] = value
	        } else if (isArray(result[key])) {
	          result[key].push(value)
	        } else {
	          result[key] = [ result[key], value ]
	        }
	      }
	  )

	  return result
	}

/***/ },
/* 167 */
/***/ function(module, exports) {

	
	exports = module.exports = trim;

	function trim(str){
	  return str.replace(/^\s*|\s*$/g, '');
	}

	exports.left = function(str){
	  return str.replace(/^\s*/, '');
	};

	exports.right = function(str){
	  return str.replace(/\s*$/, '');
	};


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(165)

	module.exports = forEach

	var toString = Object.prototype.toString
	var hasOwnProperty = Object.prototype.hasOwnProperty

	function forEach(list, iterator, context) {
	    if (!isFunction(iterator)) {
	        throw new TypeError('iterator must be a function')
	    }

	    if (arguments.length < 3) {
	        context = this
	    }
	    
	    if (toString.call(list) === '[object Array]')
	        forEachArray(list, iterator, context)
	    else if (typeof list === 'string')
	        forEachString(list, iterator, context)
	    else
	        forEachObject(list, iterator, context)
	}

	function forEachArray(array, iterator, context) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            iterator.call(context, array[i], i, array)
	        }
	    }
	}

	function forEachString(string, iterator, context) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        iterator.call(context, string.charAt(i), i, string)
	    }
	}

	function forEachObject(object, iterator, context) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            iterator.call(context, object[k], k, object)
	        }
	    }
	}


/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = extend

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function extend() {
	    var target = {}

	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (hasOwnProperty.call(source, key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _keys = __webpack_require__(105);

	var _keys2 = _interopRequireDefault(_keys);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _ArgumentsError = __webpack_require__(151);

	var _ArgumentsError2 = _interopRequireDefault(_ArgumentsError);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	function formatColumns(columns, viewColumns) {
	  var formattedColumns = {};
	  var columnId = void 0;
	  var i = void 0;

	  for (i = 0; i < viewColumns.length; i++) {
	    columnId = viewColumns[i];
	    formattedColumns[columnId] = '' + (columns[columnId].parent ? columns[columnId].parent + ' ' : '') + columns[columnId].name;
	  }

	  return formattedColumns;
	}

	function formatRecord(record, columns) {
	  var columnId = void 0;
	  var column = void 0;
	  var formattedRecord = _utils2.default.clone(record);

	  for (columnId in columns) {
	    column = columns[columnId];
	    formattedRecord[columnId] = column.render[column.render.length - 1](record);
	  }

	  return formattedRecord;
	}

	function formatData(records, totals, columns, viewColumns) {
	  var formatted = {
	    columns: formatColumns(columns, viewColumns),
	    records: records.map(function (record) {
	      return _utils2.default.pick(formatRecord(record[1], columns), viewColumns);
	    })
	  };
	  if (totals) {
	    formatted.totals = _utils2.default.pick(formatRecord(totals, columns), viewColumns, '');
	  }
	  return formatted;
	}

	function getFields(columns, viewColumns) {
	  var fields = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)(viewColumns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var columnId = _step.value;

	      for (var i = 0; i < columns[columnId].render.length - 1; i++) {
	        fields[columns[columnId].render[i]] = true;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return (0, _keys2.default)(fields);
	}

	/**
	 * @param {{}} columns
	 * @param {string[]} viewColumns
	 */
	function assertValidViewColumns(columns, viewColumns) {
	  if (!viewColumns || !viewColumns.length) {
	    throw new _ArgumentsError2.default('"viewColumns" can`t be empty');
	  }

	  var notExistColumns = [];
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = (0, _getIterator3.default)(viewColumns), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var columnId = _step2.value;

	      if (!columns[columnId]) {
	        notExistColumns.push(columnId);
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }

	  if (notExistColumns.length) {
	    throw new _ArgumentsError2.default('You trying to get not exist columns: ' + notExistColumns.join(', '));
	  }
	}

	/**
	 * @param {{}}                    gridModel
	 * @param {{}}                    columns
	 * @param {string[]}              viewColumns
	 * @param {Function}              exporter
	 * @param {{}}                    settings
	 * @param {[string, string][]}      settings.sort
	 * @param {number}                  settings.limit
	 * @param {number}                  settings.offset
	 * @param {string[]}                settings.viewColumns
	 * @param {Function}              cb
	 */
	exports.default = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(gridModel, columns, viewColumns, exporter, settings) {
	    var result, data;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            assertValidViewColumns(columns, viewColumns);
	            _context.next = 3;
	            return gridModel.read({
	              fields: getFields(columns, viewColumns),
	              sort: settings.sort ? [[settings.sort.column, settings.sort.direction]] : null,
	              limit: settings.limit,
	              offset: settings.offset
	            });

	          case 3:
	            result = _context.sent;
	            data = formatData(result.records, result.totals, columns, viewColumns);
	            _context.next = 7;
	            return (0, _toPromise2.default)(exporter)(data);

	          case 7:
	            return _context.abrupt('return', _context.sent);

	          case 8:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, undefined);
	  }));

	  return function (_x, _x2, _x3, _x4, _x5) {
	    return _ref.apply(this, arguments);
	  };
	}());
	module.exports = exports['default'];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var toJSON = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', {
	              mime: 'application/json',
	              data: {
	                records: data.records,
	                totals: data.totals
	              }
	            });

	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  function toJSON(_x) {
	    return _ref.apply(this, arguments);
	  }

	  return toJSON;
	}()); /**
	       * Copyright (с) 2015-present, SoftIndex LLC.
	       * All rights reserved.
	       *
	       * This source code is licensed under the BSD-style license found in the
	       * LICENSE file in the root directory of this source tree.
	       */

	exports.default = toJSON;
	module.exports = exports['default'];

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	var _defaultXhr = __webpack_require__(162);

	var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

	var _AbstractGridModel = __webpack_require__(173);

	var _AbstractGridModel2 = _interopRequireDefault(_AbstractGridModel);

	var _url = __webpack_require__(174);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Grid model, that works with API via XHR
	 *
	 * @param {Object}    settings                          Model settings
	 * @param {string}    settings.api                      API address
	 * @param {Validator} [settings.validator]        General validator
	 * @param {Function}  [settings.xhr]                    XHR interface
	 * @constructor
	 */
	var GridXhrModel = function GridXhrModel(settings) {
	  _AbstractGridModel2.default.call(this);

	  if (!settings.api) {
	    throw Error('Initialization problem: \'api\' must be specified.');
	  }

	  this._validator = settings.validator || new _common2.default();
	  this._xhr = settings.xhr || _defaultXhr2.default;
	  this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
	  .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	GridXhrModel.prototype = new _AbstractGridModel2.default();
	GridXhrModel.prototype.constructor = GridXhrModel;

	/**
	 * Add a record
	 *
	 * @param {Object}      record  Record object
	 * @param {Function}    cb      CallBack function
	 */
	GridXhrModel.prototype.create = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
	    var body;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'POST',
	              headers: { 'Content-type': 'application/json' },
	              uri: this._apiUrl,
	              body: (0, _stringify2.default)(record)
	            });

	          case 2:
	            body = _context.sent;


	            body = JSON.parse(body);

	            if (!body.error) {
	              _context.next = 6;
	              break;
	            }

	            throw _ValidationErrors2.default.createFromJSON(body.error);

	          case 6:

	            this.trigger('create', body.data);

	            return _context.abrupt('return', body.data);

	          case 8:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	/**
	 * Get records list
	 *
	 * @param {Object}      settings                Request
	 * @param {Array}       settings.fields         Fields
	 * @param {number}      [settings.limit]        Limit
	 * @param {number}      [settings.offset=0]     Offset
	 * @param {Object}      [settings.filters]      Filter values object
	 * @param {Array}       [settings.sort]         Sort parameters
	 * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
	 * @param {Function}    cb                      CallBack function
	 */
	GridXhrModel.prototype.read = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(settings) {
	    var parsedUrl, response;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            parsedUrl = _url2.default.parse(this._apiUrl, true);


	            parsedUrl.query.fields = (0, _stringify2.default)(settings.fields);
	            parsedUrl.query.offset = settings.offset || 0;
	            if (settings.limit) {
	              parsedUrl.query.limit = settings.limit;
	            }
	            if (settings.filters) {
	              parsedUrl.query.filters = (0, _stringify2.default)(settings.filters);
	            }
	            if (settings.sort) {
	              parsedUrl.query.sort = (0, _stringify2.default)(settings.sort);
	            }
	            if (settings.extra) {
	              parsedUrl.query.extra = (0, _stringify2.default)(settings.extra);
	            }
	            delete parsedUrl.search;

	            _context2.next = 10;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'GET',
	              uri: _url2.default.format(parsedUrl)
	            });

	          case 10:
	            response = _context2.sent;
	            return _context2.abrupt('return', JSON.parse(response));

	          case 12:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function (_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	/**
	 * Get the particular record
	 *
	 * @param {number|string}   id      Record ID
	 * @param {Array}           fields  Required fields
	 * @param {Function}        cb      CallBack function
	 */
	GridXhrModel.prototype.getRecord = (0, _callbackify2.default)(function () {
	  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(id, fields) {
	    var parsedUrl, body;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            parsedUrl = _url2.default.parse(this._apiUrl, true);

	            parsedUrl.query.cols = (0, _stringify2.default)(fields); // TODO rename cols to fields
	            parsedUrl.pathname = _url2.default.resolve(parsedUrl.pathname, (0, _stringify2.default)(id));
	            delete parsedUrl.search;

	            _context3.next = 6;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'GET',
	              uri: _url2.default.format(parsedUrl)
	            });

	          case 6:
	            body = _context3.sent;
	            return _context3.abrupt('return', JSON.parse(body));

	          case 8:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function (_x3, _x4) {
	    return _ref3.apply(this, arguments);
	  };
	}());

	/**
	 * Apply record changes
	 *
	 * @param {Array}       changes     Changes array
	 * @param {Function}    cb          CallBack function
	 * @abstract
	 */
	GridXhrModel.prototype.update = (0, _callbackify2.default)(function () {
	  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(changes) {
	    var body;
	    return _regenerator2.default.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.next = 2;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'PUT',
	              headers: {
	                'Content-type': 'application/json'
	              },
	              uri: this._apiUrl,
	              body: (0, _stringify2.default)(changes)
	            });

	          case 2:
	            body = _context4.sent;


	            body = JSON.parse(body);

	            if (body.changes.length) {
	              this.trigger('update', body.changes);
	            }

	            body.errors.forEach(function (error) {
	              error[1] = _ValidationErrors2.default.createFromJSON(error[1]);
	            });

	            return _context4.abrupt('return', body.changes.concat(body.errors));

	          case 7:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));

	  return function (_x5) {
	    return _ref4.apply(this, arguments);
	  };
	}());

	/**
	 * Get all dependent fields, that are required for validation
	 *
	 * @param   {Array}  fields   Fields list
	 * @returns {Array}  Dependencies
	 */
	GridXhrModel.prototype.getValidationDependency = function (fields) {
	  return this._validator.getValidationDependency(fields);
	};

	/**
	 * Validation check
	 *
	 * @param {Object}      record
	 * @param {Function}    cb      CallBack function
	 */
	GridXhrModel.prototype.isValidRecord = (0, _callbackify2.default)(function (record) {
	  return (0, _toPromise2.default)(this._validator.isValidRecord.bind(this._validator))(record);
	});

	exports.default = GridXhrModel;
	module.exports = exports['default'];

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _Events = __webpack_require__(149);

	var _Events2 = _interopRequireDefault(_Events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Grid model abstraction
	 *
	 * @constructor
	 * @extends EventsModel
	 */
	var AbstractGridModel = function AbstractGridModel() {
	  _Events2.default.call(this);
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	AbstractGridModel.prototype = new _Events2.default();
	AbstractGridModel.prototype.constructor = AbstractGridModel;

	/**
	 * Add a record
	 *
	 * @param {Object}      record  Record object
	 * @param {Function}    cb      CallBack function
	 * @abstract
	 */
	AbstractGridModel.prototype.create = (0, _callbackify2.default)(function () {
	  return (/*record*/_promise2.default.resolve()
	  );
	});

	/**
	 * Get records list
	 *
	 * @param {Object}      settings                Request
	 * @param {Array}       settings.fields         Fields
	 * @param {number}      [settings.limit]        Limit
	 * @param {number}      [settings.offset]       Offset
	 * @param {Object}      [settings.filters]      Filter values object
	 * @param {Array}       [settings.sort]         Sort parameters
	 * @param {Array}       [settings.extra]        Record IDs, we need to get for sure
	 * @param {Function}    cb                      CallBack function
	 * @abstract
	 */
	AbstractGridModel.prototype.read = (0, _callbackify2.default)(function () {
	  return (/*settings*/_promise2.default.resolve({
	      records: [], // Primary records
	      ids: [], // Extra records
	      extraRecords: 0 // In all records count
	    })
	  );
	});

	/**
	 * Get the particular record
	 *
	 * @param {*}         id      Record ID
	 * @param {Array}     fields  Required fields
	 * @param {Function}  cb      CallBack function
	 * @abstract
	 */
	AbstractGridModel.prototype.getRecord = (0, _callbackify2.default)(function () {
	  return (/*id, fields*/_promise2.default.resolve()
	  );
	});

	/**
	 * Apply record changes
	 *
	 * @param {Array}       changes     Changes array
	 * @param {Function}    cb          CallBack function
	 * @abstract
	 */
	AbstractGridModel.prototype.update = (0, _callbackify2.default)(function () {
	  return (/*changes*/_promise2.default.resolve([])
	  );
	});

	/**
	 * Get all dependent fields, that are required for validation
	 *
	 * @param   {Array}  fields   Fields list
	 * @returns {Array}  Dependencies
	 * @abstract
	 */
	AbstractGridModel.prototype.getValidationDependency = function () {
	  return [];
	};

	/**
	 * Validation check
	 *
	 * @param {Object}      record
	 * @param {Function}    cb      CallBack function
	 * @abstract
	 */
	AbstractGridModel.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  return (/*record*/_promise2.default.resolve(new _ValidationErrors2.default())
	  );
	});

	exports.default = AbstractGridModel;
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var punycode = __webpack_require__(175);
	var util = __webpack_require__(177);

	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;

	exports.Url = Url;

	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,

	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(178);

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}

	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }

	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }

	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    this.parseHost();

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }

	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }

	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}

	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';

	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }

	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }

	  var search = this.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }

	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];

	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }

	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {

		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}

		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,

		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'

		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},

		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,

		/** Temporary variable */
		key;

		/*--------------------------------------------------------------------------*/

		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}

		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}

		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}

		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}

		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}

		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}

		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}

		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;

			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.

			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}

			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}

			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.

			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

					if (index >= inputLength) {
						error('invalid-input');
					}

					digit = basicToDigit(input.charCodeAt(index++));

					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}

					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

					if (digit < t) {
						break;
					}

					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}

					w *= baseMinusT;

				}

				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);

				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}

				n += floor(i / out);
				i %= out;

				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);

			}

			return ucs2encode(output);
		}

		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;

			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);

			// Cache the length
			inputLength = input.length;

			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;

			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}

			handledCPCount = basicLength = output.length;

			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.

			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}

			// Main encoding loop:
			while (handledCPCount < inputLength) {

				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}

				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}

				delta += (m - n) * handledCPCountPlusOne;
				n = m;

				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];

					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}

					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}

						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}

				++delta;
				++n;

			}
			return output.join('');
		}

		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}

		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}

		/*--------------------------------------------------------------------------*/

		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};

		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}

	}(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(176)(module), (function() { return this; }())))

/***/ },
/* 176 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 177 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.decode = exports.parse = __webpack_require__(179);
	exports.encode = exports.stringify = __webpack_require__(180);


/***/ },
/* 179 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	};


/***/ },
/* 180 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	'use strict';

	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	};

	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	var _AbstractGridModel = __webpack_require__(173);

	var _AbstractGridModel2 = _interopRequireDefault(_AbstractGridModel);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Specifies a grid model that will work with array data passed to it as a parameter.
	 *
	 * @param {Object}    [options]
	 * @param {Object[]}  [options.data]              Data array
	 * @param {Function}  [options.filtersHandler]
	 * @param {Validator} [options.validator]
	 * @param {string[]}  [options.requiredFields]
	 * @param {bool}      [options.validateOnCreate]
	 * @constructor
	 */
	var GridCollectionModel = function GridCollectionModel(options) {
	  _AbstractGridModel2.default.call(this);

	  options = options || {};

	  this.data = options.data || [];
	  this._id = 1;
	  this._filtersHandler = options.filtersHandler;
	  if (options.validation) {
	    _utils2.default.warn('Property "validation" is deprecated, use "validator" instead');
	  }
	  this._validator = options.validator || options.validation || new _common2.default();
	  this._requiredFields = options.requiredFields || [];
	  this._validateOnCreate = options.hasOwnProperty('validateOnCreate') ? options.validateOnCreate : true;

	  // TODO Deprecated. Will be deleted in v0.17.0
	  if (!this._validateOnCreate) {
	    console.warn('Deprecated option "validateOnCreate".');
	  }
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	GridCollectionModel.prototype = new _AbstractGridModel2.default();
	GridCollectionModel.prototype.constructor = GridCollectionModel;

	/**
	 * Set data array in model
	 *
	 * @param {Object[]} data
	 */
	GridCollectionModel.prototype.setData = function (data) {
	  this.data = data;
	};

	/**
	 * Add a record to local collection
	 *
	 * @param {Object}      record  Record object
	 * @param {Function}    cb      CallBack function
	 */
	GridCollectionModel.prototype.create = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(record) {
	    var i, field, validationErrors, clonedRecord;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            i = void 0;
	            field = void 0;
	            validationErrors = void 0;
	            clonedRecord = _utils2.default.clone(record);


	            for (i in this._requiredFields) {
	              field = this._requiredFields[i];
	              if (!clonedRecord.hasOwnProperty(field)) {
	                clonedRecord[field] = record[field];
	              }
	            }

	            if (!this._validateOnCreate) {
	              _context.next = 14;
	              break;
	            }

	            _context.next = 8;
	            return this.isValidRecord(clonedRecord);

	          case 8:
	            validationErrors = _context.sent;

	            if (validationErrors.isEmpty()) {
	              _context.next = 11;
	              break;
	            }

	            throw validationErrors;

	          case 11:
	            return _context.abrupt('return', this._create(clonedRecord));

	          case 14:
	            return _context.abrupt('return', this._create(clonedRecord));

	          case 15:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	GridCollectionModel.prototype._create = (0, _callbackify2.default)(function (record) {
	  var id = this._getID();
	  this.data.push([id, record]);
	  this.trigger('create', id);
	  return id;
	});

	/**
	 * Get records list
	 *
	 * @param {Object}      settings                Request
	 * @param {string[]}    settings.fields         Fields
	 * @param {number}      [settings.limit]        Limit
	 * @param {number}      [settings.offset=0]     Offset
	 * @param {Object}      [settings.filters]      Filter values object
	 * @param {Array}       [settings.sort]         Sort parameters
	 * @param {Array}       [settings.ids]          Record IDs, we need to get for sure
	 * @param {Function}    cb                      CallBack function
	 */
	GridCollectionModel.prototype.read = (0, _callbackify2.default)(function (settings) {
	  var data = _utils2.default.cloneDeep(this.data);
	  var result = {};

	  // Get extra records
	  if (settings.extra && settings.extra.length > 0) {
	    result.extraRecords = data.filter(function (record) {
	      return settings.extra.indexOf(record[0]) >= 0;
	    });
	  }

	  // Delete unnecessary fields
	  if (settings.fields) {
	    _utils2.default.forEach(result.extraRecords, function (record) {
	      _utils2.default.forEach(record[1], function (value, key) {
	        if (settings.fields.indexOf(key) === -1) {
	          delete record[1][key];
	        }
	      });
	    });
	  }

	  // Sorting
	  if (settings.sort && settings.sort.length > 0) {
	    (function () {
	      var sortField = settings.sort[0][0];
	      var sortMode = settings.sort[0][1];

	      data = data.sort(function (prev, next) {
	        if (prev[1][sortField] < next[1][sortField]) {
	          return sortMode === 'asc' ? -1 : 1;
	        } else if (prev[1][sortField] > next[1][sortField]) {
	          return sortMode === 'asc' ? 1 : -1;
	        } else {
	          return 0;
	        }
	      });
	    })();
	  }

	  // Apply filters
	  if (this._filtersHandler && settings.filters) {
	    data = _utils2.default.cloneDeep(this._filtersHandler(data, settings.filters));
	  }

	  result.count = data.length;

	  // Offset and limit
	  if (settings.offset || settings.limit) {
	    var start = settings.offset || 0;
	    var end = settings.offset + settings.limit || data.length;
	    data = data.slice(start, end);
	  }

	  // Delete unnecessary fields
	  if (settings.fields) {
	    _utils2.default.forEach(data, function (record) {
	      _utils2.default.forEach(record[1], function (value, key) {
	        if (settings.fields.indexOf(key) === -1) {
	          delete record[1][key];
	        }
	      });
	    });
	  }

	  result.records = data;

	  return _promise2.default.resolve(result);
	});

	/**
	 * Get the particular record
	 *
	 * @param {number|string}   id      Record ID
	 * @param {Array}           fields  Required fields
	 * @param {Function}        cb      CallBack function
	 */
	GridCollectionModel.prototype.getRecord = (0, _callbackify2.default)(function (id, fields) {
	  var record = _utils2.default.cloneDeep(this._getRecordByID(id));
	  if (!record) {
	    return _promise2.default.reject(new Error('Record not found.'));
	  }

	  var returnRecord = record[1];

	  // Deleting unused fields
	  if (fields) {
	    _utils2.default.forEach(returnRecord, function (value, key) {
	      if (fields.indexOf(key) === -1) {
	        delete returnRecord[key];
	      }
	    });
	  }

	  return _promise2.default.resolve(returnRecord);
	});

	/**
	 * Apply record changes
	 *
	 * @param {Array}       changes     Changes array
	 * @param {Function}    cb          CallBack function
	 * @abstract
	 */
	GridCollectionModel.prototype.update = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(changes) {
	    var _this = this;

	    var completed, appliedChanges, finish, validErrors, promises, result;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            completed = 0;
	            appliedChanges = [];
	            finish = false;
	            validErrors = void 0;

	            if (changes.length) {
	              _context3.next = 6;
	              break;
	            }

	            return _context3.abrupt('return', []);

	          case 6:
	            promises = changes.map(function () {
	              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(change) {
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                  while (1) {
	                    switch (_context2.prev = _context2.next) {
	                      case 0:
	                        if (!finish) {
	                          _context2.next = 2;
	                          break;
	                        }

	                        return _context2.abrupt('return');

	                      case 2:
	                        _context2.prev = 2;
	                        _context2.next = 5;
	                        return _this.isValidRecord(change[1]);

	                      case 5:
	                        validErrors = _context2.sent;
	                        _context2.next = 12;
	                        break;

	                      case 8:
	                        _context2.prev = 8;
	                        _context2.t0 = _context2['catch'](2);

	                        finish = true;
	                        throw _context2.t0;

	                      case 12:

	                        ++completed;

	                        if (!validErrors.isEmpty()) {
	                          _context2.next = 19;
	                          break;
	                        }

	                        (0, _assign2.default)(_this._getRecordByID(change[0])[1], change[1]);
	                        appliedChanges.push(change);
	                        return _context2.abrupt('return', change);

	                      case 19:
	                        return _context2.abrupt('return', [change[0], validErrors]);

	                      case 20:
	                      case 'end':
	                        return _context2.stop();
	                    }
	                  }
	                }, _callee2, _this, [[2, 8]]);
	              }));

	              return function (_x3) {
	                return _ref3.apply(this, arguments);
	              };
	            }());
	            _context3.next = 9;
	            return _promise2.default.all(promises);

	          case 9:
	            result = _context3.sent;


	            if (completed === changes.length) {
	              this.trigger('update', appliedChanges);
	            }

	            return _context3.abrupt('return', result);

	          case 12:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function (_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	/**
	 * Get all dependent fields, that are required for validation
	 *
	 * @param   {Array}  fields   Fields list
	 * @returns {Array}  Dependencies
	 */
	GridCollectionModel.prototype.getValidationDependency = function (fields) {
	  return this._validator.getValidationDependency(fields);
	};

	/**
	 * Validation check
	 *
	 * @param {Object}      record
	 * @param {Function}    cb      CallBack function
	 */
	GridCollectionModel.prototype.isValidRecord = (0, _callbackify2.default)(function (record) {
	  return (0, _toPromise2.default)(this._validator.isValidRecord.bind(this._validator))(record);
	});

	GridCollectionModel.prototype._getID = function () {
	  while (this._getRecordByID(this._id)) {
	    this._id++;
	  }
	  return this._id++;
	};

	GridCollectionModel.prototype._getRecordByID = function (id) {
	  return _utils2.default.find(this.data, function (record) {
	    return record[0] === id;
	  });
	};

	exports.default = GridCollectionModel;
	module.exports = exports['default'];

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	var _AbstractFormModel2 = __webpack_require__(183);

	var _AbstractFormModel3 = _interopRequireDefault(_AbstractFormModel2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var FormModel = function (_AbstractFormModel) {
	  (0, _inherits3.default)(FormModel, _AbstractFormModel);

	  /**
	   * Simple form model
	   *
	   * @param {Object}    defaultValues Default form field values
	   * @param {Validator} validation    Validation
	   * @constructor
	   */
	  function FormModel(defaultValues, validation) {
	    (0, _classCallCheck3.default)(this, FormModel);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (FormModel.__proto__ || (0, _getPrototypeOf2.default)(FormModel)).call(this));

	    _this._validation = validation || new _common2.default();
	    _this._data = defaultValues ? _utils2.default.clone(defaultValues) : {};
	    return _this;
	  }

	  return FormModel;
	}(_AbstractFormModel3.default);

	/**
	 * Get data
	 *
	 * @param {Array}    fields     Required fields
	 * @param {Function} cb         CallBack function
	 */


	FormModel.prototype.getData = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fields) {
	    var record, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, field;

	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            record = {};

	            if (!fields) {
	              _context.next = 23;
	              break;
	            }

	            _iteratorNormalCompletion = true;
	            _didIteratorError = false;
	            _iteratorError = undefined;
	            _context.prev = 5;

	            for (_iterator = (0, _getIterator3.default)(fields); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              field = _step.value;

	              record[field] = this._data[field];
	            }
	            _context.next = 13;
	            break;

	          case 9:
	            _context.prev = 9;
	            _context.t0 = _context['catch'](5);
	            _didIteratorError = true;
	            _iteratorError = _context.t0;

	          case 13:
	            _context.prev = 13;
	            _context.prev = 14;

	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }

	          case 16:
	            _context.prev = 16;

	            if (!_didIteratorError) {
	              _context.next = 19;
	              break;
	            }

	            throw _iteratorError;

	          case 19:
	            return _context.finish(16);

	          case 20:
	            return _context.finish(13);

	          case 21:
	            _context.next = 24;
	            break;

	          case 23:
	            record = _utils2.default.clone(this._data);

	          case 24:
	            return _context.abrupt('return', record);

	          case 25:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this, [[5, 9, 13, 21], [14,, 16, 20]]);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	/**
	 * Process form data
	 *
	 * @param {Object}      changes     Form data
	 * @param {Function}    cb          CallBack function
	 */
	FormModel.prototype.submit = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(changes) {
	    var validErrors;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return this.isValidRecord(changes);

	          case 2:
	            validErrors = _context2.sent;

	            if (validErrors.isEmpty()) {
	              _context2.next = 5;
	              break;
	            }

	            throw validErrors;

	          case 5:
	            (0, _assign2.default)(this._data, changes);
	            this.trigger('update', changes);
	            return _context2.abrupt('return', changes);

	          case 8:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function (_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	/**
	 * Get all dependent fields, that are required for validation
	 *
	 * @param   {Array}  fields   Fields list
	 * @returns {Array}  Dependencies
	 */
	FormModel.prototype.getValidationDependency = function (fields) {
	  return this._validation.getValidationDependency(fields);
	};

	/**
	 * Validation check
	 *
	 * @param {Object}      record
	 * @param {Function}    cb      CallBack function
	 */
	FormModel.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(record) {
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return this._validation.isValidRecord(record);

	          case 2:
	            return _context3.abrupt('return', _context3.sent);

	          case 3:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function (_x3) {
	    return _ref3.apply(this, arguments);
	  };
	}());

	exports.default = FormModel;
	module.exports = exports['default'];

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _Events = __webpack_require__(149);

	var _Events2 = _interopRequireDefault(_Events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AbstractFormModel = function (_EventsModel) {
	  (0, _inherits3.default)(AbstractFormModel, _EventsModel);

	  /**
	   * Abstract form model
	   *
	   * @constructor
	   */
	  function AbstractFormModel() {
	    (0, _classCallCheck3.default)(this, AbstractFormModel);
	    return (0, _possibleConstructorReturn3.default)(this, (AbstractFormModel.__proto__ || (0, _getPrototypeOf2.default)(AbstractFormModel)).call(this));
	  }

	  return AbstractFormModel;
	}(_Events2.default);

	/**
	 * Get data
	 *
	 * @param {Array} fields     Required fields
	 * @returns {Object}  Promise
	 * @abstract
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	AbstractFormModel.prototype.getData = (0, _callbackify2.default)(function () {
	  return (/*fields*/_promise2.default.resolve({})
	  );
	});

	/**
	 * Process form data
	 *
	 * @param   {Object}      changes     Form data
	 * @returns {Object}  Promise
	 * @abstract
	 */
	AbstractFormModel.prototype.submit = (0, _callbackify2.default)(function () {
	  return (/*changes*/_promise2.default.resolve()
	  );
	});

	/**
	 * Get all dependent fields, that are required for validation
	 *
	 * @param   {Array}  fields  Fields list
	 * @returns {Array}  Dependencies
	 * @abstract
	 */
	AbstractFormModel.prototype.getValidationDependency = (0, _callbackify2.default)(function () {
	  return _promise2.default.resolve([]);
	});

	/**
	 * Record validity check
	 *
	 * @param {Object}      record  Record object
	 * @returns {Object}  Promise
	 * @abstract
	 */
	AbstractFormModel.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  return (/*record*/_promise2.default.resolve(new _ValidationErrors2.default())
	  );
	});

	exports.default = AbstractFormModel;
	module.exports = exports['default'];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	var _defaultXhr = __webpack_require__(162);

	var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

	var _Events = __webpack_require__(149);

	var _Events2 = _interopRequireDefault(_Events);

	var _url = __webpack_require__(174);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FormXhrModel = function (_EventsModel) {
	  (0, _inherits3.default)(FormXhrModel, _EventsModel);

	  function FormXhrModel(settings) {
	    (0, _classCallCheck3.default)(this, FormXhrModel);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (FormXhrModel.__proto__ || (0, _getPrototypeOf2.default)(FormXhrModel)).call(this));

	    if (!settings.api) {
	      throw Error('Initialization problem: \'api\' must be specified.');
	    }

	    _this._validator = settings.validator || new _common2.default();
	    _this._xhr = settings.xhr || _defaultXhr2.default;
	    _this._apiUrl = settings.api.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
	    .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
	    return _this;
	  }

	  /**
	   * Get all dependent fields, that are required for validation
	   *
	   * @param   {Array}  fields   Fields list
	   * @returns {Array}  Dependencies
	   */


	  (0, _createClass3.default)(FormXhrModel, [{
	    key: 'getValidationDependency',
	    value: function getValidationDependency(fields) {
	      return this._validator.getValidationDependency(fields);
	    }
	  }]);
	  return FormXhrModel;
	}(_Events2.default); /**
	                      * Copyright (с) 2015-present, SoftIndex LLC.
	                      * All rights reserved.
	                      *
	                      * This source code is licensed under the BSD-style license found in the
	                      * LICENSE file in the root directory of this source tree.
	                      */

	FormXhrModel.prototype.getData = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(fields) {
	    var parsedUrl, response;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            parsedUrl = _url2.default.parse(this._apiUrl, true);

	            parsedUrl.query.fields = (0, _stringify2.default)(fields);
	            delete parsedUrl.search;

	            _context.next = 5;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'GET',
	              uri: _url2.default.format(parsedUrl)
	            });

	          case 5:
	            response = _context.sent;
	            return _context.abrupt('return', JSON.parse(response));

	          case 7:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	FormXhrModel.prototype.submit = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(changes) {
	    var body;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'POST',
	              headers: {
	                'Content-type': 'application/json'
	              },
	              uri: this._apiUrl,
	              body: (0, _stringify2.default)(changes)
	            });

	          case 2:
	            body = _context2.sent;


	            body = JSON.parse(body);

	            if (!body.error) {
	              _context2.next = 6;
	              break;
	            }

	            throw _ValidationErrors2.default.createFromJSON(body.error);

	          case 6:

	            this.trigger('update', body.data);
	            return _context2.abrupt('return', body.data);

	          case 8:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function (_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	/**
	 * Validation check
	 *
	 * @param {Object}      record
	 * @param {Function}    cb      CallBack function
	 */
	FormXhrModel.prototype.isValidRecord = (0, _callbackify2.default)(function (record) {
	  return (0, _toPromise2.default)(this._validator.isValidRecord.bind(this._validator))(record);
	});

	exports.default = FormXhrModel;
	module.exports = exports['default'];

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stringify = __webpack_require__(130);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _defaultXhr = __webpack_require__(162);

	var _defaultXhr2 = _interopRequireDefault(_defaultXhr);

	var _url = __webpack_require__(174);

	var _url2 = _interopRequireDefault(_url);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ListXMLHttpRequestModel =
	/**
	 * Simple list client model which works via XMLHttpRequest
	 *
	 * @param {string}    apiURL  API address for list model interaction
	 * @param {Function}  [xhr]   XHR wrapper
	 * @constructor
	 */
	function ListXMLHttpRequestModel(apiURL, xhr) {
	  (0, _classCallCheck3.default)(this, ListXMLHttpRequestModel);

	  this._apiURL = apiURL;
	  this._xhr = xhr || _defaultXhr2.default;
	  this._apiUrl = apiURL.replace(/([^/])\?/, '$1/?') // Add "/" before "?"
	  .replace(/^[^?]*[^/]$/, '$&/'); // Add "/" to the end
	};

	/**
	 * Get model data
	 *
	 * @param {string}    search  List search query
	 */


	ListXMLHttpRequestModel.prototype.read = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(search) {
	    var parsedUrl, body;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            parsedUrl = _url2.default.parse(this._apiUrl, true);

	            delete parsedUrl.search;
	            if (search) {
	              parsedUrl.query.v = search;
	            }

	            _context.next = 5;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'GET',
	              headers: {
	                'Content-type': 'application/json'
	              },
	              uri: _url2.default.format(parsedUrl)
	            });

	          case 5:
	            body = _context.sent;
	            return _context.abrupt('return', JSON.parse(body));

	          case 7:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	/**
	 * Get option name using ID
	 *
	 * @param {*}         id  Option ID
	 */
	ListXMLHttpRequestModel.prototype.getLabel = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(id) {
	    var parsedUrl, body;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            parsedUrl = _url2.default.parse(this._apiUrl, true);

	            parsedUrl.pathname = _url2.default.resolve(parsedUrl.pathname, 'label/' + (0, _stringify2.default)(id));

	            _context2.next = 4;
	            return (0, _toPromise2.default)(this._xhr.bind(this))({
	              method: 'GET',
	              headers: {
	                'Content-type': 'application/json'
	              },
	              uri: _url2.default.format(parsedUrl)
	            });

	          case 4:
	            body = _context2.sent;


	            body = JSON.parse(body);

	            return _context2.abrupt('return', body);

	          case 7:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function (_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	exports.default = ListXMLHttpRequestModel;
	module.exports = exports['default'];

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _promise = __webpack_require__(7);

	var _promise2 = _interopRequireDefault(_promise);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	/**
	 * Abstract List model
	 */
	var AbstractListModel = function () {
	  function AbstractListModel() {
	    (0, _classCallCheck3.default)(this, AbstractListModel);
	  }

	  (0, _createClass3.default)(AbstractListModel, [{
	    key: 'read',

	    /**
	     * Get data
	     *
	     * @param {string}    search  Search query
	     * @abstract
	     */
	    value: function read() /*search*/{
	      return _promise2.default.resolve([]);
	    }

	    /**
	     * Get option name using ID
	     *
	     * @param {*}         id  Option ID
	     * @abstract
	     */

	  }, {
	    key: 'getLabel',
	    value: function getLabel() /*id*/{
	      return _promise2.default.resolve('');
	    }
	  }]);
	  return AbstractListModel;
	}();

	exports.default = AbstractListModel;
	module.exports = exports['default'];

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	var _Events2 = __webpack_require__(149);

	var _Events3 = _interopRequireDefault(_Events2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GridToFormUpdate = function (_Events) {
	  (0, _inherits3.default)(GridToFormUpdate, _Events);

	  /**
	   * Adapter that allows us to use Grid model record as a form model
	   *
	   * @param {AbstractGridModel} model   Grid model
	   * @param {number|string}     id      Record ID
	   * @constructor
	   */
	  function GridToFormUpdate(model, id) {
	    (0, _classCallCheck3.default)(this, GridToFormUpdate);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (GridToFormUpdate.__proto__ || (0, _getPrototypeOf2.default)(GridToFormUpdate)).call(this));

	    _this._adapter = {
	      model: model,
	      id: id
	    };

	    _this._onUpdateHandlers = [];
	    return _this;
	  }

	  /**
	   * Subscribe to inner model event
	   *
	   * @param {string}      event   Event ID
	   * @param {Function}    cb      CallBack function
	   */


	  (0, _createClass3.default)(GridToFormUpdate, [{
	    key: 'on',
	    value: function on(event, cb) {
	      var ctx = this;

	      if (event !== 'update') {
	        _Events3.default.prototype.on.call(this, event, cb);
	        return;
	      }

	      // onChange filters out table events, that do not regard to our record
	      function onChange(changes) {
	        for (var i = 0; i < changes.length; i++) {
	          if (_utils2.default.isEqual(changes[i][0], ctx._adapter.id)) {
	            cb(changes[i][1]);
	            return;
	          }
	        }
	      }

	      this._onUpdateHandlers.push({
	        originalCallback: cb,
	        wrappedCallback: onChange
	      });

	      this._adapter.model.on('update', onChange);
	    }

	    /**
	     * Unsubscribe from inner model event
	     *
	     * @param {string}      event   Event ID
	     * @param {Function}    cb      CallBack function
	     */

	  }, {
	    key: 'off',
	    value: function off(event, cb) {
	      var ctx = this;
	      var newOnUpdateHandlers = [];

	      if (event !== 'update') {
	        _Events3.default.prototype.off.call(this, event, cb);
	        return;
	      }

	      this._onUpdateHandlers.forEach(function (handler) {
	        if (handler.originalCallback === cb) {
	          ctx._adapter.model.off('update', handler.wrappedCallback);
	        } else {
	          newOnUpdateHandlers.push(handler);
	        }
	      });

	      this._onUpdateHandlers = newOnUpdateHandlers;
	    }
	  }, {
	    key: 'listenerCount',
	    value: function listenerCount(event) {
	      return this._adapter.model.listenerCount(event);
	    }
	  }]);
	  return GridToFormUpdate;
	}(_Events3.default);

	/**
	 * Get data
	 *
	 * @param {Array}     fields     Required fields
	 * @param {Function}  cb         CallBack function
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	GridToFormUpdate.prototype.getData = (0, _callbackify2.default)(function (fields) {
	  var model = this._adapter.model;
	  return (0, _toPromise2.default)(model.getRecord.bind(model))(this._adapter.id, fields);
	});

	/**
	 * Apply changes
	 *
	 * @param   {Object}      changes     Form data
	 * @param   {Function}    cb          CallBack function
	 */
	GridToFormUpdate.prototype.submit = (0, _callbackify2.default)(function () {
	  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(changes) {
	    var record, model, result;
	    return _regenerator2.default.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            record = _utils2.default.clone(changes);
	            model = this._adapter.model;
	            _context.next = 4;
	            return (0, _toPromise2.default)(model.update.bind(model))([[this._adapter.id, record]]);

	          case 4:
	            result = _context.sent;

	            result = result[0][1];

	            if (!(result instanceof _ValidationErrors2.default)) {
	              _context.next = 8;
	              break;
	            }

	            throw result;

	          case 8:
	            return _context.abrupt('return', result);

	          case 9:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));

	  return function (_x) {
	    return _ref.apply(this, arguments);
	  };
	}());

	/**
	 * Record validity check
	 *
	 * @param {Object}      record  Record object
	 * @param {Function}    cb      CallBack function
	 */
	GridToFormUpdate.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(record) {
	    var model;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            model = this._adapter.model;
	            _context2.next = 3;
	            return (0, _toPromise2.default)(model.isValidRecord.bind(model))(record);

	          case 3:
	            return _context2.abrupt('return', _context2.sent);

	          case 4:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function (_x2) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	/**
	 * Get all dependent fields, that are required for validation
	 *
	 * @param   {Array}  fields  Fields list
	 * @returns {Array}  Dependencies
	 */
	GridToFormUpdate.prototype.getValidationDependency = function (fields) {
	  return this._adapter.model.getValidationDependency(fields);
	};

	exports.default = GridToFormUpdate;
	module.exports = exports['default'];

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _Events2 = __webpack_require__(149);

	var _Events3 = _interopRequireDefault(_Events2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GridToFormCreate = function (_Events) {
	  (0, _inherits3.default)(GridToFormCreate, _Events);

	  /**
	   * Adapter allows to use Grid model as a model for new form record creation
	   *
	   * @param {AbstractGridModel}   model           Grid model
	   * @param {Object}              [initialData]   Default field values
	   * @constructor
	   */
	  function GridToFormCreate(model, initialData) {
	    (0, _classCallCheck3.default)(this, GridToFormCreate);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (GridToFormCreate.__proto__ || (0, _getPrototypeOf2.default)(GridToFormCreate)).call(this));

	    _this._adapter = {
	      model: model,
	      initialData: initialData || {}
	    };
	    return _this;
	  }

	  /**
	   * Get all dependent fields, that are required for validation
	   *
	   * @param   {Array}  fields
	   * @returns {Array}  Dependencies
	   */


	  (0, _createClass3.default)(GridToFormCreate, [{
	    key: 'getValidationDependency',
	    value: function getValidationDependency(fields) {
	      return this._adapter.model.getValidationDependency(fields);
	    }
	  }]);
	  return GridToFormCreate;
	}(_Events3.default);

	/**
	 * Get data
	 *
	 * @param {Array}     fields     Required fields
	 * @param {Function}  cb         CallBack function
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	GridToFormCreate.prototype.getData = (0, _callbackify2.default)((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
	  return _regenerator2.default.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return this._adapter.initialData;

	        case 2:
	          return _context.abrupt('return', _context.sent);

	        case 3:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _callee, this);
	})));

	/**
	 * Create new record
	 *
	 * @param   {Object}      data      Record
	 * @param   {Function}    cb        CallBack function
	 */
	GridToFormCreate.prototype.submit = (0, _callbackify2.default)(function () {
	  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {
	    var model;
	    return _regenerator2.default.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            model = this._adapter.model;
	            _context2.next = 3;
	            return (0, _toPromise2.default)(model.create.bind(model))(data);

	          case 3:
	            return _context2.abrupt('return', _context2.sent);

	          case 4:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));

	  return function (_x) {
	    return _ref2.apply(this, arguments);
	  };
	}());

	/**
	 * Validation checking
	 *
	 * @param {Object}      record  Record object
	 * @param {Function}    cb      CallBack function
	 */
	GridToFormCreate.prototype.isValidRecord = (0, _callbackify2.default)(function () {
	  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(record) {
	    var model;
	    return _regenerator2.default.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            model = this._adapter.model;
	            _context3.next = 3;
	            return (0, _toPromise2.default)(model.isValidRecord.bind(model))(record);

	          case 3:
	            return _context3.abrupt('return', _context3.sent);

	          case 4:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));

	  return function (_x2) {
	    return _ref3.apply(this, arguments);
	  };
	}());

	exports.default = GridToFormCreate;
	module.exports = exports['default'];

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var SelectEditor = function (_React$Component) {
	  (0, _inherits3.default)(SelectEditor, _React$Component);

	  function SelectEditor(props) {
	    (0, _classCallCheck3.default)(this, SelectEditor);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (SelectEditor.__proto__ || (0, _getPrototypeOf2.default)(SelectEditor)).call(this, props));

	    _this.state = {
	      options: props.options,
	      loading: Boolean(props.model)
	    };
	    return _this;
	  }

	  (0, _createClass3.default)(SelectEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      if (this.props.model) {
	        (0, _toPromise2.default)(this.props.model.read.bind(this.props.model))('').then(function (data) {
	          data.unshift([null, '']);

	          _this2.setState({
	            options: data,
	            loading: false
	          });
	        }).catch(function (err) {
	          throw err;
	        });
	      }
	    }
	  }, {
	    key: 'getOptions',
	    value: function getOptions() {
	      return this.props.model ? this.state.options : this.props.options;
	    }
	  }, {
	    key: 'handleChange',
	    value: function handleChange(e) {
	      var option = this.getOptions()[e.target.value];
	      if (!(option instanceof Array)) {
	        option = [option, option];
	      }
	      this.props.onChange(option[0]);
	      if (this.props.onLabelChange) {
	        this.props.onLabelChange(option[1]);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      var options = this.getOptions();
	      var valueIndex = _utils2.default.findIndex(options, function (option) {
	        return _utils2.default.isEqual(option instanceof Array ? option[0] : option, _this3.props.value);
	      });

	      return _react2.default.createElement(
	        'select',
	        (0, _extends3.default)({}, _utils2.default.omit(this.props, 'value'), {
	          value: valueIndex,
	          onChange: this.handleChange.bind(this),
	          disabled: this.props.disabled || this.state.loading
	        }),
	        options.map(function (item, index) {
	          return _react2.default.createElement(
	            'option',
	            { key: index, value: index },
	            item instanceof Array ? item[1] : item
	          );
	        }, this)
	      );
	    }
	  }]);
	  return SelectEditor;
	}(_react2.default.Component); /**
	                               * Copyright (с) 2015-present, SoftIndex LLC.
	                               * All rights reserved.
	                               *
	                               * This source code is licensed under the BSD-style license found in the
	                               * LICENSE file in the root directory of this source tree.
	                               */

	SelectEditor.propTypes = {
	  options: _react2.default.PropTypes.array,
	  model: _react2.default.PropTypes.shape({
	    read: _react2.default.PropTypes.func
	  }),
	  disabled: _react2.default.PropTypes.bool,
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onLabelChange: _react2.default.PropTypes.func,
	  value: _react2.default.PropTypes.any
	};
	SelectEditor.defaultProps = {
	  options: []
	};
	exports.default = SelectEditor;
	module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _Portal = __webpack_require__(191);

	var _Portal2 = _interopRequireDefault(_Portal);

	var _reactDom = __webpack_require__(132);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var popupId = '__suggestBoxPopUp'; /**
	                                    * Copyright (с) 2015-present, SoftIndex LLC.
	                                    * All rights reserved.
	                                    *
	                                    * This source code is licensed under the BSD-style license found in the
	                                    * LICENSE file in the root directory of this source tree.
	                                    */

	var classes = {
	  option: '__suggestBoxPopUp-option',
	  optionFocused: '__suggestBoxPopUp-option-focused',
	  optionSelectable: '__suggestBoxPopUp-option-selectable',
	  optionTypes: {
	    group: '__suggestBoxPopUp-option-group',
	    header: '__suggestBoxPopUp-option-header',
	    subitem: '__suggestBoxPopUp-option-subitem',
	    empty: '__suggestBoxPopUp-option-empty'
	  },
	  searchBlock: '__suggestBox-search',
	  selectBtn: '__suggestBox-select-btn',
	  arrow: '__suggestBox-arrow',
	  up: '__suggestBox-up'
	};
	var TAB_KEY = 9;
	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;
	var ARROW_UP_KEY = 38;
	var ARROW_DOWN_KEY = 40;
	var MIN_POPUP_HEIGHT = 100;

	var SuggestBoxEditor = function (_React$Component) {
	  (0, _inherits3.default)(SuggestBoxEditor, _React$Component);

	  function SuggestBoxEditor(props) {
	    (0, _classCallCheck3.default)(this, SuggestBoxEditor);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (SuggestBoxEditor.__proto__ || (0, _getPrototypeOf2.default)(SuggestBoxEditor)).call(this, props));

	    _this._loadData = _utils2.default.throttle(_this._loadData);
	    _this.state = {
	      isOpened: false,
	      options: [],
	      selectedOptionKey: null,
	      lastValidLabel: ''
	    };
	    return _this;
	  }

	  (0, _createClass3.default)(SuggestBoxEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._isMounted = true;
	      if (this.props.defaultLabel) {
	        this._setLabelTo(this.props.defaultLabel, true);
	      } else if (this.props.hasOwnProperty('label')) {
	        this._setLabelTo(this.props.label, true);
	      } else {
	        this._getLabelFromModel(this.props.model, this.props.value);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._isMounted = false;
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return !_utils2.default.isEqual(this.props.value, nextProps.value) || this.state.loading !== nextState.loading || this.state.selectedOptionKey !== nextState.selectedOptionKey || this.state.isOpened !== nextState.isOpened || this.state.options.length !== nextState.options.length || this.props.disabled !== nextProps.disabled;
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!_utils2.default.isEqual(this.props.value, nextProps.value)) {
	        if (!this.props.hasOwnProperty('label')) {
	          this._getLabelFromModel(nextProps.model, nextProps.value);
	        }
	      }
	      if (this.props.label !== nextProps.label) {
	        this._setLabelTo(nextProps.label, true);
	      }
	    }
	  }, {
	    key: '_getOptionLabel',
	    value: function _getOptionLabel(option) {
	      return Array.isArray(option.label) ? option.label[option.label.length - 1] : option.label;
	    }
	  }, {
	    key: '_setLabelTo',
	    value: function _setLabelTo(label, markAsValid) {
	      if (label === null || label === undefined) {
	        label = '';
	      }
	      (0, _reactDom.findDOMNode)(this.refs.input).value = label;
	      if (markAsValid) {
	        this.state.lastValidLabel = label;
	      }
	    }
	  }, {
	    key: '_getLabelFromModel',
	    value: function _getLabelFromModel(model, id) {
	      var _this2 = this;

	      if (id === null || id === undefined) {
	        return this._setLabelTo('', true);
	      }

	      (0, _toPromise2.default)(model.getLabel.bind(model))(id).then(function (label) {
	        if (!_this2._isMounted) {
	          return;
	        }
	        _this2._setLabelTo(label, true);
	      }).catch(function (err) {
	        if (err) {
	          console.error(err);
	          throw err;
	        }
	      });
	    }
	  }, {
	    key: '_updateList',
	    value: function () {
	      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(searchPattern) {
	        var options, $popup;
	        return _regenerator2.default.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return this._loadData(searchPattern);

	              case 2:
	                options = _context.sent;
	                _context.next = 5;
	                return this.setState({
	                  options: options,
	                  selectedOptionKey: null,
	                  loading: false
	                });

	              case 5:
	                $popup = $('#' + popupId);

	                $popup.find('.__suggestBoxPopUp-content').css('bottom', 'auto').css('position', 'static');

	                this._scrollListTo();

	              case 8:
	              case 'end':
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function _updateList(_x) {
	        return _ref.apply(this, arguments);
	      }

	      return _updateList;
	    }()
	  }, {
	    key: '_loadData',
	    value: function () {
	      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(searchPattern) {
	        return _regenerator2.default.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                return _context2.abrupt('return', (0, _toPromise2.default)(this.props.model.read.bind(this.props.model))(searchPattern || ''));

	              case 1:
	              case 'end':
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function _loadData(_x2) {
	        return _ref2.apply(this, arguments);
	      }

	      return _loadData;
	    }()
	  }, {
	    key: '_openList',
	    value: function _openList(searchPattern, cb) {
	      var _this3 = this;

	      if (this.props.disabled || this.state.isOpened) {
	        return;
	      }

	      this.setState({ isOpened: true, loading: true }, function () {
	        (0, _reactDom.findDOMNode)(_this3.refs.input).select();

	        var $input = $((0, _reactDom.findDOMNode)(_this3.refs.input));
	        var $popup = $('#' + popupId);

	        var inputOffset = $input.offset();
	        var inputWidth = $input.css('width');
	        var inputHeight = $input.css('height');

	        var offsetTop = inputOffset.top + parseInt(inputHeight);
	        var offsetLeft = inputOffset.left;

	        if (typeof window !== 'undefined') {
	          var availableSpace = window.innerHeight - (offsetTop - window.scrollY);

	          if (availableSpace < MIN_POPUP_HEIGHT) {
	            offsetTop = inputOffset.top - 300;
	            $popup.css('height', 300);
	            $popup.find('.__suggestBoxPopUp-content').css('bottom', 0).css('position', 'absolute');
	          } else {
	            $popup.css('maxHeight', availableSpace);
	          }
	        }

	        $popup.css('minWidth', inputWidth).offset({
	          top: offsetTop,
	          left: offsetLeft
	        });

	        _this3._updateList(searchPattern, function () {
	          var selectedOptionKey = _utils2.default.findIndex(_this3.state.options, function (option) {
	            return _utils2.default.isEqual(option.id, _this3.props.value);
	          });
	          if (selectedOptionKey) {
	            _this3._focusOptionAndScrollIntoView(Number(selectedOptionKey));
	          }
	          if (typeof cb === 'function') {
	            cb();
	          }
	        });
	      });
	    }
	  }, {
	    key: '_onInputFocus',
	    value: function _onInputFocus() {
	      this._openList();
	      (0, _reactDom.findDOMNode)(this.refs.input).select();
	    }
	  }, {
	    key: '_closeList',
	    value: function _closeList(shouldBlur) {
	      if (shouldBlur) {
	        (0, _reactDom.findDOMNode)(this.refs.input).blur();
	      }
	      if (!this.state.isOpened) {
	        return;
	      }
	      this.setState({
	        options: [],
	        selectedOptionKey: null,
	        isOpened: false
	      });
	    }
	  }, {
	    key: '_toggleList',
	    value: function _toggleList() {
	      if (this.state.isOpened) {
	        this._closeList();
	      } else {
	        this._openList();
	      }
	    }
	  }, {
	    key: '_selectOption',
	    value: function _selectOption(option) {
	      this.props.onChange(option.id, option);
	      if (this.props.onLabelChange) {
	        this.props.onLabelChange(option.label);
	      }
	      if (this.props.onMetadataChange) {
	        this.props.onMetadataChange(option.metadata);
	      }
	      (0, _reactDom.findDOMNode)(this.refs.input).select();
	    }
	  }, {
	    key: '_focusOption',
	    value: function _focusOption(key, shouldSelectOption) {
	      if (shouldSelectOption === true) {
	        this._selectOption(this.state.options[key]);
	      }
	      if (this.state.isOpened) {
	        this._focusOptionAndScrollIntoView(key);
	      } else {
	        this._openList(null, function () {
	          this._focusOptionAndScrollIntoView(key);
	        });
	      }
	    }
	  }, {
	    key: '_focusOptionAndScrollIntoView',
	    value: function _focusOptionAndScrollIntoView(key) {
	      this.state.selectedOptionKey = key;
	      $('.' + classes.optionFocused).removeClass(classes.optionFocused);
	      $('.' + classes.option + '[data-key="' + key + '"]').addClass(classes.optionFocused);
	      var domOption = $('#' + popupId + ' li[data-key="' + key + '"]').get(0);
	      this._scrollListTo(domOption);
	    }
	  }, {
	    key: '_focusNextOption',
	    value: function _focusNextOption() {
	      if (this.state.selectedOptionKey === null) {
	        this.state.selectedOptionKey = 0;
	        return this._focusOption(this.state.selectedOptionKey);
	      }

	      var key = void 0;
	      for (key = this.state.selectedOptionKey + 1; key < this.state.options.length; key++) {
	        if (this.state.options[key].id) {
	          return this._focusOption(key, true);
	        }
	      }
	      for (key = 0; key < this.state.selectedOptionKey + 1; key++) {
	        if (this.state.options[key].id) {
	          return this._focusOption(key, true);
	        }
	      }
	    }
	  }, {
	    key: '_focusPrevOption',
	    value: function _focusPrevOption() {
	      if (this.state.selectedOptionKey === null) {
	        this.state.selectedOptionKey = 0;
	        return this._focusOption(this.state.selectedOptionKey);
	      }

	      var key = void 0;
	      for (key = this.state.selectedOptionKey - 1; key >= 0; key--) {
	        if (this.state.options[key].id) {
	          return this._focusOption(key, true);
	        }
	      }
	      for (key = this.state.options.length - 1; key > this.state.selectedOptionKey - 1; key--) {
	        if (this.state.options[key].id) {
	          return this._focusOption(key, true);
	        }
	      }
	    }
	  }, {
	    key: '_scrollListTo',
	    value: function _scrollListTo(target) {
	      var container = $('#' + popupId).get(0);
	      if (!container) {
	        return;
	      }

	      if (!target) {
	        container.scrollTop = 0;
	        return;
	      }

	      if (target.offsetTop - container.scrollTop >= container.clientHeight - target.clientHeight) {
	        container.scrollTop = target.offsetTop - container.clientHeight + target.clientHeight;
	      } else if (target.offsetTop - container.scrollTop < 0) {
	        container.scrollTop = target.offsetTop;
	      }
	    }
	  }, {
	    key: '_isParentOf',
	    value: function _isParentOf(child) {
	      while (child) {
	        child = $(child).parent().get(0);
	        if (child === (0, _reactDom.findDOMNode)(this)) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: '_onDocumentMouseDown',
	    value: function _onDocumentMouseDown(e, isOwner) {
	      if (e.button !== 0) {
	        return;
	      }
	      var $target = $(e.target);
	      if (isOwner) {
	        if (!$target.hasClass(classes.option)) {
	          $target = $target.parent();
	        }
	        if ($target.hasClass(classes.optionSelectable) && this.state.isOpened) {
	          this._selectOption(this.state.options[$target.attr('data-key')]);
	          this._closeList(true);
	        }
	      } else {
	        if (!$target.parents('.' + classes.searchBlock).length) {
	          this._setLabelTo(this.state.lastValidLabel);
	        }
	        if (!this._isParentOf(e.target)) {
	          this._closeList(true);
	        }
	      }
	    }
	  }, {
	    key: '_onDocumentMouseScroll',
	    value: function _onDocumentMouseScroll(e, isOwner) {
	      if (!isOwner) {
	        if (this.state.isOpened) {
	          this._setLabelTo(this.state.lastValidLabel);
	        }
	        this._closeList(true);
	      }
	    }
	  }, {
	    key: '_onInputKeyDown',
	    value: function _onInputKeyDown(e) {
	      if (this.props.disabled) {
	        return;
	      }

	      switch (e.keyCode) {
	        case ARROW_DOWN_KEY:
	          e.preventDefault();
	          if (!this.state.isOpened) {
	            return this._openList();
	          }
	          this._focusNextOption();
	          break;
	        case ARROW_UP_KEY:
	          e.preventDefault();
	          if (!this.state.isOpened) {
	            return this._openList();
	          }
	          this._focusPrevOption();
	          break;
	        case TAB_KEY:
	        case ENTER_KEY:
	          if (e.keyCode === ENTER_KEY) {
	            e.preventDefault();
	          }
	          if (this.state.selectedOptionKey === null) {
	            this._setLabelTo(this.state.lastValidLabel);
	          } else {
	            this._selectOption(this.state.options[this.state.selectedOptionKey]);
	          }
	          this._closeList();
	          break;
	        case ESCAPE_KEY:
	          e.preventDefault();
	          this._setLabelTo(this.state.lastValidLabel);
	          this._closeList();
	          break;
	      }
	    }
	  }, {
	    key: '_onInputValueChange',
	    value: function _onInputValueChange(e) {
	      if (this.state.isOpened) {
	        this._updateList(e.target.value);
	      } else {
	        this._openList(e.target.value);
	      }
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      (0, _reactDom.findDOMNode)(this.refs.input).focus();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var arrowClasses = [classes.arrow];
	      var options = void 0;
	      var optionsPopup = null;

	      if (this.state.isOpened) {
	        arrowClasses.push(classes.up);

	        if (this.state.loading) {
	          options = _react2.default.createElement(
	            'li',
	            { className: [classes.option, classes.optionTypes.empty].join(' ') },
	            this.props.loadingElement
	          );
	        } else {
	          if (!this.state.options.length) {
	            options = _react2.default.createElement(
	              'li',
	              { className: [classes.option, classes.optionTypes.empty].join(' ') },
	              this.props.notFoundElement
	            );
	          } else {
	            options = this.state.options.map(function (option, key) {
	              var optionClassNames = [classes.option];
	              if (key === _this4.state.selectedOptionKey) {
	                optionClassNames.push(classes.optionFocused);
	              }

	              if (option.id) {
	                optionClassNames.push(classes.optionSelectable);
	              }

	              if (option.type) {
	                optionClassNames.push(classes.optionTypes[option.type] || option.type);
	              }

	              return _react2.default.createElement(
	                'li',
	                {
	                  key: key,
	                  'data-key': key,
	                  onMouseOver: _this4._focusOption.bind(_this4, key),
	                  className: optionClassNames.join(' ')
	                },
	                Array.isArray(option.label) ? option.label.map(function (label, columnKey) {
	                  return _react2.default.createElement(
	                    'div',
	                    {
	                      key: columnKey },
	                    label
	                  );
	                }) : _react2.default.createElement(
	                  'div',
	                  null,
	                  option.label
	                )
	              );
	            });
	          }
	        }

	        optionsPopup = _react2.default.createElement(
	          _Portal2.default,
	          {
	            id: popupId,
	            onDocumentMouseDown: this._onDocumentMouseDown.bind(this),
	            onDocumentMouseScroll: this._onDocumentMouseScroll.bind(this),
	            className: '__suggestBoxPopUp'
	          },
	          _react2.default.createElement(
	            'div',
	            { className: '__suggestBoxPopUp-content' },
	            _react2.default.createElement(
	              'ul',
	              null,
	              options
	            )
	          )
	        );
	      }

	      return _react2.default.createElement(
	        'div',
	        { className: '__suggestBox' },
	        _react2.default.createElement(
	          'div',
	          { className: classes.searchBlock },
	          _react2.default.createElement('input', (0, _extends3.default)({}, _utils2.default.omit(this.props, ['model', 'value', 'onChange', 'onLabelChange']), {
	            ref: 'input',
	            type: 'text',
	            onClick: this._openList.bind(this, ''),
	            onFocus: this._onInputFocus.bind(this),
	            onKeyDown: this._onInputKeyDown.bind(this),
	            onChange: this._onInputValueChange.bind(this)
	          })),
	          _react2.default.createElement(
	            'div',
	            { onClick: this._toggleList.bind(this), className: classes.selectBtn },
	            _react2.default.createElement('div', { className: arrowClasses.join(' ') })
	          )
	        ),
	        optionsPopup
	      );
	    }
	  }]);
	  return SuggestBoxEditor;
	}(_react2.default.Component);

	SuggestBoxEditor.propTypes = {
	  disabled: _react2.default.PropTypes.bool,
	  model: _react2.default.PropTypes.shape({
	    read: _react2.default.PropTypes.func,
	    getLabel: _react2.default.PropTypes.func
	  }),
	  onChange: _react2.default.PropTypes.func.isRequired,
	  onLabelChange: _react2.default.PropTypes.func,
	  onMetadataChange: _react2.default.PropTypes.func,
	  value: _react2.default.PropTypes.any,
	  defaultLabel: _react2.default.PropTypes.string,
	  label: _react2.default.PropTypes.string,
	  notFoundElement: _react2.default.PropTypes.element,
	  loadingElement: _react2.default.PropTypes.element
	};
	SuggestBoxEditor.defaultProps = {
	  disabled: false,
	  notFoundElement: _react2.default.createElement(
	    'div',
	    null,
	    'Nothing found'
	  ),
	  loadingElement: _react2.default.createElement(
	    'div',
	    null,
	    'Loading...'
	  ),
	  value: null
	};
	exports.default = SuggestBoxEditor;
	module.exports = exports['default'];

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Portal = exports.ChildrenWrapper = undefined;

	var _reactDom = __webpack_require__(132);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ChildrenWrapper = exports.ChildrenWrapper = _react2.default.createClass({
	  displayName: 'ChildrenWrapper',

	  propTypes: {
	    children: _react2.default.PropTypes.node
	  },

	  getInitialState: function getInitialState() {
	    return {
	      children: this.props.children
	    };
	  },

	  setChildren: function setChildren(children) {
	    this.setState({ children: children });
	  },

	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      this.props,
	      this.state.children
	    );
	  }
	});

	var portalClass = '__portal';

	var Portal = exports.Portal = _react2.default.createClass({
	  displayName: 'Portal',

	  propTypes: {
	    children: _react2.default.PropTypes.node,
	    id: _react2.default.PropTypes.string,
	    onDocumentMouseDown: _react2.default.PropTypes.func,
	    onDocumentMouseScroll: _react2.default.PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return {
	      portal: null
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    document.addEventListener('mousedown', this._onDocumentMouseDown, false);
	    document.addEventListener('scroll', this._onDocumentMouseScroll, true);

	    var portal = document.createElement('div');
	    document.body.appendChild(portal);

	    portal.className = portalClass;
	    this.state.portal = portal;
	    this.state.wrapper = _reactDom2.default.render(_react2.default.createElement(
	      ChildrenWrapper,
	      this.props,
	      this.props.children
	    ), this.state.portal);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    document.removeEventListener('mousedown', this._onDocumentMouseDown, false);
	    document.removeEventListener('scroll', this._onDocumentMouseScroll, true);

	    _reactDom2.default.unmountComponentAtNode(this.state.portal);
	    document.body.removeChild(this.state.portal);
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.state.wrapper.setChildren(this.props.children);
	  },

	  _isDocumentEventOwner: function _isDocumentEventOwner(target) {
	    return $(target).parents('.' + portalClass).get(0) === this.state.portal;
	  },

	  _onDocumentMouseDown: function _onDocumentMouseDown(e) {
	    if (this.props.onDocumentMouseDown) {
	      this.props.onDocumentMouseDown(e, this._isDocumentEventOwner(e.target));
	    }
	  },

	  _onDocumentMouseScroll: function _onDocumentMouseScroll(e) {
	    if (this.props.onDocumentMouseScroll) {
	      this.props.onDocumentMouseScroll(e, this._isDocumentEventOwner(e.target));
	    }
	  },

	  render: function render() {
	    return null;
	  }
	});

	exports.default = Portal;

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _reactDom = __webpack_require__(132);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DatePickerEditor = function (_React$Component) {
	  (0, _inherits3.default)(DatePickerEditor, _React$Component);

	  function DatePickerEditor(props) {
	    (0, _classCallCheck3.default)(this, DatePickerEditor);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePickerEditor.__proto__ || (0, _getPrototypeOf2.default)(DatePickerEditor)).call(this, props));

	    _this.state = {
	      format: props.format ? _this.getFormat(props.format) : null,
	      textFormat: _this.getFormat(props.textFormat)
	    };
	    _this.setDate = _this.setDate.bind(_this);
	    return _this;
	  }

	  (0, _createClass3.default)(DatePickerEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var $element = $((0, _reactDom.findDOMNode)(this.refs.input)).datepicker({
	        minDate: this.props.min ? _utils2.default.toDate(this.props.min) : null,
	        maxDate: this.props.max ? _utils2.default.toDate(this.props.max) : null,
	        dateFormat: this.state.textFormat,
	        onSelect: this.setDate,
	        onClose: this.props.onBlur
	      });

	      // Remove jQueryUI DatePicker key commands
	      $.datepicker._doKeyDown = function () {};

	      if (this.props.value) {
	        $element.val($.datepicker.formatDate(this.state.textFormat, _utils2.default.toDate(this.props.value)));
	      }

	      if (this.props.show) {
	        $element.datepicker('show');
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      var $datePicker = $((0, _reactDom.findDOMNode)(this.refs.input));
	      if (props.min !== this.props.min) {
	        $datePicker.datepicker('option', 'minDate', props.min ? _utils2.default.toDate(props.min) : null);
	      }
	      if (props.max !== this.props.max) {
	        $datePicker.datepicker('option', 'maxDate', props.max ? _utils2.default.toDate(props.max) : null);
	      }
	      if (props.textFormat !== this.props.textFormat) {
	        this.state.textFormat = props.textFormat;
	        $datePicker.datepicker('option', 'dateFormat', this.getFormat(props.textFormat));
	      }
	      if (props.value !== this.props.value) {
	        var text = '';
	        if (props.value) {
	          text = $.datepicker.formatDate(this.state.textFormat, _utils2.default.toDate(props.value));
	        }
	        (0, _reactDom.findDOMNode)(this.refs.input).value = text;
	      }
	    }

	    /**
	     * Save date changes
	     */

	  }, {
	    key: 'setDate',
	    value: function setDate() {
	      var inputElement = (0, _reactDom.findDOMNode)(this.refs.input);
	      var value = inputElement.value;
	      var date = void 0;

	      // Try to parse input text
	      try {
	        date = $.datepicker.parseDate(this.state.textFormat, value);
	      } catch (e) {
	        this.props.onChange(null);
	        inputElement.value = value;
	        return;
	      }

	      // Make an inverse convert for parse check
	      // (removes partial dates parse bug)
	      if ($.datepicker.formatDate(this.state.textFormat, date) !== value) {
	        return this.props.onChange(null);
	      }

	      if (this.state.format) {
	        this.props.onChange($.datepicker.formatDate(this.state.format, date));
	      } else {
	        this.props.onChange(date);
	      }
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      (0, _reactDom.findDOMNode)(this.refs.input).focus();
	    }

	    /**
	     * Change usual date format to jQuery UI one
	     *
	     * @param   {string}    format      DateFormat
	     * @returns {string}    jQuery  UI DateFormat
	     */

	  }, {
	    key: 'getFormat',
	    value: function getFormat(format) {
	      return format.replace('yyyy', 'yy');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('input', (0, _extends3.default)({}, _utils2.default.omit(this.props, ['value', 'onBlur']), {
	        ref: 'input',
	        type: 'text',
	        onChange: this.setDate
	      }));
	    }
	  }]);
	  return DatePickerEditor;
	}(_react2.default.Component); /**
	                               * Copyright (с) 2015-present, SoftIndex LLC.
	                               * All rights reserved.
	                               *
	                               * This source code is licensed under the BSD-style license found in the
	                               * LICENSE file in the root directory of this source tree.
	                               */

	DatePickerEditor.propTypes = {
	  format: _react2.default.PropTypes.string,
	  textFormat: _react2.default.PropTypes.string,
	  min: _react2.default.PropTypes.any,
	  max: _react2.default.PropTypes.any,
	  value: _react2.default.PropTypes.any,
	  show: _react2.default.PropTypes.bool,
	  onBlur: _react2.default.PropTypes.func,
	  onChange: _react2.default.PropTypes.func.isRequired
	};
	DatePickerEditor.defaultProps = {
	  textFormat: 'yyyy-mm-dd'
	};
	exports.default = DatePickerEditor;
	module.exports = exports['default'];

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _reactDom = __webpack_require__(132);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var Checkbox = function (_React$Component) {
	  (0, _inherits3.default)(Checkbox, _React$Component);

	  function Checkbox() {
	    (0, _classCallCheck3.default)(this, Checkbox);
	    return (0, _possibleConstructorReturn3.default)(this, (Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).apply(this, arguments));
	  }

	  (0, _createClass3.default)(Checkbox, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this._setIndeterminate(this.props.indeterminate);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(props) {
	      this._setIndeterminate(props.indeterminate);
	    }
	  }, {
	    key: '_setIndeterminate',
	    value: function _setIndeterminate(value) {
	      (0, _reactDom.findDOMNode)(this.refs.checkbox).indeterminate = value;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('input', (0, _extends3.default)({}, this.props, {
	        type: 'checkbox',
	        ref: 'checkbox'
	      }));
	    }
	  }]);
	  return Checkbox;
	}(_react2.default.Component);

	Checkbox.propTypes = {
	  indeterminate: _react2.default.PropTypes.bool
	};
	exports.default = Checkbox;
	module.exports = exports['default'];

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends2 = __webpack_require__(125);

	var _extends3 = _interopRequireDefault(_extends2);

	var _getPrototypeOf = __webpack_require__(153);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(140);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(141);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(156);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(157);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _float = __webpack_require__(195);

	var _float2 = _interopRequireDefault(_float);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _reactDom = __webpack_require__(132);

	var _react = __webpack_require__(126);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var invalidFloat = (0, _float2.default)(null, null, true);

	var NumberEditor = function (_React$Component) {
	  (0, _inherits3.default)(NumberEditor, _React$Component);

	  function NumberEditor(props) {
	    (0, _classCallCheck3.default)(this, NumberEditor);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (NumberEditor.__proto__ || (0, _getPrototypeOf2.default)(NumberEditor)).call(this, props));

	    _this.state = {
	      value: props.value
	    };
	    return _this;
	  }

	  (0, _createClass3.default)(NumberEditor, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!_utils2.default.isEqual(this.state.value, nextProps.value)) {
	        (0, _reactDom.findDOMNode)(this.refs.input).value = this.state.value = nextProps.value;
	      }
	    }
	  }, {
	    key: '_onChangeHandler',
	    value: function _onChangeHandler(e) {
	      var target = e.target;
	      if (target.validity.valid || !invalidFloat(target.valueAsNumber)) {
	        if (isNaN(target.valueAsNumber)) {
	          // Empty input
	          this.state.value = null;
	        } else {
	          this.state.value = target.valueAsNumber;
	        }
	      } else {
	        this.state.value = NaN;
	      }
	      this.props.onChange(this.state.value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('input', (0, _extends3.default)({
	        step: 'any'
	      }, _utils2.default.omit(this.props, 'value'), {
	        type: 'number',
	        ref: 'input',
	        onChange: this._onChangeHandler.bind(this),
	        defaultValue: this.props.value
	      }));
	    }
	  }]);
	  return NumberEditor;
	}(_react2.default.Component);

	NumberEditor.propTypes = {
	  onChange: _react2.default.PropTypes.func.isRequired,
	  value: _react2.default.PropTypes.any
	};
	exports.default = NumberEditor;
	module.exports = exports['default'];

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, min, max, error, value) {
	  error = error || 'Invalid float';
	  if (!_utils2.default.isDefined(value)) {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  if (!value && value !== 0 || isNaN(Number(value)) || typeof min === 'number' && value < min || typeof max === 'number' && value > max) {
	    return error;
	  }
	}

	/**
	 * Create float validator
	 *
	 * @param min
	 * @param max
	 * @param {string} error Error message
	 * @returns {Function}
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(min, max, error) {
	  return baseValidator.bind(null, false, min, max, error);
	};
	validator.notNull = function (min, max, error) {
	  return baseValidator.bind(null, true, min, max, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, error, value) {
	  error = error || 'Not boolean';
	  if (!_utils2.default.isDefined(value)) {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  if (typeof value !== 'boolean') {
	    return error;
	  }
	}

	/**
	 * Create boolean validator
	 *
	 * @param {string} error Error message
	 * @returns {Function} Validator
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(error) {
	  return baseValidator.bind(null, false, error);
	};
	validator.notNull = function (error) {
	  return baseValidator.bind(null, true, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, min, max, error, value) {
	  error = error || 'Invalid date';
	  if (!_utils2.default.isDefined(value)) {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  value = _utils2.default.toDate(value);
	  if (min && _utils2.default.toDate(min) > value) {
	    return error;
	  }
	  if (max && _utils2.default.toDate(max) < value) {
	    return error;
	  }
	}

	/**
	 * Create date validator
	 *
	 * @param {Date}    [min]   Min date
	 * @param {Date}    [max]   Max date
	 * @param {string}  error   Error message
	 * @returns {Function} Validator
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(min, max, error) {
	  return baseValidator.bind(null, false, min, max, error);
	};
	validator.notNull = function (min, max, error) {
	  return baseValidator.bind(null, true, min, max, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, variants, error, value) {
	  error = error || 'Not in variants';
	  if (!_utils2.default.isDefined(value)) {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  if (variants.indexOf(value) < 0) {
	    return error;
	  }
	}

	/**
	 * Create enum validator
	 *
	 * @param variants
	 * @param {string} error Error message
	 * @returns {Function}
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(variants, error) {
	  return baseValidator.bind(null, false, variants, error);
	};
	validator.notNull = function (variants, error) {
	  return baseValidator.bind(null, true, variants, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, variants, error, values) {
	  error = error || 'Not in variants';
	  if (!_utils2.default.isDefined(values) || !values.length) {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = (0, _getIterator3.default)(values), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var value = _step.value;

	      if (variants.indexOf(value) < 0) {
	        return error;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	/**
	 * Create set validator
	 *
	 * @param variants
	 * @param {string} error Error message
	 * @returns {Function}
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(variants, error) {
	  return baseValidator.bind(null, false, variants, error);
	};
	validator.notNull = function (variants, error) {
	  return baseValidator.bind(null, true, variants, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof2 = __webpack_require__(83);

	var _typeof3 = _interopRequireDefault(_typeof2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, regExp, error, value) {
	  error = error || 'Not valid';
	  if (!_utils2.default.isDefined(value) || value === '') {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
	  if (type !== 'string' && type !== 'number' || !regExp.test(value)) {
	    return error;
	  }
	}

	/**
	 * Create RegEx validator
	 *
	 * @param regExp
	 * @param {string} error Error message
	 * @returns {Function}
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(regExp, error) {
	  return baseValidator.bind(null, false, regExp, error);
	};
	validator.notNull = function (regExp, error) {
	  return baseValidator.bind(null, true, regExp, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Create NULL validator
	 *
	 * @param {string} error Error message
	 * @returns {Function}
	 */
	exports.default = function (error) {
	  return function (value) {
	    if (!_utils2.default.isDefined(value)) {
	      return error;
	    }
	  };
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	module.exports = exports['default'];

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function baseValidator(notNull, min, max, error, value) {
	  error = error || 'Not number';
	  if (!_utils2.default.isDefined(value)) {
	    if (notNull) {
	      return error;
	    }
	    return;
	  }

	  if (!value && value !== 0 || parseInt(value, 10).toString() !== value.toString() || typeof min === 'number' && value < min || typeof max === 'number' && value > max) {
	    return error;
	  }
	}

	/**
	 * Create range Number validator
	 *
	 * @param min
	 * @param max
	 * @param {string} error Error message
	 * @returns {Function}
	 */
	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var validator = function validator(min, max, error) {
	  return baseValidator.bind(null, false, min, max, error);
	};
	validator.notNull = function (min, max, error) {
	  return baseValidator.bind(null, true, min, max, error);
	};

	exports.default = validator;
	module.exports = exports['default'];

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (error) {
	  return function (value) {
	    if (_utils2.default.isEmpty(value)) {
	      return error;
	    }
	  };
	};

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	module.exports = exports['default'];

	/**
	 * Check if value is not empty string, array and object. Not null, undefined, 0
	 *
	 * @param {string} error Error message
	 * @returns {Function}
	 */

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (с) 2015-present, SoftIndex LLC.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(78);

	var _assign2 = _interopRequireDefault(_assign);

	var _getIterator2 = __webpack_require__(113);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _regenerator = __webpack_require__(135);

	var _regenerator2 = _interopRequireDefault(_regenerator);

	var _asyncToGenerator2 = __webpack_require__(138);

	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

	var _utils = __webpack_require__(72);

	var _utils2 = _interopRequireDefault(_utils);

	var _callbackify = __webpack_require__(123);

	var _callbackify2 = _interopRequireDefault(_callbackify);

	var _toPromise = __webpack_require__(6);

	var _toPromise2 = _interopRequireDefault(_toPromise);

	var _common = __webpack_require__(150);

	var _common2 = _interopRequireDefault(_common);

	var _ValidationErrors = __webpack_require__(139);

	var _ValidationErrors2 = _interopRequireDefault(_ValidationErrors);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Grid form mixin
	 * @mixin
	 */
	var FormMixin = {
	  getInitialState: function getInitialState() {
	    this._validateForm = _utils2.default.throttle(this._validateForm);

	    if (this._handleModelChange.name.indexOf('bound ') !== 0) {
	      // Support React.createClass and mixin-decorators
	      this._handleModelChange = this._handleModelChange.bind(this);
	      this._getData = this._getData.bind(this);
	      this._getChanges = this._getChanges.bind(this);
	    }

	    return {
	      _formMixin: null
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    this._isUnmounted = false;
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this._isUnmounted = true;
	    if (!this._isNotInitialized()) {
	      this.state._formMixin.model.off('update', this._handleModelChange);
	    }
	  },

	  /**
	   * Initialize form
	   *
	   * @param {Object}            settings                                Configuration
	   * @param {Array}             settings.fields                         Fields list, that are required to display
	   * @param {FormModel}         settings.model                          Model of form
	   * @param {Object}            [settings.data]                         Preset data
	   * @param {Object}            [settings.changes                       Preset changes
	   * @param {bool}              [settings.submitAll=false]              Send all form for validity check
	   * @param {bool}              [settings.partialErrorChecking=false]   Activate partial gradual form validation
	   * @param {bool}              [settings.showDependentFields=false]    Mark the fields which are involved in the group validation
	   * @param {bool}              [settings.autoSubmit]                   Automatic submit before updateField
	   * @param {Function}          [settings.autoSubmitHandler]            Automatic submit handler
	   * @param {Validator}         [settings.warningsValidator]            Warningss validator for fields
	   * @param {Function}          [cb]                                    CallBack function
	   */
	  initForm: (0, _callbackify2.default)(function () {
	    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(settings) {
	      var data, err, _context;

	      return _regenerator2.default.wrap(function _callee$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              this._initState(settings);

	              if (this.state._formMixin.data) {
	                _context2.next = 21;
	                break;
	              }

	              data = void 0;
	              err = void 0;
	              _context2.prev = 4;
	              _context2.next = 7;
	              return (0, _toPromise2.default)((_context = settings.model, settings.model.getData).bind(_context))(settings.fields);

	            case 7:
	              data = _context2.sent;
	              _context2.next = 13;
	              break;

	            case 10:
	              _context2.prev = 10;
	              _context2.t0 = _context2['catch'](4);

	              err = _context2.t0;

	            case 13:
	              if (!this._isUnmounted) {
	                _context2.next = 15;
	                break;
	              }

	              return _context2.abrupt('return');

	            case 15:
	              if (!err) {
	                _context2.next = 20;
	                break;
	              }

	              this.state._formMixin.globalError = err;
	              _context2.next = 19;
	              return (0, _toPromise2.default)(this.setState.bind(this), true)(this.state);

	            case 19:
	              throw err;

	            case 20:

	              this.state._formMixin.data = data;

	            case 21:

	              this.state._formMixin.model.on('update', this._handleModelChange);
	              _context2.next = 24;
	              return (0, _toPromise2.default)(this.setState.bind(this), true)(this.state);

	            case 24:
	              _context2.next = 26;
	              return (0, _toPromise2.default)(this.validateForm, true)();

	            case 26:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee, this, [[4, 10]]);
	    }));

	    return function (_x) {
	      return _ref.apply(this, arguments);
	    };
	  }(), true),

	  /**
	   * Check is data loaded
	   *
	   * @returns {boolean}
	   */
	  isLoaded: function isLoaded() {
	    return this.state && this.state._formMixin && Boolean(this.state._formMixin.data || this.state._formMixin.globalError);
	  },

	  /**
	   * Get form changes
	   *
	   * @return {{}}
	   */
	  getChanges: function getChanges() {
	    var changes = {};
	    for (var field in this.state._formMixin.changes) {
	      if (!this._isDependentField(field)) {
	        changes[field] = this.state._formMixin.changes[field];
	      }
	    }
	    return changes;
	  },

	  /**
	   * Check if form field (or entire form) is changed
	   *
	   * @param  {string}   field  Field name
	   * @return {boolean}
	   */
	  hasChanges: function hasChanges(field) {
	    if (this._isNotInitialized()) {
	      return false;
	    }

	    var state = this.state._formMixin;

	    if (field === undefined) {
	      return !_utils2.default.isEmpty(state.changes);
	    }

	    if (!state.showDependentFields && this._isDependentField(field)) {
	      return false;
	    }

	    return state.changes.hasOwnProperty(field);
	  },

	  /**
	   * Check if form field has validity errors
	   *
	   * @param  {string|string[]}   field  Field name or array of names
	   * @return {boolean}
	   */
	  hasError: function hasError(field) {
	    if (this._isNotInitialized()) {
	      return false;
	    }

	    var state = this.state._formMixin;

	    // Check group of fields
	    if (Array.isArray(field)) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(field), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var entry = _step.value;

	          if (this.hasError(entry)) {
	            return true;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return false;
	    }

	    // If partial check is on and field is changed,
	    // do not display an error
	    if (state.partialErrorChecking) {
	      if (!state.changes.hasOwnProperty(field) || _utils2.default.isEqual(state.changes[field], state.data[field])) {
	        return false;
	      }
	    }

	    return this.state._formMixin.errors.hasError(field) || this.state._formMixin.warnings.hasError(field);
	  },

	  clearError: function clearError(field, cb) {
	    if (this._isNotInitialized()) {
	      return;
	    }

	    if (this.state._formMixin.validating) {
	      this.state._formMixin.pendingClearErrors.push(field);
	    }

	    if (Array.isArray(field)) {
	      field.forEach(function (oneField) {
	        this.state._formMixin.errors.clearField(oneField);
	        this.state._formMixin.warnings.clearField(oneField);
	      }, this);
	    } else {
	      this.state._formMixin.errors.clearField(field);
	      this.state._formMixin.warnings.clearField(field);
	    }

	    this.setState(this.state, typeof cb === 'function' ? cb : null);
	  },

	  /**
	   * Get form data without changes
	   *
	   * @return {Object|null}
	   */
	  getOriginalData: function getOriginalData() {
	    if (this._isNotInitialized()) {
	      return {};
	    }
	    return this.state._formMixin.data || null;
	  },

	  /**
	   * Get form data
	   *
	   * @return {Object|null}
	   */
	  getData: function getData() {
	    if (this._isNotInitialized()) {
	      return {};
	    }
	    return _utils2.default.cloneDeep(this._getData());
	  },

	  /**
	   * Get form errors
	   *
	   * @returns {ValidationErrors} Form errors
	   */
	  getValidationErrors: function getValidationErrors() {
	    if (this._isNotInitialized()) {
	      return new _ValidationErrors2.default();
	    }

	    var field = void 0;
	    var errors = _ValidationErrors2.default.merge(this.state._formMixin.errors, this.state._formMixin.warnings);

	    // If gradual validation is on, we need
	    // to remove unchanged records from errors object
	    if (this.state._formMixin.partialErrorChecking) {
	      errors = this.state._formMixin.errors.clone();

	      // Look through all form fields
	      for (field in this.state._formMixin.data) {
	        // If field is unchanged, remove errors, that regard to this field
	        if (!this.state._formMixin.changes.hasOwnProperty(field)) {
	          errors.clearField(field);
	        }
	      }
	    }

	    return errors;
	  },

	  getFieldErrors: function getFieldErrors(field) {
	    if (this._isNotInitialized()) {
	      return false;
	    }

	    // If partial check is on and field is changed,
	    // do not display an error
	    if (this.state._formMixin.partialErrorChecking && !this.state._formMixin.changes.hasOwnProperty(field)) {
	      return null;
	    }

	    var errors = this.state._formMixin.errors.getFieldErrors(field) || [];
	    var warnings = this.state._formMixin.warnings.getFieldErrors(field) || [];

	    return errors.concat(warnings);
	  },

	  /**
	   * Get global error data, if it's present
	   *
	   * @returns {Error|null}
	   */
	  getGlobalError: function getGlobalError() {
	    if (this._isNotInitialized()) {
	      return null;
	    }
	    return this.state._formMixin.globalError;
	  },

	  /**
	   * Update form value. Is used as the Editors onSubmit handler.
	   * Causes component redraw.
	   *
	   * @param {string|string[]}  fields  Parameters
	   * @param {*}                values   Event or data
	   * @param {Function}         [cb]       CallBack
	   */
	  updateField: function updateField(fields, values, cb) {
	    if (this._isNotInitialized()) {
	      return;
	    }

	    values = _utils2.default.parseValueFromEvent(values);

	    if (!Array.isArray(fields)) {
	      fields = [fields];
	      values = [values];
	    }

	    this.set(_utils2.default.zipObject(fields, values));
	    if (this.state._formMixin.autoSubmit) {
	      this.submit(this.state._formMixin.autoSubmitHandler, cb);
	    }
	  },

	  validateField: function validateField(fields, values, cb) {
	    if (this.state._formMixin.autoSubmit) {
	      throw Error('Use updateField method to update value in autoSubmit mode');
	    }
	    this.updateField(fields, values);
	    this.validateForm(cb);
	  },

	  validateForm: function validateForm(cb) {
	    this._validateForm(function (err) {
	      if (typeof cb === 'function') {
	        return cb(err);
	      }
	    });
	  },

	  /**
	   * Set data in the form
	   *
	   * @param {Object}    data              Data
	   * @param {bool}      [validate=false]  Validate form
	   * @param {Function}  [cb]              CallBack
	   */
	  set: function set(data, validate, cb) {
	    if (!this.isLoaded()) {
	      return;
	    }

	    if (typeof validate === 'function' && !cb) {
	      cb = validate;
	      validate = false;
	    }

	    var state = this.state._formMixin;
	    state.changes = _utils2.default.getRecordChanges(state.model, state.data, state.changes, data);

	    if (validate) {
	      this.validateForm(cb);
	      return;
	    }

	    this.setState(this.state, typeof cb === 'function' ? cb : null);
	  },

	  submitData: function submitData(data, cb) {
	    if (this._isNotInitialized()) {
	      return;
	    }

	    this.set(data);
	    this.submit(cb);
	  },

	  /**
	   * Send form data to the model
	   *
	   * @param {Function}  [cb]  CallBack function
	   */
	  submit: (0, _callbackify2.default)((0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
	    var changes, data, err, _context3, newChanges, actualChanges, validationError;

	    return _regenerator2.default.wrap(function _callee2$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            if (!this._isNotInitialized()) {
	              _context4.next = 2;
	              break;
	            }

	            return _context4.abrupt('return');

	          case 2:
	            if (!(!this.state._formMixin.autoSubmit && this.isSubmitting())) {
	              _context4.next = 4;
	              break;
	            }

	            return _context4.abrupt('return');

	          case 4:

	            this.state._formMixin.submitting = true;

	            changes = this._getChanges();


	            this.state._formMixin.globalError = null;
	            this.state._formMixin.partialErrorChecking = false;

	            this.setState(this.state);

	            // Send changes to model
	            data = void 0;
	            err = void 0;
	            _context4.prev = 11;
	            _context4.next = 14;
	            return (0, _toPromise2.default)((_context3 = this.state._formMixin.model, this.state._formMixin.model.submit).bind(_context3))(changes);

	          case 14:
	            data = _context4.sent;
	            _context4.next = 20;
	            break;

	          case 17:
	            _context4.prev = 17;
	            _context4.t0 = _context4['catch'](11);

	            err = _context4.t0;

	          case 20:
	            if (!this._isUnmounted) {
	              _context4.next = 22;
	              break;
	            }

	            return _context4.abrupt('return');

	          case 22:

	            this.state._formMixin.submitting = false;

	            newChanges = this._getChanges();
	            actualChanges = _utils2.default.isEqual(changes, newChanges);
	            validationError = err instanceof _ValidationErrors2.default;

	            // Replacing empty error to null

	            if (validationError && err.isEmpty()) {
	              err = null;
	            }

	            if (err) {
	              if (validationError) {
	                if (actualChanges) {
	                  this.state._formMixin.errors = err;
	                }
	              } else {
	                this.state._formMixin.globalError = err;
	              }
	            } else if (actualChanges) {
	              this.state._formMixin.errors = new _ValidationErrors2.default();
	              this.state._formMixin.changes = {};
	            } else {
	              _utils2.default.forEach(changes, function (value, field) {
	                if (_utils2.default.isEqual(value, newChanges[field])) {
	                  delete this.state._formMixin.changes[field];
	                }
	              }, this);
	            }

	            _context4.next = 30;
	            return (0, _toPromise2.default)(this.setState.bind(this), true)(this.state);

	          case 30:
	            return _context4.abrupt('return', data);

	          case 31:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee2, this, [[11, 17]]);
	  })), true),

	  clearFieldChanges: function clearFieldChanges(field, cb) {
	    if (this._isNotInitialized()) {
	      return;
	    }

	    this.state._formMixin.errors.clearField(field);
	    this.state._formMixin.warnings.clearField(field);
	    delete this.state._formMixin.changes[field];
	    this.setState(this.state, typeof cb === 'function' ? cb : null);
	  },

	  clearChanges: function clearChanges(cb) {
	    if (this._isNotInitialized()) {
	      return;
	    }

	    this.state._formMixin.errors.clear();
	    this.state._formMixin.warnings.clear();
	    this.state._formMixin.changes = {};
	    this.state._formMixin.globalError = false;
	    this.state._formMixin.partialErrorChecking = this.state._formMixin.partialErrorCheckingDefault;
	    this.setState(this.state, typeof cb === 'function' ? cb : null);
	  },

	  setPartialErrorChecking: function setPartialErrorChecking(value, cb) {
	    this.state._formMixin.partialErrorChecking = value;
	    this.setState(this.state, typeof cb === 'function' ? cb : null);
	  },

	  isSubmitting: function isSubmitting() {
	    if (this._isNotInitialized()) {
	      return false;
	    }

	    return this.state._formMixin.submitting;
	  },

	  /**
	   * Model records changes handler
	   *
	   * @param {Object} changes  Changes
	   * @private
	   */
	  _handleModelChange: function _handleModelChange(changes) {
	    (0, _assign2.default)(this.state._formMixin.data, _utils2.default.cloneDeep(changes));
	    if (!this._isUnmounted) {
	      this.setState(this.state);
	    }
	  },

	  _initState: function _initState(settings) {
	    if (!settings.model) {
	      throw Error('You must specify the model form in this.initForm()');
	    }

	    this.state._formMixin = {
	      data: settings.data,
	      changes: settings.changes || {},
	      errors: new _ValidationErrors2.default(),
	      warnings: new _ValidationErrors2.default(),
	      globalError: null,
	      validating: false,
	      pendingClearErrors: [],
	      submitting: false,
	      showDependentFields: settings.showDependentFields || false,
	      warningsValidator: settings.warningsValidator || new _common2.default(),

	      partialErrorChecking: settings.partialErrorChecking, // Current mode
	      partialErrorCheckingDefault: settings.partialErrorChecking, // Default mode

	      model: settings.model, // FormModel
	      fields: settings.fields,
	      submitAll: settings.submitAll,
	      autoSubmit: settings.autoSubmit,
	      autoSubmitHandler: settings.autoSubmitHandler
	    };
	  },

	  _isNotInitialized: function _isNotInitialized() {
	    return !this.state || !this.state._formMixin;
	  },

	  _validateForm: function _validateForm(cb, stop) {
	    if (this._isNotInitialized()) {
	      return stop();
	    }

	    var completed = 0;
	    var completeError = void 0;
	    var onComplete = function (err) {
	      var field = void 0;

	      if (this._isUnmounted) {
	        return;
	      }

	      if (err) {
	        completeError = err;
	      }

	      if (++completed < 2) {
	        // Wait two callbacks
	        return;
	      }

	      this.state._formMixin.validating = false;

	      while (field = this.state._formMixin.pendingClearErrors.pop()) {
	        this.state._formMixin.warnings.clearField(field);
	        this.state._formMixin.errors.clearField(field);
	      }

	      this.setState(this.state, function () {
	        if (completeError) {
	          cb(completeError);
	          return;
	        }

	        var errorsWithPartialChecking = this.getValidationErrors();
	        cb(errorsWithPartialChecking.isEmpty() ? null : errorsWithPartialChecking);
	      });
	    }.bind(this);

	    this.state._formMixin.validating = true;

	    this._runValidator(this.state._formMixin.model, this._getChanges, 'errors', onComplete);
	    this._runValidator(this.state._formMixin.warningsValidator, this._getData, 'warnings', onComplete);
	  },

	  _runValidator: function _runValidator(validator, getData, output, cb) {
	    var _this = this;

	    var data = getData();
	    validator.isValidRecord(data).then(function (validErrors) {
	      if (_this._isUnmounted || !_utils2.default.isEqual(data, getData())) {
	        return;
	      }
	      _this.state._formMixin[output] = validErrors;
	      cb();
	    }).catch(function (err) {
	      if (_this._isUnmounted || !_utils2.default.isEqual(data, getData())) {
	        return;
	      }
	      _this.state._formMixin[output].clear();
	      cb(err);
	    });
	  },

	  _getData: function _getData() {
	    if (!this.state._formMixin.data) {
	      return null;
	    }
	    return (0, _assign2.default)({}, this.state._formMixin.data, this.state._formMixin.changes);
	  },

	  _getChanges: function _getChanges() {
	    // Send all data or just changed fields in addiction of form configuration
	    if (this.state._formMixin.submitAll) {
	      return this._getData();
	    }
	    return _utils2.default.clone(this.state._formMixin.changes);
	  },

	  _isDependentField: function _isDependentField(field) {
	    var state = this.state._formMixin;
	    return state.changes.hasOwnProperty(field) && _utils2.default.isEqual(state.changes[field], state.data[field]);
	  }
	}; /**
	    * Copyright (с) 2015-present, SoftIndex LLC.
	    * All rights reserved.
	    *
	    * This source code is licensed under the BSD-style license found in the
	    * LICENSE file in the root directory of this source tree.
	    */

	exports.default = FormMixin;
	module.exports = exports['default'];

/***/ }
/******/ ]);