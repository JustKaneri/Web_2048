var Scope = 0;
var GameMap = [[-1,-1,-1,-1],
			   [-1,-1,-1,-1],
			   [-1,-1,-1,-1],
			   [-1,-1,-1,-1]];


var LbxScope = document.getElementsByClassName('main_ui__label_scope');
var ValueArray = document.getElementsByClassName("game_map__cels-value");
var CelsArray = document.getElementsByClassName("game_map__row-cels");

LbxScope[0].innerHTML = "404";

var ResetBtn = document.getElementsByClassName("main_ui-reset");
ResetBtn.onclick = GetStartValue();


function GetStartValue()
{
	Scope = 0;
	LbxScope[0].innerHTML = Scope;
	ClearGameMap();


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
			console.log(GameMap[rndY][rndX] == 2)
			GameMap[rndY][rndX] =  2;

			var num = 0;

			switch(rndY)
			{
				case 0: 
					num = rndX; 
				break;

				case 1:
					num = 4 + rndX;
				break;

				case 2:
					num = 8 + rndX;
				break;

				case 3:
					num = 12 + rndX;
				break;
			}

			ValueArray[num].innerHTML = 2;
			CelsArray[num].style.background = '#ffff66';
			CelsArray[num].classList.add("anim_move_top");
		}
		else
		{
			z-=1;
		}

		
	}
	
}

function ClearGameMap()
{
	for(var i = 0; i < ValueArray.length; i++)
	{
		ValueArray[i].innerHTML = '';
		CelsArray[i].style.background = '#ffffff';

		/*
		try{
			CelsArray[i].classList.remove("anim_move_top");
		}
		catch
		{
			console.log('not found');
		}
		*/
	}
}


function MoveTop()
{

}


function MoveBottom()
{

}

function MoveLeft() 
{

}

function MoveRight()
{

}