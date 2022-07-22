var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var basicSim = /** @class */ (function () {
    function basicSim(phoneNumber, creditoResiduo, numeroChiamate, tariffaChiamate, sar) {
        this.phoneNumber = phoneNumber;
        this.creditoResiduo = creditoResiduo;
        this.tariffaChiamate = tariffaChiamate;
        this.sar = sar;
        this.numeroChiamate = [];
        this.numeroChiamate = numeroChiamate;
    }
    basicSim.prototype.getelencoChiamate = function () {
    };
    basicSim.prototype.azzeraElencoChiamate = function () { this.numeroChiamate = []; };
    basicSim.prototype.nuovaChiamata = function () {
        console.log(this.numeroChiamate);
        //@ts-ignore
        this.timer = setInterval(function () {
            basicSim.s++;
            if (basicSim.s == 60) {
                basicSim.m++;
                basicSim.s = 0;
            }
            if (basicSim.m == 60) {
                basicSim.h++;
                basicSim.m = 0;
            }
        }, 1000);
        if (basicSim.callMinutes * this.tariffaChiamate + this.sar >= this.creditoResiduo) {
            clearInterval(this.timer);
        }
    };
    basicSim.prototype.stopCall = function () {
        clearInterval(this.timer);
        console.log(this);
        var durataChiamata = "".concat(basicSim.h, ":").concat(basicSim.m, ":").concat(basicSim.s);
        this.numeroChiamate.push({ number: this.phoneNumber, durata: durataChiamata, spesa: basicSim.callMinutes * this.tariffaChiamate + this.sar });
        basicSim.s = 0;
        basicSim.m = 0;
        basicSim.h = 0;
        this.creditoResiduo = this.creditoResiduo - (basicSim.callMinutes * this.tariffaChiamate + this.sar);
        console.log(this.creditoResiduo);
    };
    basicSim.prototype.getCreditoResiduo = function () {
        return this.creditoResiduo.toFixed(2);
    };
    basicSim.prototype.ricarica = function (n) {
        this.creditoResiduo = this.creditoResiduo + n;
    };
    basicSim.prototype.print = function () {
        var userArea = document.getElementById('userArea');
        var UserCard = document.createElement("div");
        userArea.appendChild(UserCard);
        var phoneArea = document.createElement("div");
        var displayNumber = document.createElement("p");
        displayNumber.innerHTML = this.phoneNumber.toString();
        var displayCallControls = document.createElement("p");
        var startCall = document.createElement("button");
        startCall.innerHTML = 'start call';
        //!event inizio chiamata
        var thiselement = this;
        startCall.addEventListener('click', function () { thiselement.nuovaChiamata(); });
        var endCall = document.createElement("button");
        endCall.innerHTML = 'end call';
        endCall.addEventListener('click', function () { thiselement.stopCall(); });
        displayCallControls.appendChild(startCall);
        displayCallControls.appendChild(endCall);
        phoneArea.appendChild(displayNumber);
        phoneArea.appendChild(displayCallControls);
        //!______________________
        var actionArea = document.createElement("div");
        //Ricarica
        var btnRicarica = document.createElement("button");
        btnRicarica.innerHTML = 'ricarica';
        btnRicarica.addEventListener('click', function () {
            infoArea.innerHTML = '';
            var inputRicarica = document.createElement('input');
            inputRicarica.type = 'number';
            var launchRicarica = document.createElement('button');
            launchRicarica.innerHTML = 'ricarica';
            launchRicarica.addEventListener('click', function () {
                thiselement.ricarica(parseInt(inputRicarica.value));
            });
            infoArea.appendChild(inputRicarica);
            infoArea.appendChild(launchRicarica);
            infoArea.classList.toggle('hidden');
        });
        actionArea.appendChild(btnRicarica);
        //credito residuo
        var btnCredito = document.createElement("button");
        btnCredito.innerHTML = 'Credito R';
        btnCredito.addEventListener('click', function () {
            infoArea.innerHTML = '';
            infoArea.innerHTML = thiselement.getCreditoResiduo();
            infoArea.classList.toggle('hidden');
        });
        actionArea.appendChild(btnCredito);
        //Lista chiamate
        var btnLista = document.createElement("button");
        btnLista.innerHTML = 'Chiamte';
        btnLista.addEventListener('click', function () {
            infoArea.innerHTML = '';
            thiselement.numeroChiamate.forEach(function (e, i) {
                var row = document.createElement('p');
                row.innerHTML = 'numero: ' + e.number + '<br>' + 'durata: ' + e.durata + '<br>' + 'spesa: ' + e.spesa;
                infoArea.append(row);
                console.log(e);
            });
            infoArea.classList.toggle('hidden');
        });
        actionArea.appendChild(btnLista);
        //clear lista
        var btnClear = document.createElement("button");
        btnClear.innerHTML = 'Cls Lista';
        btnClear.addEventListener('click', function () {
            infoArea.innerHTML = '';
            thiselement.azzeraElencoChiamate();
        });
        actionArea.appendChild(btnClear);
        //ricarica->input per selezionare quanto ricaricare, credRes, getelenco ,azzeraelenco
        //!________________________
        var infoArea = document.createElement('div');
        infoArea.classList.add('hidden');
        //!________________________
        UserCard.appendChild(phoneArea);
        UserCard.appendChild(actionArea);
        UserCard.appendChild(infoArea);
    };
    basicSim.s = 0;
    basicSim.m = 0;
    basicSim.h = 0;
    basicSim.callMinutes = basicSim.h * 60 + basicSim.m; //forse va spostato nel interval
    return basicSim;
}());
var SimCompleta = /** @class */ (function (_super) {
    __extends(SimCompleta, _super);
    function SimCompleta(phonenumber) {
        return _super.call(this, phonenumber, 20, [], 0.20, 0.15) || this; //credito modificato da 0 a 20 ->rimettere a 0
    }
    return SimCompleta;
}(basicSim));
var SimNoScatto = /** @class */ (function (_super) {
    __extends(SimNoScatto, _super);
    function SimNoScatto(phonenumber) {
        return _super.call(this, phonenumber, 0, [], 0.20, 0) || this;
    }
    return SimNoScatto;
}(basicSim));
var SimSoloScatto = /** @class */ (function (_super) {
    __extends(SimSoloScatto, _super);
    function SimSoloScatto(phonenumber) {
        return _super.call(this, phonenumber, 0, [], 0, 0.15) || this;
    }
    return SimSoloScatto;
}(basicSim));
var user1 = new SimCompleta(345446677);
var user2 = new SimNoScatto(3334366938);
var user3 = new SimSoloScatto(347098617);
var allSim = [];
allSim.push(user1, user2, user3);
allSim.forEach(function (e) {
    e.print();
});
//notare che funziona allo scatto del minuto quindi sino ai 60 secondi si paga solo lo scatto alla risposta
//sono coscente della presenza di iterazioni che richiedono sistemazione: possibilità di cliccare una volta sola i bottoni toggle dei bottoni
