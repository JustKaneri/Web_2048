var GameMap = null;
var scopeManager = new ScopeManager(0);
var ResetBtn = document.getElementsByClassName("main_ui-reset");
var ContBtn = document.getElementsByClassName("game_win__button-continue");
var RestartBtn = document.getElementsByClassName("game_end__button-restart");
var AllCels = document.getElementsByClassName("game_map__cels-value");
var DisplayWin = document.getElementsByClassName("game_win");
var DisplayLose = document.getElementsByClassName("game_lose");
var Game = document.getElementsByClassName("game");
var IsPressKey = false;
var IsMove = false;
var IsDisplayShow = false;
var IsWin = false;
var IsContinue = false;
var touchStart = null; 
var touchPosition = null; 

Game[0].addEventListener('touchstart', TouchStart,false);
Game[0].addEventListener('touchmove', TouchMove,false);
Game[0].addEventListener('touchend', TouchEnd,false);

function TouchStart(e)
{
	e.preventDefault();
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
}

function TouchMove(e)
{
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };

}

function TouchEnd(e){

  	var x =  touchStart.x - touchPosition.x
  	var y = touchStart.y - touchPosition.y;

  	if(IsPressKey == false && IsDisplayShow == false){

		IsPressKey = true;


	  	if(x > 50){
	  		MoveLeft();
	  	}
	  	else
	  	if(x < -50){
	  		MoveRight();
	  	}
	  	else
	  	if(y > 50){
	  		MoveUp();
	  	}
	  	else
	  	if(y < -50){
	  		MoveBottom();
	  	}
	  	else{
	  		IsPressKey = false;
	  	}

	}
}


window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

ResetBtn.onclick = Start();
ContBtn.onclick = Continue();
RestartBtn.onclick = Start();

function Start(){

	DisplayLose[0].style.opacity = 0;
	DisplayWin[0].style.opacity = 0;
	IsDisplayShow = false;
	IsWin = false;
	IsContinue = false;

	GameMap = new Array();
	scopeManager = new ScopeManager(0);
	IsPressKey = false;

	for(let r = 0; r < 4; r++){
		var oneRow = new Array();
		for(let c = 0; c < 4; c++){
			var item = new Item(-1,c,r);
			item.Cels = AllCels[item.GetNumCels(item.x,item.y)];
			item.Default();
			oneRow.push(item);
		}
		GameMap.push(oneRow);
	}

	Spawn(2);
}

function Continue(){

	DisplayWin[0].style.zIndex = "0";
	DisplayWin[0].style.opacity = 0;
	IsDisplayShow = false;
	IsContinue = true;
}

function ShowWinDisplay(){

	if(IsContinue){
		return;
	}

	DisplayWin[0].style.zIndex = "10";
	DisplayWin[0].style.opacity = 1;
	IsDisplayShow = true;
}

function ShowLoseDisplay(){

	DisplayLose[0].style.zIndex = "10";
	DisplayLose[0].style.opacity = 1;
	IsDisplayShow = true;
}

function Spawn(count){

	for(var i = 0; i < count; i++){
		var rndX = Math.floor(Math.random()*4);
		var rndY = Math.floor(Math.random()*4);

		if(GameMap[rndY][rndX].value == -1){
			GameMap[rndY][rndX].Create();
		}
		else{
			i--;
		}
	}
}

document.addEventListener('keyup', function(event){

	if(IsPressKey == false && IsDisplayShow == false){

		IsPressKey = true;

		switch(event.key)
    	{
    		case 'ArrowUp':
    			MoveUp();
    		break;

    		case 'ArrowDown':
    			MoveBottom();
    		break;

    		case 'ArrowLeft':
    			MoveLeft();
    		break;

    		case 'ArrowRight':
    			MoveRight();
    		break;
    	} 
	}   
});


function ChangeStatusItem(){
	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			GameMap[r][c].IsNew = false;
		}
	}
}

function CheckedFailde(){

	var FreeSpace = false;

	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			if(GameMap[r][c].value == -1){
				FreeSpace = true;
				break;
			}
		}
	}

	if(FreeSpace == false){

		var IsCanMove = false;

		for(let r = 1; r < 3; r++){
			for(let c = 1; c < 3; c++){
				if(GameMap[r][c] == GameMap[r-1][c] || 
				   GameMap[r][c] == GameMap[r+1][c] ||
				   GameMap[r][c] == GameMap[r][c-1] ||
				   GameMap[r][c] == GameMap[r][c+1]){

				   	IsCanMove = true;
				}
			}
		}

		if(IsCanMove == false){
			ShowLoseDisplay();
		}
	}	

}

async function MoveUp(){
	ChangeStatusItem();

	IsMove = false;

	for(var col = 0; col < 4; col++){
		var oneRow = GameMap.map(function(value,index){return value[col]});
		SubMoveTop(oneRow)
	}

	await new Promise(r => setTimeout(r,400));

	if(IsMove){
		Spawn(1);
	}

	if(IsWin){
		ShowWinDisplay();
	}

	IsPressKey = false;

	CheckedFailde();   
}

