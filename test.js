'use strict'
import Promise from 'bluebird';

const a = 2;
console.log(a);

{
	let a = 1;
	console.log(a);
}

Promise.resolve('12').then(function (xx) {
	console.log(xx);
});