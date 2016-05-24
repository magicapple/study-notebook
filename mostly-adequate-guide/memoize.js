'use strict';

const memoize = function (f) {
	var cache = {};
	return function () {
		const arg_str = JSON.stringify(arguments);
		cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
		return cache[arg_str];
	};
};

var squareNumber = memoize(function (x) {
	return x*x
});

var curry = function(fn, ...arg) {
	var paramsLen = fn.length - arg.length;
	var currentLen = arg.length;
	var params = arg;
	return function(...otherArg){
		currentLen = currentLen + otherArg.length;
		var allArg = params.concat(otherArg);
		if (paramsLen > currentLen) {
			return curry.apply(null, ([]).concat(fn, allArg));
		} else {
			return fn.apply(null, allArg);
		}
	};
};


var compose = function (...arg) {
	return function (data) {

	}
};