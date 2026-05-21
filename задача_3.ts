const a = 0.05;
const b = 0.06;

function calculate(x: number, a: number, b: number): number {
    return Math.acos(x * x - b * b) / Math.asin(x * x - a * a);
}

// Задача А
console.log("\nЗадача А")
console.log(calculate(0.2, a, b));
console.log(calculate(0.35, a, b));
console.log(calculate(0.5, a, b));
console.log(calculate(0.65, a, b));
console.log(calculate(0.8, a, b));
console.log(calculate(0.95, a, b));

// Задача Б
console.log("\nЗадача Б")
console.log(calculate(0.15, a, b));
console.log(calculate(0.26, a, b));
console.log(calculate(0.37, a, b));
console.log(calculate(0.48, a, b));
console.log(calculate(0.56, a, b));
