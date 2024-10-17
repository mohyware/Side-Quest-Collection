interface Item {
    id: number,
    name: string,
    price: number,
    quantity: number
}
class ShoppingCart {
    items: Item[];

    constructor() {
        this.items = [];
    }
    addItem(item: Item) {
        this.items.push(item)
    }
    removeItem(itemId: Number) {
        this.items = this.items.filter(item => item.id !== itemId);
    }
    CalculateTotal(): Number {
        const total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return total;
    }
}

const item1: Item = {
    id: 1,
    name: "Laptop",
    price: 1000,
    quantity: 1
};

const item2: Item = {
    id: 2,
    name: "Mouse",
    price: 25,
    quantity: 1
};

const item3: Item = {
    id: 3,
    name: "Keyboard",
    price: 50,
    quantity: 2
};

const shoppingCart = new ShoppingCart();
shoppingCart.addItem(item1);
shoppingCart.addItem(item2);
shoppingCart.addItem(item3);
console.log(shoppingCart)
const result1 = shoppingCart.CalculateTotal();
console.log(result1)
// after removing the laptop
shoppingCart.removeItem(1);
console.log(shoppingCart)
const result2 = shoppingCart.CalculateTotal();
console.log(result2)