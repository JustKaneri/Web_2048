var Scope = 0;
var GameMap = [[-1,-1,-1,-1],
			   [-1,-1,-1,-1],
			   [-1,-1,-1,-1],
			   [-1,-1,-1,-1]];

var LbxScope = document.getElementsByClassName('main_ui__label_scope');
var ValueArray = document.getElementsByClassName("game_map__cels-value");
var ResetBtn = document.getElementsByClassName("main_ui-reset");

ResetBtn.onclick = GetStartValue();

document.addEventListener('keyup', function(event){

	var IsMove = false;

    switch(event.key)
    {
    	case 'ArrowUp':
    		DeleteAnimationClass('anim_move_top');
    	 	IsMove = MoveTop();
    	break;

    	case 'ArrowDown':
    		DeleteAnimationClass('anim_move_bottom');
    		IsMove = MoveBottom();
    	break;

    	case 'ArrowLeft':
    		DeleteAnimationClass('anim_move_left')
    		IsMove = MoveLeft();
    	break;

    	case 'ArrowRight':
    		DeleteAnimationClass('anim_move_right')
    		IsMove = MoveRight();
    	break;
    }

    
    
});

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


function GetStartValue()
{
	Scope = 0;
	LbxScope[0].innerHTML = Scope;
	ClearGameMap();
	DeleteAnimationClass('anim_spawn')


	for (var i = GameMap.length - 1; i >= 0; i--) {
		for (var j = 0; j < 4; j++) {
			GameMap[i][j] = -1;
		}
	}

	for (var z = 0; z < 2; z++) {
		var rndX = Math.floor(Math.random()*4);
		var rndY = Math.floor(Math.random()*4);

		if(GameMap[rndY][rndX] != 2)
		{
			GameMap[rndY][rndX] =  2;

			var num = GetNumCells(rndX,rndY);

			console.log('класс добавлен: '+num)
			ValueArray[num].innerHTML = 2;
			ValueArray[num].style.background = GetColor(2);
			void ValueArray[num].offsetWidth;
			ValueArray[num].classList.add("anim_spawn");
		}
		else
		{
			z-=1;
		}
	}

}

function Spawn()
{
	var NotCreate = true;

	DeleteAnimationClass('anim_spawn')

	while(NotCreate){

		var rndX = Math.floor(Math.random()*4);
		var rndY = Math.floor(Math.random()*4);

		if(GameMap[rndY][rndX] == -1)
		{
			GameMap[rndY][rndX] =  2;

			var num = GetNumCells(rndX,rndY);

			console.log('класс добавлен: '+num)
			ValueArray[num].innerHTML = 2;
			ValueArray[num].style.background = GetColor(2);
			void ValueArray[num].offsetWidth;
			ValueArray[num].classList.add("anim_spawn");
			

			NotCreate = false;
		}
	}
}

function ClearGameMap()
{
	for(var i = 0; i < ValueArray.length; i++)
	{
		ValueArray[i].innerHTML = '';
		ValueArray[i].style.background = GetColor(-1);
	}
}

function DeleteAnimationClass(nameClass)
{
	for(var i = 0; i < ValueArray.length; i++)
	{
		if(ValueArray[i].classList.contains(nameClass))
		{
			console.log('класс удален: '+ i);
			try{
				ValueArray[i].classList.remove(nameClass);
			}
			catch
			{
				console.log('not found');
			}
		}
	}

	console.log('__________________________');	
}

function GetNumCells(x,y)
{
	var num = 0;

	switch(y)
	{
		case 0: 
			num = x; 
		break;

		case 1:
			num = 4 + x;
		break;

		case 2:
			num = 8 + x;
		break;

		case 3:
			num = 12 + x;
		break;
	}

	return num;
}

function ClearIsNew()
{
	for(var row = 0; row < 4; row++){
		for(var column = 0; column < 4; column++){
			GameMapSum[row][column] = false;
		}
	}
}


async function MoveTop(){
	for(var col = 0; col < 4; col++){
		var OneColm = GameMap.map(function(value,index){
			if(value[col] > -1) return value[col];
		});

		if(OneColm.filter(function(value,index){return value != undefined;}).length == 0){
			continue;
		}

		for(var row = 1; row < 3 ; row++){
			
			OneColm = OneColm.filter(function(value,index){return value > -1});

			OneColm = SummValue(OneColm,row);

			OneColm = AddValueOnColumn(OneColm);
		}

		OneColm = OneColm.filter(function(value,index){return value > -1});
		OneColm = AddValueOnColumn(OneColm);

		for(var r = 0; r < 4; r ++){
			GameMap[r][col] = OneColm[r];
		}

		UpdateMapUI(OneColm,col,row);
	}
}

function AddValueOnColumn(OneColm){
	while(OneColm.length != 4){
		OneColm.push(-1);
	}

	return OneColm;
}

