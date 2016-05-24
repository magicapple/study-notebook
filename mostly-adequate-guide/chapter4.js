var wordsCurry = R.curry(function (splitString, str) {
	return str.split(splitString);
});

var test = wordsCurry(' ');
console.log(test('I love cat'));

var sentences = R.curry(function (f, xs) {
	return xs.map(f);
});

var mapTest = sentences(function (item) {
	console.log(item);
	return item;
});

mapTest(['a','b','c']);

var filterQs = R.curry(function (fliterFn, xs) {
	return xs.filter(fliterFn);
});

var testFilterQs = filterQs(function (x) {
	return x.match(/q/i);
});

console.log(testFilterQs(['apple','quite','ddq']));

var _keepHighest = function(x, y) {
	return x >= y ? x : y;
};

var max = R.curry(function (fn, xs) {
	return xs.reduce(function (acc, x) {
		return fn(acc, x);
	}, -Infinity);
});

var testMax = max(_keepHighest);
console.log(testMax([1,3,7,4,6]));

var slice = R.curry(function (begin, end, xs) {
	return xs.slice(begin, end);
});

var testSlice = slice(1, 3)
console.log(testSlice([1,2,3,4,5,6]));

