var GameMap = null;
var scopeManager = new ScopeManager(0);
var ResetBtn = document.getElementsByClassName("main_ui-reset");
var AllCels = document.getElementsByClassName("game_map__cels-value");

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

ResetBtn.onclick = Start();

function Start(){

	GameMap = new Array();
	scopeManager = new ScopeManager(0);

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

    switch(event.key)
    {
    	case 'ArrowUp':
    		MoveUp();
    	break;

    	case 'ArrowDown':
    	break;

    	case 'ArrowLeft':
    	break;

    	case 'ArrowRight':
    	break;
    }    
});


function ChangeStatusItem(){
	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			GameMap[r][c].IsNew = false;
		}
	}
}

async function MoveUp(){

	var IsMove = false;
	ChangeStatusItem();

	for(var col = 0; col < 4; col++){
		var oneRow = GameMap.map(function(value,index){return value[col]});
		for(var row = 1; row < 4; row++){
			if(oneRow[row].value == -1){
				continue;
			}
			var st = row;
			while(st != 0){
				if(oneRow[st-1].value == -1){
					oneRow[st].Move('Up');
					await new Promise(r => setTimeout(r, 40));
					oneRow[st-1].Stand(oneRow[st].value);
					oneRow[st].Default();
					IsMove = true;
				}
				if(oneRow[st-1].value == oneRow[st].value
				   && oneRow[st-1].IsNew == false && oneRow[st].IsNew == false) {
					oneRow[st].Move('Up');
					await new Promise(r => setTimeout(r, 40));
					oneRow[st-1].Stand(oneRow[st].value*2);
					scopeManager.Update(oneRow[st-1].value);
					oneRow[st-1].IsNew = true;
					oneRow[st-1].Summ();
					oneRow[st].Default();
					IsMove = true;
				}

				st--;
			}
		}
	}

	if(IsMove){
		Spawn(1);
	}
}