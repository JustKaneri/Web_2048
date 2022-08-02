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
		var color = new Color();

		this.value = 2;
		this.Cels.innerHTML = 2;
		this.Cels.style.background = color.GetColor(this.value);
		void this.Cels.offsetWidth;
		this.Cels.classList.add("anim_spawn");
	}

  	Default(){
		this.IsNew = false;
		this.value = -1;
		this.Cels.innerHTML = '';
		this.Cels.style.background = "#ffffff";
		this.RemoveAnimated();
		
	}

	RemoveAnimated(){
		this.Cels.classList.remove("anim_spawn");
		this.Cels.classList.remove("anim_move_top");
		this.Cels.classList.remove("anim_move_bottom");
		this.Cels.classList.remove("anim_move_left");
		this.Cels.classList.remove("anim_move_right");
		this.Cels.classList.remove("anim_summ");
	}

	Move(direction){
		this.RemoveAnimated();
		void this.Cels.offsetWidth;

		switch(direction){
			case 'Up':
				this.Cels.classList.add("anim_move_top");
			/*
			var animate	= this.Cels.animate([
 						  {transform: 'translate(0)'},
  						  {transform: 'translate(0px, -50%)'},
  						  {transform: 'translate(0px, -119%)'}
						], 50);

			animate.addEventListener('finish', () => {
				this.Default();
			});
			*/

			break;

			case 'Dowm':
				this.Cels.classList.add("anim_move_bottom");	
			break;

			case 'Left':
				this.Cels.classList.add("anim_move_left");
			break ;

			case 'Right':
				this.Cels.classList.add("anim_move_right");
			break;
		}
	}

	Summ(){
		this.RemoveAnimated();
		void this.Cels.offsetWidth;

		this.Cels.classList.add("anim_summ");
	}

	Stand(value)
	{
		var color = new Color();
		this.value = value;
		this.Cels.innerHTML = this.value;
		this.Cels.style.background = color.GetColor(this.value);
		void this.Cels.offsetWidth;
	}

}