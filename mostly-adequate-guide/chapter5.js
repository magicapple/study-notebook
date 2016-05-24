var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: true},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

var isLastInStock = R.compose(R.prop('dollar_value'), R.last);
console.log(isLastInStock(CARS));

var nameOfFirstCar = R.compose(R.prop('name'), R.head);
console.log(nameOfFirstCar(CARS));


var _average = function (xs) {
	return reduce(add, 0, xs) / xs.length;
};

var getDollar = map(function(c) {
	return c.dollar_value;
});

var averageDollarValue = R.compose(_average, getDollar);
console.log(averageDollarValue(CARS));


var _underscore = replace(/\W+/g, '_');
var sanitizeNames = R.compose(_underscore, R.head);
console.log(sanitizeNames(['Hellow World']));


var formatMoney = function (value) {
	return '$' + value;
};

var availablePrices = R.compose(join(', '), map(function (x) {
	return formatMoney(x.dollar_value);
}), R.filter(R.prop('in_stock')));

console.log(availablePrices(CARS));


var fastestCar = R.compose(R.flip(add)(' is the fastest'), R.prop('name'), R.last, R.sortBy(function (car){return car.horsepower}));
console.log(fastestCar(CARS));