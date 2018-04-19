import "./styles.css";
import $ from "jquery";

enum CharacterTypes{
	Warrior,
	Archer,
	Thrower
}

let Gear = [
	{
		type: "Dagger",
		cost: 5,
		damage: 10,
		canUse: "warrior"
	},
	{
		type: "Sword",
		cost: 10,
		damage: 15,
		canUse: "warrior"
	},
	{
		type: "Bow",
		cost: 15,
		damage: 15,
		canUse: "archer"
	},
	{
		type: "CrossBow",
		cost: 20,
		damage: 20,
		canUse: "archer"
	},
	{
		type: "Spear",
		cost: 15,
		damage: 15,
		canUse: "thrower"
	},
	{
		type: "Boome rang",
		cost: 15,
		damage: 15,
		canUse: "thrower"
	},
	{
		type: "Armor",
		cost: 40,
		protection: 2
	},
	{
		type: "Tank",
		distance: 2,
		cost: 40,
		protection: 1.5
	},
	{
		type: "Horse",
		distance: 2, 
		cost: 25
	},

]

class Player{
	wins: number = 0;
	points: number = 100;
	constructor(public name:string){
	}
}

abstract class Character{
	health: number = 100;
	position: number;
	abstract damage: number;
	abstract image: string;
	abstract distance: number;
	abstract cost: number;
	abstract type: CharacterTypes;	
	constructor(position: number){
		this.position = position;
	}

	showInfo(){
		return ("Type: " + CharacterTypes[this.type] + "</br> Distance: " + this.distance + "</br>Cost: " + this.cost);
	}
}

class Warrior extends Character{
	damage: number = 20;
	image: string = "src/images/warrior.png";
	distance: number = 1;
	cost: number = 15;
	type: CharacterTypes = CharacterTypes.Warrior;
	position: number;
	constructor(position){
		super(position);
	}
}

class Archer extends Character{
	type: CharacterTypes = CharacterTypes.Archer;
	image: string = "src/images/archer.png";
	damage: number = 25;
	distance: number = 2;
	cost: number = 20;
	constructor(position){
		super(position);
	}
}

class Thrower extends Character{
	type: CharacterTypes = CharacterTypes.Thrower;
	image: string = "src/images/thrower.png";
	damage: number = 25;
	distance: number = 2;
	cost: number = 20;
	constructor(position){
		super(position);
	}
}

class Squad{	
	private _resources: Character[] = [];
	positions = [];
	types = [];
	constructor(){}
	addMember(value: Character):void{
		this._resources.push(value);
		this.positions.push(value.position);
		this.types.push(value.type);
	}
	deleteMember(value: Character):void{
		this._resources.splice(this._resources.indexOf(value), 1);
	}
	findMember(position: number){
		for(let i=0; i<this._resources.length; i++){
			if(this._resources[i].position = position){
				return this._resources[i];
			};
		}
	}
	get resources(): Character[]{
		return this._resources;
	}
}

class EnemySquad{	
	wins: number = 0;
	private _resources: Character[] = [];
	constructor(){}
	addMember(value: Character):void{
		this._resources.push(value);
	}
	deleteMember(value: Character):void{
		this._resources.splice(this._resources.indexOf(value), 1);
	}
	findMember(position: number): Character{
		for(let i=0; i<this._resources.length; i++){
			if(this._resources[i].position = position){
				return this._resources[i];
			};
		}
	}
	get resources(): Character[]{
		return this._resources;
	}

}

let currentPlayer: Player;
let playersSquad = new Squad();
let enemies = new EnemySquad();
let enemyPositions = [16,17,18,26,27,28,36,37,38,46,47,48,56,57,58];

$("form").submit(function(event){
	event.preventDefault();
	let name: string = <string>($('input[name="name"]').val());
	$(this).addClass("hidden");
	$(this).parent().hide();
	if(!name) name = "Player";
	currentPlayer = new Player(name);
	$("#player-score").html(currentPlayer.name + "'s squad");
	updatePoints();
})

