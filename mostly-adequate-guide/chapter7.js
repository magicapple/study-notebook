var match = R.curry(function (reg, str) {
    return str.match(reg);
});
var add = R.curry(function (a, b) {
    return a + b;
});
var map = R.curry(function (f, any_functor_at_all) {
    return any_functor_at_all.map(f);
});

var Container = function (x) {
    this.__value = x;
};

Container.of = function (x) {
    return new Container(x);
};

Container.prototype.map = function (f) {
    return Container.of(f(this.__value));
};

console.log(Container.of(3));

console.log(Container.of('hotdogs'));

console.log(Container.of(Container.of({name: 'yoda'})));

console.log(Container.of(2).map(function(two) {return two + 2}));

var Maybe = function (x) {
    this.__value = x;
};

Maybe.of = function (x) {
    return new Maybe(x);
};

Maybe.prototype.isNothing = function () {
    return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function (f) {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};

console.log(Maybe.of('Malkovich Malkovich').map(match(/a/ig)));
console.log(Maybe.of(null).map(match(/a/ig)));
console.log(Maybe.of({name: 'Boris'}).map(R.prop('age')).map(add(10)));
console.log(Maybe.of({name: 'Boris', age: 20}).map(R.prop('age')).map(add(10)));

var person = Maybe.of({name: 'Boris', age: 20});
var getAge = R.compose(map(add(10)), map(R.prop('age')));
console.log(getAge(person));

var safeHead = function (xs) {
    return Maybe.of(xs[0]);
};

var streetName = R.compose(map(R.prop('street')), safeHead, R.prop('addresses'));
console.log(streetName({addresses: []}));

console.log(streetName({addresses:[{street: 'Shady Ln.', number: 4201}]}));


var withdraw = R.curry(function (amount, account) {
    return account.balance >= amount ?
    Maybe.of({balance: account.balance - amount}) :
    Maybe.of(null)
});
var updateLedger = function (x) {
    return x.balance;
}
var remainingBalance = function (x) {
    return 'Your balance is $' + x;
}
var finishTransaction = R.compose(remainingBalance, updateLedger);
var getTwenty = R.compose(map(finishTransaction), withdraw(20));

console.log(getTwenty({balance: 200}));

console.log(getTwenty({balance: 10}));