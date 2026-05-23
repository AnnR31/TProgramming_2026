    let xn = 0.2;
    let xk = 0.95;
    let dx = 0.15;

function calculate(x: number, a: number, b: number): number {
    return Math.acos(x * x - b * b) / Math.asin(x * x - a * a);
}

function taskA(a: number, b: number): void {
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
xn = 0.5;
xk = 1.0;
dx = 0.2;
taskA(0.05, 0.06);
taskB(0.05, 0.06);