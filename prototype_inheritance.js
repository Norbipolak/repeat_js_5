function Animal() {
    this.Animal.prototype.eat = function() {
        console.log("The animal is eating!");
    };
}

Animal();

/*
Így lehet az Animal függvénynek megadni egy eat metódust 
és minden ami innen az Animal-ból lesz származtatva az rendelkezni fog ezzel az eat metódussal is 

fontos
1. this. -vel vonatkoztatunk az Animal függvényre 
2. prototype -> itt lehet megadni metódusokat vagy értékpárokat 
3 .eat -> ez lesz a neve a metódusak eat: f eat();
4 = amit megadunk neki, hogy mi legyen a function, itt határozzuk meg  
*/

Animal.prototype.makeSound = function() {
    console.log("Animal is making a sound");
}

/*
Hozzáadtunk az Animal function-hoz egy másikat és akkor innentől kezdve az Animal az rendelkezni fog két metódussal 
1. eat
2. makeSound 
*/

//de nem csak function hanem ilyen értékpárokat is hozzá tudunk adni 
Animal.prototype.color = "red";

/*
most csinálunk egy Cat nevű függvényt és azt szeretnénk, hogy a cat megkapja az összes metódust meg ilyen értékpárt, amivel az Animal 
rendelkezik!!!! és akkor majd ha a Cat-et fogjuk példányosítani, akkor rendelkezni fog mindennel az Animal-től 
mert ezt átadjuk az Object.setPrototypeOf-val 
ez vár két paraméter-t
1. amelyik object-nek a protype-ja szeretné megkapni Cat.prototype
2. amelyik prototype-tól szeretné megkapni -> Animal.prototype
*/

function Cat() {}
Object.setPrototypeOf(Cat.prototype, Animal.prototype);

const cat = new Cat();
cat.makeSound(); //Animal is making a sound
cat.color = "blue";
console.log(cat); //Cat {color: 'blue'}
console.log(cat.eat);
/*
f () {
    console.log("The animal is eating!");
}
*******************************************************************************************************************************************/
const Vehicle = { 
    brand: "Volvo",
    type: "S60",
    color: "red"
};

const Car = {};

Object.setPrototypeOf(Car, Vehicle);
console.log(Car);
/*
{}
    [[Prototype]]: Object
        brand: 'Volvo'
        color: 'red'
        type: 'S60'
        [[Prototype]]: Object
*/

const Vehicle2 = Object.create(Vehicle);
Vehicle2.brand = "Mercedes";
console.log(Vehicle);
/*
{brand: 'Volvo', type: 'S60', color: 'red' }
*/ 
console.log(Vehicle2.brand); //Mercedes
console.log(Vehicle2);

/*
csináltunk egy objektum-ot Vehicle2-t a Vehicle alapján és megadtuk, hogy brand: "Mercedes"
console.log(Vehicle2);
{brand: 'Mercedes'}
    [[Prototype]]: Object
    brand: 'Volvo'
    color: 'red'
    type: 'S60'

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
tehát neki van egy brand: "Mercedes"-e, de viszont rendelkezik egy Vehicle-től örökölt brand: 'Volvo', meg még pár dologgal 
és ez nem azt írja felül, hanem mindkettő meg lesz neki!!!! 
*/

/*
fontos különbség, hogy amikor használjuk az Object.setPrototypeOf-ot
akkor ha function-től adunk/kapunk valamit akkor kell a prototype 
ha meg simán objektumtól-nak, akkor nem 

mint itt a feljebb is 
-> 
Object.setPrototypeOf(Cat.prototype, Animal.prototype);
vagy 
Object.setPrototypeOf(Car, Vehicle);

Object.create-vel pedig létre tudunk hozni egy objektumot és ha oda beírunk valamit, akkor attól fog örökölni 
const Vehicle2 = Object.create(Vehicle);

de ettől még ennek nem lesznek meg a dolgai, mint ami van a Vehicle-nek 
ez egy üres {} lesz, csak a protoype chain-en keresztül örökli a Vehicle dolgait!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/