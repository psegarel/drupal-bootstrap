Drupal.behaviors.textarea=function(context){$('textarea.resizable:not(.textarea-processed)',context).each(function(){if($(this).is('textarea.teaser:not(.teaser-processed)'))return false;var textarea=$(this).addClass('textarea-processed'),staticOffset=null;$(this).wrap('<div class="resizable-textarea"><span></span></div>').parent().append($('<div class="grippie"></div>').mousedown(startDrag));var grippie=$('div.grippie',$(this).parent())[0];grippie.style.marginRight=(grippie.offsetWidth-$(this)[0].offsetWidth)+'px'
function startDrag(e){staticOffset=textarea.height()-e.pageY;textarea.css('opacity',0.25);$(document).mousemove(performDrag).mouseup(endDrag);return false}
function performDrag(e){textarea.height(Math.max(32,staticOffset+e.pageY)+'px');return false}
function endDrag(e){$(document).unbind("mousemove",performDrag).unbind("mouseup",endDrag);textarea.css('opacity',1)}})};
Drupal.behaviors.autocomplete=function(context){var acdb=[];$('input.autocomplete:not(.autocomplete-processed)',context).each(function(){var uri=this.value;if(!acdb[uri])acdb[uri]=new Drupal.ACDB(uri);var input=$('#'+this.id.substr(0,this.id.length-13)).attr('autocomplete','OFF')[0];$(input.form).submit(Drupal.autocompleteSubmit);new Drupal.jsAC(input,acdb[uri]);$(this).addClass('autocomplete-processed')})};Drupal.autocompleteSubmit=function(){return $('#autocomplete').each(function(){this.owner.hidePopup()}).size()==0};Drupal.jsAC=function(input,db){var ac=this;this.input=input;this.db=db;$(this.input).keydown(function(event){return ac.onkeydown(this,event)}).keyup(function(event){ac.onkeyup(this,event)}).blur(function(){ac.hidePopup();ac.db.cancel()})};Drupal.jsAC.prototype.onkeydown=function(input,e){if(!e)e=window.event;switch(e.keyCode){case 40:this.selectDown();return false;case 38:this.selectUp();return false;default:return true}};Drupal.jsAC.prototype.onkeyup=function(input,e){if(!e)e=window.event;switch(e.keyCode){case 16:case 17:case 18:case 20:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:return true;case 9:case 13:case 27:this.hidePopup(e.keyCode);return true;default:if(input.value.length>0){this.populatePopup()}else this.hidePopup(e.keyCode);return true}};Drupal.jsAC.prototype.select=function(node){this.input.value=node.autocompleteValue};Drupal.jsAC.prototype.selectDown=function(){if(this.selected&&this.selected.nextSibling){this.highlight(this.selected.nextSibling)}else{var lis=$('li',this.popup);if(lis.size()>0)this.highlight(lis.get(0))}};Drupal.jsAC.prototype.selectUp=function(){if(this.selected&&this.selected.previousSibling)this.highlight(this.selected.previousSibling)};Drupal.jsAC.prototype.highlight=function(node){if(this.selected)$(this.selected).removeClass('selected');$(node).addClass('selected');this.selected=node};Drupal.jsAC.prototype.unhighlight=function(node){$(node).removeClass('selected');this.selected=false};Drupal.jsAC.prototype.hidePopup=function(keycode){if(this.selected&&((keycode&&keycode!=46&&keycode!=8&&keycode!=27)||!keycode))this.input.value=this.selected.autocompleteValue;var popup=this.popup;if(popup){this.popup=null;$(popup).fadeOut('fast',function(){$(popup).remove()})};this.selected=false};Drupal.jsAC.prototype.populatePopup=function(){if(this.popup)$(this.popup).remove();this.selected=false;this.popup=document.createElement('div');this.popup.id='autocomplete';this.popup.owner=this;$(this.popup).css({marginTop:this.input.offsetHeight+'px',width:(this.input.offsetWidth-4)+'px',display:'none'});$(this.input).before(this.popup);this.db.owner=this;this.db.search(this.input.value)};Drupal.jsAC.prototype.found=function(matches){if(!this.input.value.length)return false;var ul=document.createElement('ul'),ac=this;for(key in matches){var li=document.createElement('li');$(li).html('<div>'+matches[key]+'</div>').mousedown(function(){ac.select(this)}).mouseover(function(){ac.highlight(this)}).mouseout(function(){ac.unhighlight(this)});li.autocompleteValue=key;$(ul).append(li)};if(this.popup)if(ul.childNodes.length>0){$(this.popup).empty().append(ul).show()}else{$(this.popup).css({visibility:'hidden'});this.hidePopup()}};Drupal.jsAC.prototype.setStatus=function(status){switch(status){case'begin':$(this.input).addClass('throbbing');break;case'cancel':case'error':case'found':$(this.input).removeClass('throbbing');break}};Drupal.ACDB=function(uri){this.uri=uri;this.delay=300;this.cache={}};Drupal.ACDB.prototype.search=function(searchString){var db=this;this.searchString=searchString;if(this.cache[searchString])return this.owner.found(this.cache[searchString]);if(this.timer)clearTimeout(this.timer);this.timer=setTimeout(function(){db.owner.setStatus('begin');$.ajax({type:"GET",url:db.uri+'/'+Drupal.encodeURIComponent(searchString),dataType:'json',success:function(matches){if(typeof matches.status=='undefined'||matches.status!=0){db.cache[searchString]=matches;if(db.searchString==searchString)db.owner.found(matches);db.owner.setStatus('found')}},error:function(xmlhttp){alert(Drupal.ahahError(xmlhttp,db.uri))}})},this.delay)};Drupal.ACDB.prototype.cancel=function(){if(this.owner)this.owner.setStatus('cancel');if(this.timer)clearTimeout(this.timer);this.searchString=''};
Drupal.verticalTabs=Drupal.verticalTabs||{};Drupal.settings.verticalTabs=Drupal.settings.verticalTabs||{};Drupal.behaviors.verticalTabs=function(){if(!$('.vertical-tabs-list').size()&&Drupal.settings.verticalTabs){var ul=$('<ul class="vertical-tabs-list"></ul>'),panes=$('<div class="vertical-tabs-panes"></div>');$.each(Drupal.settings.verticalTabs,function(k,v){var summary='',cssClass='vertical-tabs-list-'+k;if(v.callback&&Drupal.verticalTabs[v.callback]){summary='<span class="summary">'+Drupal.verticalTabs[v.callback].apply(this,v.args)+'</span>'}else cssClass+=' vertical-tabs-nosummary';$('<li class="vertical-tab-button"><a href="#'+k+'" class="'+cssClass+'"><strong>'+v.name+'</strong>'+summary+'</a></li>').appendTo(ul).find('a').bind('click',function(){$(this).parent().addClass('selected').siblings().removeClass('selected');$('.vertical-tabs-'+k).show().siblings('.vertical-tabs-pane').hide();return false});var fieldset=$('<fieldset></fieldset>'),fieldsetContents=$('.vertical-tabs-'+k+' > .fieldset-wrapper > *');if(fieldsetContents.size()){fieldsetContents.appendTo(fieldset)}else $('.vertical-tabs-'+k).children().appendTo(fieldset);fieldset.children('legend').remove();fieldset.appendTo(panes).addClass('vertical-tabs-'+k).addClass('vertical-tabs-pane').find('input, select, textarea').bind('change',function(){if(v.callback&&Drupal.verticalTabs[v.callback])$('a.vertical-tabs-list-'+k+' span.summary').html(Drupal.verticalTabs[v.callback].apply(this,v.args))});$('.vertical-tabs-'+k).remove()});$('div.vertical-tabs').html(ul).append(panes);$('fieldset.vertical-tabs-pane').each(function(i){if($(this).find('div.form-item .error').size())$('li.vertical-tab-button').eq(i).addClass('error')});$('fieldset.vertical-tabs-pane').hide();$('fieldset.vertical-tabs-pane:first').show();$('div.vertical-tabs ul li:first').addClass('first selected');$('div.vertical-tabs ul li:last').addClass('last');$('div.vertical-tabs').show()}};Drupal.behaviors.verticalTabsReload=function(){$.each(Drupal.settings.verticalTabs,function(k,v){if(v.callback&&Drupal.verticalTabs[v.callback])$('a.vertical-tabs-list-'+k+' span.summary').html(Drupal.verticalTabs[v.callback].apply(this,v.args))})};
Drupal.behaviors.tao=function(context){$('fieldset.collapsible:not(.tao-processed) > legend > .fieldset-title').each(function(){var fieldset=$(this).parents('fieldset').eq(0);fieldset.addClass('tao-processed');if($('input.error, textarea.error, select.error',fieldset).size()>0)$(fieldset).removeClass('collapsed');$(this).click(function(){if(fieldset.is('.collapsed')){$(fieldset).removeClass('collapsed').children('.fieldset-content').show()}else $(fieldset).addClass('collapsed').children('.fieldset-content').hide();return false})})};
Drupal.behaviors.rubik=function(context){$('div.form:has(div.column-main div.buttons):not(.rubik-processed)').each(function(){var form=$(this),offset=$('div.column-side div.buttons',form).height()+$('div.column-side div.buttons',form).offset().top;$(window).scroll(function(){if($(this).scrollTop()>offset){$('div.column-main div.buttons',form).show()}else $('div.column-main div.buttons',form).hide()});form.addClass('rubik-processed')});$('a.toggler:not(.rubik-processed)',context).each(function(){var id=$(this).attr('href').split('#')[1];if($('#'+id).size()>0){$(this).click(function(){toggleable=$('#'+id);toggleable.toggle();$(this).toggleClass('toggler-active');return false})}else{$(this).addClass('toggler-disabled');$(this).click(function(){return false})};$(this).addClass('rubik-processed')})};