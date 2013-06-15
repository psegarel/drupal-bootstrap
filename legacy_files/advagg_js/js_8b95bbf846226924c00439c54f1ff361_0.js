jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options.expires=-1};var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1e3))}else date=options.expires;expires='; expires='+date.toUTCString()};var path=options.path?'; path='+options.path:'',domain=options.domain?'; domain='+options.domain:'',secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}};return cookieValue}};
(function($){$.fn.drilldown=function(method,settings){var menu=this,activePath,rootTitle=settings.rootTitle||'Home';switch(method){case'goTo':if(this.activePath&&this.activePath===$(settings.activeLink).attr('href'))return false;return true;case'setActive':var breadcrumb=[],activeMenu;$(settings.activeLink).each(function(){$(this).parents('ul.menu').each(function(){if($(this).parents('ul.menu').size()>0){$(this).siblings('a').each(function(){breadcrumb.unshift($(this))})}else if($(this).children('li').size()>1){var root;if($(this).siblings('a.drilldown-root').size()>0){root=$(this).siblings('a.drilldown-root')}else{root=$('<a href="#" class="drilldown-root" style="display:none">'+rootTitle+'</a>');$(this).before(root)};breadcrumb.unshift(root)}});if($(this).next().is('ul.menu')){activeMenu=$(this).next();breadcrumb.push($(this))}else activeMenu=$(this).parents('ul.menu').eq(0);if(activeMenu){$('.drilldown-active-trail',menu).removeClass('drilldown-active-trail');$('ul.menu',menu).removeClass('drilldown-active-menu').removeClass('clear-block');$(activeMenu).addClass('drilldown-active-menu').addClass('clear-block').parents('li').addClass('drilldown-active-trail').show()}});if(breadcrumb.length>0){var trail=$(settings.trail);trail.empty();for(var key in breadcrumb)if(breadcrumb[key]){var clone=$('<a></a>').attr('href',$(breadcrumb[key]).attr('href')).attr('class',$(breadcrumb[key]).attr('class')).html($(breadcrumb[key]).html()).addClass('depth-'+key).appendTo(trail);$('a.depth-'+key,trail).data('original',$(breadcrumb[key])).click(function(){settings.activeLink=$(this).data('original');if(settings.activeLink.siblings('ul.drilldown-active-menu').size()===0){menu.drilldown('setActive',settings);return false};return menu.drilldown('goTo',settings)})}};$(menu).trigger('refresh.drilldown');break;case'init':if($('ul.menu ul.menu',menu).size()>0){$(menu).addClass('drilldown');$(settings.trail).addClass('drilldown-trail');var activeLink;$('ul.menu a',menu).removeClass('active');if(settings.activePath&&$('ul.menu a[href='+settings.activePath+']',menu).size()>0){this.activePath=settings.activePath;activeLink=$('ul.menu a[href='+settings.activePath+']',menu).addClass('active')};if(!activeLink)activeLink=$('ul.menu a.active',menu).size()?$('ul.menu a.active',menu):$('ul.menu > li > a',menu);if(activeLink)menu.drilldown('setActive',{activeLink:$(activeLink[0]),trail:settings.trail,rootTitle:rootTitle});$('ul.menu li:has(ul.menu)',this).click(function(){if($(this).parent().is('.drilldown-active-menu'))if(menu.data('disableMenu')){return true}else{var url=$(this).children('a').attr('href'),activeLink=$('ul.menu a[href='+url+']',menu);menu.drilldown('setActive',{activeLink:activeLink,trail:settings.trail,rootTitle:rootTitle});return false}});$('ul.menu li:has(ul.menu) a',menu).click(function(){menu.data('disableMenu',true)})};break};return this}})(jQuery);
Drupal.behaviors.adminToolbar=function(context){$('#admin-toolbar:not(.processed)').each(function(){var toolbar=$(this);toolbar.addClass('processed');Drupal.adminToolbar.init(toolbar);$('.admin-toggle',this).click(function(){Drupal.adminToolbar.toggle(toolbar)});$('div.admin-tab',this).click(function(){Drupal.adminToolbar.tab(toolbar,$(this),true)})});$('div.admin-panes:not(.processed)').each(function(){var panes=$(this);panes.addClass('processed');$('h2.admin-pane-title a').click(function(){var target=$(this).attr('href').split('#')[1],panes=$(this).parents('div.admin-panes')[0];$('.admin-pane-active',panes).removeClass('admin-pane-active');$('div.admin-pane.'+target,panes).addClass('admin-pane-active');$(this).addClass('admin-pane-active');return false})})};Drupal.adminToolbar={};Drupal.adminToolbar.init=function(toolbar){if(!$(document.body).hasClass('admin-ah')){var expanded=this.getState('expanded');if(expanded==1)$(document.body).addClass('admin-expanded')};var target=this.getState('activeTab');if(target)if($('div.admin-tab.'+target).size()>0){var tab=$('div.admin-tab.'+target);this.tab(toolbar,tab,false)};var classes=toolbar.attr('class').split(' ');if(classes[0]==='nw'||classes[0]==='ne'||classes[0]==='se'||classes[0]==='sw')$(document.body).addClass('admin-'+classes[0]);if(classes[1]==='horizontal'||classes[1]==='vertical')$(document.body).addClass('admin-'+classes[1]);if(classes[2]==='df'||classes[2]==='ah')$(document.body).addClass('admin-'+classes[2])};Drupal.adminToolbar.tab=function(toolbar,tab,animate){if(!tab.is('.admin-tab-active')){var target=$('span',tab).attr('id').split('admin-tab-')[1];if(toolbar.is('.vertical')&&animate){$('.admin-tab-active',toolbar).fadeOut('fast');$(tab).fadeOut('fast',function(){$('.admin-tab-active',toolbar).fadeIn('fast').removeClass('admin-tab-active');$(tab).slideDown('fast').addClass('admin-tab-active');Drupal.adminToolbar.setState('activeTab',target)})}else{$('div.admin-tab',toolbar).removeClass('admin-tab-active');$(tab,toolbar).addClass('admin-tab-active');Drupal.adminToolbar.setState('activeTab',target)};$('div.admin-block.admin-active',toolbar).removeClass('admin-active');$('#block-'+target,toolbar).addClass('admin-active')};return false};Drupal.adminToolbar.toggle=function(toolbar){if($(document.body).is('.admin-expanded')){if($(toolbar).is('.vertical')){$('div.admin-blocks',toolbar).animate({width:'0px'},'fast',function(){$(this).css('display','none')});if($(toolbar).is('.nw')||$(toolbar).is('sw')){$(document.body).animate({marginLeft:'0px'},'fast',function(){$(this).toggleClass('admin-expanded')})}else $(document.body).animate({marginRight:'0px'},'fast',function(){$(this).toggleClass('admin-expanded')})}else{$('div.admin-blocks',toolbar).animate({height:'0px'},'fast');if($(toolbar).is('.nw')||$(toolbar).is('ne')){$(document.body).animate({marginTop:'0px'},'fast',function(){$(this).toggleClass('admin-expanded')})}else $(document.body).animate({marginBottom:'0px'},'fast',function(){$(this).toggleClass('admin-expanded')})};this.setState('expanded',0)}else{if($(toolbar).is('.vertical')){$('div.admin-blocks',toolbar).animate({width:'260px'},'fast');if($(toolbar).is('.nw')||$(toolbar).is('sw')){$(document.body).animate({marginLeft:'260px'},'fast',function(){$(this).toggleClass('admin-expanded')})}else $(document.body).animate({marginRight:'260px'},'fast',function(){$(this).toggleClass('admin-expanded')})}else{$('div.admin-blocks',toolbar).animate({height:'260px'},'fast');if($(toolbar).is('.nw')||$(toolbar).is('ne')){$(document.body).animate({marginTop:'260px'},'fast',function(){$(this).toggleClass('admin-expanded')})}else $(document.body).animate({marginBottom:'260px'},'fast',function(){$(this).toggleClass('admin-expanded')})};if($(document.body).hasClass('admin-ah')){this.setState('expanded',0)}else this.setState('expanded',1)}};Drupal.adminToolbar.getState=function(key){if(!Drupal.adminToolbar.state){Drupal.adminToolbar.state={};var cookie=$.cookie('DrupalAdminToolbar'),query=cookie?cookie.split('&'):[];if(query)for(var i in query)if(typeof(query[i])=='string'&&query[i].indexOf('=')!=-1){var values=query[i].split('=');if(values.length===2)Drupal.adminToolbar.state[values[0]]=values[1]}};return Drupal.adminToolbar.state[key]?Drupal.adminToolbar.state[key]:false};Drupal.adminToolbar.setState=function(key,value){var existing=Drupal.adminToolbar.getState(key);if(existing!=value){Drupal.adminToolbar.state[key]=value;var query=[];for(var i in Drupal.adminToolbar.state)query.push(i+'='+Drupal.adminToolbar.state[i]);$.cookie('DrupalAdminToolbar',query.join('&'),{expires:7,path:'/'})}};
Drupal.behaviors.adminToolbarMenu=function(context){if(jQuery().drilldown)$('#admin-toolbar div.admin-block:has(ul.menu):not(.admin-toolbar-menu)').addClass('admin-toolbar-menu').each(function(){var menu=$(this),trail='#admin-toolbar div.admin-tab.'+$(this).attr('id').split('block-')[1]+' span',rootTitle=$(trail).text();if($('a:has(span.menu-description)',menu).size()>0){menu.addClass('admin-toolbar-menu-hover');$('a:has(span.menu-description)',menu).hover(function(){$('<a></a>').attr('class',$(this).attr('class')).addClass('menu-hover').append($('span.menu-description',this).clone()).appendTo(menu).show()},function(){$(menu).children('a.menu-hover').remove()})};menu.bind('refresh.drilldown',function(){$(trail+' a').unbind('click').click(function(){if($(this).parents('div.admin-tab').is('.admin-tab-active')){var settings={activeLink:$(this).data('original'),trail:trail};if(settings.activeLink.siblings('ul.drilldown-active-menu').size()===0){menu.drilldown('setActive',settings);return false};return menu.drilldown('goTo',settings)};$(this).parents('div.admin-tab').click();return false})});menu.drilldown('init',{activePath:Drupal.settings.activePath,trail:trail,rootTitle:rootTitle})})};
