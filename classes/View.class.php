<?php
class View
{
	protected $page_name;
	protected $page_detected_html;
	protected $page_detected_php;
	public function __construct($page_name = null)
	{
		if($page_name){
			$this->page_name = $page_name;
			$this->generateView();
		}	
	}
	public function pageExists()
	{
		$pattern = '/(^[^.].*)[.]html|(^[^.].*)[.]php/';
		$folder = scandir(getcwd());
		$matches_html = array();
		$matches_php = array();
		foreach($folder as $dir){
			preg_match($pattern, $dir, $match);
			if($match){
				if($match[1] && strlen($match[1])>0){
					array_push($matches_html, $match[1]);
				}
				if(isset($match[2]) && strlen($match[2])>0){
					array_push($matches_php, $match[2]);
				}
			}
		}
		$this->page_detected_html = $matches_html;
		$this->page_detected_php = $matches_php;
	}
	public function generateView()
	{
		include_once('HTML_header.php');
		$this->generateContent();
		include_once('HTML_footer.php');
	}
	public function generateContent()
	{
		$this->pageExists();
		if($this->page_detected_php && $this->page_name){
			foreach($this->page_detected_php as $page){
				if($page == $this->page_name){
					if(is_file($this->page_name.'.php')){
						include_once($this->page_name.'.php');
						return true;
					}
				}
			}
		}
		if($this->page_detected_html && $this->page_name){
			foreach($this->page_detected_html as $page){
				if($page == $this->page_name){
					if(is_file($this->page_name.'.html')){
						include_once($this->page_name.'.html');
						return true;
					}
				}
			}
		}
		include_once('home.php');
	}
	public static function portfolioArticlePattern(){
		$host = $_SERVER['REQUEST_SCHEME'].'://'.$_SERVER['HTTP_HOST'].'/';
		$work_dir = $_SERVER['DOCUMENT_ROOT'];
		$pattern = '/^\.[a-z]*/';
		$work_files = scandir($work_dir);
		$response = array();
		foreach($work_files as $f){
			preg_match($pattern, $f, $match);
			if($f != '.' && $f != '..' && $f != 'css' && $f != 'js' && $f != 'index.php' && $f!='pf-2016' &&!$match){
			array_push($response, $host.''.$f);	
			}
		}
		return $response;	
	}
}
