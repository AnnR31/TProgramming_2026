function calculate(x: number, a: number, b: number): number {
    return Math.acos(x * x - b * b) / Math.asin(x * x - a * a);
}

function taskA(a: number, b: number): void {
    const xn = 0.2;
    const xk = 0.95;
    const dx = 0.15;
    console.log(`\nЗадача А (a=${a}, b=${b}):`);
    console.log(calculate(xn, a, b));
    console.log(calculate(xn + dx, a, b));
    console.log(calculate(xn + 2 * dx, a, b));
    console.log(calculate(xn + 3 * dx, a, b));
    console.log(calculate(xn + 4 * dx, a, b));
    console.log(calculate(xk, a, b));
}

function taskB(a: number, b: number): void {
    const x1 = 0.15, x2 = 0.26, x3 = 0.37, x4 = 0.48, x5 = 0.56;
    console.log(`\nЗадача Б (a=${a}, b=${b}):`);
    console.log(calculate(x1, a, b));
    console.log(calculate(x2, a, b));
    console.log(calculate(x3, a, b));
    console.log(calculate(x4, a, b));
    console.log(calculate(x5, a, b));
}

const a = 0.05;
const b = 0.06;
taskA(a, b);
taskB(a, b);