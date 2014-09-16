//-------------------------------------------
// CHARACTERS
//-------------------------------------------
var types = ['Eléctrico', 'Agua', 'Fuego', 'Hoja', 'Tierra', 'Pelea', 'Oscuro', 'Hielo', 'Volador', 'Psyquico', 'Normal'];

var stPokeYour = [
		'Pikachu', 
		110,
		types[0],//type of pokemon
		[
			['Impactrueno', 'Ataque Rápido', 'Rayo', 'Pantalla Luz'],
			[40,40,90,0],
			[2,10,2,2],
			[types[0],types[10],types[0],types[10]]
		],
		types[4],//weakness
		'assets/sprites/pikachu.png',
		'user'
	];

var stPokeEnemy = [
		'Blastoise', 
		250,
		types[1],//type of pokemon
		[
			['Surf', 'Burbuja', 'Pistola Agua', 'Giro Rápido'],
			[90,10,40,30],
			[1,5,2,2],
			[types[2],types[2],types[2],types[10]]
		],
		types[0],//weakness
		'assets/sprites/blastoise.png',
		'enemy'
	];


//-------------------------------------------
// GRAPHICS
//-------------------------------------------
var backGround = {
    imgURL: "assets/sprites/stage.png",
    imgOK: false,
    graphic: 'background'
};
/*var contentText = {
    imgURL: "assets/sprites/text-content.png",
    imgOK: false,
    graphic: 'textcontent'
};*/


//-------------------------------------------
// FUNCIONALITY
//-------------------------------------------
var yourPoke = new Pokemon(stPokeYour),
	enemyPoke = new Pokemon(stPokeEnemy),
	youMaxLife = yourPoke.pokeLife,
	enemyMaxLife = enemyPoke.pokeLife,
	chosenAttack = 0,
	stage,
	keys = {
	    UP: 38,
	    DOWN: 40,
	    LEFT: 37,
	    RIGHT: 39,
	    ENTER: 13
	};