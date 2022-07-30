class Color{
	constructor(){

	}

	GetColor(index){
		switch(index){
		case -1:
			return '#ffffff';
		break;

		case 2:
			return '#F2A700';
		break;

		case 4:
			return '#e4ab45';
		break;

		case 8:
			return '#d2ae6b';
		break;

		case 16:
			return '#a1b6af';
		break;

		case 32:
			return '#78b9d0';
		break;

		case 64:
			return '#00bdf2';
		break;

		case 128:
			return '#72b0cf';
		break;

		case 256:
			return '#ae958b';
		break;

		case 512:
			return '#c87948';
		break;

		case 1024:
			return '#b69284';
		break;

		case 2048:
			return '#603c27';
		break;

		case 4096:
			return '#888888';
		break;

		}
	}
}