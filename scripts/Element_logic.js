class Item{
	constructor(value,x,y){
	 	this.value = value
	 	this.x = x;
	 	this.y = y;
	 	this.Cels = null;
	 	this.IsNew = false;
	}

	GetNumCels(x,y) {
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

	Create(){
		this.value = 2;
		this.Cels.innerHTML = 2;
		this.Cels.style.background = "#FFDB8B";
		void this.Cels.offsetWidth;
		this.Cels.classList.add("anim_spawn");
	}

	Default(){
		this.Cels.innerHTML = '';
		this.Cels.style.background = "#ffffff";
		this.Cels.classList.remove("anim_spawn");
		this.Cels.classList.remove("anim_move_top");
		this.Cels.classList.remove("anim_move_bottom");
		this.Cels.classList.remove("anim_move_left");
		this.Cels.classList.remove("anim_move_right");
	}

}