function SummValue(OneColm, index){

	if(OneColm[index] == OneColm[index-1]){
		OneColm[index-1] = OneColm[index]*2;
		OneColm[index] = -1;
	}

	return OneColm;
}

async function UpdateMapUI(array,column,row,anim_name)
{
	var num	= GetNumCells(column,row);
	ValueArray[num].innerHTML = GameMap[row][column];
	ValueArray[num].style.background = GetColor(GameMap[row][column]);
	void ValueArray[num].offsetWidth;

	await new Promise(r => setTimeout(r, 20));
	GameMap[row][column] = -1;

	var oldNum = GetNumCells(column,row);
	void ValueArray[oldNum].offsetWidth;
	ValueArray[oldNum].classList.add(anim_name);
	ValueArray[oldNum].innerHTML = '';
	ValueArray[oldNum].style.background = GetColor(-1); 
}


/*
async function MoveTop()
{	
	ClearIsNew();
	DeleteAnimationClass('anim_spawn')
	var IsMove = false;

	for(var row = 1; row < 4; row++){
		for(var column = 0; column < 4; column++){
			if(GameMap[row][column] == -1){
				continue;
			}

			var i = row;
			while(i != 0){
				if(GameMap[i-1][column] == -1){
					GameMap[i-1][column] = GameMap[i][column];

				    var num	= GetNumCells(column,i-1);

					ValueArray[num].innerHTML = GameMap[i][column];
					ValueArray[num].style.background = GetColor(GameMap[i][column]);
					void ValueArray[num].offsetWidth;

					await new Promise(r => setTimeout(r, 20));
					GameMap[i][column] = -1;

					var oldNum = GetNumCells(column,i);
					ValueArray[oldNum].innerHTML = '';
					ValueArray[oldNum].style.background = GetColor(-1);
					

					IsMove = true;
				}

				if(GameMap[i-1][column] > -1){
					if(GameMap[i-1][column] == GameMap[i][column]){
						if(GameMapSum[i-1][column] == false){
							Scope += GameMap[i][column]*2;
							LbxScope[0].innerHTML = Scope;

							GameMap[i-1][column] = GameMap[i-1][column] * 2;
							GameMapSum[i-1][column] = true;
				   			var num = GetNumCells(column,i-1);

							ValueArray[num].innerHTML = GameMap[i-1][column];
							ValueArray[num].style.background = GetColor(GameMap[i-1][column]);
							void ValueArray[num].offsetWidth;

							await new Promise(r => setTimeout(r, 20));
							GameMap[i][column] = -1;

							var oldNum = GetNumCells(column,i);
							void ValueArray[oldNum].offsetWidth;
							ValueArray[oldNum].classList.add('anim_move_top');
							ValueArray[oldNum].innerHTML = '';
							ValueArray[oldNum].style.background = GetColor(-1); 
							
							
							IsMove = true;

							
						}
					}
				}
				i--;
			}	
		}
	}

	if(IsMove){
    	Spawn();
    }

	return IsMove;
}
*/


async function MoveBottom()
{
	ClearIsNew();
	DeleteAnimationClass('anim_spawn')
	var IsMove = false;

	for(var row = 2; row >= 0; row--){
		for(var column = 0; column < 4; column++){
			if(GameMap[row][column] == -1){
				continue;
			}

			var i = row;
			while(i != 3){
				if(GameMap[i+1][column] == -1){
					GameMap[i+1][column] = GameMap[i][column];

				    var num	= GetNumCells(column,i+1);

					ValueArray[num].innerHTML = GameMap[i][column];
					ValueArray[num].style.background = GetColor(GameMap[i][column]);
					void ValueArray[num].offsetWidth;

					await new Promise(r => setTimeout(r, 20));
					GameMap[i][column] = -1;

					var oldNum = GetNumCells(column,i);
					ValueArray[oldNum].innerHTML = '';
					ValueArray[oldNum].style.background = GetColor(-1);

					IsMove = true;
				}

				if(GameMap[i+1][column] > -1){
					if(GameMap[i+1][column] == GameMap[i][column]){
						if(GameMapSum[i+1][column] == false){
							Scope += GameMap[i][column]*2;
							LbxScope[0].innerHTML = Scope;

							GameMap[i+1][column] = GameMap[i+1][column] * 2;
							GameMapSum[i+1][column] = true;
				   			var num = GetNumCells(column,i+1);

							ValueArray[num].innerHTML = GameMap[i+1][column];
							ValueArray[num].style.background = GetColor(GameMap[i+1][column]);
							void ValueArray[num].offsetWidth;

							await new Promise(r => setTimeout(r, 20));
							GameMap[i][column] = -1;

							var oldNum = GetNumCells(column,i);
							void ValueArray[oldNum].offsetWidth;
							ValueArray[oldNum].classList.add('anim_move_bottom');
							ValueArray[oldNum].innerHTML = '';
							ValueArray[oldNum].style.background = GetColor(-1); 
							
							IsMove = true;
						}
					}
				}

				i++;
			}	
		}
	}

	if(IsMove){
    	Spawn();
    }
}

