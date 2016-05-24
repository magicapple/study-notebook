var reduce = R.curry(function (fn, acc, xs) {
	return xs.reduce(fn, acc);
});

var add = R.curry(function (acc, value) {
	return acc + value;
});

var map = R.curry(function(fn, xs) {
	return xs.map(fn);
});

var replace = R.curry(function(reg, replaceStr, s) {
	return s.replace(reg, replaceStr);
});

var join = R.curry(function (joinStr, xs) {
	return xs.join(joinStr);
});