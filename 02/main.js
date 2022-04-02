//import {conHello, fnPlusNumbers} from './libray_named.js';
import * as myLibray from './library_named.js';
import fnMyfunction from './library_default.js';

console.log(myLibray.conHello);
console.log(myLibray.fnPlusNumbers(1, 2));
console.log(fnMyfunction(7, 5));