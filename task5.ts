export class Table {
    length: number;  
    width: number;   
    height: number;  
    model: string;

    constructor(length: number, width: number, height: number, model: string) { 
        this.length = length;
        this.width = width;
        this.height = height;
        this.model = model;
    }
    
    static create(length: number, width: number, height: number, model: string): Table {
        return new Table(length, width, height, model);
    }

    getDimensions(): void { 
        console.log(`${this.length} x ${this.width} x ${this.height}`);
    }

    changeDimensions(length: number, width: number, height: number): void { 
        this.length = length;
        this.width = width;
        this.height = height;
        console.log(`Параметры стола ${this.model} изменнены: ${this.length},${this.width}, ${this.height} `)
    }
    
    getS(): string {
        let S = this.length * this.width;
        return `Площадь этого стола равна ${S}`;
    }

    compareH(other: Table): string {
        if (this.height > other.height) {
            return `Стол модели ${this.model} выше`;
        }
        else if(this.height < other.height) {
           return `Стол модели ${other.model} выше`; 
        }
        else { return `Высоты столов равны`}
    }
}

let Table1 = Table.create(120, 80, 75,"Деревянный");  
let Table2 = Table.create(160, 90, 85,"Стеклянный");
let Table3 = Table.create(170, 100, 95,"Пластиковый");                     
console.log(Table1.getDimensions());
Table1.changeDimensions(190, 140, 100);
console.log(Table1.getDimensions());
Table3.compareH(Table2);
Table2.getS();
                    
