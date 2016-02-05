<?php include('menu.php');?>
<div class='content'>
<h1>Portfolio</h1>
<?php 
$links = View::portfolioArticlePattern();
$pattern = '/(?:8080\/)(.*)/';
for($i = 0 ; $i < sizeof($links['titles']); $i++){
	echo '<div class="work_article">';
	echo '<h2 class="work_article_title">'.$links['titles'][$i].'</h2>';
	echo '<p class="work_article_desc">'.$links['desc'][$i].'</p>';
	echo '<a class="work_article_link" href='.$links['links'][$i].' target="_blank">'.$links['links'][$i].'</a>';
	echo '</div>';
}
?>
</div>
