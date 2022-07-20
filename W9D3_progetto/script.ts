interface datiLavoratore {
    anagrafica:string
    redditoLordo:number
    codRed:number
    utileTasse:number
    irpef:number
    imps:number
}
abstract class Lavoraratore implements datiLavoratore{
    _anagrafica:string
    redditoLordo:number
    codRed:number
    readonly utileTasse:number
    readonly irpef:number
    readonly imps:number
    constructor(anagrafica:string,redditoLordo:number,codred:number){

        this._anagrafica = anagrafica

        this.redditoLordo =  redditoLordo

        this.codRed = codred

        this.utileTasse = this.redditoLordo * this.codRed / 100

        if(this.redditoLordo <= 15000){
            this.irpef = 23
        }
        else if(this.redditoLordo >= 15001 && this.redditoLordo <= 28000){
            this.irpef = 27
        }
        else if(this.redditoLordo >= 28001 && this.redditoLordo <= 55000){
            this.irpef = 38
        }
        else if(this.redditoLordo >= 55.001  && this.redditoLordo <= 75.000 ){
            this.irpef = 41
        }
        else{this.irpef = 43}

        this.imps = 28
       
    }
    get tasseIrpef():number{
        return this.utileTasse * this.irpef / 100
    }
    get tasseImps():number{
        return this.utileTasse * this.imps / 100
    }
    get anagrafica():string{
        return this._anagrafica
    }
    get redditoNetto():number{
        return this.redditoLordo - (this.tasseImps + this.tasseIrpef)
    }
}
class Commerciante extends Lavoraratore implements datiLavoratore{
    constructor(_anagrafica:string,redditoLordo:number){
        super(_anagrafica,redditoLordo,50)
    }
}
class LiberoProfessionista extends Lavoraratore implements datiLavoratore{
    constructor(_anagrafica:string,redditoLordo:number){
        super(_anagrafica,redditoLordo,60)
    }
}
class Dipendente extends Lavoraratore implements datiLavoratore{
    constructor(_anagrafica:string,redditoLordo:number){
        super(_anagrafica,redditoLordo,60)
    }
}

let c1 = new Commerciante('Rossi Mario', 35000)
let lb1 = new LiberoProfessionista('Calza Mariella', 60000)
let d1 = new Dipendente('Paladino Marco', 17000)