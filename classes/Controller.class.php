<?php
class Controller
{
	public function __construct()
	{
		$this->loadAllClasses();
		$this->viewController();
	}
	public function loadAllClasses()
	{
		$classes = $this->findClasses();
		$this->loadClasses($classes);	
	}
	public function findClasses()
	{
		$dir = scandir('../classes/');
		$pattern = '/.class.php$/';
		$key_array = array();
		$result = array();
		foreach($dir as $d){
			preg_match($pattern, $d, $matches);
			if($matches){
				$key = array_search($d, $dir);
				array_push($key_array, $key);
			}
		}
		foreach($key_array as $k){
			array_push($result, $dir[$k]);
		}
		return $result;

	}
	public function loadClasses($class_array)
	{
		foreach($class_array as $class){
			include_once('../classes/'.$class);		
		}
	}
	public function viewController()
	{
		$current_page = $this->getCurrentPage();
		if($current_page && $current_page != 'index' && $current_page != 'menu' && $current_page != 'HTML_header.php' && $current_page != 'HTML_footer.php'){
			$n = new View($current_page);	
		}
		else{
			$n = new View('home');
		}
	}
	public function modelController()
	{
		$model = new Model();
	}
	public function getCurrentPage()
	{
		if(isset($_GET['p'])){
			return $_GET['p'];
		}else{
			return 'home';	
		}
	}
}

