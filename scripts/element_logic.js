class Item{
	constructor(value,x,y){
	 	this.value = value
	 	this.x = x;
	 	this.y = y;
	 	this.Cels = null;
	 	this.IsNew = false;

	 	this.newX = -1;
	 	this.newY = -1;
	 	this.newValue = -1;
	 	this.newItem = null;
	 	this.IsPurpose = false;
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
		this.IsPurpose = false;
		this.value = -1;
		this.Cels.innerHTML = '';
		this.Cels.style.background = "#ffffff";
		this.RemoveAnimated();
	}

	Clear(){
		this.Cels.innerHTML = '';
		this.Cels.style.background = "#ffffff";
		this.RemoveAnimated();
		this.newX = -1;
	 	this.newY = -1;
	 	this.newValue = -1;
	 	this.newItem = null;
	}

	RemoveAnimated(){
		this.Cels.classList.remove("anim_spawn");
		this.Cels.classList.remove("anim_move_top");
		this.Cels.classList.remove("anim_move_bottom");
		this.Cels.classList.remove("anim_move_left");
		this.Cels.classList.remove("anim_move_right");
		this.Cels.classList.remove("anim_summ");
		this.Cels.classList.remove("anim_visable");
	}

	/*
	Move(direction){
		this.RemoveAnimated();
		void this.Cels.offsetWidth;

		switch(direction){
			case 'Up':

				//this.Cels.classList.add("anim_move_top");
			var animate	= this.Cels.animate([
 						  {transform: 'translate(0)'},
  						  {transform: 'translate(0px, -50%)'},
  						  {transform: 'translate(0px, -120%)'}
						], 300);

			animate.addEventListener('finish', () => {
				this.Default();
			});
			

			break;

			case 'Dowm':
				this.Cels.classList.add("anim_move_bottom");	
			break;

			case 'Left':
			break ;

			case 'Right':
			break;
		}
	}
	*/
	/*
	Move(){	

		var toX = ((this.newX - this.x) * 119);
		var toY = ((this.newY - this.y) * 119);

		var animate	= this.Cels.animate([
 						  {transform: 'translate(0)'},
  						  {transform: 'translate(0px,'+toY+'%)'},
  						  {transform: 'translate(0px,'+toY+'%)'}
						], 300);

		animate.addEventListener('finish', () => {
				if(this.newValue > 0){
					this.newItem.Stand(this.newValue);
					this.newItem.Summ();
				}
				else{
					try{
						this.newItem.Stand(this.newItem.value);
					}
					catch{
						console.log('Error ' + this.newItem );
					}
					
				}
				
				if(this.IsPurpose == false){
					this.Default();
				}
		});
	}
	*/

	MoveUp(){	

		var animate	= this.Cels.animate([
 						  {transform: 'translate(0)'},
 						  {opacity: '0.4'},
  						  {transform: 'translate(0px,-119%)'},
  						  {transform: 'translate(0px,-119%)'},
  						  {opacity: '0'}
						], 200);

		animate.addEventListener('finish', () => {
			this.Clear();
			this.Default();
		});
	}

	MoveBottom(){	

		var animate	= this.Cels.animate([
 						  {transform: 'translate(0)'},
 						  {opacity: '0.4'},
  						  {transform: 'translate(0px,119%)'},
  						  {transform: 'translate(0px,119%)'},
  						  {opacity: '0'}
						], 200);

		animate.addEventListener('finish', () => {
			this.Clear();
			this.Default();
		});
	}

	TransformPos(y,x,item,value){
		this.newX = x;
		this.newY = y;
		this.newItem = item;
		this.newValue = value;

	}

	Summ(){
		this.RemoveAnimated();
		void this.Cels.offsetWidth;
		this.IsNew = true;
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