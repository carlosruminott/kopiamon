document.addEventListener("DOMContentLoaded", ready);

var types = ['Electric', 'Water', 'Fire', 'Grass', 'Land'],
	turn = 1, 
	Pokemon;

Pokemon = function(params) {
	this.pokeName = params[0];
	this.pokeLife = params[1];
	this.pokeType = params[2];
	this.pokeAttack = {
		attack1: {
			attackName: params[3][0][0],
			attackDamage: params[3][1][0]
		},
		attack2: {
			attackName: params[3][0][1],
			attackDamage:  params[3][1][1]
		},
		attack3: {
			attackName: params[3][0][2],
			attackDamage:  params[3][1][2]
		},
		attack4: {
			attackName: params[3][0][3],
			attackDamage:  params[3][1][3]
		}
	};
	this.pokeWeak = params[4];
	this.active = false;
}

Pokemon.prototype.attack = function(n, weakness) {
	//var multiplied;
	//if (weakness == true) {}
	if (n == 1) {
		return this.pokeAttack.attack1.attackDamage;
	}
	if (n == 2) {
		return this.pokeAttack.attack2.attackDamage;
	}
	if (n == 3) {
		return this.pokeAttack.attack3.attackDamage;
	}
	if (n == 4) {
		return this.pokeAttack.attack4.attackDamage;
	}
}

Pokemon.prototype.win = function() {
	return this.pokeName + ' ha ganado!!';
}

// if this function return true, the attacks is multiplied by 2
function checkWeakness(you,opponent) {
	if (you.pokeType == opponent.pokeWeak) {
		return true;
	}else {
		return false;
	}
}

function turnAttack(you, opponent, posAttack) {
	var weakness = checkWeakness(you,opponent);
	you.pokeLife = you.pokeLife - opponent.attack(posAttack, weakness);
	if (you.pokeLife < 0 ) you.pokeLife = 0;
	console.log(you.pokeName + ' ahora tiene ' + you.pokeLife + ' puntos de vida');
}

function ready() {
	var pokeYour = [
		'Pikachu', 
		110,
		types[0],
		[
			['Impac Trueno', 'Ataque Rápido', 'Trueno', 'Defensa'],
			[30,10,60,0]
		],
		types[4]
	], 
	pokeEnemy = [
		'Blastoise', 
		150,
		types[1],
		[
			['Surf', 'Rayo Burbuja', 'Defensa', 'Giro Rápido'],
			[90,20,0,30]
		],
		types[0]
	],
	yourPoke = new Pokemon(pokeYour),
	enemyPoke = new Pokemon(pokeEnemy),
	ran;
	//pikachu.attack(1);

	var lala = yourPoke.pokeAttack.length;
	console.log(lala[2]);

	while(yourPoke.pokeLife > 0 && enemyPoke.pokeLife > 0){
	   	if(turn == 1){
	   		turnAttack(enemyPoke, yourPoke, 3);
			turn = 2;
	   	}else{
	   		ran = Math.floor(Math.random()*4);
			turnAttack(yourPoke, enemyPoke, ran);
			turn = 1;
	   	}
	}

	// end game
	if(yourPoke.pokeLife > 0){
		yourPoke.win();
		console.log(yourPoke.win());
	}else{
		enemyPoke.win();
		console.log(enemyPoke.win());
	}
}