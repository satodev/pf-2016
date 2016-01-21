document.onreadystatechange = function(){
	if(document.readyState == "complete"){
		menuRedimention();	
		menuDeploy();
		window.onresize = function(){
			menuRedimention();	
			menuDeploy();
		}
		menu_button = document.getElementById('menu_button');

		elem = document.querySelectorAll('#main_menu ul');
		menu_elem = document.getElementById('main_menu');
		menu_button.onclick = function(){
			state = menuGetState();
			menuAnimate(state);	
		}
	}
}
menuRedimention = function(){
	menu_elem = document.getElementById('main_menu');
	if(window.innerWidth >= 768){
		menu_elem.style.height = window.innerHeight+'px';
	}else{
		menu_elem.style.height = 'auto';
	}
}
menuDeploy = function(){
	elem = document.getElementById('menu_button');
	if(window.innerWidth < 768 & elem == null){
		menu_elem.innerHTML+='<span id="menu_button">></span>';
	}
	if(window.innerWidth >= 768 && elem) {
		main_menu = document.getElementById('main_menu');
		main_menu.removeChild(elem);
	}
}
menuGetState = function(){
	if(elem[0].style.display != 'none'){
		return 'open';	
	}else{
		return 'closed';
	}
}
menuAnimate = function(state){
	if(state){
		if(state == 'open'){
			start = null;
			window.requestAnimationFrame(menuCloseAnimation);
		}
		if(state == 'closed'){
			menuOpenAnimation();
		}
	}
}
menuCloseAnimation = function(timestamp){
	//elem[0].style.display = 'none';
	progress = timestamp - start;
	console.log(progress);
	elem[0].style.webkitTransform = 'translateY(-'+progress+'px)';
	menu_elem.style.height = 'auto';
	if(progress < 2000){
		window.requestAnimationFrame(menuCloseAnimation);
	}
}
menuOpenAnimation = function(){
	elem[0].style.display = 'block';	
}
