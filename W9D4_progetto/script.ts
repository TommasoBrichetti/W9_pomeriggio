class Product {
    id:number
    codprodotto:number
    collezione:string
    capo:string
    modello:number
    quantita:number
    colore:string
    prezzoivaesclusa:number
    prezzoivainclusa:number
    disponibile:string
    saldo:number

    constructor(
        id:number,
        codprodotto:number,
        collezione:string,
        capo:string,
        modello:number,
        quantita:number,
        colore:string,
        prezzoivaesclusa:number,
        prezzoivainclusa:number,
        disponibile:string,
        saldo:number)
    {
        this.id = id
        this.codprodotto = codprodotto
        this.collezione = collezione
        this.capo = capo
        this.modello = modello
        this.quantita = quantita
        this.colore = colore
        this.prezzoivaesclusa = prezzoivaesclusa
        this.prezzoivainclusa = prezzoivainclusa
        this.disponibile = disponibile
        this.saldo = saldo
    }

    getsaldocapo(){return this.prezzoivainclusa * this.saldo / 100}
    getacquistocapo(){return this.prezzoivainclusa}
    get scontrino(){
        return `${this.codprodotto} <br> ${this.capo} <br> ${this.modello} <br> ${this.colore} <br> ${this.prezzoivaesclusa} <br> ${this.saldo}% <br> ${this.getsaldocapo()} `
    }
}

let capi:Product[] = []
let url = 'http://localhost:3000/capi'

async function getCapi(){

    await fetch(url).then(res=>res.json()).then((res)=>{
        console.log(res);
        capi = res;
    }) 
    
    capi.forEach((e,i)=>{
      capi[i] = new Product(
        e.id,
        e.codprodotto,
        e.collezione,
        e.capo,
        e.modello,
        e.quantita,
        e.colore,
        e.prezzoivaesclusa,
        e.prezzoivainclusa,
        e.disponibile,
        e.saldo)
    })
    
}


getCapi();

document.querySelector('button')?.addEventListener('click', function(){
    console.log(capi[1].getacquistocapo());
})


