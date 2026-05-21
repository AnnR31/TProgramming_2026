class Table { // 1. Тип "Стол" (класс
    // 3 переменные (свойства) — размеры стола
    length: number;  // длина (см)
    width: number;   // ширина (см)
    height: number;  // высота (см)
    
    constructor(length: number, width: number, height: number) { // 2. Метод-конструктор, возвращающий структуру
        this.length = length;
        this.width = width;
        this.height = height;
    }
    
    getDimensions(): { l: number; w: number; h: number } { // Метод 1: получить размеры стола (возвращает объект)
        return { l: this.length, w: this.width, h: this.height };
    }

    setDimensions(length: number, width: number, height: number): void { // Метод 2: установить размеры стола
        this.length = length;
        this.width = width;
        this.height = height;
    }
    
    showInfo(): void { // Метод 3: дополнительный метод — показать информацию о столе
        console.log(`Стол: ${this.length}x${this.width}x${this.height} см`);
    }
}

let myTable = new Table(120, 80, 75);   // конструктор создаёт структуру
myTable.showInfo();                     // Стол: 120x80x75 см
console.log(myTable.getDimensions());   // Получаем размеры { l: 120, w: 80, h: 75 } 
myTable.setDimensions(140, 90, 78); // Устанавливаем новые размеры
myTable.showInfo();                     // Стол: 140x90x78 см