export class Vehicle {
    constructor(color = 'blue', wheelsNumber = 4, horn = "beep beep") {
        this.color = color;
        this.wheelsNumber = wheelsNumber;
        this.horn = horn;
    }
    honkHorn() {
        console.log(this.horn);
    }
}