jQuery(document).ready(function () {
    
    //--------------------------------
    var wsj_LastPp;
    //--------------------------------
    $('form').submit(function(event){
        var result = true;
        $(this).find('input[name="phone"]').each (function (){
            if($(this).val().length <= 0) {
                result = false;   
            } 
        });
        if (!result) {
            $(this).find('input[name="phone"]').css({border:'1px solid #d12727'});
            return false;
        }
        var data = $(this).serialize();
        $.ajax({
          type: 'POST',
          data: data,
          success: function(data) {
            $(wsj_LastPp).hide(function(){
                if ($('#wsj-btn-thank').length <= 0) {
                    $('body').append('<a href="javascript:" class="wsj-btn-popup" id="wsj-btn-thank" data-id="popup-thank"></a>');
                    $('#wsj-btn-thank').click();
                } else {
                    $('#wsj-btn-thank').click();
                }
            });
			if(wsj_LastPp="undefined") 
			{
				$('body').append('<a href="javascript:" class="wsj-btn-popup" id="wsj-btn-thank" data-id="popup-thank"></a>');
                $('#wsj-btn-thank').click();
			};
          },
          error:  function(xhr, str){
            alert('Возникла ошибка: ' + xhr.responseCode);
          } 
        });
        
        return false;
    });
    //--------------------------------
    // mask for input
    $('input[name=phone]').mask('+7 ( 999 ) 9999999');
    $('input[name=phone]').change(function(){
        if($(this).val().length < 17) {
            $(this).css({backgroundColor: '#95120c'});
        } else {
            $(this).css({backgroundColor: '#abff79'});
        }
    });
    //--------------------------------
    // scroll animate
    $(function () {
        var $window = $(window),
                win_height_padded = $window.height() * 0.99,
                isTouch = Modernizr.touch;
                
        if (isTouch) {
            revealOnScroll();
        }
        
        
        $window.on('scroll', revealOnScroll);
        
        function revealOnScroll() {
            var scrolled = $window.scrollTop(),
                    win_height_padded = $window.height() * 0.99;
                    
            $(".revealOnScroll:not(.animated)").each(function () {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height_padded > offsetTop) {
                    if ($this.data('timeout')) {
                        window.setTimeout(function () {
                            $this.addClass('animated ' + $this.data('animation'));
                        }, parseInt($this.data('timeout'), 10));
                    } else {
                        $this.addClass('animated ' + $this.data('animation'));
                    }
                }
            });
            
            $(".revealOnScroll.animated").each(function (index) {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height_padded < offsetTop) {
                    $(this).removeClass('animated '+ $(this).data('animation'))
                }
            });
        }
        revealOnScroll();
    });
    //--------------------------------
    $("a").click(function (event) {
        if ($(this).attr('data-link') == "wsj-anchor") {
            event.preventDefault();
            var id  = $(this).attr('href'),
            top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        }
	});
    //----------------------------//
    $(function(){
        var PopupBtn = '.wsj-btn-popup';
        var PopupWrap = '.wsj-popup-wrap'
        var PopupElem = '.wsj-popup-elem';
        var PopupClose = '.wsj-popup-close';
        var AnimateTime = 1000;
        var AnimateType = 'clip';
        var Padding = 0.20;
        if ($(PopupBtn).length > 0) {
            $('body').on('click', PopupBtn, function(event){
                event.preventDefault();
                var popupId = $(this).attr('data-id');
                wsj_LastPp = $('#'+popupId);
                if (popupId.length > 0) {
                    var target = $('#'+popupId);
                    var elem = target.find(PopupElem);
                    var h = $(window).height();
                    
                    if (h < 600) {
                        elem.css({top: '10px'});
                        target.show(AnimateType, AnimateTime, startOV()); 
                    } else {
                        target.show(AnimateType, AnimateTime, function(){
                            elem.css({top: '50%', marginTop: -1*(elem.outerHeight() / 2)});
                            startOV();
                        });
                    }
                }
            });
            $(document).keydown(function(e) {
                if( e.keyCode === 27 ) {
                    $(wsj_LastPp).hide(AnimateType, AnimateTime, returnOV());
                }
            });
            $(PopupElem).on('click', function(event){
                event.stopPropagation()
            });
            $(PopupClose).on('click', function(event){
                event.preventDefault();
                $('#'+$(this).attr('data-id')).hide(AnimateType, AnimateTime, returnOV());
            });
            $(PopupWrap).on('click', function(){
                $(this).hide(AnimateType, AnimateTime, returnOV());
            });
        }
        function startOV() {
            $('html,body').css({
                    overflow: 'hidden',
            });
        }
        function returnOV() {
            $('html,body').css({
                overflowY: 'auto',
                overflowX: 'hidden'
            });
        }
    });
    //----------------------------//
    /*Отзывы клиентов (hsb-review)*/
    if ($('.wsj-review').length > 0) {
        $('.wsj-review').slick({
            //infinite: true,
            //centerMode: true,
            centerPadding: 7,
            variableWidth: true,
            slidesToShow: 6,
            slidesToScroll: 1
        });
        var width = $(window).width();
        if (width <= 768) {
            $('.wsj-review').slick('slickSetOption', 'slidesToShow', 1);
            $('.wsj-review').slick('slickSetOption', 'variableWidth', false);
        }else if (width <= 991) {
            $('.wsj-review').slick('slickSetOption', 'slidesToShow', 2);
            $('.wsj-review').slick('slickSetOption', 'variableWidth', false);
        } else if (width <= 1200) {
            $('.wsj-review').slick('slickSetOption', 'slidesToShow', 4);
            $('.wsj-review').slick('slickSetOption', 'variableWidth', false);
        } else if (width > 1200) {
            $('.wsj-review').slick('slickSetOption', 'slidesToShow', 6);
            $('.wsj-review').slick('slickSetOption', 'variableWidth', true);
        }
    }
    /* http://kenwheeler.github.io/slick/ */
    //---------------------------//
    /*Лицензии (hsb-license)*/
    if ($('.wsj-license-interactive').length > 0) {
        $('.wsj-license-interactive').colorbox({
            photo: true,
            className: 'hsb-review__photo-opened',
        });
    }
    /* http://www.jacklmoore.com/colorbox/ */
    //---------------------------//
    /*Отзывы пациентов (hsb-review)*/
    if ($('.wsj-review__interactive').length > 0) {
        $('.wsj-review__interactive').colorbox({
            photo: true,
            className: 'hsb-review__photo-opened',
        });
    }
    /* http://www.jacklmoore.com/colorbox/ */
    //---------------------------//
    /*Часто задаваемые вопросы (hsb-faq)*/
    if ($('.wsj-faq-acc').length > 0) {
        $('.wsj-faq-acc').accordion({
            heightStyle: "content",
            animated: 'slide',
            collapsible: true
        });
    }
    /* https://jqueryui.com/accordion/ */
    //---------------------------//
    /*Часто задаваемые вопросы (hsb-faq)*/
    /*if ($(".wsj-faq-scroll").length > 0) {
        $(".wsj-faq-scroll").mCustomScrollbar({
            theme:"inset-dark"
        });
    }*/
    /* http://manos.malihu.gr/jquery-custom-content-scroller/ */
    //---------------------------//
    /*Меню (hsb-menu)*/
    $(function(){
        var MenuButton = '.wsj-menu-button';
        var MenuParent = '.wsj-menu-parent';
        var MenuContainer = '.wsj-menu-container';
        if  ($(MenuContainer).length > 0) {
            $(MenuButton).on('click', function(){
                var container = $(this).parent(MenuParent).find(MenuContainer);
                
                $(this).toggleClass('animate');
                if (container.hasClass('hs-show'))
                    container.toggleClass('hs-show').slideUp('normal');
                else
                    container.toggleClass('hs-show').slideDown('normal');
            })    
        }  
    });
    //---------------------------//
    $('.hsj-body_artrit').hs_body('hsj-body_artrit_canvas');
    $('.hsj-body_artroz').hs_body('hsj-body_artroz_canvas');
    //---------------------------//
    $(window).resize(function(){
        var width = $(window).width();
        if ($('.wsj-review').length > 0) {
            if (width <= 768) {
                $('.wsj-review').slick('slickSetOption', 'slidesToShow', 1);
                $('.wsj-review').slick('slickSetOption', 'variableWidth', false);
                $('.wsj-review').slick('slickSetOption', 'adaptiveHeight', true);
            }else if (width <= 991) {
                $('.wsj-review').slick('slickSetOption', 'slidesToShow', 2);
                $('.wsj-review').slick('slickSetOption', 'variableWidth', false);
                $('.wsj-review').slick('slickSetOption', 'adaptiveHeight', true);
            } else if (width <= 1200) {
                $('.wsj-review').slick('slickSetOption', 'slidesToShow', 4);
                $('.wsj-review').slick('slickSetOption', 'variableWidth', false);
                $('.wsj-review').slick('slickSetOption', 'adaptiveHeight', true);
            } else if (width > 1200) {
                $('.wsj-review').slick('slickSetOption', 'slidesToShow', 6);
                $('.wsj-review').slick('slickSetOption', 'variableWidth', true);
                $('.wsj-review').slick('slickSetOption', 'adaptiveHeight', true);
            }
        }
    });
    //---------------------------//
    var wsj_ClickedTab;
    $('.hsj-tabs ul a').click(function (e) {
        e.preventDefault();
        
        if ($(window).width() < 768) {
            if ($($(this).attr('href')).hasClass('active')) {
                $(this).parent().removeClass('active');
                $($(this).attr('href')).removeClass('active');
            } else {
                $(this).tab('show');
                wsj_ClickedTab = $(this);
                //alert(height);
                var slick_height = $(this);
                var timer = setInterval(function(){
                    var height = slick_height.next().find('.slick-list.draggable').height();
                    console.log(height);
                    $(wsj_ClickedTab).next().find('.hsj-expert__reviews').slick('slickNext');
                    if (height <= 55) {
                        $(wsj_ClickedTab).next().find('.hsj-expert__reviews').slick('slickNext');
                        //$(wsj_ClickedTab).next().find('.hsj-expert__reviews').slick('slickPrev');
                    } else
                        clearInterval(timer);
                },500);
            }
        } else {
            $(this).tab('show');
            wsj_ClickedTab = $(this);
            //$($(wsj_ClickedTab).attr('href')).find('.hsj-expert__reviews').slick('slickNext');
            var slick_height = $(this);
            var timer = setInterval(function(){
                var height = $($(wsj_ClickedTab).attr('href')).find('.slick-list.draggable').children('.slick-track').height();
                $($(wsj_ClickedTab).attr('href')).find('.hsj-expert__reviews').slick('slickNext');
                console.log(height);
                if (height <= 55) {
                    $($(wsj_ClickedTab).attr('href')).find('.hsj-expert__reviews').slick('slickSetOption', 'adaptiveHeight', true);
                    $($(wsj_ClickedTab).attr('href')).find('.hsj-expert__reviews').slick('slickNext');
                    //$($(wsj_ClickedTab).attr('href')).find('.hsj-expert__reviews').slick('slickPrev');
                } else
                    clearInterval(timer);
            },500);
        }
    })
    /*$(this).on('shown.bs.tab', function(){
        alert('slide shown');
        $(wsj_ClickedTab).next().find('.hsj-expert__reviews').slick('slickNext');
    });*/
    /*$(this).on('show.bs.tab', function(){
        $(wsj_ClickedTab).next().find('.hsj-expert__reviews').slick('slickNext');
    });*/
    //---------------------------//
    $('[name="phone"]').focus(function(){
        $(this).mask('+7 ( 999 ) 9999999');
    });
    //---------------------------//
    $('.hsj-result').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: '.hsj-result__next',
        prevArrow: '.hsj-result__prev'
    });
    //---------------------------//
    $('.hsj-expert__reviews').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: '.hsj-review__next.hs-icon-slider-arr-rg',
        prevArrow: '.hsj-review__prev.hs-icon-slider-arr-l',
        adaptiveHeight: true
    });
    
    if ($(window).width() > 767) {
        $('.hsj-expert__reviews').slick('slickSetOption', 'adaptiveHeight', false);
    }
    //---------------------------//
    if ($(window).width() > 767) {
        if ($('.hsb-expert__tabs-header li').length > 0) {
            var height = 0;
            $('.hsb-expert__tabs-header li').each(function(){
                if ($(this).height()>height) {
                    height = $(this).height();
                }
            })
            $('.hsb-expert__tabs-header li').height(height);
        }
    } else {
        var header = $('.hsb-expert__tabs-header li');
        
        header.each(function(){
            var id = $(this).find('a').attr('href');
            $(this).append($(id));
        });
        
        //header.click(function(){
        //    if ($(this).hasClass('active')) {
        //        $($(this).find('a').attr('href')).removeClass('active');
        //    }
        //});
    }
    //---------------------------//
    $('.hsb-programs__item-title').click(function () {
        var txt = $(this).next();
        if ($(txt).css('display') == 'none') {
            $(txt).slideDown();
        } else {
            $(txt).slideUp();
        }
        
    });
    
    //---------------------------//
    $('.hsj-review__prev').click(function(){
        $('.hsj-expert__reviews').slick('slickNext');
    });
    $('.hsj-review__next').click(function(){
        $('.hsj-expert__reviews').slick('slickPrev');
    });
    //---------------------------//
    $(function () {
        var $window = $(window),
                win_height_padded = $window.height() * 0.99,
                isTouch = Modernizr.touch;
                
        if (isTouch) {
            revealOnScroll();
        }
        
        
        $window.on('scroll', revealOnScroll);
        
        function revealOnScroll() {
            var scrolled = $window.scrollTop(),
                    win_height_padded = $window.height() * 0.99;
                    
            $(".revealOnScroll:not(.animated)").each(function () {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height_padded > offsetTop) {
                    if ($this.data('timeout')) {
                        window.setTimeout(function () {
                            $this.addClass('animated ' + $this.data('animation'));
                        }, parseInt($this.data('timeout'), 10));
                    } else {
                        $this.addClass('animated ' + $this.data('animation'));
                    }
                }
            });
            
            $(".revealOnScroll.animated").each(function (index) {
                var $this = $(this),
                        offsetTop = $this.offset().top;
                if (scrolled + win_height_padded < offsetTop) {
                    $(this).removeClass('animated '+ $(this).data('animation'))
                }
            });
        }
        revealOnScroll();
    });
});