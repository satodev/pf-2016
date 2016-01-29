document.onreadystatechange = function(){
	if(document.readyState == "complete"){
		menu.init();
		home.init();
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
	titles: [],
	description: [],
	links: [],
	titles_content: [],
	links_content : [],
	content : null,
	init: function(){
		if(home.getCurrentUrl() == 'portfolio'){
			portfolio.getArticleElements();
			console.log(portfolio.links[0]);
			portfolio.defineDescriptionArticle(portfolio.description[0],portfolio.links[0]);
		}
	},
	getArticleElements : function(){
		titles_array = [];
		link_array = [];
		titles = document.querySelectorAll('h2');
		description = document.querySelectorAll('p');
		links = document.querySelectorAll('.work_article_link');
		for(var i = 0; i<titles.length; i++){
			titles_array.push(titles[i].textContent);
			link_array.push(links[i].getAttribute("href"));
		}
		portfolio.titles = titles;
		portfolio.description = description;
		portfolio.links = links;
		portfolio.titles_content= titles_array;
		portfolio.links_content = link_array;
	},
	verifArticleAuthenticity : function(article, link){
		if(typeof article == "object"){
			pattern = /description_(.*$)/ig;
			result = pattern.exec(article.className);
			if(article.previousSibling.textContent == result[1] && portfolio.verifLinkName(link)== result[1]){
				console.log(article.previousSibling.textContent+' is equal to : '+result[1]);
				return true;
			}
		}
	},
	verifLinkName : function(link){
		pattern = /([a-zA-Z0-9-_]*)$/gmi;
		result = pattern.exec(link.href);
		return result[0];
	},
	defineDescriptionArticle : function(article, link){
		if(portfolio.verifArticleAuthenticity(article, link) && portfolio.getDescriptionArticle(link)){
			console.log('pass');
			console.log(portfolio.content); 
			article.innerHTML = ''; 
		}
	},
	getFileResponseText:function(content){
		if(content){
			console.log('pass');
			console.log(content);
			return portfolio.content = content;
			console.log(portfolio.content);
		}
	},
	getDescriptionArticle : function(link){
		file = new XMLHttpRequest();
		total_link = link+'/README.md';
		pattern = new RegExp("(?:#Description\n)([a-zA-Z\n-_(-è]*)(?:#)", "igm"); 
		var data = null;
		file.onreadystatechange = function(){
			if(file.status == 200 && file.readyState == 4){
				console.log(typeof file.responseText);
				reg = pattern.exec(file.responseText);
				for(i in reg){
					if(i == 1){
						data = reg[i];
						portfolio.getFileResponseText(data);
					}
				}
			}
		}
		file.open('GET', total_link, true); 
		file.send();
		return true;
	}
}
