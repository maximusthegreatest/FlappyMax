$(document).ready(function(){
	
	//saving dom objects to vars
	var container = $('#container');
	var bird = $('#bird');
	var pole = $('.pole');
	var pole_1 = $('#pole_1');
	var pole_2 = $('#pole_2');
	var score = $('#score');
	var restart_btn = $("#restart_btn");


	//saving some initial values
	var container_width = parseInt(container.width());
	var container_height = parseInt(container.height());
	var pole_initial_pos = parseInt(pole.css('right'));
	var pole_initial_height = parseInt(pole.css('height'));
	console.log(pole_initial_height);
	var bird_left = parseInt(bird.css('left'));
	var bird_height = parseInt(bird.height());
	console.log(bird_height);
	var speed = 10;

	//some other declarations
	var go_up = false;
	var score_updated = false;
	var gameOver = false;

	var the_game = setInterval(function(){
		if(collision(bird, pole_1) || collision(bird, pole_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) 
			> container_height - bird_height) {
			stopGame();

		} else {

		

		var pole_current_pos = parseInt(pole.css('right'));

		//update score 
		
		if(pole_current_pos > container_width - bird_left) {
			if(score_updated === false) {
				var newScore = parseInt(score.text()) + 1;
				score.text(newScore);
				score_updated = true;
			}
		}

		//check if poles left container
		if(pole_current_pos > container_width) {

			var new_height = parseInt(Math.random() * 100);

			//change the poles height
			pole_1.css('height', pole_initial_height + new_height);
			pole_2.css('height', pole_initial_height - new_height);
			console.log(pole_1.css('height'));
			console.log(pole_2.css('height'));
			
			score_updated = false;
			pole_current_pos = pole_initial_pos;

			//increase speed
			speed = speed + 3;

		}

		//move the poles
		pole.css('right', pole_current_pos + speed);

		if(go_up === false) {
			go_down();
		}
	}

	}, 40);

$(document).on("keydown", function(e){
	var key = e.keyCode;
	if(key === 32 && gameOver === false && go_up === false) {
		go_up = setInterval(up, 50);
	}
});

$(document).on("keyup", function(e){
	var key = e.keyCode;
	if(key === 32 && gameOver === false) {
		clearInterval(go_up);
		go_up = false;
		
	}
});


function go_down() {
	bird.css('top', parseInt(bird.css('top')) + 15);
}

function up() {
	bird.css('top', parseInt(bird.css('top')) - 15);
}

function collision($div1, $div2) {
	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var h1 = $div1.outerHeight(true);
	var w1 = $div1.outerWidth(true);
	var b1 = y1 + h1; 
	var r1 = x1 + w1;

	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top; 
	var h2 = $div2.outerHeight(true);
	var w2 = $div2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;

	if(b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
		return false;
	} else {
		return true;
	}
}

function stopGame() {
	clearInterval(the_game);
	restart_btn.fadeToggle(200);
	gameOver = true;
}

$(restart_btn).on("click", function(){
	location.reload();
});

});