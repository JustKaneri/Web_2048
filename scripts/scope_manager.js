class ScopeManager{
	constructor(value,winDis){
		this.value = value;
		this.Lbx = document.getElementsByClassName('main_ui__label_scope');
		this.Lbx[0].innerHTML = this.value;
	}

	Update(value){
		this.value += value;
		this.Lbx[0].innerHTML = this.value;
	}
}