$("#characters td").click(function(e){
	let clicked = true;
	let that = $(this);
	$(this).addClass("clicked");
	$('#field tr td:nth-child(-n+3)').addClass("available-cells");

	$("#field td").click(function(){
		$('#field tr td:nth-child(-n+3)').removeClass("available-cells");
		if(!clicked) return;
		clicked = false;
		that.removeClass("clicked");		
		let chosenChar = that.attr("id");
		let position = $(this).attr("id");
		$(this).append($("<div/>").attr("class", "healt-points"));
		if(+position[1] !== 1 && +position[1] !== 2 && +position[1] !== 3) {return};
		if(chosenChar === "warrior"){
			let cost = (new Warrior("")).cost;
			if(currentPlayer.points < cost) return;
			playersSquad.addMember(new Warrior(position));
			$(this).addClass("warrior");	
			currentPlayer.points -= cost;
			that.clone().css("border", "0").appendTo($(this));
			updatePoints();

		}
		else if(chosenChar === "archer"){
			let cost = (new Archer("")).cost;
			if(currentPlayer.points < cost) return;
			playersSquad.addMember(new Archer(position));
			that.clone().css("border", "0").appendTo($(this));
			$(this).addClass("archer");
			currentPlayer.points -= cost;	
			updatePoints();
		}
		else if(chosenChar === "thrower"){
			let cost = (new Thrower("")).cost;
			if(currentPlayer.points < cost) return;
			playersSquad.addMember(new Thrower(position));
			that.clone().css("border", "0").appendTo($(this));
			$(this).addClass("thrower");
			currentPlayer.points -= cost;	
			updatePoints();
			}			
	})
})
.hover(function(){
	$(this).addClass("hover");
	$("#info").css("visibility", "visible");
	let char;
	if ($(this).attr("id") === "warrior"){
		char = new Warrior("");
	}
	else if($(this).attr("id") === "archer"){
		char = new Archer("");
	}
	else if($(this).attr("id") === "thrower"){
		char = new Thrower("");
	}	
	$("#info").html(char.showInfo());
}, function(){
	$(this).removeClass("hover");
	$("#info").html("");
	$("#info").css("visibility", "hidden");
})

$("body").click(function(e) 
{
    var container = $("#characters td");
    if (!container.is(e.target) && !$("#field td").is(e.target)) 
    {
        container.removeClass("clicked");
    }
})

$("#enemy-squad").one("click", function(){
	let number = playersSquad.resources.length;
	for(let i=0; i<number;i++){
		let type = playersSquad.types[i];
		placeEnemy(type);
	}
})


$("#field td").click(function(){
	$("#field td").each(function(){
		$(this).removeClass("clicked");
	})	
	let cellFrom = $(this);
	let chose = false;
		if($(this).html()){
			let position = ($(this).attr("id"));	
			if($(this).hasClass("warrior")){
				highlight(1, position);	

				chose = true;
			}
			if($(this).hasClass("archer")||$(this).hasClass("thrower")){
				highlight(2, position);
				chose = true;
			}
		}
		$("#field td").click(function(){
			if(chose && !$(this).html() && $(this).hasClass("highlighted")){
				moveChar(cellFrom, $(this));
				chose = false;
				$("#field td").each(function(){
					$(this).removeClass("highlighted");
				});
				setTimeout(function(){
					enemyMoves();
				}, 1000)
								
			}
			if(chose && $(this).hasClass("enemy") && $(this).hasClass("highlighted")){
				playerAttacks(enemies.findMember(+$(this).attr("id")), playersSquad.findMember(+cellFrom.attr("id")));
				setTimeout(function(){
					enemyMoves();
				}, 1000)
				global.console.log("player attacks")
			}
		})			
})

function enemyMoves(){
	let i= Math.floor(Math.random()*enemies.resources.length);
	let enemy = enemies.resources[i];
	let position = (enemy.position).toString();		
	let cells = findPossibleMoves(enemy, position);
	let playersChar;	
	cells.forEach(function(item, index, array){
		if(item.hasClass("warrior") || item.hasClass("archer") || item.hasClass("thrower")){
			playersChar = playersSquad.findMember(item.attr("id"));
			global.console.log(playersChar);
		}
	})
	let endCell;
	if(playersChar){
		enemyAttacks(enemy, playersChar)
	}
	else{
		endCell = cells[Math.floor(Math.random()*cells.length)];
		while(endCell.html()){
		endCell = cells[Math.floor(Math.random()*cells.length)];
	}
		endCell.append($("#field #"+position).find("img")).addClass($("#field #"+position).attr("class"));
		endCell.addClass("enemy");
		$("#field #"+position).empty().removeClass();
		enemy.position = endCell.attr("id"); 

	}	
}

