
var types = ['Electric', 'Water', 'Fire', 'Grass', 'Land'],
	turn = 1, 
	Pokemon;

Pokemon = function(params) {
	this.pokeName = params[0];
	this.pokeLife = params[1];
	this.pokeType = params[2];
	this.pokeAttack = [
		{
			attackName: params[3][0][0],
			attackDamage: params[3][1][0]
		},
		{
			attackName: params[3][0][1],
			attackDamage:  params[3][1][1]
		},
		{
			attackName: params[3][0][2],
			attackDamage:  params[3][1][2]
		},
		{
			attackName: params[3][0][3],
			attackDamage:  params[3][1][3]
		}
	];
	this.pokeWeak = params[4];
}

// if this function return true, the attacks is multiplied by 2
function checkWeakness(you,opponent) {
	if (you.pokeType == opponent.pokeWeak) {
		return true;
	}else {
		return false;
	}
}

Pokemon.prototype.attack = function(n, weakness) {
	if (weakness == true) {
		console.log( this.pokeName + ' duplica ' + this.pokeAttack[n].attackDamage * 2);
		return this.pokeAttack[n].attackDamage * 2;
	}else {
		return this.pokeAttack[n].attackDamage;
	}
}

function turnAttack(you, opponent, posAttack) {
	var weakness = checkWeakness(opponent, you);
	you.pokeLife = you.pokeLife - opponent.attack(posAttack, weakness);
	if (you.pokeLife < 0 ) you.pokeLife = 0;
	console.log(opponent.pokeName + ' ataco con ' + opponent.pokeAttack[posAttack].attackName + ' y hizo ' + opponent.pokeAttack[posAttack].attackDamage);
	console.log(you.pokeName + ' ahora tiene ' + you.pokeLife + ' puntos de vida');
}

Pokemon.prototype.win = function() {
	return this.pokeName + ' ha ganado!!';
}

document.addEventListener("DOMContentLoaded", ready);

function ready() {
	var pokeYour = [
		'Pikachu', 
		110,
		types[0],//tipo
		[
			['Impac Trueno', 'Ataque Rápido', 'Trueno', 'Defensa'],
			[30,10,60,0]
		],
		types[4]//debilidad
	], 
	pokeEnemy = [
		'Blastoise', 
		250,
		types[1],//tipo
		[
			['Surf', 'Rayo Burbuja', 'Defensa', 'Giro Rápido'],
			[90,20,0,30]
		],
		types[0]//debilidad
	],
	yourPoke = new Pokemon(pokeYour),
	enemyPoke = new Pokemon(pokeEnemy),
	ran;

	while(yourPoke.pokeLife > 0 && enemyPoke.pokeLife > 0){
	   	if(turn == 1){
	   		turnAttack(enemyPoke, yourPoke, 2);
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
	console.log('Pikachu: ' + yourPoke.pokeLife);
	console.log('Blastoise: ' + enemyPoke.pokeLife);
}