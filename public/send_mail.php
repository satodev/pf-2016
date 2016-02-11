<?php
$folder = $_SERVER['DOCUMENT_ROOT'].'pf-2016/data';
$file_name = 'file_test.txt';
$file = $folder.''.$file_name;
if(posix_access($folder, POSIX_R_OK | POSIX_W_OK) && $_POST['data']){
	$handler = fopen($file, 'a+');
	$decode = json_decode($_POST['data'],true);
//	var_dump($_POST['data']);
	$addr = $_SERVER['DOCUMENT_ROOT'].'pf-2016/data/'.$decode['name'].'.json';
//	echo $addr;
	$file = fopen($addr,'a+');
	fwrite($file, $_POST['data']);
	fclose($file);
	echo '<div id="send_mail">message envoyé</div>';
}else{
	$error = posix_get_last_error();
	echo 'Erreur '.$error.' :'.posix_strerror($error).'<br />';
	echo '</br />Contact Root for rights mofo<br />';
}
?>
