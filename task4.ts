export function calculate(x: number, a: number, b: number): number {
    return Math.acos(x * x - b * b) / Math.asin(x * x - a * a);
}

export function taskA(a: number, b: number): number[] {
    const xn = 0.2;
    const xk = 0.95;
    const dx = 0.15;
    const results: number[] = [];
    for (let x = xn; x <= xk + 1e-9; x += dx) {
        results.push(calculate(x, a, b));  
    }
    
    console.log(`\nЗадача А (a=${a}, b=${b}):`);
    results.forEach(r => console.log(r));
    return results;
}

export function taskB(a: number, b: number): number[] {
    const xValues = [0.15, 0.26, 0.37, 0.48, 0.56];
    const results: number[] = [];
    for (let i = 0; i < xValues.length; i++) {
        results.push(calculate(xValues[i], a, b));
    }
    console.log(`\nЗадача Б (a=${a}, b=${b}):`);
    results.forEach(r => console.log(r));
    return results;
}

const a = 0.05;
const b = 0.06;
taskA(a, b);
taskB(a, b);