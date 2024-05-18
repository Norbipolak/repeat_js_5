/*
<progress id="progress" value="0" max="100"></progress>
<button id="download-btn">Download!</button>

Csináltuk ezt a progress-t ez amikor betölt valami az hosszas valami 
nagyon fontos!!!
ennek adtuk egy value-t ami 0 és egy max-ot ami 100, ez olyan mintha adtunk volna neki egy min-t meg egy max-ot
ezeknek adtunk mindegyiknek egy id-t ami alapján lementjük ide őket 

Mi az a promise 
-> 
Aszinkron folyamatokhoz kialakított objektum!!!!! 
*/

// const intervalID = setInterval(()=> {
//     console.log("első");
//     console.log(setInterval); //f setInterval() { [native code] }
//     clearInterval(intervalID);
// }, 1000);

// console.log("második");
/*
Mi történik itt a setInterval (setTimeout) arra jó, hogy ez a dolog, ami benne van az 1 másodperc múlva fut le és utána egy másodpercenként 
lefut de mivel ez egy nevesített setInterval és kilogultuk, amit szerettünk volna, ezért utána a clearInterval, aminek megadtuk ezt az id-t 
ez leáll szóval ez csak egyszer fut le 

de itt az volt a lényeg, hogy rögtön lefutott a console.log("második")
console.log("első") pedig csak 1 másodperc múlva 
***********************************************************************************************************************************/
/*
Hyper Text Transfer Protocol 
Háloztati kommunikációs protokol
Általában véve a web-en használjuk 
Két szereplője van 
    - user agent -> böngésző 
    - webszerver 

nagyon fontos!!!! 
AJAX -> Asynchronous JavaScript and XML 
    Aszinkron kéréseket és válaszokat küld és fogad a HTTP protokoll segítségével 

Get -> erőforrás lekérdezése 
POST -> új erőforrás létrehozása 
PUT -> teljes felülírás 
PATCH -> részleges felülírás 
DELETE -> törlés 
*/

const progress = document.querySelector("#progress");
const downloadBtn = document.querySelector("#download-btn");

/*
itt szemléltetjük, hogy betölt az a valami
- a progress tag-nek van egy value-ja, ami nulla és itt létrehozunk egy percentage-t, ami szintén nulla 
majd egy setInterval-val ami 50ms megy ezt a percentage-t növeljük eggyel és összekötjük a percentag-et az progress.value-val 
és akkor majd az is úgy fog menni mint a percentage és látható lesz, mintha az a valami betöltene 
ez megy 100-ig és ott meg clearInterval 

nagyon fontos!!!! 
a downloadBtn-t az disabled lesz (downloadBtn.disabled = true)és csak akkor lesz újra disabled = false ha betöltött, hogy közben 
ezt ne lehessen nyomogatni 
*/ 

function downloadCallBack(cb) {
    let percentage = 0;
    downloadBtn.disabled = true;

    const intervalID = setInterval(()=> {
        percentage++;

        progress.value = percentage;
        /*
        nagyon fontos itt a sorrend, hogy mit adunk meg minek!!!!
        */

        if(percentage === 100) {
            clearInterval(intervalID);
            cb({data: "ez aztán elképesztően fontos"});
            downloadBtn.disabled = false;
        }
    }, 50);
}

// downloadBtn.addEventListener("click", function() {
//     downloadCallBack((pisti)=> console.log(pisti));
// });
/*
A downloadCallBack függvény meghatározása:


function downloadCallBack(cb) {
    // Függvény törzse
}
Itt a downloadCallBack egy függvény, ami egy callback függvényt, azaz cb-t vár paraméterként.

A callback függvény, cb, használata a downloadCallBack függvényen belül:

cb({ data: "ez aztán elképesztően fontos" });
A downloadCallBack-ben a callback függvényt, cb-t, egy objektummal hívjuk meg, melynek értéke { data: "ez aztán elképesztően fontos" }. 
Ez az objektum valamilyen adatot reprezentál, amit a callback függvény kezelni fog.

A downloadCallBack függvény meghívása egy callback függvénnyel:

downloadCallBack((pisti) => console.log(pisti));
Amikor a downloadCallBack függvényt meghívjuk, egy nyilas függvényt, azaz (pisti) => console.log(pisti), 
adjuk át paraméterként. 
Ez a nyilas függvény a cb, vagyis a callback függvény, amit a downloadCallBack vár.

Itt (pisti) => console.log(pisti) egy rövidített módja annak, hogy definiáljunk egy olyan függvényt, 
ami egy pisti nevű paramétert vár, és annak értékét a konzolra írja ki. 
Ez a függvény fog meghívódni a downloadCallBack-en belül, amikor a cb hívásra kerül.

Összefoglalva, a callback függvény (pisti) => console.log(pisti) kívül van létrehozva a downloadCallBack-en, 
majd ezt adjuk át paraméterként a downloadCallBack meghívásakor. 
A downloadCallBack-ben ez a callback függvény, vagyis cb, kerül meghívásra egy adott adattal, 
majd valamilyen műveletet hajt végre ezen az adaton, ami ebben az esetben a konzolra logolás.
*******************************************************************************************************************************************/

function downloadPromise() {
    let percentage = 0;
    downloadBtn.disabled = true;
    const httpStatuses = [200, 201, 403, 500]

    return new Promise((resolve, reject)=> {
        const intervalID = setInterval(()=> {
            percentage++;

            progress.value = percentage;

            if(percentage === 100) {
                clearInterval(intervalID);
                const index = Math.floor(Math.random() * httpStatuses.length);
                //fontos, hogy itt length-vel szoroztuk, ami pont jó, mert ez index-re lesz és csinál egy számot 0 és length-1 között 
                const statusCode = httpStatuses[index].toString();
                /*
                fontos, hogy ez toString-elve legyen, mert majd a switch-ben ott string-re lesz szükség 
                hiszen csak az első elemét fogjuk megvizsgálni és az alapján csináljuk a case-eket 
                */
               switch(statusCode[0]) {
                case "2":
                    resolve({data:"Ez aztán elképesztően fontos!"});
                    break;
                case "4":
                    reject({data:"Kliens hiba történt!"});
                    break;
                case "5":
                    reject({data: "Szerver hiba történt!"});
                    break;
               }

               downloadBtn.disabled = false;
            }
        }, 30);
    });
}

downloadPromise().then((data)=> {
     console.log(data);
}).catch((error)=> {
    console.log(error);
});