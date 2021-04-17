$( document ).ready(function() {

	$('.history-js ').slick({
		dots: false,
		infinite: false,
		arrows: false,
		speed: 400,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				dots: false
				}
			},

			{
				breakpoint: 767,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				dots: false
				}
			},

			{
				breakpoint: 480,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false
				}
			},
		]
	});

	// Sticky Header

	$(window).scroll(function(){
		if ($(window).scrollTop() >= 200) {
			$('.header').addClass('fixed-header');
		}
		else {
			$('.header').removeClass('fixed-header');
		}
	});


	// Modal

	$('.btn-popup').click( function(e) {
		e.preventDefault();
		var popupId = $(this).data('popup-id')
		$('.overlay[data-popup="'+popupId+'"]').fadeIn();
		$('body').addClass('popup-opened');
	});

	$('.close-popup').click( function(e) {
		e.preventDefault();
		$('.overlay').fadeOut();
		$('body').removeClass('popup-opened');
	});

	$(document).mouseup( function (e) {
		var popup = $('.popup');
		if (e.target != popup[0] && popup.has(e.target).length === 0){
			$('.overlay').fadeOut();
			$('body').removeClass('popup-opened');
		}
	});

	    wow = new WOW(
        {
            boxClass:     'wow',
            animateClass: 'animated',
            offset:       0,
            mobile:       true,
            live:         true
        }
    )
    wow.init();

    /* Parallax */

    var winScrollTop=0;

    $.fn.is_on_screen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        //viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        //bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    function parallax() {
        var scrolled = $(window).scrollTop();
        $('.parallax-section').each(function(){

            if ($(this).is_on_screen()) {
                var firstTop = $(this).offset().top;
                var $span = $(this).find(".parallax-elementt");
                var moveTop = (firstTop-winScrollTop)*0.3 //speed;
                $span.css("transform","translateY("+-moveTop+"px)");
            }

        });
    }

    $(window).scroll(function(e){
        winScrollTop = $(this).scrollTop();
        parallax();
    });

    /* End of parallax */

	// country selection
	$('.selection').on( "click", function() {

		
		$('.sc13-main-title, .sc13-main-txt').hide();
		$('.sc13-hidden-title, .country_button').show();
		$(this).toggleClass('toggle');
		let index = $(this).index();
		if (index == 0) {
			$('.selection').removeClass('active_country');
			$(this).addClass('active_country');
		} else if (index == 1) {
			$('.selection').removeClass('active_country');
			$(this).addClass('active_country');
		} else {
			$('.selection').removeClass('active_country');
			$(this).addClass('active_country');
		}
	});
});




var $layer_0 = $('.layer-2'),
			$layer_1 = $('.layer-1'),
			$layer_2 = $('.img-decor'),
			$x_axis  = $('#x-axis'),
			$y_axis  = $('#y-axis'),
			$container = $('body'),
			container_w = $container.width(),
			container_h = $container.height();

		$(window).on('mousemove.parallax', function(event) {
		var pos_x = event.pageX,
			pos_y = event.pageY,
			left  = 0,
			top   = 0;

		left = container_w / 2 - pos_x;
		top  = container_h / 2 - pos_y;
		
		TweenMax.to(
			$x_axis, 
			1, 
			{ 
			css: { 
				transform: 'translateX(' + (left * -1) + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
			});
		
		TweenMax.to(
			$y_axis, 
			1, 
			{ 
			css: { 
				transform: 'translateY(' + (top * -1) + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
			});
		
		TweenMax.to(
			$layer_2, 
			1, 
			{ 
			css: { 
				transform: 'translateX(' + left / 120 + 'px) translateY(' + top / 600 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
			});
		
		TweenMax.to(
			$layer_1, 
			1, 
			{ 
			css: { 
				transform: 'translateX(' + left / 40 + 'px) translateY(' + top / 200 + 'px)' 
			}, 
			ease:Expo.easeOut, 
			overwrite: 'all' 
			});
		
		TweenMax.to(
			$layer_0,
			10,
			{
			css: {
				transform: 'rotate(' + left / 200 + 'deg)'
			},
			ease: Expo.easeOut,
			overwrite: 'none'
			}
		)
		});



		



		