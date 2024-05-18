/*
A fetch egy promise alapú AJAX függvény.
Alapértelmezetten egyetlen paramétert vár kötelezően 
és ez az url, tehát az endpoint, amit meg akarunk szólítani 


fetch("https://dummyjson.com/products").then(res => res.json()).then(console.log);
1. megszólítunk egy API-t, mivel itt tudjuk, hogy biztosan létezik ez az API, ezért nem csinált, hogy response meg error-t 
csak response-t, amit itt alatta látunk, hogy milyen egy response válasz, van body!!!!!!!!!!!!!!!!!!!!!!!!
body az ami nekünk kell, abba vannak az adatok 
header: itt mindenféle dolog megy a folyamatról, hogy pl. milyen módon kaptuk meg ezeket az adatokat, legtöbb esetben ez json 
2. utána ezt a json-t parse-olni kell, hogy tudjuk vele dolgozni 
3. console.log-oltuk, hogy milyen adatokat kaptunk a jsonparse-olva -> json()
*/

// fetch("https://dummyjson.com/products")
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });

/*
Response
    body: (...)
    bodyUsed: false
    headers: Headers {}
    ok: true
    redirected: false
    status: 200
    statusText: ""
    type: "cors"
    url: "https://dummyjson.com/products"
    [[Prototype]]: Response

fetch("https://dummyjson.com/products")
    .then((response) => {
        // Handle the response here
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        // Continue processing the response or return it
        return response.json(); // Parsing response body as JSON
    })
    .then((data) => {
        // Handle the parsed JSON data here
        console.log("Parsed JSON data:", data);
    })
    .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
    });

1. Van egy fetch kérés utána ami vár egy response-ot ha ez meg van, akkor itt console.log-oljuk, hogy mi a status code meg a header 
és visszaadunk itt egy parse-os response-ot, fontos, hogy mindig parse-olni kell, mert ezek a dolgok amik fent vannak ezek JSON-ben 
vannak mi meg itt JavaScriptben majd JavaScript kell, hogy legyen és majd utána, ha végeztünk itt valami módisítást, akkor meg 
JSON.stringify-olni kell a dolgokat 
2. ezt a response.json visszaad nekünk egy promise-t a második then-ben pedig megvárjuk, hogy resolve-oljon a promise és akkor ott lesznek az 
adataink
*/

//amit kaptunk response objektumot, ott meg lehet nézni pl. hogy mi van a headers-ben, végig lehet menni rajta egy for-val 

// for(const h of response.headers) {
//     console.log(h);
// }


//response.text.then((text)=> console.log(text));

//repsonse.json().then((json)=> console.log(json));

/*
de ennek van egy jobb megoldása, hogyan kérjük le az adatokat egy async függvényben
fontos, hogy async legyen a függvény, mert ahol van promise tehát várni kell valamire ott mindig async függvényt használunk 

és itt mindig kell használni egy try - catch blokkot 

nagyon fontos, ahol van promise ott mindig kell használni az await-et!!!! 

tehát ez olyan, mint a then() ha van egy async függvény és használunk await-et 
fontos, hogy itt kettő dologra kell várni!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
1. hogy a fetch-nél ott resolve legyen és megkapjuk a response-ot 
2. hogy a response-ból a json()-nal tudjuk használni a dolgokat, tehát itt meg a JSON parse-olásra vár 

Ezért volt, hogy kettő then volt, hogy megkapjuk a promise-t, tehát ott resolve legyen majd a JSON.parse-olásra 
*/

async function getProducts() {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const json = await response.json();
        console.log(json);

        // for(const p of json.products) {
        //     console.log(p.id);
        //}
        //fontos, hogy itt végig tudunk menni a json-nek a dolgain egy for-val 
        
    } catch(err) {
        console.log(err);
    }
}

getProducts();


/*
és ha megkaptuk ezt a json-ra 
->
{products: Array(30), total: 100 skip: 0 ,limit: 30}
    limit: 30
    products: Array(30)
        0:{id: 'Iphone', description: 'An apple mobile, which is nothing like apple', price: 549, discountPercentage: 12.96}
        length: 30
        [[Prototype]]: Array
    skip: 0 
    total: 100
    [[Prototype]]: Object 

Szóval itt megkapztuk ezeket a dolgokat
1. limit -> hogy egy page-en mennyi product van tehát hány objektum egy tömbben, ami tartalmazza azokat a kulcs-értékpárokat, hogy id:...
2. egy tömb, amiben vannak az objektumok az értékpárokkal 
3. skip -> ez majd az lesz, hogy hányadik oldalon vagyunk, azt tudjuk meg belöle, hogy hány product-ot skip-eltünk 
4. total -> összesen hány product, objektum van a tömbben 
*/ 

