
var Pokemon = function(params) {
	this.pokeName = params[0];
	this.pokeLife = params[1];
	this.pokeType = params[2];
	this.pokeAttack = [
		{
			attackName: params[3][0][0],
			attackDamage: params[3][1][0],
			attackMax: params[3][2][0],
			attackType: params[3][3][0]
		},
		{
			attackName: params[3][0][1],
			attackDamage:  params[3][1][1],
			attackMax: params[3][2][1],
			attackType: params[3][3][1]
		},
		{
			attackName: params[3][0][2],
			attackDamage:  params[3][1][2],
			attackMax: params[3][2][2],
			attackType: params[3][3][2]
		},
		{
			attackName: params[3][0][3],
			attackDamage:  params[3][1][3],
			attackMax: params[3][2][3],
			attackType: params[3][3][3]
		}
	];
	this.pokeWeak = params[4];
	this.imgURL = params[5];
	this.graphic = params[6];
	this.imgOk = false;
}

Pokemon.prototype.attack = function(n, weakness) {
	if (weakness == true) {
		console.log(this.pokeName + ' ataco con ' + this.pokeAttack[n].attackName + ' y duplica, hizo ' + this.pokeAttack[n].attackDamage * 2);
		return this.pokeAttack[n].attackDamage * 2;
	}else {
		console.log(this.pokeName + ' ataco con ' + this.pokeAttack[n].attackName + ' y hizo ' + this.pokeAttack[n].attackDamage);
		return this.pokeAttack[n].attackDamage;
	}
}

Pokemon.prototype.win = function() {
	return this.pokeName + ' ha ganado!!';
}