async function MoveLeft() 
{
	ClearIsNew();
	DeleteAnimationClass('anim_spawn')
	var IsMove = false;

	for(var row = 0; row < 4; row++){
		for(var column = 1; column < 4; column++){
			if(GameMap[row][column] == -1){
				continue;
			}

			var i = column;
			while(i != 0){
				if(GameMap[row][i-1] == -1){
					GameMap[row][i-1] = GameMap[row][i];

				    var num	= GetNumCells(i-1,row);

					ValueArray[num].innerHTML = GameMap[row][i];
					ValueArray[num].style.background = GetColor(GameMap[row][i]);
					void ValueArray[num].offsetWidth;

					await new Promise(r => setTimeout(r, 20));
					GameMap[row][i] = -1;

					var oldNum = GetNumCells(i,row);
					ValueArray[oldNum].innerHTML = '';
					ValueArray[oldNum].style.background = GetColor(-1);

					IsMove = true;
				}
				
				if(GameMap[row][i-1] > -1){
					if(GameMap[row][i-1] == GameMap[row][i]){
						if(GameMapSum[row][i-1] == false){
							Scope += GameMap[row][i]*2;
							LbxScope[0].innerHTML = Scope;

							GameMap[row][i-1] = GameMap[row][i-1] * 2;
							GameMapSum[row][i-1] = true;
				   			var num = GetNumCells(i-1,row);

							ValueArray[num].innerHTML = GameMap[row][i-1];
							ValueArray[num].style.background = GetColor(GameMap[row][i-1]);
							void ValueArray[num].offsetWidth;

							await new Promise(r => setTimeout(r, 20));
							GameMap[row][i] = -1;

							var oldNum = GetNumCells(i,row);
							void ValueArray[oldNum].offsetWidth;
							ValueArray[oldNum].classList.add('anim_move_left');
							ValueArray[oldNum].innerHTML = '';
							ValueArray[oldNum].style.background = GetColor(-1); 
							
							IsMove = true;
						}
					}
				}
				i--;
			}	
		}
	}

	if(IsMove){
    	Spawn();
    }
}

async function MoveRight()
{
	ClearIsNew();
	DeleteAnimationClass('anim_spawn')
	var IsMove = false;

	for(var row = 0; row < 4; row++){
		for(var column = 2; column >= 0; column--){
			if(GameMap[row][column] == -1){
				continue;
			}

			var i = column;
			while(i != 3){
				if(GameMap[row][i+1] == -1){
					GameMap[row][i+1] = GameMap[row][i];

				    var num	= GetNumCells(i+1,row);

					ValueArray[num].innerHTML = GameMap[row][i];
					ValueArray[num].style.background = GetColor(GameMap[row][i]);
					void ValueArray[num].offsetWidth;

					await new Promise(r => setTimeout(r, 20));
					GameMap[row][i] = -1;

					var oldNum = GetNumCells(i,row);
					ValueArray[oldNum].innerHTML = '';
					ValueArray[oldNum].style.background = GetColor(-1);

					IsMove = true;
				}
				
				if(GameMap[row][i+1] > -1){
					if(GameMap[row][i+1] == GameMap[row][i]){
						if(GameMapSum[row][i+1] == false){
							Scope += GameMap[row][i]*2;
							LbxScope[0].innerHTML = Scope;

							GameMap[row][i+1] = GameMap[row][i] * 2;
							GameMapSum[row][i+1] = true;
				   			var num = GetNumCells(i+1,row);

							ValueArray[num].innerHTML = GameMap[row][i+1];
							ValueArray[num].style.background = GetColor(GameMap[row][i+1]);
							void ValueArray[num].offsetWidth;

							await new Promise(r => setTimeout(r, 20));
							GameMap[row][i] = -1;

							var oldNum = GetNumCells(i,row);
							void ValueArray[oldNum].offsetWidth;
							ValueArray[oldNum].classList.add('anim_move_right');
							ValueArray[oldNum].innerHTML = '';
							ValueArray[oldNum].style.background = GetColor(-1); 
							
							IsMove = true;
						}
					}
				}
				
				i++;
			}	
		}
	}

	if(IsMove){
    	Spawn();
    }
}


function GetColor(value)
{
	switch(value)
	{
		case -1:
			return '#ffffff';
		break;

		case 2:
			return '#ffff66';
		break;

		case 4:
			return '#f4f276';
		break;

		case 8:
			return '#e8e584';
		break;

		case 16:
			return '#dcd891';
		break;

		case 32:
			return '#cfcc9d';
		break;

		case 64:
			return '#c2bfa8';
		break;

		case 128:
			return '#b3b3b3';
		break;

		case 256:
			return '#caf2b7';
		break;

		case 512:
			return '#b2eed0';
		break;

		case 1024:
			return '#93eae7';
		break;

		case 2048:
			return '#66e6ff';
		break;

	}
}