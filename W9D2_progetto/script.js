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
var Conto = /** @class */ (function () {
    function Conto(intestatario, saldo) {
        this.balaceInit = 0;
        this.intestatario = intestatario;
        this.saldo = this.balaceInit + saldo;
    }
    Conto.prototype.getSaldo = function () {
        console.log(this.saldo + 'euro');
    };
    Conto.prototype.versamento = function (transazione) {
        this.saldo = this.saldo + transazione;
        this.getSaldo();
    };
    Conto.prototype.prelievo = function (transazione) {
        if (transazione < this.saldo) {
            this.saldo = this.saldo - transazione;
            this.getSaldo();
        }
        else {
            console.log('credito insufficiente');
        }
    };
    return Conto;
}());
var ContoUnder18 = /** @class */ (function (_super) {
    __extends(ContoUnder18, _super);
    function ContoUnder18(intestatario, saldo) {
        return _super.call(this, intestatario, saldo) || this;
    }
    return ContoUnder18;
}(Conto));
var ContoOver18 = /** @class */ (function (_super) {
    __extends(ContoOver18, _super);
    function ContoOver18(intestatario, saldo) {
        var _this = _super.call(this, intestatario, saldo) || this;
        _this.interesse = 10;
        return _this;
    }
    ContoOver18.prototype.versamento = function (transazione) {
        this.saldo = this.saldo + transazione - (transazione * this.interesse) / 100;
        this.getSaldo();
    };
    return ContoOver18;
}(Conto));
var contoMadre = new ContoOver18('Giglia', 7500);
var contoFiglio = new ContoUnder18('Rocco', 1200);
//? operazioni madre
document.getElementById('prelievoMadre').addEventListener('click', function () {
    var inputMadre = document.getElementById('inputMadre').value;
    console.log(inputMadre);
    contoMadre.prelievo(parseInt(inputMadre));
});
document.getElementById('versamentoMadre').addEventListener('click', function () {
    var inputMadre = document.getElementById('inputMadre').value;
    console.log(inputMadre);
    contoMadre.versamento(parseInt(inputMadre));
});
//? operazione figlio
document.getElementById('prelievoFiglio').addEventListener('click', function () {
    var inputFiglio = document.getElementById('inputFiglio').value;
    contoFiglio.prelievo(parseInt(inputFiglio));
});
document.getElementById('versamentoFiglio').addEventListener('click', function () {
    var inputFiglio = document.getElementById('inputFiglio').value;
    contoFiglio.versamento(parseInt(inputFiglio));
});
