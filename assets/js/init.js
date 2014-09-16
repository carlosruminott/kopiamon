
document.addEventListener("DOMContentLoaded", ready);

function ready() {

	var imgToDraw = [backGround,yourPoke,enemyPoke],
		count = imgToDraw.length, 
		canvas = document.getElementById('main'),
		enemyNametxt = document.querySelector('#enemy p'),
		youNametxt = document.querySelector('#you p'),
		enemyValue = document.querySelector('#enemy .value'),
		youValue = document.querySelector('#you .value');


	//-------------------------------------------
	// DEFAULT VISIBLE CONTENT
	//-------------------------------------------
	//text, styles and graphic
	enemyNametxt.innerHTML = enemyPoke.pokeName;
	youNametxt.innerHTML = yourPoke.pokeName;
	enemyNametxt.innerHTML = enemyPoke.pokeName;
	youNametxt.innerHTML = yourPoke.pokeName;
	enemyValue.style.width='100%';
	youValue.style.width='100%';
    //canvas
    stage = canvas.getContext("2d");
    stage.canvas.height = 109;
    stage.canvas.width = 240;
    //load images
    for (var i = 0; i < count; i++) {
    	loadIMGCanvas(imgToDraw[i]);
    }
    //display html list attacks
    displayList(chosenAttack);


    //-------------------------------------------
	// INTERACTIVITY
	//-------------------------------------------
	document.addEventListener("keydown", kDown);
}