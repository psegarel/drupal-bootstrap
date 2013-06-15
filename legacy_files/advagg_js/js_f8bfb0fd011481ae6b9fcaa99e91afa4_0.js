if(Drupal.jsEnabled){$(document).ready(function(){if($("#edit-pathauto-perform-alias").size()&&$("#edit-pathauto-perform-alias").attr("checked")){$("#edit-path").attr("disabled","disabled");$("#edit-path-wrapper > div.description").hide(0)};$("#edit-pathauto-perform-alias").bind("click",function(){if($("#edit-pathauto-perform-alias").attr("checked")){$("#edit-path").attr("disabled","disabled");$("#edit-path-wrapper > div[class=description]").slideUp('fast')}else{$("#edit-path").removeAttr("disabled");$("#edit-path")[0].focus();$("#edit-path-wrapper > div[class=description]").slideDown('fast')}})});Drupal.verticalTabs=Drupal.verticalTabs||{};Drupal.verticalTabs.path=function(){var path=$('#edit-path').val(),automatic=$('#edit-pathauto-perform-alias').attr('checked');if(automatic)return Drupal.t('Automatic alias');if(path){return Drupal.t('Alias: @alias',{'@alias':path})}else return Drupal.t('No alias')}};
Drupal.verticalTabs=Drupal.verticalTabs||{};Drupal.verticalTabs.revision_information=function(){if($('#edit-revision').length){if($('#edit-revision').attr('checked')){return Drupal.t('New revision')}else return Drupal.t('No revision')}else return''};Drupal.verticalTabs.author=function(){var author=$('#edit-name').val()||Drupal.t('Anonymous'),date=$('#edit-date').val();if(date){return Drupal.t('By @name on @date',{'@name':author,'@date':date})}else return Drupal.t('By @name',{'@name':author})};Drupal.verticalTabs.options=function(){var vals=[];$('fieldset.vertical-tabs-options input:checked').parent().each(function(){vals.push(Drupal.checkPlain($.trim($(this).text())))});if(!$('#edit-status').is(':checked'))vals.unshift(Drupal.t('Not published'));return vals.join(', ')};

Drupal.verticalTabs = Drupal.verticalTabs || {};

Drupal.verticalTabs.comment_settings = function() {
  return $('.vertical-tabs-comment_settings input:checked').parent().text();
}

