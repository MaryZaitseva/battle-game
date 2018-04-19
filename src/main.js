"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./styles.css");
const jquery_1 = __importDefault(require("jquery"));
const ts_promise_1 = __importDefault(require("ts-promise"));
var CharacterTypes;
(function (CharacterTypes) {
    CharacterTypes[CharacterTypes["Warrior"] = 0] = "Warrior";
    CharacterTypes[CharacterTypes["Archer"] = 1] = "Archer";
    CharacterTypes[CharacterTypes["Thrower"] = 2] = "Thrower";
})(CharacterTypes || (CharacterTypes = {}));
let Weapons = [
    {
        type: "Dagger",
        cost: 5,
        damage: 10
    },
    {
        type: "Sword",
        cost: 10,
        damage: 15
    },
    {
        type: "Bow",
        cost: 15,
        damage: 15
    },
    {
        type: "CrossBow",
        cost: 20,
        damage: 20
    },
    {
        type: "Spear",
        cost: 15,
        damage: 15
    },
    {
        type: "Boomerang",
        cost: 15,
        damage: 15
    },
];
class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
        this.points = 100;
    }
}
class Character {
    constructor() {
        this.health = 100;
    }
}
class Warrior extends Character {
    constructor() {
        super();
        this.damage = 20;
        this.distance = 2;
        this.cost = 15;
        this.type = CharacterTypes.Warrior;
    }
}
class Archer extends Character {
    constructor() {
        super();
        this.type = CharacterTypes.Archer;
        this.damage = 25;
        this.distance = 3;
        this.cost = 20;
    }
}
class Thrower extends Character {
    constructor() {
        super();
        this.type = CharacterTypes.Thrower;
        this.damage = 25;
        this.distance = 3;
        this.cost = 20;
    }
}
class Squad {
    constructor() {
        this._resources = [];
    }
    get resources() {
        return this._resources;
    }
    set resource(value) {
        this._resources.push(value);
    }
}
let currentPlayer;
function rememberUser() {
    return new ts_promise_1.default((resolve, reject) => {
        jquery_1.default("form").submit(function (event) {
            event.preventDefault();
            let name = (jquery_1.default('input[name="name"]').val());
            jquery_1.default(this).addClass("hidden");
            jquery_1.default(this).parent().hide();
            resolve(name);
            reject(new Error("error message"));
        });
    });
}
rememberUser().then(result => {
    let currentPlayer = new Player(result);
    jquery_1.default("#scoreboard").html(currentPlayer.name);
});
jquery_1.default("#characters td").click(function (e) {
    let clicked = true;
    let that = jquery_1.default(this);
    jquery_1.default(this).addClass("clicked");
    jquery_1.default("body").click(function (e) {
        var container = jquery_1.default("#characters td");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass("clicked");
        }
        if (e.target == jquery_1.default("#field td")) {
        }
    });
    clicked = false;
});
jquery_1.default("#field td").click(function () {
    if (!clicked)
        return;
    jquery_1.default(this).css("background-color", " white");
    clicked = false;
});
hover(function () {
    jquery_1.default(this).addClass("hover");
}, function () {
    jquery_1.default(this).removeClass("hover");
});
