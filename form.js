/*
Csináltunk egy egyszerű form-ot, amiben vannak input mezők, select és egy button 

    <form>
        <h3>Név</h3>
        <input type="text" id="name">
        <h3>Email cím</h3>
        <input type="email" id="email">
        <h3>Tárgy</h3>
        <select id="subject">
            <option value="0">Válassz Tárgyat!</option>
            <option value="1">tárgy 1</option>
            <option value="2">tárgy 2</option>
            <option value="3">tárgy 3</option>
        </select>
        <button id="send-form-1">Küldés</button>
    </form>

és akkor id-alapján itt az összeset le tudjuk menteni 
*/

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const btn = document.querySelector("#send-form-1");

/*
a btn-re csinálunk egy eventListener-t, amivel majd be tudjuk szedni az adatokat, amiket beírt a felhasználó 
fontos, hogy legyen egy preventDefalt, mert ha form-ba van ez az egész akkor újra fog tölteni és nem lesznek meg az adataink 
*/
// btn.addEventListener("click", function() {
//     e.preventDefault();
//     const name = nameInput.value.trim();
//     const email = emailInput.value.trim();
//     const subject = subjectInput.value.trim();
//     console.log(name, email, subject);
// });

/*
Csináltunk egy div-et, ahova majd ki akarjuk írni ezeket az adatokat és majd lementjük ide 
<div id="form-1-message"></div>

most már megvannak ezek az adatok, hogy mit írt be a felhasználó 
megjelenítése meg ebbe a div-be majd innerHTML-vel csinálunk h3-as tag-eket 
nagyon fontos, hogy a name-re majd úgy hivatkozunk, hogy ${name}, mert ez változni fog, meg az email és a subject is 
*/
const form1Message = document.querySelector("#form-1-message");

// btn.addEventListener("click", function(e) {
//     e.preventDefault();
//     const name = nameInput.value.trim();
//     const email = emailInput.value.trim();
//     const subject = subjectInput.value.trim();
//     //console.log(name, email, subject);

//     // form1Message.innerHTML = `
//     // <h3>name: ${name}</h3>
//     // <h3>email: ${email}</h3>
//     // <h3>subject: ${subject}</h3>`

//     /*
//     És akkor kiírja ezeket a dolgokat, de ezt másmilyen formában is meg lehet csinálni 
//     hogy itt hozunk létre h3-as tag-eket, megadjunk neki innerText-vel a name-t meg ezeket és majd appendChild-oljuk a form1message div-hez 
//     */

//     const nameH3 = document.createElement("h3");
//     nameH3.innerText = name;
//     nameH3.style.color = "red"; //és ezt még a style-val meg is lehet formázni 

//     const emailH3 = document.createElement("h3");
//     emailH3.innerText = email;
//     emailH3.style.color = "green";

//     const subjectH3 = document.createElement("h3");
//     subjectH3.innerText = subject;
//     subjectH3.style.color = "blue";

//     form1Message.appendChild(nameH3);
//     form1Message.appendChild(emailH3);
//     form1Message.appendChild(subjectH3);
// });

/*
és ezt így is meg lehet csinálni, hogy itt készítjük el az elemeket 

Nagyon fontos a két változat 
-mindig kell csinálni egy div-et vagy valamit, amibe lesznek ezek a dolgok 
1. a div-nek megadjuk innerHTML-vel, fontos, hogy itt ${name} használjunk form1Message.innerHTML = ...
2. megcsináljuk itt az elemeket createElement-vel 
    innerText-vel hozzáadjuk az értékét, hogy mit mutasson nameH3.innerText = name; pl. itt a name-t, ami -> const name = nameInput.value.trim();
    az elöny itt, hogy meg lehet őket a style-val formázni
    legvégén meg appendChild-oljuk a form1Message-hez 
*/
/****************************************************************************************************************************************/
/*
FORMDATA nagyon fontos!!!! 

    <form id="form-data-form">
        <h3>Név</h3>
        <input type="text" name="name">
        <h3>Email</h3>
        <input type="email" name="email">
        <h3>Tárgy</h3>
        <select name="subject">
            <option value="0">Válassz tárgyat</option>
            <option value="1">Tárgy 1</option>
            <option value="2">Tárgy 2</option>
            <option value="3">Tárgy 3</option>
        </select>
        <button id="send-form-2">Beküldés!</button>
    </form>

Megcsináltuk ugyanazt mint az elöbb csak itt a form-nak adtunk egy id-t és az összes többinek ahol eddig id volt és az alapján mentettük le őket 
ott name-t adtunk (input, select)!!!!! 

kivéve a button-nek, mert annak ugyanugy egy id-t 
lementjük a button-t és az egész form-ot id alapján 
*/
const btn2 = document.querySelector("#send-form-2");
const formDataForm = document.querySelector("#form-data-form");

//csinálunk egy eventListener-t erre a button-ra és benne használjuk a new FormData beépített metódust 

btn2.addEventListener("click", function(e) {
    e.preventDefault();

    const fd = new FormData(formDataForm); // itt megadjuk az egész form-ot, amit lementettünk ennek a new FormData-nak 
    const obj = Object.fromEntries(fd.entries());
    console.log(fd);
    console.log(obj);
});