Drupal.verticalTabs.comment = function() {
  var vals = [];
  vals.push($(".vertical-tabs-comment input[name='comment']:checked").parent().text());
  vals.push($(".vertical-tabs-comment input[name='comment_default_mode']:checked").parent().text());
  vals.push(Drupal.t('@number comments per page', {'@number': $(".vertical-tabs-comment select[name='comment_default_per_page'] option:selected").val()}));
  return vals.join(', ');
}
;
Drupal.verticalTabs=Drupal.verticalTabs||{};Drupal.verticalTabs.menu=function(){if($('#edit-menu-link-title').val()){return Drupal.checkPlain($('#edit-menu-link-title').val())}else return Drupal.t('Not in menu')};
Drupal.verticalTabs=Drupal.verticalTabs||{};Drupal.verticalTabs.path_redirect=function(){if($('fieldset.vertical-tabs-path_redirect table tbody td.empty').size()){return Drupal.t('No redirects')}else{var redirects=$('fieldset.vertical-tabs-path_redirect table tbody tr').size();return Drupal.formatPlural(redirects,'1 redirect','@count redirects')}};
Drupal.behaviors.teaser=function(context){if(/KDE/.test(navigator.vendor))return;$('textarea.teaser:not(.teaser-processed)',context).each(function(){var teaser=$(this).addClass('teaser-processed'),body=$('#'+Drupal.settings.teaser[this.id]),checkbox=$('#'+Drupal.settings.teaserCheckbox[this.id]).parent(),checked=$(checkbox).children('input').attr('checked')?true:false,parent=teaser[0].parentNode;$(body).before(teaser);$(parent).remove()
function trim(text){return text.replace(/^\s+/g,'').replace(/\s+$/g,'')}
function join_teaser(){if(teaser.val())body.val(trim(teaser.val())+'\r\n\r\n'+trim(body.val()));teaser[0].value='';$(teaser).attr('disabled','disabled');$(teaser).parent().slideUp('fast');$(this).val(Drupal.t('Split summary at cursor'));$(checkbox).hide();checked=$(checkbox).children('input').attr('checked')?true:false;$(checkbox).children('input').attr('checked',true)}
function split_teaser(){body[0].focus();var selection=Drupal.getSelection(body[0]),split=selection.start,text=body.val();teaser[0].value=trim(text.slice(0,split));body[0].value=trim(text.slice(split));$(teaser).attr('disabled','');$(teaser).parent().slideDown('fast');$(this).val(Drupal.t('Join summary'));$(checkbox).show().children('input').attr('checked',checked)};var button=$('<div class="teaser-button-wrapper"><input type="button" class="teaser-button" /></div>'),include=$('#'+this.id.substring(0,this.id.length-2)+'include');$(include).parent().parent().before(button);var text=body.val().split('<!--break-->');if(text.length>=2){teaser[0].value=trim(text.shift());body[0].value=trim(text.join('<!--break-->'));$(teaser).attr('disabled','');$('input',button).val(Drupal.t('Join summary')).toggle(join_teaser,split_teaser)}else{$('input',button).val(Drupal.t('Split summary at cursor')).toggle(split_teaser,join_teaser);$(checkbox).hide().children('input').attr('checked',true)};if(Drupal.behaviors.textarea&&teaser.is('.form-textarea:not(.textarea-processed)'))Drupal.behaviors.textarea(teaser.parentNode);if($(teaser).is(':disabled'))$(teaser).parent().hide()})};
Drupal.behaviors.autocomplete=function(context){var acdb=[];$('input.autocomplete:not(.autocomplete-processed)',context).each(function(){var uri=this.value;if(!acdb[uri])acdb[uri]=new Drupal.ACDB(uri);var input=$('#'+this.id.substr(0,this.id.length-13)).attr('autocomplete','OFF')[0];$(input.form).submit(Drupal.autocompleteSubmit);new Drupal.jsAC(input,acdb[uri]);$(this).addClass('autocomplete-processed')})};Drupal.autocompleteSubmit=function(){return $('#autocomplete').each(function(){this.owner.hidePopup()}).size()==0};Drupal.jsAC=function(input,db){var ac=this;this.input=input;this.db=db;$(this.input).keydown(function(event){return ac.onkeydown(this,event)}).keyup(function(event){ac.onkeyup(this,event)}).blur(function(){ac.hidePopup();ac.db.cancel()})};Drupal.jsAC.prototype.onkeydown=function(input,e){if(!e)e=window.event;switch(e.keyCode){case 40:this.selectDown();return false;case 38:this.selectUp();return false;default:return true}};Drupal.jsAC.prototype.onkeyup=function(input,e){if(!e)e=window.event;switch(e.keyCode){case 16:case 17:case 18:case 20:case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:return true;case 9:case 13:case 27:this.hidePopup(e.keyCode);return true;default:if(input.value.length>0){this.populatePopup()}else this.hidePopup(e.keyCode);return true}};Drupal.jsAC.prototype.select=function(node){this.input.value=node.autocompleteValue};Drupal.jsAC.prototype.selectDown=function(){if(this.selected&&this.selected.nextSibling){this.highlight(this.selected.nextSibling)}else{var lis=$('li',this.popup);if(lis.size()>0)this.highlight(lis.get(0))}};Drupal.jsAC.prototype.selectUp=function(){if(this.selected&&this.selected.previousSibling)this.highlight(this.selected.previousSibling)};Drupal.jsAC.prototype.highlight=function(node){if(this.selected)$(this.selected).removeClass('selected');$(node).addClass('selected');this.selected=node};Drupal.jsAC.prototype.unhighlight=function(node){$(node).removeClass('selected');this.selected=false};Drupal.jsAC.prototype.hidePopup=function(keycode){if(this.selected&&((keycode&&keycode!=46&&keycode!=8&&keycode!=27)||!keycode))this.input.value=this.selected.autocompleteValue;var popup=this.popup;if(popup){this.popup=null;$(popup).fadeOut('fast',function(){$(popup).remove()})};this.selected=false};Drupal.jsAC.prototype.populatePopup=function(){if(this.popup)$(this.popup).remove();this.selected=false;this.popup=document.createElement('div');this.popup.id='autocomplete';this.popup.owner=this;$(this.popup).css({marginTop:this.input.offsetHeight+'px',width:(this.input.offsetWidth-4)+'px',display:'none'});$(this.input).before(this.popup);this.db.owner=this;this.db.search(this.input.value)};Drupal.jsAC.prototype.found=function(matches){if(!this.input.value.length)return false;var ul=document.createElement('ul'),ac=this;for(key in matches){var li=document.createElement('li');$(li).html('<div>'+matches[key]+'</div>').mousedown(function(){ac.select(this)}).mouseover(function(){ac.highlight(this)}).mouseout(function(){ac.unhighlight(this)});li.autocompleteValue=key;$(ul).append(li)};if(this.popup)if(ul.childNodes.length>0){$(this.popup).empty().append(ul).show()}else{$(this.popup).css({visibility:'hidden'});this.hidePopup()}};Drupal.jsAC.prototype.setStatus=function(status){switch(status){case'begin':$(this.input).addClass('throbbing');break;case'cancel':case'error':case'found':$(this.input).removeClass('throbbing');break}};Drupal.ACDB=function(uri){this.uri=uri;this.delay=300;this.cache={}};Drupal.ACDB.prototype.search=function(searchString){var db=this;this.searchString=searchString;if(this.cache[searchString])return this.owner.found(this.cache[searchString]);if(this.timer)clearTimeout(this.timer);this.timer=setTimeout(function(){db.owner.setStatus('begin');$.ajax({type:"GET",url:db.uri+'/'+Drupal.encodeURIComponent(searchString),dataType:'json',success:function(matches){if(typeof matches.status=='undefined'||matches.status!=0){db.cache[searchString]=matches;if(db.searchString==searchString)db.owner.found(matches);db.owner.setStatus('found')}},error:function(xmlhttp){alert(Drupal.ahahError(xmlhttp,db.uri))}})},this.delay)};Drupal.ACDB.prototype.cancel=function(){if(this.owner)this.owner.setStatus('cancel');if(this.timer)clearTimeout(this.timer);this.searchString=''};
Drupal.verticalTabs=Drupal.verticalTabs||{};Drupal.settings.verticalTabs=Drupal.settings.verticalTabs||{};Drupal.behaviors.verticalTabs=function(){if(!$('.vertical-tabs-list').size()&&Drupal.settings.verticalTabs){var ul=$('<ul class="vertical-tabs-list"></ul>'),panes=$('<div class="vertical-tabs-panes"></div>');$.each(Drupal.settings.verticalTabs,function(k,v){var summary='',cssClass='vertical-tabs-list-'+k;if(v.callback&&Drupal.verticalTabs[v.callback]){summary='<span class="summary">'+Drupal.verticalTabs[v.callback].apply(this,v.args)+'</span>'}else cssClass+=' vertical-tabs-nosummary';$('<li class="vertical-tab-button"><a href="#'+k+'" class="'+cssClass+'"><strong>'+v.name+'</strong>'+summary+'</a></li>').appendTo(ul).find('a').bind('click',function(){$(this).parent().addClass('selected').siblings().removeClass('selected');$('.vertical-tabs-'+k).show().siblings('.vertical-tabs-pane').hide();return false});var fieldset=$('<fieldset></fieldset>'),fieldsetContents=$('.vertical-tabs-'+k+' > .fieldset-wrapper > *');if(fieldsetContents.size()){fieldsetContents.appendTo(fieldset)}else $('.vertical-tabs-'+k).children().appendTo(fieldset);fieldset.children('legend').remove();fieldset.appendTo(panes).addClass('vertical-tabs-'+k).addClass('vertical-tabs-pane').find('input, select, textarea').bind('change',function(){if(v.callback&&Drupal.verticalTabs[v.callback])$('a.vertical-tabs-list-'+k+' span.summary').html(Drupal.verticalTabs[v.callback].apply(this,v.args))});$('.vertical-tabs-'+k).remove()});$('div.vertical-tabs').html(ul).append(panes);$('fieldset.vertical-tabs-pane').each(function(i){if($(this).find('div.form-item .error').size())$('li.vertical-tab-button').eq(i).addClass('error')});$('fieldset.vertical-tabs-pane').hide();$('fieldset.vertical-tabs-pane:first').show();$('div.vertical-tabs ul li:first').addClass('first selected');$('div.vertical-tabs ul li:last').addClass('last');$('div.vertical-tabs').show()}};Drupal.behaviors.verticalTabsReload=function(){$.each(Drupal.settings.verticalTabs,function(k,v){if(v.callback&&Drupal.verticalTabs[v.callback])$('a.vertical-tabs-list-'+k+' span.summary').html(Drupal.verticalTabs[v.callback].apply(this,v.args))})};
