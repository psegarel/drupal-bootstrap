(function($){$.fn.bgIframe=$.fn.bgiframe=function(s){if($.browser.msie&&parseInt($.browser.version)<=6){s=$.extend({top:'auto',left:'auto',width:'auto',height:'auto',opacity:true,src:'javascript:false;'},s||{});var prop=function(n){return n&&n.constructor==Number?n+'px':n},html='<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+s.src+'"style="display:block;position:absolute;z-index:-1;'+(s.opacity!==false?'filter:Alpha(Opacity=\'0\');':'')+'top:'+(s.top=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')':prop(s.top))+';left:'+(s.left=='auto'?'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')':prop(s.left))+';width:'+(s.width=='auto'?'expression(this.parentNode.offsetWidth+\'px\')':prop(s.width))+';height:'+(s.height=='auto'?'expression(this.parentNode.offsetHeight+\'px\')':prop(s.height))+';"/>';return this.each(function(){if($('> iframe.bgiframe',this).length==0)this.insertBefore(document.createElement(html),this.firstChild)})};return this};if(!$.browser.version)$.browser.version=navigator.userAgent.toLowerCase().match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)[1]})(jQuery);
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY,track=function(ev){cX=ev.pageX;cY=ev.pageY},compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}},delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])},handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this)try{p=p.parentNode}catch(e){p=this};if(p==this)return false;var ev=jQuery.extend({},e),ob=this;if(ob.hoverIntent_t)ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1)ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1)ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}};return this.mouseover(handleHover).mouseout(handleHover)}})(jQuery);
(function($){$.fn.supposition=function(){var $w=$(window),_offset=function(dir){return window[dir=='y'?'pageYOffset':'pageXOffset']||document.documentElement&&document.documentElement[dir=='y'?'scrollTop':'scrollLeft']||document.body[dir=='y'?'scrollTop':'scrollLeft']},onInit=function(){$topNav=$('li',this);var cZ=parseInt($topNav.css('z-index'))+$topNav.length;$topNav.each(function(){$(this).css({zIndex:--cZ})})},onHide=function(){this.css({marginTop:'',marginLeft:''})},onBeforeShow=function(){this.each(function(){var $u=$(this);$u.css('display','block');var menuWidth=$u.width(),parentWidth=$u.parents('ul').width(),totalRight=$w.width()+_offset('x'),menuRight=$u.offset().left+menuWidth;if(menuRight>totalRight)$u.css('margin-left',($u.parents('ul').length==1?totalRight-menuRight:-(menuWidth+parentWidth))+'px');var windowHeight=$w.height(),offsetTop=$u.offset().top,menuHeight=$u.height(),baseline=windowHeight+_offset('y'),expandUp=(offsetTop+menuHeight>baseline);if(expandUp)$u.css('margin-top',baseline-(menuHeight+offsetTop));$u.css('display','none')})};return this.each(function(){var o=$.fn.superfish.o[this.serial],_onInit=o.onInit,_onBeforeShow=o.onBeforeShow,_onHide=o.onHide;$.extend($.fn.superfish.o[this.serial],{onInit:function(){onInit.call(this);_onInit.call(this)},onBeforeShow:function(){onBeforeShow.call(this);_onBeforeShow.call(this)},onHide:function(){onHide.call(this);_onHide.call(this)}})})}})(jQuery);
(function($){$.fn.supersubs=function(options){var opts=$.extend({},$.fn.supersubs.defaults,options);return this.each(function(){var $$=$(this),o=$.meta?$.extend({},opts,$$.data()):opts,fontsize=$('<li id="menu-fontsize">&#8212;</li>').css({padding:0,position:'absolute',top:'-999em',width:'auto'}).appendTo($$).width();$('#menu-fontsize').remove();$ULs=$$.find('ul');$ULs.each(function(i){var $ul=$ULs.eq(i),$LIs=$ul.children(),$As=$LIs.children('a'),liFloat=$LIs.css('white-space','nowrap').css('float'),emWidth=$ul.add($LIs).add($As).css({'float':'none',width:'auto'}).end().end()[0].clientWidth/fontsize;emWidth+=o.extraWidth;if(emWidth>o.maxWidth){emWidth=o.maxWidth}else if(emWidth<o.minWidth)emWidth=o.minWidth;emWidth+='em';$ul.css('width',emWidth);$LIs.css({'float':liFloat,width:'100%','white-space':'normal'}).each(function(){var $childUl=$('>ul',this),offsetDirection=$childUl.css('left')!==undefined?'left':'right';$childUl.css(offsetDirection,emWidth)})})})};$.fn.supersubs.defaults={minWidth:9,maxWidth:25,extraWidth:0}})(jQuery);
(function($){$.fn.superfish=function(op){var sf=$.fn.superfish,c=sf.c,$arrow=$(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),over=function(){var $$=$(this),menu=getMenu($$);clearTimeout(menu.sfTimer);$$.showSuperfishUl().siblings().hideSuperfishUl()},out=function(){var $$=$(this),menu=getMenu($$),o=sf.op;clearTimeout(menu.sfTimer);menu.sfTimer=setTimeout(function(){o.retainPath=($.inArray($$[0],o.$path)>-1);$$.hideSuperfishUl();if(o.$path.length&&$$.parents(['li.',o.hoverClass].join('')).length<1)over.call(o.$path)},o.delay)},getMenu=function($menu){var menu=$menu.parents(['ul.',c.menuClass,':first'].join(''))[0];sf.op=sf.o[menu.serial];return menu},addArrow=function($a){$a.addClass(c.anchorClass).append($arrow.clone())};return this.each(function(){var s=this.serial=sf.o.length,o=$.extend({},sf.defaults,op);o.$path=$('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){$(this).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass)});sf.o[s]=sf.op=o;$('li:has(ul)',this)[($.fn.hoverIntent&&!o.disableHI)?'hoverIntent':'hover'](over,out).each(function(){if(o.autoArrows)addArrow($('>a:first-child',this))}).not('.'+c.bcClass).hideSuperfishUl();var $a=$('a',this);$a.each(function(i){var $li=$a.eq(i).parents('li');$a.eq(i).focus(function(){over.call($li)}).blur(function(){out.call($li)})});o.onInit.call(this)}).each(function(){menuClasses=[c.menuClass];if(sf.op.dropShadows&&!($.browser.msie&&$.browser.version<7))menuClasses.push(c.shadowClass);$(this).addClass(menuClasses.join(' '))})};var sf=$.fn.superfish;sf.o=[];sf.op={};sf.IE7fix=function(){var o=sf.op;if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined)this.toggleClass(sf.c.shadowClass+'-off')};sf.c={bcClass:'sf-breadcrumb',menuClass:'sf-js-enabled',anchorClass:'sf-with-ul',arrowClass:'sf-sub-indicator',shadowClass:'sf-shadow'};sf.defaults={hoverClass:'sfHover',pathClass:'overideThisToUse',pathLevels:1,delay:800,animation:{opacity:'show'},speed:'normal',autoArrows:true,dropShadows:true,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.extend({hideSuperfishUl:function(){var o=sf.op,not=(o.retainPath===true)?o.$path:'';o.retainPath=false;var $ul=$(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility','hidden');o.onHide.call($ul);return this},showSuperfishUl:function(){var o=sf.op,sh=sf.c.shadowClass+'-off',$ul=this.addClass(o.hoverClass).find('>ul:hidden').css('visibility','visible');sf.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){sf.IE7fix.call($ul);o.onShow.call($ul)});return this}})})(jQuery);
Drupal.behaviors.fusionEqualheights=function(context){if(jQuery().equalHeights){$("#header-top-wrapper div.equal-heights div.content").equalHeights();$("#header-group-wrapper div.equal-heights div.content").equalHeights();$("#preface-top-wrapper div.equal-heights div.content").equalHeights();$("#preface-bottom div.equal-heights div.content").equalHeights();$("#sidebar-first div.equal-heights div.content").equalHeights();$("#content-top div.equal-heights div.content").equalHeights();$("#content-region div.equal-heights div.content").equalHeights();$("#content-bottom div.equal-heights div.content").equalHeights();$("#node-top div.equal-heights div.content").equalHeights();$("#node-bottom div.equal-heights div.content").equalHeights();$("#sidebar-last div.equal-heights div.content").equalHeights();$("#postscript-top div.equal-heights div.content").equalHeights();$("#postscript-bottom-wrapper div.equal-heights div.content").equalHeights();$("#footer-wrapper div.equal-heights div.content").equalHeights()}};Drupal.behaviors.fusionIE6fixes=function(context){if($.browser.msie&&($.browser.version<7)){$('form input.form-submit').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});$('#primary-menu ul.sf-menu li.expanded').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});$('.sf-menu li').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});$('#search input#search_header').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')})}};Drupal.behaviors.fusionOverlabel=function(context){if(jQuery().overlabel)$("div.fusion-horiz-login label").overlabel()};Drupal.behaviors.fusionSuperfish=function(context){$("#primary-menu ul.sf-menu").superfish({hoverClass:'sfHover',delay:250,animation:{opacity:'show',height:'show'},speed:'fast',autoArrows:false,dropShadows:false,disableHI:true}).supposition()};Drupal.behaviors.fusionSuperfishBlocks=function(context){$("div.block ul.sf-menu").superfish({hoverClass:'sfHover',delay:250,animation:{opacity:'show',height:'show'},speed:'fast',autoArrows:false,dropShadows:false,disableHI:true}).supposition()};Drupal.behaviors.fusionGridMask=function(context){if($('body.grid-mask-enabled').size()>0){var grid_width_pos=parseInt($('body').attr('class').indexOf('grid-width-'))+11,grid_width=$('body').attr('class').substring(grid_width_pos,grid_width_pos+2),grid='<div id="grid-mask-overlay" class="full-width"><div class="row">';for(i=1;i<=grid_width;i++)grid+='<div class="block grid'+grid_width+'-1"><div class="inner"></div></div>';grid+='</div></div>';$('body.grid-mask-enabled').prepend(grid);$('#grid-mask-overlay .row').addClass('grid'+grid_width+'-'+grid_width);$('#grid-mask-overlay .block .inner').height($('body').height())}};Drupal.behaviors.fusionGridMaskToggle=function(context){if($('body.grid-mask-enabled').size()>0){$('body.grid-mask-enabled').prepend('<div id="grid-mask-toggle">grid</div>');$('div#grid-mask-toggle').toggle(function(){$(this).toggleClass('grid-on');$('body').toggleClass('grid-mask')},function(){$(this).toggleClass('grid-on');$('body').toggleClass('grid-mask')})}};Drupal.behaviors.fusionPanelsShowEdit=function(context){if($("#panels-edit-display-form").size()>0||$("#page-manager-edit").size()>0){$("#panels-edit-display-form").parents('.row, .block').css("overflow","visible");$("#page-manager-edit").parents('.row, .block').css("overflow","visible")}};Drupal.behaviors.fusionScreenshotpreview=function(context){if($('span.preview-icon').size()>0){var xOffset=20,yOffset=0;$('span.preview-icon').hover(function(e){var img_class=this.id,caption=$(this).parent().text();$('body').append('<div id="screenshot"><div class="screenshot-preview '+img_class+'" alt="preview"></div><div class="screenshot-caption">'+caption+'</div></div>');$("#screenshot").hide();$("#screenshot").css("left",(e.pageX+xOffset)+"px").css("top",(e.pageY+yOffset)+"px");var img=new Image();img.onload=function(){var caption_height=parseFloat($("#screenshot .screenshot-caption").css("height"));$("#screenshot").css("height",img.height+caption_height);$("#screenshot").css("width",img.width);$("#screenshot ."+img_class).css("height",img.height);$("#screenshot ."+img_class).css("width",img.width);$("#screenshot .screenshot-caption").css("width",img.width-10);$("#screenshot").fadeIn("fast")};img.src=$("."+img_class).css("background-image").replace(/^url|[\(\)\"]/g,'')},function(){$("#screenshot").remove()});$("span.preview-icon").mousemove(function(e){$("#screenshot").css("left",(e.pageX+xOffset)+"px").css("top",(e.pageY+yOffset)+"px")})}};