async function SubMoveTop(oneRow){
	for(var row = 1; row < 4; row++){
			if(oneRow[row].value == -1){
				continue;
			}
			var st = row;
			
			while(st != 0){
			if(oneRow[st-1].value == -1){
				oneRow[st].Move('Up');
				await new Promise(r => setTimeout(r,50));
				oneRow[st-1].Stand(oneRow[st].value);
				//await new Promise(r => setTimeout(r,35));
				oneRow[st].Default();
				IsMove = true;
				}
				
				if(oneRow[st-1].value == oneRow[st].value
		 		&& oneRow[st-1].IsNew == false && oneRow[st].IsNew == false) {
					oneRow[st].Move('Up');
					await new Promise(r => setTimeout(r,50));
					oneRow[st-1].Stand(oneRow[st].value*2);
					scopeManager.Update(oneRow[st-1].value);
					oneRow[st-1].IsNew = true;
					oneRow[st-1].Summ();
					//await new Promise(r => setTimeout(r, 35));
					oneRow[st].Default();
					IsMove = true;

					if(oneRow[st-1].value == 2048){
						IsWin = true;
					}
				}	
			st--;
		}
	}
}

async function MoveBottom(){

	IsMove = false;
	ChangeStatusItem();

	for(var col = 0; col < 4; col++){
		var oneRow = GameMap.map(function(value,index){return value[col]});
		SubMoveBottom(oneRow);
	}

	await new Promise(r => setTimeout(r,400));

	if(IsMove){
		Spawn(1);
	}

	if(IsWin){
		ShowWinDisplay();
	}

	IsPressKey = false;

	CheckedFailde();   
}

async function SubMoveBottom(oneRow){
	for(var row = 2; row >= 0; row--){
		if(oneRow[row].value == -1){
			continue;
		}
		var st = row;
		while(st != 3){
			if(oneRow[st+1].value == -1){
				oneRow[st].Move('Dowm');
				await new Promise(r => setTimeout(r,50));
				oneRow[st+1].Stand(oneRow[st].value);
				oneRow[st].Default();
				IsMove = true;
			}
			if(oneRow[st+1].value == oneRow[st].value
			   && oneRow[st+1].IsNew == false && oneRow[st].IsNew == false) {
				oneRow[st].Move('Dowm');
				await new Promise(r => setTimeout(r,50));
				oneRow[st+1].Stand(oneRow[st].value*2);
				scopeManager.Update(oneRow[st+1].value);
				oneRow[st+1].IsNew = true;
				oneRow[st+1].Summ();
				oneRow[st].Default();
				IsMove = true;

				if(oneRow[st+1].value == 2048){
						IsWin = true;
					}
			}

			st++;
		}
		//await new Promise(r => setTimeout(r,10));
	}
}

async function MoveLeft(){

	IsMove = false;
	ChangeStatusItem();

	for(var row = 0; row < 4; row++){
		var oneRow = GameMap[row];
		SubMoveLeft(oneRow);
	}

	await new Promise(r => setTimeout(r,400));

	if(IsMove){
		Spawn(1);
	}

	if(IsWin){
		ShowWinDisplay();
	}

	IsPressKey = false;

	CheckedFailde();   
}

async function SubMoveLeft(oneRow){
	for(var col = 1; col < 4; col++){
			if(oneRow[col].value == -1){
				continue;
			}
			var st = col;
			while(st != 0){
				if(oneRow[st-1].value == -1){
					oneRow[st].Move('Left');
					await new Promise(r => setTimeout(r,50));
					oneRow[st-1].Stand(oneRow[st].value);
					oneRow[st].Default();
					IsMove = true;
				}
				
			if(oneRow[st-1].value == oneRow[st].value
				   && oneRow[st-1].IsNew == false && oneRow[st].IsNew == false) {
					oneRow[st].Move('Left');
					await new Promise(r => setTimeout(r,50));
					oneRow[st-1].Stand(oneRow[st].value*2);
					scopeManager.Update(oneRow[st-1].value);
					oneRow[st-1].IsNew = true;
					oneRow[st-1].Summ();
					oneRow[st].Default();
					IsMove = true;


					if(oneRow[st-1].value == 2048){
						IsWin = true;
					}
			}
				
				
				st--;
			}
		}	
}

async function MoveRight(){

	IsMove = false;
	ChangeStatusItem();

	for(var row = 0; row < 4; row++){
		var oneRow = GameMap[row];
		SubMoveRight(oneRow);
	}

	await new Promise(r => setTimeout(r,250));

	if(IsMove){
		Spawn(1);
	}

	if(IsWin){
		ShowWinDisplay();
	}

	IsPressKey = false;

	CheckedFailde();   
}

async function SubMoveRight(oneRow){
	for(var col = 2; col >= 0; col--){
			if(oneRow[col].value == -1){
				continue;
			}
			var st = col;
			while(st != 3){
				if(oneRow[st+1].value == -1){
					oneRow[st].Move('Right');
					await new Promise(r => setTimeout(r,50));
					oneRow[st+1].Stand(oneRow[st].value);
					oneRow[st].Default();
					IsMove = true;
				}
				
				if(oneRow[st+1].value == oneRow[st].value
				   && oneRow[st+1].IsNew == false && oneRow[st].IsNew == false) {
					oneRow[st].Move('Right');
					await new Promise(r => setTimeout(r,50));
					oneRow[st+1].Stand(oneRow[st].value*2);
					scopeManager.Update(oneRow[st+1].value);
					oneRow[st+1].IsNew = true;
					oneRow[st+1].Summ();
					oneRow[st].Default();
					IsMove = true;


					if(oneRow[st+1].value == 2048){
						IsWin = true;
					}
				}
				
				
				st++;
			}
		}
}