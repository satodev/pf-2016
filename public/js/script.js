document.onreadystatechange = function(){
	if(document.readyState == "complete"){
		menu.init();
		home.init();
		contact.init();
		portfolio.init();
	}
}
var menu = {
	nav_elem:null,
	home_link : null, 
	pf_link : null,
	contact_link :null,
	init: function(){
		menu.home_link = document.getElementById('link_home');
		menu.pf_link = document.getElementById('link_portfolio');
		menu.contact_link = document.getElementById('link_contact'); 
		menu.navigation(),
		menu.generalMenuRedimention()
	},
	navigation : function(){
		current_url = home.getCurrentUrl();
		if(current_url || current_url == ''){
			menu.defineBreadCrumb(current_url);
		}	
	},
	defineBreadCrumb: function(current_url){

		if(current_url == 'home' || current_url == ''){
			content = menu.home_link.innerHTML;
			menu.home_link.className ='breadCrumbWhite';
		}	
		if(current_url == "portfolio"){
			content = menu.pf_link.innerHTML;
			menu.pf_link.className ='breadCrumbBlue';
		}
		if(current_url == "contact"){
			content = menu.contact_link.innerHTML;
			menu.contact_link.className ='breadCrumbRed';
		}
	},
	menuRedimention : function(){
		menu_elem = document.getElementById('main_menu');
		if(window.innerWidth >= 768){
			menu_elem.style.height = window.innerHeight+'px';
		}else{
			menu_elem.style.height = 'auto';
		}
	},
	generalMenuRedimention : function(){
		menu.menuRedimention();
		window.addEventListener('resize', function(){
			menu.menuRedimention();
		});
	}	
}
var home ={
	portfolio :null,
	contact :null,
	main_title: null,
	page_name : null,
	init : function(){
		home.getCurrentUrl();
		if(home.page_name == 'home' || home.page_name == ''){
			home.getElement();
			home.ajustHeights(home.portfolio);
			home.ajustHeights(home.contact);
			home.ajustLineHeights(titles);
			home.syncMenuEvent();
			window.onresize = function(){
				home.ajustHeights(home.portfolio);
				home.ajustHeights(home.contact);
			}
		}else{
			return false;
		}
	},
	getCurrentUrl : function(){	
		pattern = /[a-zA-Z]*$/;
		url = window.location.search;
		result = pattern.exec(url);
		if(result != 'home' && result != 'portfolio' && result != 'contact'){
			result = 'home';	
		}
		home.page_name = result;
		return result;
	},	
	getElement : function(){
		home.contact = document.getElementById('home_contact'),
		home.portfolio = document.getElementById('home_portfolio'),
		home.main_title = document.getElementById('main_title'),
			titles = document.querySelectorAll('.content h2')
	},
	ajustHeights : function(elem, margin){
		elem.style.height = window.innerHeight/2+(margin||0) +'px';
	},
	ajustLineHeights : function(elem, margin){
		for(i in elem){
			if(typeof elem[i] == 'object'){
				elem[i].style.lineHeight = window.innerHeight/2+'px';
			}
		}		
	},
	syncMenuEvent : function(){
		menu.pf_link.onmouseover = function(){
			menu.pf_link.style.backgroundColor = "#02ACF4";
			menu.pf_link.style.color = 'white';
		}
		menu.pf_link.onmouseleave = function(){
			menu.pf_link.style.backgroundColor = 'black';
			menu.pf_link.style.color = '#02ACF4';
		}
		menu.contact_link.onmouseover = function(){
			menu.contact_link.style.backgroundColor = "#f40233";
			menu.contact_link.style.color = 'white';
		}
		menu.contact_link.onmouseleave = function(){
			menu.contact_link.style.backgroundColor = 'black';
			menu.contact_link.style.color = '#f40233';
		}
		home.portfolio.onmouseover = function(){
			menu.pf_link.style.backgroundColor = "#02ACF4";
			menu.pf_link.style.color = 'white';
		}
		home.portfolio.onmouseleave = function(){
			menu.pf_link.style.backgroundColor = 'black';
			menu.pf_link.style.color = '#02ACF4';
		}
		home.contact.onmouseover = function(){
			menu.contact_link.style.backgroundColor = "#f40233";
			menu.contact_link.style.color = 'white';
		}
		home.contact.onmouseleave = function(){
			menu.contact_link.style.backgroundColor = 'black';
			menu.contact_link.style.color = '#f40233';
		}
	}

}
var portfolio = {
	heights : 0,
	init : function(){
		if(home.getCurrentUrl() == 'portfolio'){
			work_article = document.getElementsByClassName('work_article');
			portfolio.scrollDetector();
			portfolio.heightAdjust();
			portfolio.heightModifier();
			portfolio.wmHeightAdjust();
			portfolio.wmScrollDetector();
		}
	},
	scrollDetector : function(){
		html = document.getElementsByTagName('html');
		content = document.getElementsByClassName('portfolio');
		if(window.innerHeight < content[0].clientHeight){	
			html[0].style.overflowY = 'scroll';
		}
	},
	wmScrollDetector : function(){
		window.onresize = function(){
			portfolio.scrollDetector();
		}
	},
	heightModifier : function(){
		if(portfolio.heights && portfolio.heights > 0){
			for(i in work_article){
				if(typeof i == 'string' && i.length == 1){
					work_article[i].style.height = portfolio.heights+'px';
				}
			}
		}
	},
	wmHeightAdjust: function(){
		window.onresize = function(){
			portfolio.heightAdjust();
			portfolio.heightModifier();
		}
	},
	heightAdjust : function(){
		var heights = 0;
		for(i in work_article){
			if(typeof i == 'string' && i.length == 1){
				if(work_article[i].offsetHeight > heights){
					heights =  work_article[i].clientHeight;
				}
			}	
		}
		if(heights > portfolio.heights){
			portfolio.heights = heights;
		}
	}
}
var contact = {
	input_valid : false,
	textarea_valid : false,
	init: function(){
		if(home.getCurrentUrl() == 'contact'){
			contact.form();
			contact.shortcut();
			contact.generateMap();
		}	
	},
	form: function(){
		contact.formInputValidator();
		contact.formTextAreaValidator();
		contact.formSubmitValidator();

	},
	formInputValidator : function(){
		inputs = document.querySelectorAll('input');
		name_valid = false;
		email_valid = false;
		object_valid = false;
		for(var i = 0; i < inputs.length; i++){
			inputs[i].oninput = function(){
				if(this.name == 'Name'){
					if(this.value.length < 20 && this.value.length > 0){
						name_valid = true;
					}else {
						console.log(this.value.length);
						name_valid = false;
					}
				}
				if(this.name == 'email'){
					pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
					result = pattern.exec(this.value);
					if(result){
						email_valid = true;	
					}else{
						email_valid = false;
					}
				}
				if(this.name == 'object' ){
					if(this.value.length > 0 && this.value.length < 50){
						object_valid = true;	
					}else{
						object_valid = false;
					}
				}
				if(name_valid && email_valid && object_valid){
					contact.input_valid = true;
				}else{
					contact.input_valid = false;
				}
			}
		}
	},
	formTextAreaValidator : function(){
		textarea = document.querySelectorAll('textarea');
		textarea[0].oninput = function(){
			if(textarea[0].value.length > 0 && textarea[0].value.length < 5000){
				console.log('if pass');
				contact.textarea_valid = true;	
			}else if(textarea[0].value.length == 0 || textarea[0].value.length > 5000){
				console.log('else if pass');
				contact.textarea_valid = false;
			}
		}
	},
	formSubmitValidator : function(){
		console.log('pass');
		submit = document.querySelectorAll('button[name="submit"]');
		console.log(contact.input_valid+ '' + contact.textarea_valid);
		if(contact.input_valid && contact.textarea_valid){
			contact.validForm();
		}
		submit[0].onclick = function(){
			console.log(contact.input_valid+ '' + contact.textarea_valid);
			if(contact.input_valid && contact.textarea_valid){
				contact.validForm();
			}
		}
	},
	shortcut : function(){
		contact.shortKeyShiftEnter();
	},
	shortKeyShiftEnter : function(){
		shift = false;
		document.onkeyup = function(e){
			if(e.which == 16){
				shift =false;
			}
		}
		document.onkeydown = function(e){
			if(e.which == 16) {
				shift = true;
			}
			if(e.which == 13 && shift){
				contact.formSubmitValidator();
			}
		}
	},
	validForm : function(){
		var name_input = document.querySelectorAll('input[name="Name"]');
		var email_input = document.querySelectorAll('input[name="email"]');
		var subject_input = document.querySelectorAll('input[name="object"]');
		var message = document.querySelectorAll('textarea');
		var jmail = {
			from : email_input[0].value,
			to: 'hemmi.satoru@gmail.com',
			name: name_input[0].value,
			object : subject_input[0].value,
			msg : message[0].value
		}
		contact.sendmail(jmail)
			contact.disableForm();
	},
	disableForm: function(){
		input = document.querySelectorAll('input');
		for (var i = 0; i < input.length; i++){
			input[i].value = '';
			input[i].className = 'disabled';
			input[i].readOnly= true;
		}
		textarea= document.getElementsByTagName('textarea'); 
		textarea[0].value = '';
		textarea[0].className = 'disabled';
		textarea[0].readOnly = true;
		submit = document.getElementsByTagName('button');
		submit[0].disable = true;
		submit[0].readOnly = true;
		submit[0].className = 'disable';
		submit[0].innerHTML = 'Message Envoyé';
	},
	sendmail : function(object){
		if(object){
			var xml = new XMLHttpRequest();
			xml.onreadystatechange = function(){
				if(xml.readyState == 4 && xml.status == 200){
					content = document.getElementsByClassName('contact_form');
					content[0].innerHTML += xml.responseText;
				}
			}
			xml.open('POST', 'public/send_mail.php', true);
			xml.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=UTF-8');
			xml.send('data='+JSON.stringify(object));
			return true;
		}
	},
	generateMap : function(){
		main_container = document.getElementsByClassName('content');
		container = document.getElementsByClassName('google_map');
		var data = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.422733067647!2d2.3098763310561847!3d48.88286995392807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fbbd1a22ed5%3A0x2622119329a2496a!2sMalesherbes!5e0!3m2!1sfr!2sfr!4v1454457137547" width="'+main_container[0].clientWidth+'" height="410" frameborder="0" style="border:0" allowfullscreen></iframe>';
		if(window.innerWidth > 768){
			container[0].innerHTML = data;
		}else{
			container[0].innerHTML = '';	
		}
		window.onresize = function(){
			contact.generateMap();
		}
	}

}

