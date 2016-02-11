<?php include('menu.php');?>
<div class='content portfolio'>
<h1><span class='anim_left_comming'>Portfolio</span></h1>
<?php 
$links = View::portfolioArticlePattern();
$des = View::portfolioExternalArticlePattern();
for($j = 0; $j < sizeof($des['titles']); $j++){
	echo '<div class="work_article"><a class="work_article_link" href='.$des['links'][$j].' target="_blank">';
echo '<h4 class="work_article_title"><span class="anim_right_comming">'.$des['titles'][$j].'</span></h4>';
	echo '<p class="work_article_desc ">'.$des['desc'][$j];
	echo '</p></a>';
	echo '</div>';
}
$pattern = '/(?:8080\/)(.*)/';
for($i = 0 ; $i < sizeof($links['titles']); $i++){
	echo '<div class="work_article"><a class="work_article_link" href='.$links['links'][$i].' target="_blank">';
echo '<h4 class="work_article_title"><span class="anim_right_comming">'.$links['titles'][$i].'</span></h4>';
	echo '<p class="work_article_desc ">'.$links['desc'][$i];
	echo '</p></a>';
	echo '</div>';
}
?>
</div>
