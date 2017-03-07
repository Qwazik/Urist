$(function() {
	/*-------------------------------------------------*/
	/*	start
	/*-------------------------------------------------*/
	$('.fancybox').fancybox({
		padding: 0,
		wrapCSS: 'popup-default',
		closeBtn: false
	});
	$('.popup .close').click(function(){
		$.fancybox.close();
	});
	equalHeight('.main-features__body','.main-features__item');
	equalHeight('.services-list__list','.section-column');
	equalHeight('.main-footer','.footer-col,.left');
	$(window).resize(function(){
		equalHeight('.main-features__body','.main-features__item');
		equalHeight('.services-list__list','.section-column');
		equalHeight('.main-footer','.footer-col,.left');
	});
	/*-------------------------------------------------*/
	/*	resp nav
	/*-------------------------------------------------*/
	
	(function(){
		var oft = $('.main-header__top').offset().top;
		var menu = $('.main-menu');
		$('.resp-nav').click(function(){
			openMenu();
		});
		$('.main-menu .close').click(function(){
			closeMenu();
		});
		$(document).click(function(e){
			if(!$(e.target).closest('.main-menu').length){
				closeMenu();
			}
		});

		$(window).scroll(function(){
			if($(window).scrollTop() >= oft){
				$('.main-header__top').addClass('fixed');
			}else if($(window).scrollTop() <= oft){
				$('.main-header__top').removeClass('fixed');
			}
		});

		function openMenu(){
			if(!$(menu).is('.open')){
				$(menu).animate({
					left: 0
				},300,function(){
					$(menu).addClass('open');
				});
			}
		}
		function closeMenu(){
			if($(menu).is('.open')){
				$(menu).animate({
					left: '-100%'
				},300,function(){
					$(menu).removeClass('open');
				});
			}
		}
	}());
	/*-------------------------------------------------*/
	/*	left menu
	/*-------------------------------------------------*/
	$('.left-menu > li ul').hide();
	$('.left-menu > li.active ul').show();
	$('.left-menu > li').click(function(){
		$(this).siblings('li').find('ul').slideUp();
		$(this).siblings('li').removeClass('active');
		$(this).toggleClass('active');
		$(this).find('ul').slideToggle();
	});
	/*-------------------------------------------------*/
	/*	main slider
	/*-------------------------------------------------*/
	$('#mainSlider').each(function(){
		var dotsContainer = $('.main-slider .dots');
		var dots = $(this).find('li').length;
		var carousel;
		dotsContainer.css({
			'margin-left': ($(dotsContainer).width() / 2 )+ 'px'
		});
		for(var i=0; i<dots; i++){
			var dot = $('<span class="dot"></span>');
			dot.click(function(){
				carousel.trigger('to.owl.carousel', [$(this).index(), 300]);
			});
			dotsContainer.append(dot);
		}
		carousel = $(this).owlCarousel({
			autoplay: true,
			autoplayTimeout: 5000,
			items: 1,
			dotsContainer: dotsContainer,
			animateIn: 'fadeIn',
			animateOut: 'fadeOut',
			autoHeight: true
		});
	});
	/*-------------------------------------------------*/
	/*	tabs
	/*-------------------------------------------------*/
	equalHeight('.main-services__content', '.icon-wrap', true);
	equalHeight('.main-features__body', '.icon-wrap', true);

	$('.main-services__nav li').click(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
		var target = '.'+$(this).find('a').attr('href');
		$(target).siblings().hide();
		$(target).fadeIn(300);
		equalHeight('.main-services__content', '.icon-wrap', true);
		
		return false;
	});
});

function equalHeight(wrap, element, lh){
	
    $(wrap).each(function(){
        var maxHeight = [],
            className = element;
        $(this).find(className).each(function(){
            $(this).height('auto');
        });
        $(this).find(className).each(function(){
            maxHeight.push($(this).height());
        });
        maxHeight = Math.max.apply(null, maxHeight);
        $(this).find(className).each(function(){
            $(this).height(maxHeight);
            if(lh===true){
        		$(this).css('line-height', maxHeight + 'px');
        	}
        });


    });
}