$().ready(function() {


	/* 1. NAVIGATION
	----------------------------------------------------------------------------------- */  	
		
	// Open menu
	$('#menu').on('click touchend', function() {
		$('.menu-box').velocity('slideDown', { duration: 400 },[ 0.11, 0.71, 0.81, 0.71]);
        setTimeout(function() { 
            $('.menu-box-slide').addClass('menu-box-slideOut'); 
            $('#cross').addClass('open'); 
        }, 100); 
		return false;
	});

	// Close menu
	$('#cross').on('click', function() {
        $('#cross').removeClass('open'); 
        setTimeout(function() { 
            $('.menu-box').velocity('slideUp', { duration: 600 },[ 0.11, 0.71, 0.81, 0.71]);
            $('.menu-box-slide').removeClass('menu-box-slideOut');
        }, 400);
		return false;		
	});

    // Prevent double click on iOs devices
    $('.menu-box a').on('touchend', function(e) {
        var el = $(this);
        var link = el.attr('href');
        window.location = link;
    });
    

	/* 2. SWIPER
	----------------------------------------------------------------------------------- */  
	
    // If Photoswiper exists
    if( $('body').hasClass('hasSwiper') )  {
	   
        // Following prevents jumping of the slider in mobile devices because of the
        // URL bars appearing and disappearing affecting the window height.
        var swiperContainer = $(".swiper-container");
        var windowWidth = $(window).width();
        function resizeSwiper() {
            swiperContainer.height($(window).height());
        }
        resizeSwiper();
        $(window).resize(function(){
           if($(this).width() != windowWidth){
              windowWidth = $(this).width();
              resizeSwiper();
           }
        });


        // Initiate Swiper
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 0,
            keyboardControl: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
        });
        	
        // Callback on slide change
        swiper.on('onSlideChangeEnd', function () {
        	$activeSlide = $('.swiper-slide-active');
        	var caption = $activeSlide.attr('data-caption');
        	var color = $activeSlide.attr('data-color');
        	
        	// Change caption
        	$('.swiper-footer .caption').html(caption);
        	
        	// Change text color 
        	$('.swiper-footer').find('.caption a').css('color',color);
        	$('.header').find('#logo, #menu').css('color',color);
    	});

    }

    /* 3. ANIMTATED PAGE TRANSITION
    ----------------------------------------------------------------------------------- */ 

    // Options
    $('.animsition-overlay').animsition({
        inClass: 'overlay-slide-in-right',
        outClass: 'overlay-slide-out-right',
        overlay : true,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body'
    }).
    
    // On start of animation
    one('animsition.inStart',function(){
        $('.page-overlay').velocity("fadeOut", { duration: 200 })
        $('.animsition-overlay-veil').addClass('animsition-overlay-veil-move');
    }).

    // On end of animation
    one('animsition.inEnd',function(){
        
    });


    /* 4. SCROLL TO TOP
    ----------------------------------------------------------------------------------- */ 

    // Scroll up animation
    $('.scroll-up').on('click', function(e) {
        // prevent default action and bubbling
        e.preventDefault();
        e.stopPropagation();
        $('html').velocity("scroll", { duration: 1200, offset: "0", mobileHA: false }); 
    });
});

