<?php
/**
 * @file
 * Returns the HTML for a single Drupal page.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728148
 */
 	echo $page['header'];
?>

<div id="container">
<div<?php print $attributes; ?>>
  <div id="header">
    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo" id="logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header__logo-image" /></a>
	 <div id="buttons">
		<a id="login" href="/talentafrika/insight/login">Login</a> 
	  <input type="button" id="register" value="Register" />
	  <a class="trigger-search" href="#"></a>
	  </div>
    <?php endif; ?>
  
  <?php if (isset($page['header'])) : ?>
    <?php print render($page['header']); ?>
  <?php endif; ?>
  </div>
  
  <div id="navigation">
        <?php if ($main_menu): ?>
          <nav id="main-menu" role="navigation" tabindex="-1">
			  <?php print render($page['highlighted']); ?>
		</nav>
        <?php endif; ?>
  </div>
  
	<div id="main">
    	
		<div id="content" class="column" role="main">
		
		<?php print render($page['highlighted']); ?>
		
		
		<?php if (isset($page['content'])) : ?>
      	 
	  	 <?php  if(drupal_is_front_page())
	              {
	                  unset($page['content']['system_main']['default_message']);
	              } 
	          print render($page['content']);
	      ?>
    	<?php endif; ?> 
		</div>
		
	     <?php
	      //Render the sidebars to see if there's anything in them.
	      $sidebar_first  = render($page['sidebar_first']);
	      $sidebar_second = render($page['sidebar_second']);
	    ?>

		<div id="sidebar">
	    <?php if ($sidebar_first || $sidebar_second): ?>
	      <aside class="sidebars">
	        <?php print $sidebar_first; ?>
			<?php print $sidebar_second; ?>
	      </aside>
	    <?php endif; ?>
		</div>
 	</div>
  
  </div>
  <div class="clearfooter"></div>
</div><!--container ending-->
  <div id="footer">
  <?php if (isset($page['footer'])) : ?>
    <?php print render($page['footer']); ?>
  <?php endif; ?>
  </div>  