function moveChar(cellFrom, cellTo){
	let char = playersSquad.findMember(cellFrom.attr("id"));
	cellTo.append(cellFrom.find("img")).addClass(cellFrom.attr("class"));
	char.position = cellTo.attr("id");
	cellFrom.empty().removeClass();
}

function findPossibleMoves(char, position){
	let distance;
	if(char.type === 0) distance = 1;
	else if(char.type === 1 || char.type === 2) distance = 2;
	let result = [];
	$("#field td").each(function(){
		let id = $(this).attr("id");
		if((id[1]===position[1] && Math.abs(+id[0]-+position[0])<=distance) || 
		  (id[0]===position[0] && Math.abs(+id[1]-+position[1])<=distance)) {
		   		result.push($(this))
		}
	})
	return result
}

function highlight(distance: number, position:string): void{
	$("#field td").each(function(){
		let id = $(this).attr("id");
		if(id===position || 
		   (id[1]===position[1] && Math.abs(+id[0]-+position[0])<=distance) || 
		   (id[0]===position[0] && Math.abs(+id[1]-+position[1])<=distance)) {
		   		$(this).addClass("clicked");
		   		$(this).addClass("highlighted");
			
		}
	})
}


function placeEnemy(type){
	let position = (getRandomPosition()).toString();
	let newChar;
	if(type === 0) {
		newChar = new Warrior(position);
		enemies.addMember(newChar);
	}
	else if(type === 1) {
		newChar = new Archer(position);
		enemies.addMember(newChar);
	}
	else if(type === 2) {
		newChar = new Thrower(position);
		enemies.addMember(newChar);
	}
	if(!$("#"+position).html()){
		$("#"+position).append(" Enemy<img src=" + newChar.image +  ">").addClass("enemy");
	}
}
function getRandomPosition(){
	let index = Math.round(Math.random() * (enemyPositions.length-1));
	let position = enemyPositions[index];
	enemyPositions.splice(index, 1);
	if(!playersSquad.positions.includes(position)){
		return position;
	}
	else{
		getRandomPosition();
	}
}





function enemyAttacks(enemy, player){	
	$("#field #"+player.position).css("background-color", "blue");
	setTimeout(function(){
		$("#field #"+player.position).css("background-color", "");
	},500)
	player.health -= enemy.damage;	
	if(player.health < 0){
		$("#field #"+player.position).css("background-color", "blue");
	setTimeout(function(){
		$("#field #"+player.position).css("background-color", "");
	},500)
		$("#field #"+ player.position).empty().removeClass();
		enemy.health += player.damage;
		if(enemy.health>100) enemy.health = 100;
		playersSquad.deleteMember(player);
		enemies.wins++;
	updateScore()
	}
	
}

function updateScore(){
	$("#player-score").append("</br>" + (currentPlayer.wins).toString());
	$("#enemy-score").append("</br>" + (enemies.wins).toString());

}

function playerAttacks(enemy, player){
	enemy.health -= player.damage;
	$("#field #"+enemy.position).css("background-color", "blue");
	setTimeout(function(){
		$("#field #"+enemy.position).css("background-color", "");
	},500)
	if(enemy.health < 0){		
		$("#field #"+enemy.position).css("background-color", "blue");
	setTimeout(function(){
		$("#field #"+enemy.position).css("background-color", "");
	},500)
		$("#field #"+ enemy.position).empty().removeClass().css("background-color", "");
		player.health += enemy.damage;
		if(player.health>100) player.health = 100;
		enemies.deleteMember(enemy);
		currentPlayer.wins++;
		updateScore();
	}
}

function updatePoints(){
	$("#points").html(`You have ${currentPlayer.points} points`);
}