;;(function($){'use strict';$.HSCore={init:function(){$(document).ready(function(e){$('[data-toggle="tooltip"]').tooltip();if($('[data-bg-img-src]').length)$.HSCore.helpers.bgImage($('[data-bg-img-src]'));$.HSCore.helpers.extendjQuery();$.HSCore.helpers.detectIE();$.HSCore.helpers.bootstrapNavOptions.init();});$(window).on('load',function(e){});},components:{},helpers:{Math:{getRandomValueFromRange:function(startPoint,endPoint,fixed){var fixedInner=fixed?fixed:false;Math.random();return fixedInner?(Math.random()*(endPoint-startPoint)+startPoint):(Math.floor(Math.random()*(endPoint-startPoint+1))+startPoint);}},bgImage:function(collection){if(!collection||!collection.length)return;return collection.each(function(i,el){var $el=$(el),bgImageSrc=$el.data('bg-img-src');if(bgImageSrc)$el.css('background-image','url('+bgImageSrc+')');});},extendjQuery:function(){$.fn.extend({imagesLoaded:function(){var $imgs=this.find('img[src!=""]');if(!$imgs.length){return $.Deferred().resolve().promise();}
var dfds=[];$imgs.each(function(){var dfd=$.Deferred();dfds.push(dfd);var img=new Image();img.onload=function(){dfd.resolve();};img.onerror=function(){dfd.resolve();};img.src=this.src;});return $.when.apply($,dfds);}});},detectIE:function(){var ua=window.navigator.userAgent;var trident=ua.indexOf('Trident/');if(trident>0){var rv=ua.indexOf('rv:');var ieV=parseInt(ua.substring(rv+3,ua.indexOf('.',rv)),10);document.querySelector('body').className+=' IE';}
var edge=ua.indexOf('Edge/');if(edge>0){var ieV=parseInt(ua.substring(edge+5,ua.indexOf('.',edge)),10);document.querySelector('body').className+=' IE';}
return false;},bootstrapNavOptions:{init:function(){this.mobileHideOnScroll();},mobileHideOnScroll:function(){var $collection=$('.navbar');if(!$collection.length)return;var $w=$(window),breakpointsMap={'sm':576,'md':768,'lg':992,'xl':1200};$('body').on('click.HSMobileHideOnScroll','.navbar-toggler',function(e){var $navbar=$(this).closest('.navbar');if($navbar.length){$navbar.data('mobile-menu-scroll-position',$w.scrollTop());}
e.preventDefault();});$w.on('scroll.HSMobileHideOnScroll',function(e){$collection.each(function(i,el){var $this=$(el),$toggler,$nav,offset,$hamburgers,breakpoint;if($this.hasClass('navbar-expand-xl'))breakpoint=breakpointsMap['xl'];else if($this.hasClass('navbar-expand-lg'))breakpoint=breakpointsMap['lg'];else if($this.hasClass('navbar-expand-md'))breakpoint=breakpointsMap['md'];else if($this.hasClass('navbar-expand-xs'))breakpoint=breakpointsMap['xs'];if($w.width()>breakpoint)return;$toggler=$this.find('.navbar-toggler');$nav=$this.find('.navbar-collapse');if(!$nav.data('mobile-scroll-hide'))return;if($nav.length){offset=$this.data('mobile-menu-scroll-position');if(Math.abs($w.scrollTop()-offset)>40&&$nav.hasClass('show')){$toggler.trigger('click');$hamburgers=$toggler.find('.is-active');if($hamburgers.length){$hamburgers.removeClass('is-active');}}}});});}}},settings:{rtl:false}};$.HSCore.init();})(jQuery);;;(function($){'use strict';$.HSCore.components.HSHeader={_baseConfig:{headerFixMoment:0,headerFixEffect:'slide',breakpointsMap:{'md':768,'sm':576,'lg':992,'xl':1200}},init:function(element){if(!element||element.length!==1||element.data('HSHeader'))return;var self=this;this.element=element;this.config=$.extend(true,{},this._baseConfig,element.data());this.observers=this._detectObservers();this.fixMediaDifference(this.element);this.element.data('HSHeader',new HSHeader(this.element,this.config,this.observers));$(window).on('scroll.uHeader',function(e){element.data('HSHeader').notify();}).on('resize.uHeader',function(e){if(self.resizeTimeOutId)clearTimeout(self.resizeTimeOutId);self.resizeTimeOutId=setTimeout(function(){element.data('HSHeader').checkViewport().update();},100);}).trigger('scroll.uHeader');return this.element;},_detectObservers:function(){if(!this.element||!this.element.length)return;var observers={'xs':[],'sm':[],'md':[],'lg':[],'xl':[]};if(this.element.hasClass('u-header--has-hidden-element')){observers['xs'].push(new HSHeaderHasHiddenElement(this.element));}
if(this.element.hasClass('u-header--sticky-top')){if(this.element.hasClass('u-header--show-hide')){observers['xs'].push(new HSHeaderMomentShowHideObserver(this.element));}
else if(this.element.hasClass('u-header--toggle-section')){observers['xs'].push(new HSHeaderHideSectionObserver(this.element));}
if(this.element.hasClass('u-header--change-logo')){observers['xs'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance')){observers['xs'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--floating')){observers['xs'].push(new HSHeaderFloatingObserver(this.element));}
if(this.element.hasClass('u-header--invulnerable')){observers['xs'].push(new HSHeaderWithoutBehaviorObserver(this.element));}
if(this.element.hasClass('u-header--sticky-bottom')){if(this.element.hasClass('u-header--change-appearance')){observers['xs'].push(new HSHeaderChangeAppearanceObserver(this.element));}
if(this.element.hasClass('u-header--change-logo')){observers['xs'].push(new HSHeaderChangeLogoObserver(this.element));}}
if(this.element.hasClass('u-header--abs-top')||this.element.hasClass('u-header--static')){if(this.element.hasClass('u-header--show-hide')){observers['xs'].push(new HSHeaderShowHideObserver(this.element));}
if(this.element.hasClass('u-header--change-logo')){observers['xs'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance')){observers['xs'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--abs-bottom')||this.element.hasClass('u-header--abs-top-2nd-screen')){observers['xs'].push(new HSHeaderStickObserver(this.element));if(this.element.hasClass('u-header--change-appearance')){observers['xs'].push(new HSHeaderChangeAppearanceObserver(this.element,{fixPointSelf:true}));}
if(this.element.hasClass('u-header--change-logo')){observers['xs'].push(new HSHeaderChangeLogoObserver(this.element,{fixPointSelf:true}));}}
if(this.element.hasClass('u-header--has-hidden-element--sm')){observers['sm'].push(new HSHeaderHasHiddenElement(this.element));}
if(this.element.hasClass('u-header--sticky-top--sm')){if(this.element.hasClass('u-header--show-hide--sm')){observers['sm'].push(new HSHeaderMomentShowHideObserver(this.element));}
else if(this.element.hasClass('u-header--toggle-section--sm')){observers['sm'].push(new HSHeaderHideSectionObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--sm')){observers['sm'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--sm')){observers['sm'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--floating--sm')){observers['sm'].push(new HSHeaderFloatingObserver(this.element));}
if(this.element.hasClass('u-header--invulnerable--sm')){observers['sm'].push(new HSHeaderWithoutBehaviorObserver(this.element));}
if(this.element.hasClass('u-header--sticky-bottom--sm')){if(this.element.hasClass('u-header--change-appearance--sm')){observers['sm'].push(new HSHeaderChangeAppearanceObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--sm')){observers['sm'].push(new HSHeaderChangeLogoObserver(this.element));}}
if(this.element.hasClass('u-header--abs-top--sm')||this.element.hasClass('u-header--static--sm')){if(this.element.hasClass('u-header--show-hide--sm')){observers['sm'].push(new HSHeaderShowHideObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--sm')){observers['sm'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--sm')){observers['sm'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--abs-bottom--sm')||this.element.hasClass('u-header--abs-top-2nd-screen--sm')){observers['sm'].push(new HSHeaderStickObserver(this.element));if(this.element.hasClass('u-header--change-appearance--sm')){observers['sm'].push(new HSHeaderChangeAppearanceObserver(this.element,{fixPointSelf:true}));}
if(this.element.hasClass('u-header--change-logo--sm')){observers['sm'].push(new HSHeaderChangeLogoObserver(this.element,{fixPointSelf:true}));}}
if(this.element.hasClass('u-header--has-hidden-element--md')){observers['md'].push(new HSHeaderHasHiddenElement(this.element));}
if(this.element.hasClass('u-header--sticky-top--md')){if(this.element.hasClass('u-header--show-hide--md')){observers['md'].push(new HSHeaderMomentShowHideObserver(this.element));}
else if(this.element.hasClass('u-header--toggle-section--md')){observers['md'].push(new HSHeaderHideSectionObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--md')){observers['md'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--md')){observers['md'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--floating--md')){observers['md'].push(new HSHeaderFloatingObserver(this.element));}
if(this.element.hasClass('u-header--invulnerable--md')){observers['md'].push(new HSHeaderWithoutBehaviorObserver(this.element));}
if(this.element.hasClass('u-header--sticky-bottom--md')){if(this.element.hasClass('u-header--change-appearance--md')){observers['md'].push(new HSHeaderChangeAppearanceObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--md')){observers['md'].push(new HSHeaderChangeLogoObserver(this.element));}}
if(this.element.hasClass('u-header--abs-top--md')||this.element.hasClass('u-header--static--md')){if(this.element.hasClass('u-header--show-hide--md')){observers['md'].push(new HSHeaderShowHideObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--md')){observers['md'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--md')){observers['md'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--abs-bottom--md')||this.element.hasClass('u-header--abs-top-2nd-screen--md')){observers['md'].push(new HSHeaderStickObserver(this.element));if(this.element.hasClass('u-header--change-appearance--md')){observers['md'].push(new HSHeaderChangeAppearanceObserver(this.element,{fixPointSelf:true}));}
if(this.element.hasClass('u-header--change-logo--md')){observers['md'].push(new HSHeaderChangeLogoObserver(this.element,{fixPointSelf:true}));}}
if(this.element.hasClass('u-header--has-hidden-element--lg')){observers['lg'].push(new HSHeaderHasHiddenElement(this.element));}
if(this.element.hasClass('u-header--sticky-top--lg')){if(this.element.hasClass('u-header--show-hide--lg')){observers['lg'].push(new HSHeaderMomentShowHideObserver(this.element));}
else if(this.element.hasClass('u-header--toggle-section--lg')){observers['lg'].push(new HSHeaderHideSectionObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--lg')){observers['lg'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--lg')){observers['lg'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--floating--lg')){observers['lg'].push(new HSHeaderFloatingObserver(this.element));}
if(this.element.hasClass('u-header--invulnerable--lg')){observers['lg'].push(new HSHeaderWithoutBehaviorObserver(this.element));}
if(this.element.hasClass('u-header--sticky-bottom--lg')){if(this.element.hasClass('u-header--change-appearance--lg')){observers['lg'].push(new HSHeaderChangeAppearanceObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--lg')){observers['lg'].push(new HSHeaderChangeLogoObserver(this.element));}}
if(this.element.hasClass('u-header--abs-top--lg')||this.element.hasClass('u-header--static--lg')){if(this.element.hasClass('u-header--show-hide--lg')){observers['lg'].push(new HSHeaderShowHideObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--lg')){observers['lg'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--lg')){observers['lg'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--abs-bottom--lg')||this.element.hasClass('u-header--abs-top-2nd-screen--lg')){observers['lg'].push(new HSHeaderStickObserver(this.element));if(this.element.hasClass('u-header--change-appearance--lg')){observers['lg'].push(new HSHeaderChangeAppearanceObserver(this.element,{fixPointSelf:true}));}
if(this.element.hasClass('u-header--change-logo--lg')){observers['lg'].push(new HSHeaderChangeLogoObserver(this.element,{fixPointSelf:true}));}}
if(this.element.hasClass('u-header--has-hidden-element--xl')){observers['xl'].push(new HSHeaderHasHiddenElement(this.element));}
if(this.element.hasClass('u-header--sticky-top--xl')){if(this.element.hasClass('u-header--show-hide--xl')){observers['xl'].push(new HSHeaderMomentShowHideObserver(this.element));}
else if(this.element.hasClass('u-header--toggle-section--xl')){observers['xl'].push(new HSHeaderHideSectionObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--xl')){observers['xl'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--xl')){observers['xl'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--floating--xl')){observers['xl'].push(new HSHeaderFloatingObserver(this.element));}
if(this.element.hasClass('u-header--invulnerable--xl')){observers['xl'].push(new HSHeaderWithoutBehaviorObserver(this.element));}
if(this.element.hasClass('u-header--sticky-bottom--xl')){if(this.element.hasClass('u-header--change-appearance--xl')){observers['xl'].push(new HSHeaderChangeAppearanceObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--xl')){observers['xl'].push(new HSHeaderChangeLogoObserver(this.element));}}
if(this.element.hasClass('u-header--abs-top--xl')||this.element.hasClass('u-header--static--xl')){if(this.element.hasClass('u-header--show-hide--xl')){observers['xl'].push(new HSHeaderShowHideObserver(this.element));}
if(this.element.hasClass('u-header--change-logo--xl')){observers['xl'].push(new HSHeaderChangeLogoObserver(this.element));}
if(this.element.hasClass('u-header--change-appearance--xl')){observers['xl'].push(new HSHeaderChangeAppearanceObserver(this.element));}}
if(this.element.hasClass('u-header--abs-bottom--xl')||this.element.hasClass('u-header--abs-top-2nd-screen--xl')){observers['xl'].push(new HSHeaderStickObserver(this.element));if(this.element.hasClass('u-header--change-appearance--xl')){observers['xl'].push(new HSHeaderChangeAppearanceObserver(this.element,{fixPointSelf:true}));}
if(this.element.hasClass('u-header--change-logo--xl')){observers['xl'].push(new HSHeaderChangeLogoObserver(this.element,{fixPointSelf:true}));}}
return observers;},fixMediaDifference:function(element){if(!element||!element.length||!element.filter('[class*="u-header--side"]').length)return;var toggleable;if(element.hasClass('u-header--side-left--xl')||element.hasClass('u-header--side-right--xl')){toggleable=element.find('.navbar-expand-xl');if(toggleable.length){toggleable.removeClass('navbar-expand-xl').addClass('navbar-expand-lg');}}
else if(element.hasClass('u-header--side-left--lg')||element.hasClass('u-header--side-right--lg')){toggleable=element.find('.navbar-expand-lg');if(toggleable.length){toggleable.removeClass('navbar-expand-lg').addClass('navbar-expand-md');}}
else if(element.hasClass('u-header--side-left--md')||element.hasClass('u-header--side-right--md')){toggleable=element.find('.navbar-expand-md');if(toggleable.length){toggleable.removeClass('navbar-expand-md').addClass('navbar-expand-sm');}}
else if(element.hasClass('u-header--side-left--sm')||element.hasClass('u-header--side-right--sm')){toggleable=element.find('.navbar-expand-sm');if(toggleable.length){toggleable.removeClass('navbar-expand-sm').addClass('navbar-expand');}}}}
function HSHeader(element,config,observers){if(!element||!element.length)return;this.element=element;this.config=config;this.observers=observers&&$.isPlainObject(observers)?observers:{};this.viewport='xs';this.checkViewport();}
HSHeader.prototype.checkViewport=function(){var $w=$(window);if($w.width()>this.config.breakpointsMap['sm']&&this.observers['sm'].length){this.prevViewport=this.viewport;this.viewport='sm';return this;}
if($w.width()>this.config.breakpointsMap['md']&&this.observers['md'].length){this.prevViewport=this.viewport;this.viewport='md';return this;}
if($w.width()>this.config.breakpointsMap['lg']&&this.observers['lg'].length){this.prevViewport=this.viewport;this.viewport='lg';return this;}
if($w.width()>this.config.breakpointsMap['xl']&&this.observers['xl'].length){this.prevViewport=this.viewport;this.viewport='xl';return this;}
if(this.prevViewport)this.prevViewport=this.viewport;this.viewport='xs';return this;}
HSHeader.prototype.notify=function(){if(this.prevViewport){this.observers[this.prevViewport].forEach(function(observer){observer.destroy();});this.prevViewport=null;}
this.observers[this.viewport].forEach(function(observer){observer.check();});return this;}
HSHeader.prototype.update=function(){for(var viewport in this.observers){this.observers[viewport].forEach(function(observer){observer.destroy();});}
this.prevViewport=null;this.observers[this.viewport].forEach(function(observer){observer.reinit();});return this;}
function HSAbstractObserver(element){if(!element||!element.length)return;this.element=element;this.defaultState=true;this.reinit=function(){this.destroy().init().check();}
return true;}
function HSHeaderStickObserver(element){if(!HSAbstractObserver.call(this,element))return;this.init();}
HSHeaderStickObserver.prototype.init=function(){this.defaultState=true;this.offset=this.element.offset().top;return this;}
HSHeaderStickObserver.prototype.destroy=function(){this.toDefaultState();return this;}
HSHeaderStickObserver.prototype.check=function(){var $w=$(window),docScrolled=$w.scrollTop();if(docScrolled>this.offset&&this.defaultState){this.changeState();}
else if(docScrolled<this.offset&&!this.defaultState){this.toDefaultState();}
return this;}
HSHeaderStickObserver.prototype.changeState=function(){this.element.addClass('js-header-fix-moment');this.defaultState=!this.defaultState;return this;}
HSHeaderStickObserver.prototype.toDefaultState=function(){this.element.removeClass('js-header-fix-moment');this.defaultState=!this.defaultState;return this;}
function HSHeaderMomentShowHideObserver(element){if(!HSAbstractObserver.call(this,element))return;this.init();}
HSHeaderMomentShowHideObserver.prototype.init=function(){this.direction='down';this.delta=0;this.defaultState=true;this.offset=isFinite(this.element.data('header-fix-moment'))&&this.element.data('header-fix-moment')!=0?this.element.data('header-fix-moment'):5;this.effect=this.element.data('header-fix-effect')?this.element.data('header-fix-effect'):'show-hide';return this;}
HSHeaderMomentShowHideObserver.prototype.destroy=function(){this.toDefaultState();return this;}
HSHeaderMomentShowHideObserver.prototype.checkDirection=function(){if($(window).scrollTop()>this.delta){this.direction='down';}
else{this.direction='up';}
this.delta=$(window).scrollTop();return this;}
HSHeaderMomentShowHideObserver.prototype.toDefaultState=function(){switch(this.effect){case'slide':this.element.removeClass('u-header--moved-up');break;case'fade':this.element.removeClass('u-header--faded');break;default:this.element.removeClass('u-header--invisible');}
this.defaultState=!this.defaultState;return this;}
HSHeaderMomentShowHideObserver.prototype.changeState=function(){switch(this.effect){case'slide':this.element.addClass('u-header--moved-up');break;case'fade':this.element.addClass('u-header--faded');break;default:this.element.addClass('u-header--invisible');}
this.defaultState=!this.defaultState;return this;}
HSHeaderMomentShowHideObserver.prototype.check=function(){var docScrolled=$(window).scrollTop();this.checkDirection();if(docScrolled>=this.offset&&this.defaultState&&this.direction=='down'){this.changeState();}
else if(!this.defaultState&&this.direction=='up'){this.toDefaultState();}
return this;}
function HSHeaderShowHideObserver(element){if(!HSAbstractObserver.call(this,element))return;this.init();}
HSHeaderShowHideObserver.prototype.init=function(){if(!this.defaultState&&$(window).scrollTop()>this.offset)return this;this.defaultState=true;this.transitionDuration=parseFloat(getComputedStyle(this.element.get(0))['transition-duration'],10)*1000;this.offset=isFinite(this.element.data('header-fix-moment'))&&this.element.data('header-fix-moment')>this.element.outerHeight()?this.element.data('header-fix-moment'):this.element.outerHeight()+100;this.effect=this.element.data('header-fix-effect')?this.element.data('header-fix-effect'):'show-hide';return this;}
HSHeaderShowHideObserver.prototype.destroy=function(){if(!this.defaultState&&$(window).scrollTop()>this.offset)return this;this.element.removeClass('u-header--untransitioned');this._removeCap();return this;}
HSHeaderShowHideObserver.prototype._insertCap=function(){this.element.addClass('js-header-fix-moment u-header--untransitioned');if(this.element.hasClass('u-header--static')){$('html').css('padding-top',this.element.outerHeight());}
switch(this.effect){case'fade':this.element.addClass('u-header--faded');break;case'slide':this.element.addClass('u-header--moved-up');break;default:this.element.addClass('u-header--invisible')}
this.capInserted=true;}
HSHeaderShowHideObserver.prototype._removeCap=function(){var self=this;this.element.removeClass('js-header-fix-moment');if(this.element.hasClass('u-header--static')){$('html').css('padding-top',0);}
if(this.removeCapTimeOutId)clearTimeout(this.removeCapTimeOutId);this.removeCapTimeOutId=setTimeout(function(){self.element.removeClass('u-header--moved-up u-header--faded u-header--invisible');},10);this.capInserted=false;}
HSHeaderShowHideObserver.prototype.check=function(){var $w=$(window);if($w.scrollTop()>this.element.outerHeight()&&!this.capInserted){this._insertCap();}
else if($w.scrollTop()<=this.element.outerHeight()&&this.capInserted){this._removeCap();}
if($w.scrollTop()>this.offset&&this.defaultState){this.changeState();}
else if($w.scrollTop()<=this.offset&&!this.defaultState){this.toDefaultState();}}
HSHeaderShowHideObserver.prototype.changeState=function(){this.element.removeClass('u-header--untransitioned');if(this.animationTimeoutId)clearTimeout(this.animationTimeoutId);switch(this.effect){case'fade':this.element.removeClass('u-header--faded');break;case'slide':this.element.removeClass('u-header--moved-up');break;default:this.element.removeClass('u-header--invisible');}
this.defaultState=!this.defaultState;}
HSHeaderShowHideObserver.prototype.toDefaultState=function(){var self=this;this.animationTimeoutId=setTimeout(function(){self.element.addClass('u-header--untransitioned');},this.transitionDuration);switch(this.effect){case'fade':this.element.addClass('u-header--faded');break;case'slide':this.element.addClass('u-header--moved-up');break;default:this.element.addClass('u-header--invisible');}
this.defaultState=!this.defaultState;}
function HSHeaderChangeLogoObserver(element,config){if(!HSAbstractObserver.call(this,element))return;this.config={fixPointSelf:false}
if(config&&$.isPlainObject(config))this.config=$.extend(true,{},this.config,config);this.init();}
HSHeaderChangeLogoObserver.prototype.init=function(){if(this.element.hasClass('js-header-fix-moment')){this.hasFixedClass=true;this.element.removeClass('js-header-fix-moment');}
if(this.config.fixPointSelf){this.offset=this.element.offset().top;}
else{this.offset=isFinite(this.element.data('header-fix-moment'))?this.element.data('header-fix-moment'):0;}
if(this.hasFixedClass){this.hasFixedClass=false;this.element.addClass('js-header-fix-moment');}
this.imgs=this.element.find('.u-header__logo-img');this.defaultState=true;this.mainLogo=this.imgs.filter('.u-header__logo-img--main');this.additionalLogo=this.imgs.not('.u-header__logo-img--main');if(!this.imgs.length)return this;return this;}
HSHeaderChangeLogoObserver.prototype.destroy=function(){this.toDefaultState();return this;}
HSHeaderChangeLogoObserver.prototype.check=function(){var $w=$(window);if(!this.imgs.length)return this;if($w.scrollTop()>this.offset&&this.defaultState){this.changeState();}
else if($w.scrollTop()<=this.offset&&!this.defaultState){this.toDefaultState();}
return this;}
HSHeaderChangeLogoObserver.prototype.changeState=function(){if(this.mainLogo.length){this.mainLogo.removeClass('u-header__logo-img--main');}
if(this.additionalLogo.length){this.additionalLogo.addClass('u-header__logo-img--main');}
this.defaultState=!this.defaultState;return this;}
HSHeaderChangeLogoObserver.prototype.toDefaultState=function(){if(this.mainLogo.length){this.mainLogo.addClass('u-header__logo-img--main');}
if(this.additionalLogo.length){this.additionalLogo.removeClass('u-header__logo-img--main');}
this.defaultState=!this.defaultState;return this;}
function HSHeaderHideSectionObserver(element){if(!HSAbstractObserver.call(this,element))return;this.init();}
HSHeaderHideSectionObserver.prototype.init=function(){this.offset=isFinite(this.element.data('header-fix-moment'))?this.element.data('header-fix-moment'):5;this.section=this.element.find('.u-header__section--hidden');this.defaultState=true;this.sectionHeight=this.section.length?this.section.outerHeight():0;return this;}
HSHeaderHideSectionObserver.prototype.destroy=function(){if(this.section.length){this.element.css({'margin-top':0});}
return this;}
HSHeaderHideSectionObserver.prototype.check=function(){if(!this.section.length)return this;var $w=$(window),docScrolled=$w.scrollTop();if(docScrolled>this.offset&&this.defaultState){this.changeState();}
else if(docScrolled<=this.offset&&!this.defaultState){this.toDefaultState();}
return this;}
HSHeaderHideSectionObserver.prototype.changeState=function(){var self=this;this.element.stop().animate({'margin-top':self.sectionHeight*-1-1});this.defaultState=!this.defaultState;return this;}
HSHeaderHideSectionObserver.prototype.toDefaultState=function(){this.element.stop().animate({'margin-top':0});this.defaultState=!this.defaultState;return this;}
function HSHeaderChangeAppearanceObserver(element,config){if(!HSAbstractObserver.call(this,element))return;this.config={fixPointSelf:false}
if(config&&$.isPlainObject(config))this.config=$.extend(true,{},this.config,config);this.init();}
HSHeaderChangeAppearanceObserver.prototype.init=function(){if(this.element.hasClass('js-header-fix-moment')){this.hasFixedClass=true;this.element.removeClass('js-header-fix-moment');}
if(this.config.fixPointSelf){this.offset=this.element.offset().top;}
else{this.offset=isFinite(this.element.data('header-fix-moment'))?this.element.data('header-fix-moment'):5;}
if(this.hasFixedClass){this.hasFixedClass=false;this.element.addClass('js-header-fix-moment');}
this.sections=this.element.find('[data-header-fix-moment-classes]');this.defaultState=true;return this;}
HSHeaderChangeAppearanceObserver.prototype.destroy=function(){this.toDefaultState();return this;}
HSHeaderChangeAppearanceObserver.prototype.check=function(){if(!this.sections.length)return this;var $w=$(window),docScrolled=$w.scrollTop();if(docScrolled>this.offset&&this.defaultState){this.changeState();}
else if(docScrolled<=this.offset&&!this.defaultState){this.toDefaultState();}
return this;}
HSHeaderChangeAppearanceObserver.prototype.changeState=function(){this.sections.each(function(i,el){var $this=$(el),classes=$this.data('header-fix-moment-classes'),exclude=$this.data('header-fix-moment-exclude');if(!classes&&!exclude)return;$this.addClass(classes+' js-header-change-moment');$this.removeClass(exclude);});this.defaultState=!this.defaultState;return this;}
HSHeaderChangeAppearanceObserver.prototype.toDefaultState=function(){this.sections.each(function(i,el){var $this=$(el),classes=$this.data('header-fix-moment-classes'),exclude=$this.data('header-fix-moment-exclude');if(!classes&&!exclude)return;$this.removeClass(classes+' js-header-change-moment');$this.addClass(exclude);});this.defaultState=!this.defaultState;return this;}
function HSHeaderHasHiddenElement(element,config){if(!HSAbstractObserver.call(this,element))return;this.config={animated:true}
if(config&&$.isPlainObject(config))this.config=$.extend(true,{},this.config,config);this.init();}
HSHeaderHasHiddenElement.prototype.init=function(){this.offset=isFinite(this.element.data('header-fix-moment'))?this.element.data('header-fix-moment'):5;this.elements=this.element.find('.u-header--hidden-element');this.defaultState=true;return this;}
HSHeaderHasHiddenElement.prototype.destroy=function(){this.toDefaultState();return this;}
HSHeaderHasHiddenElement.prototype.check=function(){if(!this.elements.length)return this;var $w=$(window),docScrolled=$w.scrollTop();if(docScrolled>this.offset&&this.defaultState){this.changeState();}
else if(docScrolled<=this.offset&&!this.defaultState){this.toDefaultState();}
return this;}
HSHeaderHasHiddenElement.prototype.changeState=function(){if(this.config.animated){this.elements.stop().slideUp();}
else{this.elements.hide();}
this.defaultState=!this.defaultState;return this;}
HSHeaderHasHiddenElement.prototype.toDefaultState=function(){if(this.config.animated){this.elements.stop().slideDown();}
else{this.elements.show();}
this.defaultState=!this.defaultState;return this;}
function HSHeaderFloatingObserver(element,config){if(!HSAbstractObserver.call(this,element))return;this.config=config&&$.isPlainObject(config)?$.extend(true,{},this.config,config):{};this.init();}
HSHeaderFloatingObserver.prototype.init=function(){this.offset=this.element.offset().top;this.sections=this.element.find('.u-header__section');this.defaultState=true;return this;}
HSHeaderFloatingObserver.prototype.destroy=function(){this.toDefaultState();return this;}
HSHeaderFloatingObserver.prototype.check=function(){var $w=$(window),docScrolled=$w.scrollTop();if(docScrolled>this.offset&&this.defaultState){this.changeState();}
else if(docScrolled<=this.offset&&!this.defaultState){this.toDefaultState();}
return this;}
HSHeaderFloatingObserver.prototype.changeState=function(){this.element.addClass('js-header-fix-moment').addClass(this.element.data('header-fix-moment-classes')).removeClass(this.element.data('header-fix-moment-exclude'));if(this.sections.length){this.sections.each(function(i,el){var $section=$(el);$section.addClass($section.data('header-fix-moment-classes')).removeClass($section.data('header-fix-moment-exclude'));});}
this.defaultState=!this.defaultState;return this;}
HSHeaderFloatingObserver.prototype.toDefaultState=function(){this.element.removeClass('js-header-fix-moment').removeClass(this.element.data('header-fix-moment-classes')).addClass(this.element.data('header-fix-moment-exclude'));if(this.sections.length){this.sections.each(function(i,el){var $section=$(el);$section.removeClass($section.data('header-fix-moment-classes')).addClass($section.data('header-fix-moment-exclude'));});}
this.defaultState=!this.defaultState;return this;}
function HSHeaderWithoutBehaviorObserver(element){if(!HSAbstractObserver.call(this,element))return;}
HSHeaderWithoutBehaviorObserver.prototype.check=function(){return this;}
HSHeaderWithoutBehaviorObserver.prototype.init=function(){return this;}
HSHeaderWithoutBehaviorObserver.prototype.destroy=function(){return this;}
HSHeaderWithoutBehaviorObserver.prototype.changeState=function(){return this;}
HSHeaderWithoutBehaviorObserver.prototype.toDefaultState=function(){return this;}})(jQuery);;;(function($){'use strict';$.HSCore.helpers.HSHamburgers={init:function(selector){if(!selector||!$(selector).length)return;var hamburgers=$(selector),timeoutid;hamburgers.each(function(i,el){var $this=$(this);if($this.closest('button').length){$this.closest('button').get(0).addEventListener('click',function(e){var $self=$(this),$hamburger=$self.find(selector);if(timeoutid)clearTimeout(timeoutid);timeoutid=setTimeout(function(){$hamburger.toggleClass('is-active');},10);e.preventDefault();},false);}
else{$this.get(0).addEventListener('click',function(e){var $self=$(this);if(timeoutid)clearTimeout(timeoutid);timeoutid=setTimeout(function(){$self.toggleClass('is-active');},10);e.preventDefault();},false);}});}};})(jQuery);;;(function($){'use strict';$.HSCore.components.HSTabs={_baseConfig:{},pageCollection:$(),init:function(selector,config){this.collection=selector&&$(selector).length?$(selector):$();if(!$(selector).length)return;this.config=config&&$.isPlainObject(config)?$.extend({},this._baseConfig,config):this._baseConfig;this.config.itemSelector=selector;this.initTabs();return this.pageCollection;},initTabs:function(){var $self=this,collection=$self.pageCollection;this.collection.each(function(i,el){var windW=$(window).width(),$tabs=$(el),$tabsItem=$tabs.find('.nav-item'),tabsType=$tabs.data('tabs-mobile-type'),controlClasses=$tabs.data('btn-classes'),context=$tabs.parent(),$tabsContent=$('#'+$tabs.data('target')),$tabsContentItem=$tabsContent.find('.tab-pane');if(windW<767){$('body').on('click',function(){if(tabsType){$tabs.slideUp(200);}else{$tabs.find('.nav-inner').slideUp(200);}});}else{$('body').off('click');}
if(windW>767&&tabsType){$tabs.removeAttr('style');$tabsContentItem.removeAttr('style');context.off('click','.js-tabs-mobile-control');context.off('click','[role="tab"]');if(tabsType=='accordion'){$tabsContent.find('.js-tabs-mobile-control').remove();}else{context.find('.js-tabs-mobile-control').remove();}
return;}
if(windW<768&&tabsType=='accordion'){$self.accordionEffect($tabsContent,$tabsItem,$tabsContentItem,controlClasses);}else if(windW<768&&tabsType=='slide-up-down'){$self.slideUpDownEffect(context,$tabs,controlClasses);}
collection=collection.add($tabs);});},slideUpDownEffect:function(context,menu,btnClasses){if(context.find('.js-tabs-mobile-control').length)return;var activeItemHTML=menu.find('.active').html();$(menu).before('<a class="js-tabs-mobile-control '+btnClasses+'" href="#">'+activeItemHTML+'</a>');context.on('click','.js-tabs-mobile-control',function(e){e.stopPropagation();e.preventDefault();$(menu).slideToggle(200);});context.on('click','[role="tab"]',function(e){e.preventDefault();var thisHTML=$(this).html(),$targetControl=$(this).closest('ul').prev('.js-tabs-mobile-control');$targetControl.html(thisHTML);$(menu).slideUp(200);});},accordionEffect:function(context,menuItem,menu,btnClasses){if(context.find('.js-tabs-mobile-control').length)return;$(menu).before('<a class="js-tabs-mobile-control '+btnClasses+'" href="#"></a>');menuItem.each(function(){var thisIndex=$(this).index(),thisHTML=$(this).find('[role="tab"]').html();if($(this).find('[role="tab"]').hasClass('active')){$(menu[thisIndex]).prev().addClass('active');}
$(menu[thisIndex]).prev().html(thisHTML);});context.on('click','.js-tabs-mobile-control',function(e){e.preventDefault();if($(this).hasClass('active'))return;var contextID=context.attr('id');context.find('.js-tabs-mobile-control').removeClass('active');$('[data-target="'+contextID+'"]').find('.nav-link').removeClass('active');var $target=$(this).next(),targetID=$target.attr('id');if($target.hasClass('fade')){$(this).addClass('active');$('[href="#'+targetID+'"]').addClass('active');$(menu).slideUp(200);$target.slideDown(200,function(){context.find('[role="tabpanel"]').removeClass('show active');$target.addClass('show active');});}else{$(this).addClass('active');$(menu).slideUp(200);$target.slideDown(200);}});}}})(jQuery);;;(function($){'use strict';$.HSCore.components.HSGoTo={_baseConfig:{},pageCollection:$(),init:function(selector,config){this.collection=selector&&$(selector).length?$(selector):$();if(!$(selector).length)return;this.config=config&&$.isPlainObject(config)?$.extend({},this._baseConfig,config):this._baseConfig;this.config.itemSelector=selector;this.initGoTo();return this.pageCollection;},initGoTo:function(){var $self=this,collection=$self.pageCollection;this.collection.each(function(i,el){var $this=$(el),$target=$this.data('target'),type=$this.data('type'),showEffect=$this.data('show-effect'),hideEffect=$this.data('hide-effect'),position=JSON.parse(el.getAttribute('data-position')),compensation=$($this.data('compensation')).outerHeight(),offsetTop=$this.data('offset-top'),targetOffsetTop=function(){if(compensation){return $target?$($target).offset().top-compensation:0;}else{return $target?$($target).offset().top:0;}};if(type=='static'){$this.css({'display':'inline-block'});}else{$this.addClass('animated').css({'display':'inline-block','position':type,'opacity':0});}
if(type=='fixed'||type=='absolute'){$this.css(position);}
$this.on('click',function(e){e.preventDefault();$('html, body').stop().animate({'scrollTop':targetOffsetTop()},800);});if(!$this.data('offset-top')&&!$this.hasClass('js-animation-was-fired')&&type!='static'){if($this.offset().top<=$(window).height()){$this.show();setTimeout(function(){$this.addClass('js-animation-was-fired '+showEffect).css({'opacity':''});});}}
if(type!='static'){$(window).on('scroll',function(){if($this.data('offset-top')){if($(window).scrollTop()>=offsetTop&&!$this.hasClass('js-animation-was-fired')){$this.show();setTimeout(function(){$this.addClass('js-animation-was-fired '+showEffect).css({'opacity':''});});}else if($(window).scrollTop()<=offsetTop&&$this.hasClass('js-animation-was-fired')){$this.removeClass('js-animation-was-fired '+showEffect);setTimeout(function(){$this.addClass(hideEffect).css({'opacity':0});},100);setTimeout(function(){$this.removeClass(hideEffect).hide();},400);}}else{var thisOffsetTop=$this.offset().top;if(!$this.hasClass('js-animation-was-fired')){if($(window).scrollTop()>=thisOffsetTop-$(window).height()){$this.show();setTimeout(function(){$this.addClass('js-animation-was-fired '+showEffect).css({'opacity':''});});}}}});$(window).trigger('scroll');}
collection=collection.add($this);});}};})(jQuery);