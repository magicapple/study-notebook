var match = R.curry(function (reg, str) {
    return str.match(reg);
});
var add = R.curry(function (a, b) {
    return a + b;
});
var map = R.curry(function (f, any_functor_at_all) {
    return any_functor_at_all.map(f);
});

var concat = R.curry(function (a, b) {
    return a + b;
});

var id = function (x) {
    return x;
};

var Container = function (x) {
    this.__value = x;
};

Container.of = function (x) {
    return new Container(x);
};

Container.prototype.map = function (f) {
    return Container.of(f(this.__value));
};

// console.log(Container.of(3));

// console.log(Container.of('hotdogs'));

// console.log(Container.of(Container.of({name: 'yoda'})));

// console.log(Container.of(2).map(function(two) {return two + 2}));

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

// console.log(Maybe.of('Malkovich Malkovich').map(match(/a/ig)));
// console.log(Maybe.of(null).map(match(/a/ig)));
// console.log(Maybe.of({name: 'Boris'}).map(R.prop('age')).map(add(10)));
// console.log(Maybe.of({name: 'Boris', age: 20}).map(R.prop('age')).map(add(10)));

var person = Maybe.of({name: 'Boris', age: 20});
var getAge = R.compose(map(add(10)), map(R.prop('age')));
// console.log(getAge(person));

var safeHead = function (xs) {
    return Maybe.of(xs[0]);
};

var streetName = R.compose(map(R.prop('street')), safeHead, R.prop('addresses'));
// console.log(streetName({addresses: []}));
// console.log(streetName({addresses:[{street: 'Shady Ln.', number: 4201}]}));


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

// console.log(getTwenty({balance: 200}));

// console.log(getTwenty({balance: 10}));

var Left = function (x) {
    this.__value = x;
};

Left.of = function (x) {
    return new Left(x);
};

Left.prototype.map = function (f) {
    return this;
};

var Right = function (x) {
    this.__value = x;
};

Right.of = function (x) {
    return new Right(x);
};

Right.prototype.map = function (f) {
    return Right.of(f(this.__value));
};

console.log(Right.of('rain').map(function(str) {return 'b' + str}));
console.log(Left.of('rain').map(function(str) {return 'b' + str}));

console.log(Right.of({host: 'localhost', port: 80}).map(R.prop('host')));
console.log(Left.of('rolls eyes...').map(R.prop('host')));

var getAge = R.curry(function (now, user) {
    var birthdate = moment(user.birthdate, 'YYYY-MM-DD');
    if (!birthdate.isValid()) {
        return Left.of('birthdate could not be parsed');
    }
    return Right.of(now.diff(birthdate, 'years'));
});

console.log(getAge(moment(), {birthdate: '2005-12-12'}));
console.log(getAge(moment(), {birthdate: '20010104'}));

var fortune = R.compose(concat('if you survive, you will be '), add(1));
var zoltar = R.compose(map(console.log.bind(console)), map(fortune), getAge(moment()));
console.log(zoltar({birthdate: 'xxxx'}));

var either = R.curry(function (f, g, e) {
    switch (e.constructor) {
        case Left: return f(e.__value);
        case Right: return g(e.__value);
    }
});

var zoltar = R.compose(console.log.bind(console), either(id, fortune), getAge(moment()));
console.log(zoltar({birthdate: '2005-12-12'}));
console.log(zoltar({birthdate: 'xxxxx'}));

