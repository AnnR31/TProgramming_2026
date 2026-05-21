const a = 0.05;
const b = 0.06;

function calculate(x: number): number {
    return Math.acos(x * x - b * b) / Math.asin(x * x - a * a);
}

// Задача А
console.log("\nЗадача А")
console.log(calculate(0.2));
console.log(calculate(0.35));
console.log(calculate(0.5));
console.log(calculate(0.65));
console.log(calculate(0.8));
console.log(calculate(0.95));

// Задача Б
console.log("\nЗадача Б")
console.log(calculate(0.15));
console.log(calculate(0.26));
console.log(calculate(0.37));
console.log(calculate(0.48));
console.log(calculate(0.56));
