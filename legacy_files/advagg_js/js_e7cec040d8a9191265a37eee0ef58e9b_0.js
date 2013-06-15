Drupal.behaviors.tableSelect=function(context){$('form table:has(th.select-all):not(.tableSelect-processed)',context).each(Drupal.tableSelect)};Drupal.tableSelect=function(){if($('td input:checkbox',this).size()==0)return;var table=this,checkboxes,lastChecked,strings={selectAll:Drupal.t('Select all rows in this table'),selectNone:Drupal.t('Deselect all rows in this table')},updateSelectAll=function(state){$('th.select-all input:checkbox',table).each(function(){$(this).attr('title',state?strings.selectNone:strings.selectAll);this.checked=state})};$('th.select-all',table).prepend($('<input type="checkbox" class="form-checkbox" />').attr('title',strings.selectAll)).click(function(event){if($(event.target).is('input:checkbox')){checkboxes.each(function(){this.checked=event.target.checked;$(this).parents('tr:first')[this.checked?'addClass':'removeClass']('selected')});updateSelectAll(event.target.checked)}});checkboxes=$('td input:checkbox',table).click(function(e){$(this).parents('tr:first')[this.checked?'addClass':'removeClass']('selected');if(e.shiftKey&&lastChecked&&lastChecked!=e.target)Drupal.tableSelectRange($(e.target).parents('tr')[0],$(lastChecked).parents('tr')[0],e.target.checked);updateSelectAll((checkboxes.length==$(checkboxes).filter(':checked').length));lastChecked=e.target});$(this).addClass('tableSelect-processed')};Drupal.tableSelectRange=function(from,to,state){var mode=from.rowIndex>to.rowIndex?'previousSibling':'nextSibling';for(var i=from[mode];i;i=i[mode]){if(i.nodeType!=1)continue;$(i)[state?'addClass':'removeClass']('selected');$('input:checkbox',i).each(function(){this.checked=state});if(to.nodeType){if(i==to)break}else if(jQuery.filter(to,[i]).r.length)break}};
Drupal.tableHeaderDoScroll=function(){if(typeof(Drupal.tableHeaderOnScroll)=='function')Drupal.tableHeaderOnScroll()};Drupal.behaviors.tableHeader=function(context){if(jQuery.browser.msie&&parseInt(jQuery.browser.version,10)<7)return;var headers=[];$('table.sticky-enabled thead:not(.tableHeader-processed)',context).each(function(){var headerClone=$(this).clone(true).insertBefore(this.parentNode).wrap('<table class="sticky-header"></table>').parent().css({position:'fixed',top:'0px'});headerClone=$(headerClone)[0];headers.push(headerClone);var table=$(this).parent('table')[0];headerClone.table=table;tracker(headerClone);$(table).addClass('sticky-table');$(this).addClass('tableHeader-processed')});var prevAnchor=''
function tracker(e){var viewHeight=document.documentElement.scrollHeight||document.body.scrollHeight;if(e.viewHeight!=viewHeight){e.viewHeight=viewHeight;e.vPosition=$(e.table).offset().top-4;e.hPosition=$(e.table).offset().left;e.vLength=e.table.clientHeight-100;var parentCell=$('th',e.table);$('th',e).each(function(index){var cellWidth=parentCell.eq(index).css('width');if(cellWidth=='auto')cellWidth=parentCell.get(index).clientWidth+'px';$(this).css('width',cellWidth)});$(e).css('width',$(e.table).css('width'))};var hScroll=document.documentElement.scrollLeft||document.body.scrollLeft,vOffset=(document.documentElement.scrollTop||document.body.scrollTop)-e.vPosition,visState=(vOffset>0&&vOffset<e.vLength)?'visible':'hidden';$(e).css({left:-hScroll+e.hPosition+'px',visibility:visState});if(prevAnchor!=location.hash){if(location.hash!=''){var offset=$('td'+location.hash).offset();if(offset){var top=offset.top,scrollLocation=top-$(e).height();$('body, html').scrollTop(scrollLocation)}};prevAnchor=location.hash}};if(!$('body').hasClass('tableHeader-processed')){$('body').addClass('tableHeader-processed');$(window).scroll(Drupal.tableHeaderDoScroll);$(document.documentElement).scroll(Drupal.tableHeaderDoScroll)};Drupal.tableHeaderOnScroll=function(){$(headers).each(function(){tracker(this)})};var time=null,resize=function(){if(time)return;time=setTimeout(function(){$('table.sticky-header').each(function(){this.viewHeight=0;tracker(this)});time=null},250)};$(window).resize(resize)};
Drupal.behaviors.tao=function(context){$('fieldset.collapsible:not(.tao-processed) > legend > .fieldset-title').each(function(){var fieldset=$(this).parents('fieldset').eq(0);fieldset.addClass('tao-processed');if($('input.error, textarea.error, select.error',fieldset).size()>0)$(fieldset).removeClass('collapsed');$(this).click(function(){if(fieldset.is('.collapsed')){$(fieldset).removeClass('collapsed').children('.fieldset-content').show()}else $(fieldset).addClass('collapsed').children('.fieldset-content').hide();return false})})};
Drupal.behaviors.rubik=function(context){$('div.form:has(div.column-main div.buttons):not(.rubik-processed)').each(function(){var form=$(this),offset=$('div.column-side div.buttons',form).height()+$('div.column-side div.buttons',form).offset().top;$(window).scroll(function(){if($(this).scrollTop()>offset){$('div.column-main div.buttons',form).show()}else $('div.column-main div.buttons',form).hide()});form.addClass('rubik-processed')});$('a.toggler:not(.rubik-processed)',context).each(function(){var id=$(this).attr('href').split('#')[1];if($('#'+id).size()>0){$(this).click(function(){toggleable=$('#'+id);toggleable.toggle();$(this).toggleClass('toggler-active');return false})}else{$(this).addClass('toggler-disabled');$(this).click(function(){return false})};$(this).addClass('rubik-processed')})};
