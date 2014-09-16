
//-------------------------------------------
// INTERACTIVITY
//-------------------------------------------
function kDown(ev) {

	var code = ev.keyCode;
	//console.log(code);

	if (chosenAttack == 0) {
		if(code == keys.UP) {
			chosenAttack = 0;
		}
	    if(code == keys.DOWN) {
	    	chosenAttack = 2;
	    }
	    if(code == keys.LEFT) {
	    	chosenAttack = 0;
	    }
	    if(code == keys.RIGHT) {
	    	chosenAttack = 1;
	    }
	}

	if (chosenAttack == 1) {
		if(code == keys.UP) {
			chosenAttack = 1;
		}
	    if(code == keys.DOWN) {
	    	chosenAttack = 3;
	    }
	    if(code == keys.LEFT) {
	    	chosenAttack = 0;
	    }
	    if(code == keys.RIGHT) {
	    	chosenAttack = 1;
	    }
	}

	if (chosenAttack == 2) {
		if(code == keys.UP) {
			chosenAttack = 0;
		}
	    if(code == keys.DOWN) {
	    	chosenAttack = 2;
	    }
	    if(code == keys.LEFT) {
	    	chosenAttack = 2;
	    }
	    if(code == keys.RIGHT) {
	    	chosenAttack = 3;
	    }
	}

	if (chosenAttack == 3) {
		if(code == keys.UP) {
			chosenAttack = 1;
		}
	    if(code == keys.DOWN) {
	    	chosenAttack = 3;
	    }
	    if(code == keys.LEFT) {
	    	chosenAttack = 2;
	    }
	    if(code == keys.RIGHT) {
	    	chosenAttack = 3;
	    }
	}

	//display html list attacks
	displayList(chosenAttack);

	//trigger attack
	if(code == keys.ENTER) {
    	//console.log(chosenAttack);
    	attacks(yourPoke, enemyPoke, chosenAttack);
    }
}

//-------------------------------------------
// FUNCIONALITY
//-------------------------------------------

// if this function return true, the attacks is multiplied by 2
function checkWeakness(you,opponent,pos) {
	//if (you.pokeType == opponent.pokeWeak) {
	if (you.pokeAttack[pos].attackType == opponent.pokeWeak) {
		return true;
	}else {
		return false;
	}
}


function turnAttack(you, opponent, posAttack) {
	var weakness = checkWeakness(opponent, you, posAttack);
	you.pokeLife = you.pokeLife - opponent.attack(posAttack, weakness);
	if (you.pokeLife < 0 ) you.pokeLife = 0;
	console.log(you.pokeName + ' ahora tiene ' + you.pokeLife + ' puntos de vida');
}


function attacks(you, opponent, userAttack) {
	var userLife, enemyLife, endAttacks;
		enemyValue = document.querySelector('#enemy .value'),
		youValue = document.querySelector('#you .value');
	
	//user
	attackFX();
	displayTextAttack(you, opponent, userAttack);
	turnAttack(opponent, you, userAttack);
	enemyLife = Math.floor((opponent.pokeLife / enemyMaxLife) * 100);
	enemyValue.style.width = enemyLife + '%';
	colorBarLife(enemyValue, enemyLife);

	// remove listener
	document.removeEventListener("keydown", kDown);

	// check end game
	endAttacks = checkEnd(you, opponent);

	if (endAttacks == false) {
		//enemy
		window.setTimeout(function(){
			ran = Math.floor(Math.random()*4);
			attackFX();
			displayTextAttack(opponent, you, ran);
			turnAttack(you, opponent, ran);
			userLife = Math.floor((you.pokeLife / youMaxLife) * 100);
			youValue.style.width = userLife + '%';
			colorBarLife(youValue, userLife);
			// check end game
			window.setTimeout(function(){
				endAttacks = checkEnd(opponent, you);
			}, 2000);
			if (endAttacks == false) {
				// added linstener again
				document.addEventListener("keydown", kDown);
			}
		}, 2500);
		clearTimeout(window);
	}

	console.log(you.pokeName+ ': ' + you.pokeLife);
	console.log(opponent.pokeName + ': ' + opponent.pokeLife);
}


// show animation attacks
function attackFX() {
	var mainCanvas = document.querySelector('#main');

	mainCanvas.className = 'attackFX';
	mainCanvas.addEventListener("animationend", function() {
		mainCanvas.className = '';
	}, false);
}


// end game
function checkEnd(you, opponent) {
	if(opponent.pokeLife == 0){
		displayWinner(you.win());
		console.log(you.win());
		return true;
	}
	return false;
}


//-------------------------------------------
// GRAPHICS
//-------------------------------------------
// 1. Display html --------------------------

function colorBarLife(bar, life) {
	var colorClass;

	if (life > 70 && life < 100) {
		colorClass = 'good';
	}else if (life > 40 && life < 70) {
		colorClass = 'warning';
	}else {
		colorClass = 'danger';
	}

	// adding class
	bar.className = 'value ' + colorClass; 
}


// show attack text list
function displayList(active) {
	var displayAttacks = document.querySelector('#panel .attacks');
	//delete old list
	displayAttacks.innerHTML = '';
	//display list attacks
    for (var a = 0; a < 4; a++) {
    	(a == active)? act = ' class="active"' : act = '';
    	displayAttacks.innerHTML += '<li' + act + '><b>' + yourPoke.pokeAttack[a].attackName + '</b> <br> Daño: ' + yourPoke.pokeAttack[a].attackDamage + ' <br> Tipo: ' + yourPoke.pokeAttack[a].attackType + '</li>';
    }
}


// show selected attack text
function displayTextAttack(you, opponent, pos) {
	var displayAttacks = document.querySelector('#panel .attacks'),
		alertTextAttack = document.querySelector('#panel .textAttack')
		weakness = checkWeakness(you, opponent, pos);

	displayAttacks.style.display = 'none';
	alertTextAttack.innerHTML = you.pokeName + ' ataco con ' + you.pokeAttack[pos].attackName;
	if(weakness == true) alertTextAttack.innerHTML += ' y Duplica daño por debilidad.'

	window.setTimeout(function(){
		displayAttacks.style.display = 'block';
		alertTextAttack.innerHTML = '';
	}, 2500);
	clearTimeout(window);
}


// show winner text
function displayWinner(winner) {
	var displayAttacks = document.querySelector('#panel .attacks'),
		alertTextAttack = document.querySelector('#panel .textAttack'),
		alertWinner = document.querySelector('#panel .winner');

	document.removeEventListener("keydown", kDown);
	clearTimeout(window);

	displayAttacks.innerHTML = '';
	alertTextAttack.innerHTML = '';
	alertWinner.innerHTML = '<h2>' + winner + '</h2>';
}


// 2. Display canvas --------------------------

function loadIMGCanvas(obj) {
	obj.img = new Image();
    obj.img.src = obj.imgURL;
    obj.img.onload = function() {
    	obj.imgOK = true;
    	draw(obj);
    }
}

function draw(obj,key) {
	if (obj.imgOK) {
		if (obj.graphic == 'background') {
			stage.drawImage(obj.img, 0, 0);
		}
		/*if (obj.graphic == 'textcontent') {
			stage.drawImage(obj.img, 0, 110);
		}*/
		if (obj.graphic == 'enemy') {
			stage.drawImage(obj.img, 140, 10);
		}
		if (obj.graphic == 'user') {
			stage.drawImage(obj.img, 30, 59);
		}
	}
}