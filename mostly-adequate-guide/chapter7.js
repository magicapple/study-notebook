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

Container.of(2).map(function(two) {return two + 2});
