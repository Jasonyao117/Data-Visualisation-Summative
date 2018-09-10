$(function(){
	// let key = 'sneAVnUGOJmdlDPum7t3Jb4pZXjd9EGM';
	// let urlProjects = 'https://api.behance.net/v2/users/KJG/projects?client_id=sneAVnUGOJmdlDPum7t3Jb4pZXjd9EGM';


	$("#slideshow > div:gt(0)").hide();
	setInterval(function() {
	$('#slideshow > div:first')
	  .fadeOut(1000)
	  .next()
	  .fadeIn(1000)
	  .end()
	  .appendTo('#slideshow');
	}, 8000);

	var offset1 = $('header').offset().top;
	var offset2 = $('.section1').offset().top;
	var offset3 = $('.section2').offset().top;
	var offset4 = $('.section3').offset().top;
	var offset5 = $('.section4').offset().top;

	$(document).on('scroll',function(){

		var iScrollTop = $(document).scrollTop();

		var activeLi;
		if(iScrollTop>=offset1-100 && iScrollTop<offset2){
			activeLi = $('.menu>li:nth-child(1)');
		}
		if(iScrollTop>=offset2-100 && iScrollTop<offset3){
			activeLi = $('.menu>li:nth-child(2)');
		}
		if(iScrollTop>=offset3-100 && iScrollTop<offset4){
			activeLi = $('.menu>li:nth-child(3)');
		}
		if(iScrollTop>=offset4-100 && iScrollTop<offset5){
			activeLi = $('.menu>li:nth-child(3)');
		}
		if(iScrollTop>=offset5-100){
			activeLi = $('.menu>li:nth-child(3)');
		}
		activeLi.addClass('active');
		$('.menu>li').not(activeLi).removeClass('active');

	});

	$('[data-to]').on('click',function(e){
		e.preventDefault();

		var sTarget = $(this).data('to');
		var targetOffsetTop = $(sTarget).offset().top;

		$('html,body').animate({scrollTop:targetOffsetTop},1000);
	});



});