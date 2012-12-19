<section id="nav-section">
	<div class="navbar navbar-inverse navbar-static-top">
		<div class="navbar-inner">
			<div class="container">
			
				<!-- .btn-navbar is used as the toggle for collapsed navbar content -->
				<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</a>
				
				<!-- Be sure to leave the brand out there if you want it shown -->
				<?php if ($site_name): ?>
				<a class="brand" href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><span><?php print $site_name; ?></span></a>
				<?php endif; ?>
				
				<!-- Everything you want hidden at 940px or less, place within here -->
			    <?php if ($main_menu || $secondary_menu || !empty($page['navigation'])): ?>
			      <nav id="navigation" role="navigation" class="nav-collapse collapse">
			        <?php if (!empty($page['navigation'])): ?> <!--if block in navigation region, override $main_menu and $secondary_menu-->
			          <?php print render($page['navigation']); ?>
			        <?php endif; ?>
			        
			        <?php if (empty($page['navigation'])): ?>
					  <?php print theme('links__system_main_menu', array(
			            'links' => $main_menu,
			            'attributes' => array(
			              'id' => 'main-menu',
			              'class' => array('nav'),
			            ),
			            'heading' => array(
			              'text' => t('Main menu'),
			              'level' => 'h2',
			              'class' => array('element-invisible'),
			            ),
			          )); ?>
			          
					  <?php print theme('links__system_secondary_menu', array(
			            'links' => $secondary_menu,
			            'attributes' => array(
			              'id' => 'secondary-menu',
			              'class' => array('nav' , 'pull-right'),
			            ),
			            'heading' => array(
			              'text' => t('Secondary menu'),
			              'level' => 'h2',
			              'class' => array('element-invisible'),
			            ),
			          )); ?>
			        <?php endif; ?>
			      </nav> <!-- /#navigation -->
			    <?php endif; ?>
			
			</div>
		</div>
	</div>
</section>

<section id="header-section">
	<div id="container" class="clearfix">
	
		<div id="skip-link">
			<a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
			<?php if ($main_menu): ?>
			  <a href="#navigation" class="element-invisible element-focusable"><?php print t('Skip to navigation'); ?></a>
			<?php endif; ?>
		</div>
	  
	<?php if ($logo): ?>
	  <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" id="logo">
	    <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
	  </a>
	<?php endif; ?>
	<?php if ($site_name || $site_slogan): ?>
	  <hgroup id="site-name-slogan">
	    <?php if ($site_slogan): ?>
	      <h2 id="site-slogan"><?php print $site_slogan; ?></h2>
	    <?php endif; ?>
	  </hgroup>
	<?php endif; ?>
	
	<?php print render($page['header']); ?>
	</div> <!-- /#container -->
</section>

<section id="content-section">  
	<div class="container">
		<?php if ($breadcrumb): print $breadcrumb; endif;?>
	    <?php print $messages; ?>
	    <a id="main-content"></a>
	    <?php if ($page['highlighted']): ?><div id="highlighted"><?php print render($page['highlighted']); ?></div><?php endif; ?>
	    <?php print render($title_prefix); ?>
	    <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
	    <?php print render($title_suffix); ?>
	    <?php if (!empty($tabs['#primary'])): ?><div class="tabs-wrapper clearfix"><?php print render($tabs); ?></div><?php endif; ?>
	    <?php print render($page['help']); ?>
	    <?php if ($action_links): ?><ul class="action-links"><?php print render($action_links); ?></ul><?php endif; ?>
		<?php print render($page['content']); ?>
	</div>
	<?php if ($page['sidebar_first']): ?>
		<aside id="sidebar-first" role="complementary" class="sidebar clearfix">
		  <?php print render($page['sidebar_first']); ?>
		</aside>  <!-- /#sidebar-first -->
	<?php endif; ?>
	
	<?php if ($page['sidebar_second']): ?>
		<aside id="sidebar-second" role="complementary" class="sidebar clearfix">
		  <?php print render($page['sidebar_second']); ?>
		</aside>  <!-- /#sidebar-second -->
	<?php endif; ?>
</section>

<section id="footer-section">
	<div class="container">
	    <div class="row copyright">
	    	<div class="span12">
			    <?php print render($page['footer']) ?>
			    <?php print $feed_icons ?>			    
	    	</div>
	    	<div class="span12">
	    	<?php print '&copy; '.date('Y')." ".$site_name; ?>
	    	</div>
	    </div>
	</div>
</section>