//Ez volt egy get kérés, amikor megkapjuk csak a dolgokat, itt csak az API-t kell megszólítani és ennyi

/*
addProduct meg egy POST kérés lesz, amikor hozzá akarunk valamit adni 
fontos, hogy ez várni fog egy product-ot, amit majd megadunk neki, pontosabban majd a data-ban egy objektumot, olyat, mit itt a products-nál 
visszakaptunk a product-okat, fontos, hogy ezt majd JSON.stringify-olni kell  
*/

async function addProduct(product) {
    try {
        const response = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            data: JSON.stringify(product),
            headers: {"content-type":"application/json"}
        });
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

// addProduct({
//     "title":"Iphone 1000",
//     "price": 432243,
//     "description":"This is a very good phone!"
// });

/*
Így átadtuk neki, hogy mi az a dolog, product, amit mi post-olni szeretnénk 
fontos, hogy itt a product, amit átadunk az json objektum formában legyen 

Nagyon fontos az addProduct függvénynél
1. várjon egy product-ot, amit majd megadunk neki 
2. response itt nem csak fetch API-ből fog állni, hanem utána lesz egy objektum, amiben áltálában 3 dolog lesz, kivéve a delete-nél 
    - method: -> hogy milyen metódust akarunk használni, post, pt(update)
    - data: -> hogy mi az amit post-olni szeretnénk -> itt egy objektum, ami hasonlóan kell, hogy kinézzen, mint a többi a products-ban 
        nagyon, fontos, hogy ez itt JSON.stringify legyen, amit ide megadunk 
    - headers: -> hogy milyen formában adjuk át az adatot, ez itt JSON, ezért {"content-type":"json/application"}
        ez a json formátum, ahol a kulcsok is ""-ban vannak 
************************************************************************************************************************************************
*/

/*
A put is hasonlóan müködik, tehát itt is kell egy második paraméter a fetch-ben de viszont nagyon fontos, hogy itt amit 
megszólítunk az nem add lesz a fetch-ben, hiszen a put metódus, az egy már meglévő dolognak a felülírása  
*/

async function updateProduct(product) {
    try{
        const response = await fetch("https://dummyjson.com/products/10", {
            method: "PUT",
            data: JSON.stringify(product),
            headers: {"content-type":"application/json"}
        });
        const json = await response.json();
        console.log(json);

    } catch(err) {
        console.log(err);
    }
} 

updateProduct({
    title: "Iphone 1000",
    price: 12432,
    description: "This is a very good phone!",
    stock: 345
});

/*
itt úgy is lehetett volna, hogy létrehozunk egy objektumot, amit majd megadunk az updateProduct-nak, nem úgy, hogy ott rögtön 
így ->
const productToUpdate = {
    title: "Iphone 1000",
    price: 12432,
    description: "This is a very good phone!",
    stock: 345
};

updateProduct(productToUpdate);

Ez akkor jobb, hogyha több terméket is ezzel a dologgal akarunk updatelni 
*************************************************************************************************************************************
*/

/*
Patch az egy részleges felülírás, teljesen ugyanaz, mint a put, csak annyiban különbözik, hogy itt amit megadunk majd csak azok az értékek 
lesznek felülírva 
*/

async function updatePatchProduct(product) {
    try {
        const response = await fetch("https://dummyjson.com/products/12", {
            method: "PATCH",
            data: JSON.stringify(product),
            headers: {"content-type":"application/json"}
        });
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

const productToUpdate = {
    description: "this is a very good phone!",
    price: 1212
}

updatePatchProduct(productToUpdate);
/******************************************************************************************************************************************/
//DELETE 

async function deleteProduct(id) {
    try{
        const response = await fetch("https://dummyjson.com/products/" + id, {
            method: "DELETE"
        })
        const json = await response.json();
        console.log(json);

    } catch(err) {
        console.log(err);
    }
}

deleteProduct(4);
/******************************************************************************************************************************************/

/*
a get kéréssel, most az összes terméket megkapjuk, de mi most azt szeretnénk, hogy csak egyet
-> ezt ugy lehet, hogy a függvény az vár egy id-t és majd csak azt a product-ot kérjük le 
*/

async function getSingleProduct(id) {
    try{
        const response = await fetch("https://dummyjson.com/products/" + id);
        const json = await response.json();
        console.log(json);
    } catch(err) {
        console.log(err);
    }
}

getSingleProduct(22);

console.log(JSON.stringify({id: 15, title: "asdf"}));
/*
Ez hogy a JSON-ben majd a kulcsok is kapnak ""
-> 
{"id":15,"title":"asdf"}
*/