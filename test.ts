import { Table } from './task5'; // тест задачи 5
import { calculate } from './task4'; // тест задачи 4

function assert(condition: boolean) {
    if (!condition) {
        throw new Error(`Тест провален`);
    }
    console.log(` Тест пройден`);
}
// Тесты задачи 5
let t = new Table(100, 60, 70);
let dims = t.getDimensions();
assert(dims.l === 100 && dims.w === 60 && dims.h === 70);

t.setDimensions(200, 100, 80);
dims = t.getDimensions();
assert(dims.l === 200 && dims.w === 100 && dims.h === 80);

console.log("Все тесты успешны!");

// Тесты задачи 4
let res1 = calculate(0.2);
assert(isFinite(res1));

let res2 = calculate(0.35);
assert(isFinite(res2));

let res3 = calculate(0.5);
assert(isFinite(res3));

let special = calculate(0.05);
assert(special === Infinity);   // деление на ноль

console.log("Все тесты успешны!");