interface simIterface {
    phoneNumber: number,
    creditoResiduo: number,
    numeroChiamate: object[],
    tariffaChiamate: number
    sar:number
    getelencoChiamate(),
    azzeraElencoChiamate(),
    nuovaChiamata(),
    stopCall(),
    getCreditoResiduo()
    ricarica(),
    print()
}

abstract class basicSim {
    numeroChiamate: object[] = []
    timer:number //overloade sbagliato
    constructor(
        public phoneNumber: number,
        public creditoResiduo: number,
        numeroChiamate: object[],
        public tariffaChiamate: number,
        public sar:number
    ) {
        this.numeroChiamate = numeroChiamate
    }
    static s = 0
    static m = 0
    static h = 0
    static callMinutes = basicSim.h * 60 + basicSim.m //forse va spostato nel interval

    getelencoChiamate() {
        
    }

    azzeraElencoChiamate() { this.numeroChiamate = [] }

    nuovaChiamata() {
        console.log(this.numeroChiamate);
        //@ts-ignore
        this.timer = setInterval(function () {
            basicSim.s++
            if (basicSim.s == 60) {
                basicSim.m++
                basicSim.s = 0
            }
            if (basicSim.m == 60) {
                basicSim.h++
                basicSim.m = 0
            }
        }, 1000)

        if (basicSim.callMinutes * this.tariffaChiamate + this.sar >= this.creditoResiduo) {
            clearInterval(this.timer)
        }

    }

    stopCall() {
        clearInterval(this.timer)
        console.log(this);
        let durataChiamata = `${basicSim.h}:${basicSim.m}:${basicSim.s}` 
        this.numeroChiamate.push({ number: this.phoneNumber, durata: durataChiamata, spesa: basicSim.callMinutes * this.tariffaChiamate + this.sar})
        basicSim.s = 0
        basicSim.m = 0
        basicSim.h = 0

        this.creditoResiduo = this.creditoResiduo - (basicSim.callMinutes * this.tariffaChiamate + this.sar)

        console.log(this.creditoResiduo);
    }

    getCreditoResiduo() {
        return this.creditoResiduo.toFixed(2)
    }

    ricarica(n){
        this.creditoResiduo = this.creditoResiduo + n
    }

    print(){
        let userArea = document.getElementById('userArea')!
        let UserCard = document.createElement("div");
        userArea.appendChild(UserCard);

        let phoneArea = document.createElement("div");
        let displayNumber = document.createElement("p")
        displayNumber.innerHTML = this.phoneNumber.toString()
        let displayCallControls = document.createElement("p")
        let startCall = document.createElement("button")
        startCall.innerHTML = 'start call'
        //!event inizio chiamata
        let thiselement = this
        startCall.addEventListener('click',function(){thiselement.nuovaChiamata()})
        let endCall = document.createElement("button")
        endCall.innerHTML = 'end call'
        endCall.addEventListener('click',function(){thiselement.stopCall()})
        displayCallControls.appendChild(startCall)
        displayCallControls.appendChild(endCall)
        phoneArea.appendChild(displayNumber)
        phoneArea.appendChild(displayCallControls)


        //!______________________
        let actionArea = document.createElement("div");
        //Ricarica
        let btnRicarica = document.createElement("button")
        btnRicarica.innerHTML = 'ricarica'


        btnRicarica.addEventListener('click',function(){
            infoArea.innerHTML = ''
            let inputRicarica = document.createElement('input')
            inputRicarica.type = 'number'
            let launchRicarica = document.createElement('button')
            launchRicarica.innerHTML = 'ricarica'
            launchRicarica.addEventListener('click', function(){
                thiselement.ricarica(parseInt(inputRicarica.value))
            })
            infoArea.appendChild(inputRicarica)
            infoArea.appendChild(launchRicarica)
            infoArea.classList.toggle('hidden')
        })
        

        actionArea.appendChild(btnRicarica)

        //credito residuo
        let btnCredito = document.createElement("button")
        btnCredito.innerHTML = 'Credito R'

        btnCredito.addEventListener('click',function(){
            infoArea.innerHTML = ''
            infoArea.innerHTML = thiselement.getCreditoResiduo()
            infoArea.classList.toggle('hidden')
        })

        actionArea.appendChild(btnCredito)

        //Lista chiamate
        let btnLista = document.createElement("button")
        btnLista.innerHTML = 'Chiamte'

        btnLista.addEventListener('click',function(){
            infoArea.innerHTML = ''
            thiselement.numeroChiamate.forEach((e,i)=>{
                let row = document.createElement('p')
                row.innerHTML = 'numero: '+ e.number +'<br>'+'durata: '+ e.durata +'<br>'+'spesa: '+ e.spesa
                infoArea.append(row)
                console.log(e);
            })
            infoArea.classList.toggle('hidden')
        })

        actionArea.appendChild(btnLista)

        //clear lista
        let btnClear = document.createElement("button")
        btnClear.innerHTML = 'Cls Lista'

        btnClear.addEventListener('click',function(){
            infoArea.innerHTML = ''
            thiselement.azzeraElencoChiamate()
        })

        actionArea.appendChild(btnClear)
        //ricarica->input per selezionare quanto ricaricare, credRes, getelenco ,azzeraelenco
        

        //!________________________

        let infoArea = document.createElement('div')
        infoArea.classList.add('hidden')

        //!________________________

        UserCard.appendChild(phoneArea)
        UserCard.appendChild(actionArea)
        UserCard.appendChild(infoArea)
    }
}

class SimCompleta extends basicSim{
    constructor(phonenumber:number){
        super(phonenumber, 20, [], 0.20, 0.15)//credito modificato da 0 a 20 ->rimettere a 0
    }
}
class SimNoScatto extends basicSim{
    constructor(phonenumber:number){
        super(phonenumber, 0, [], 0.20, 0)
    }
}
class SimSoloScatto extends basicSim{
    constructor(phonenumber:number){
        super(phonenumber, 0, [], 0, 0.15)
    }
}

let user1 = new SimCompleta(345446677)
let user2 = new SimNoScatto(3334366938)
let user3 = new SimSoloScatto(347098617)

var allSim:(SimCompleta | SimNoScatto | SimSoloScatto)[] = []
allSim.push(user1,user2,user3)

allSim.forEach((e)=>{
    e.print()
})


//notare che funziona allo scatto del minuto quindi sino ai 60 secondi si paga solo lo scatto alla risposta
//sono coscente della presenza di iterazioni che richiedono sistemazione: possibilità di cliccare una volta sola i bottoni toggle dei bottoni