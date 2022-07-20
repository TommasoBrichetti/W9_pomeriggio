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
var Lavoraratore = /** @class */ (function () {
    function Lavoraratore(anagrafica, redditoLordo, codred) {
        this._anagrafica = anagrafica;
        this.redditoLordo = redditoLordo;
        this.codRed = codred;
        this.utileTasse = this.redditoLordo * this.codRed / 100;
        if (this.redditoLordo <= 15000) {
            this.irpef = 23;
        }
        else if (this.redditoLordo >= 15001 && this.redditoLordo <= 28000) {
            this.irpef = 27;
        }
        else if (this.redditoLordo >= 28001 && this.redditoLordo <= 55000) {
            this.irpef = 38;
        }
        else if (this.redditoLordo >= 55.001 && this.redditoLordo <= 75.000) {
            this.irpef = 41;
        }
        else {
            this.irpef = 43;
        }
        this.imps = 28;
    }
    Object.defineProperty(Lavoraratore.prototype, "tasseIrpef", {
        get: function () {
            return this.utileTasse * this.irpef / 100;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lavoraratore.prototype, "tasseImps", {
        get: function () {
            return this.utileTasse * this.imps / 100;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lavoraratore.prototype, "anagrafica", {
        get: function () {
            return this._anagrafica;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lavoraratore.prototype, "redditoNetto", {
        get: function () {
            return this.redditoLordo - (this.tasseImps + this.tasseIrpef);
        },
        enumerable: false,
        configurable: true
    });
    return Lavoraratore;
}());
var Commerciante = /** @class */ (function (_super) {
    __extends(Commerciante, _super);
    function Commerciante(_anagrafica, redditoLordo) {
        return _super.call(this, _anagrafica, redditoLordo, 50) || this;
        // this.utileTasse = this.redditoLordo * this.codRed / 100
    }
    return Commerciante;
}(Lavoraratore));
var LiberoProfessionista = /** @class */ (function (_super) {
    __extends(LiberoProfessionista, _super);
    function LiberoProfessionista(_anagrafica, redditoLordo) {
        var _this = _super.call(this, _anagrafica, redditoLordo) || this;
        _this.codRed = 60;
        return _this;
        // this.utileTasse = this.redditoLordo * this.codRed / 100
    }
    return LiberoProfessionista;
}(Lavoraratore));
var Dipendente = /** @class */ (function (_super) {
    __extends(Dipendente, _super);
    function Dipendente(_anagrafica, redditoLordo) {
        var _this = _super.call(this, _anagrafica, redditoLordo) || this;
        _this.codRed = 40;
        return _this;
        // this.utileTasse = this.redditoLordo * this.codRed / 100
    }
    return Dipendente;
}(Lavoraratore));
var c1 = new Commerciante('Rossi Mario', 35000);
var lb1 = new LiberoProfessionista('Calza Mariella', 60000);
var d1 = new Dipendente('Paladino Marco', 17000);
