class Good {
    constructor(item) {
        this.id = item.id;
        this.name = item.name;
        this.description = item.description;
        this.sizes = item.sizes;
        this.price =  item.price;
        this.available = item.available;
    }

    setAvailable(mark) {
        this.available = mark;
    }
}

class GoodsList {
    #goods = 0;

    constructor(filter, sortPrice, sortDir) {
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDit = sortDir;
    }

    increment(goods) {
        this.#goods = goods;
    }

    get list() {
        const filtered = this.#goods.filter( good => this.filter.test(good.name) && good.available === true);
        if (this.sortPrice) {
            if (this.sortDit) {
                filtered.sort((item1, item2) => item1.price - item2.price );
            } else {
                filtered.sort((item1, item2) => item2.price - item1.price );
            }
        }
        return filtered;
    }

    add(good) {
        return this.#goods.push(good);
    }

    remove(id) {
        for (let i=0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                return this.#goods.splice(i, 1);
            }
        }
    }
}

const good1 = new Good({
    id: 1,
    name: 'Fisher',
    description: 'profi',
    sizes: [190, 197, 200, 202],
    price: 50,
    available: true,
});

const good2 = new Good({
    id: 2,
    name: 'Atomic',
    description: 'profi',
    sizes: [190, 197, 200, 202],
    price: 45,
    available: true,
});

const good3 = new Good({
    id: 3,
    name: 'Rossignol',
    description: 'profi',
    sizes: [190, 197, 200, 202],
    price: 40,
    available: true,
});

const good4 = new Good({
    id: 4,
    name: 'Salomon',
    description: 'profi',
    sizes: [190, 197, 200, 202],
    price: 35,
    available: false,
});
    
const good5 = new Good({
    id: 5,
    name: 'Madshus',
    description: 'profi',
    sizes: [190, 197, 200, 202],
    price: 30,
    available: false,
});

let regexp = /i/gi;
const goodsList1 = new GoodsList(regexp, true, true);
goodsList1.increment([good1, good2, good3]);
goodsList1.add(good4);
goodsList1.add(good5);
goodsList1.remove(5);
console.log(goodsList1.list);



class BasketGood extends Good {
    constructor(good, amount) {
        super(good);
        this.amount = amount;
    }
}

class Basket {
    constructor(goods) {
        this.goods = goods;
    }

    get totalAmount() {
        const amount = [];
        this.goods.forEach((item, index) => {amount[index] = this.goods[index].amount});
        return amount.reduce((sum, current) => sum + current, 0);
    }

    get totalSum() {
        const total = [];
        this.goods.forEach((item, index) => {total[index] = this.goods[index].amount * this.goods[index].price});
        return total.reduce((sum, current) => sum + current, 0);
    }

    add(good, amount) {
        for (let i=0; i < this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                this.goods[i].amount += amount;
                return this.goods;
            }
        }    
        return this.goods.push(good);
    }
    

    remove(good, amount) {
        for (let i=0; i < this.goods.length; i++) {
            if (this.goods[i].id === good.id) {
                if (this.goods[i].amount >= amount) {
                    this.goods[i].amount -= amount;
                } else {
                    this.goods[i].amount = 0;
                }
                return this.goods;
            }
        }    
        return console.log('Данного товара нет в корзине!');
    }
    
    clear() {
        this.goods.length = 0;
        return this.goods;
    }

    removeUnavailable() {
        const unavailable = this.goods.filter(good => good.available === false);
        for (let i=0; i < this.goods.length; i++) {
            if (unavailable.includes(this.goods[i])) {
                this.goods.splice(i, 1);
            }
        }
        return this.goods;
    }
}


const goodInBasket1 =  new BasketGood(good1, 5);
const goodInBasket2 =  new BasketGood(good2, 10);
const goodInBasket3 =  new BasketGood(good3, 15);
const goodInBasket4 =  new BasketGood(good4, 1);

const basket1 = new Basket([goodInBasket1, goodInBasket2, goodInBasket3]);
basket1.clear();
basket1.add(goodInBasket1, 5);
basket1.add(goodInBasket2, 10);
basket1.add(goodInBasket3, 3);
basket1.add(goodInBasket4, 15);
basket1.removeUnavailable();
basket1.remove(goodInBasket1, 1);


console.log(basket1.totalAmount);
console.log(basket1.totalSum);
