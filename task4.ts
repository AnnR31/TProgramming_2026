export const a = 0.05;
export const b = 0.06;

export function calculate(x:number) {
    return Math.acos(x * x - b * b) / Math.asin(x * x - a * a);
}

// Задача А
const taskA = [0.20, 0.35, 0.50, 0.65, 0.80, 0.95];
console.log("Задача А:");
for (let i = 0; i < taskA.length; i++) {
    console.log(calculate(taskA[i]));
}

// Задача Б
const taskB = [0.15, 0.26, 0.37, 0.48, 0.56];
console.log("Задача Б:");
for (let i = 0; i < taskB.length; i++) {
    console.log(calculate(taskB[i]));
}