/*
new FormData();
ennek a beépített függvénynek, ilyen metódusai vannak 
    append: f append()
    delete: f delete()
    entries: f entries()
    forEach: f forEach()
    get: f get()
    getAll: f getAll()
    has: f has()
    keys: f keys()
    set: f set()
    values: f values()

const obj = Object.fromEntries(fd.entries());
console.log(fd);

ennek van egy olyan, hogy entries() és ebből lehet egy object-et csinálni -> Object.fromEntries(fd.entries());
nagyon fontos, hogy Object.fromEntries("ide, hogy minek az entries-éből szeretnénk egy objektumot csinálni")

és akkor ugye hozzáfér name-k alapján ugyanugy, mint a value-ja elöbb 
beírunk a mezőkbe és az Object.fromEntries(fd.entries())
->
{name: 'Lengyel Norbert', email: 'nobert.lengyel@citromail.ru', subject: 2}
    email: "norbert.lengyel@citromail.ru"
    name: "Lengyel Norbert"
    subject: 2
    [[Prototype]]: Object

és akkor egy ilyen objektumot csinált, miutána beírtuk az értékeket, mert az entries az kulcs-értékpár -> kulcs a name, email - érték meg a beírt
********************************************************************************************************************************************
*/

/*
megnézzük, hogy még miket lehet csinálni a FormData()-val, milyen metódusai vannak és mikre jók 
*/
const fd = new FormData();
fd.append("file1", "Ez egy fájl!");
fd.append("file2", "Ez egy fájl!");

const file1 = fd.get("file1");
console.log(file1);
//és akkor visszakapjuk, hogy Ez egy fájl!
/*
mert append-vel, hozzáadtuk 
1. paraméter, hogy mi legyen a kulcs, mi legyen a neve
2. hogy mi az értéke, mit tartalmaz 

és akkor mivel ezt append-oltuk a fd rendelkezni fog ezekkel és ezt meg tudjuk szerezni, úgyhogy get(), egy változóba és beírjuk, hogy 
mit akarunk megszerezni a kulcsát 

Nagyon fontos, hogy a get-vel tudunk egy valamit megszerezni, de van egy olyan is, hogy getAll, amivel meg mindent!!!!!!! 
olyan mint a querySelector meg a querySelectorAll
*/

fd.append("names", "Sanyi");
fd.append("names", "Béla");
fd.append("names", "Kati");
fd.append("names", "Rebeka");

const allNames = fd.getAll("names");
console.log(allNames);

/*
Visszaadja az összes értéket egy tömbbe
-> 
['Sanyi', 'Béla', 'Kati', 'Rebeka']
*/

//törölni 
fd.delete("file1");
console.log(fd.get("file1"));
//már nem tudunk hozzáférni, mert ki lett törölve, így az értéke null lett!!!!!!!!! 

//has -> meg tudjuk nézni, hogy van-e olyan kulcsa, amit ide beírunk vagy nincsen, ez visszaad true-t vagy false-t 
const hasKey = fd.has("names");
console.log(hasKey); //true

const doesntHave = fd.has("ages");
console.log(doesntHave); //false

/*
és akkor ennek is van values, keys, entries, amin végig tudunk majd menni egy for-val 
*/

const keys = fd.keys();

for(const key of keys) {
    console.log(key); //file2 names
}

const values = fd.values();

for(const value of values) {
    console.log(value); //Ez egy fájl! Sanyi Béla Kati Rebeka
}

const entries = fd.entries();

for(const entry of entries) {
    console.log(entry); //vagy ezt lehetett volna úgy is nevezni, hogy keyValue
}
/*
['file2', 'Ez egy fájl!']
['names', 'Sanyi']
['names', 'Béla']
['names', 'Kati']
['names', 'Rebeka']
*/

/*
append() -> hozzáadunk egy kulcsértékpárt, 2 paramétert vár 1. kulcs, 2.érték mindegyik ""-ben 
get() -> meg lehet szerezni valaminek az értékét ha megadjuk itt a kulcs nevét -> fd.get("file1"); -> "Ez egy fájl!"
getAll() -> megszerezzük az összes értéket ugyanazon a kulcson pl. itt van több names és mindegyik értékét megkapjuk 

has() -> kulcsra vontakozik, van-e olyan kulccsa, amit itt megadtunk -> true vagy false
fontos, hogy a get meg has, azokat egy változóba kell rakni, mert adnak vissza valamit, az append az nem 

keys(), values(), entries() ezeken végig tudunk menni egy for-val 

Object.fromEntries(valami.entries());
ezzel tudunk egy objektumot csinálni az értékpárokból!!! mert az alapból mint itt alul is van egy tömböt add vissza tömbökkel ó, amiben vannak 
az értékpárok 

const newObj = {};
for (const [key, value] of fd.entries()) {
    newObj[key] = value;
}

ezt meg lehet csinálni ezzel a Object.fromEntries-vel sokkal gyorsabban és még egy üres tömböt se kell létrehozni 
*/