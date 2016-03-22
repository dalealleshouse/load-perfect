// import * as tsm from "tsmonad";
// import { calculatePlates } from "./calculator/plate-calculator";

// Array.prototype.find = function find<T>(o: predicate<T>) {
//     let found: T[] = this.filter((i: T) => o(i));
//     let v = (found.length === 0) ?
//         tsm.Maybe.nothing() :
//         tsm.Maybe.just(found[0]);

//     return v;
// };

// Array.prototype.findIndex = function find<T>(o: predicate<T>) {
//     let index = -1;

//     // OK, this is a bit ugly. I'm relying on a side effect of what should be a 
//     // pure functions. However, this is isolated and it's an easy way to accomplish
//     // what I'm trying to do. If I did it with a forEach, I don't have a way to break
//     // out of the loop when i find the right index.
//     this.some((i: T, ind: number) => {
//         if (o(i)) {
//             index = ind;
//             return true;
//         };
//         return false;
//     });

    // return (index === -1) ? tsm.Maybe.nothing() : tsm.Maybe.just(index);
// };