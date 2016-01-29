<?php include('menu.php');?>
<div class='content'>
<h1>Portfolio</h1>
<?php 
$links = View::portfolioArticlePattern();
$pattern = '/(?:8080\/)(.*)/';
foreach($links as $link){
	preg_match($pattern, $link, $match);
	echo '<div class="work_article">';
	echo '<h2 class="work_article_title">'.$match[1].'</h2>';
	echo '<p class="description_'.$match[1].'"></p>';
	echo '<a class="work_article_link "href='.$link.' target="_blank">'.$match[1].'</a><br />';
	echo '</div>';
}
?>
</div>
