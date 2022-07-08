$(document).ready(function () {






	/**
	 * Get data form
	 */
	data = {
		action: 'data_form'
	};

	$.ajax({
		url: params.ajaxurl,
		data: data,
		type: 'GET',
		success: function (data) {

			if (data) {

				$('.form-block__recording-date--value').text(data.date_form_land);
				$('.form-block__scheduled-measurements--value').text(data.plan_form_land);
				$('.form-block__measurements-took-place--value').text(data.complite_form_land);
				$('.form-block__vacancies--value').text(data.free_form_land);

			} else {

			}
		}
	});

	/**
	 * Datepicker
	 */
	$("#datepicker").datepicker({
		showOn: "button",
		buttonImage: params.directory_uri + "/img/icons/icon1.png",
		buttonImageOnly: true,
		buttonText: "Select date"
	});


	/**
	 * Calculator
	 */
	$("#slider-range-max").slider({
		range: "max",
		min: 5,
		max: 50,
		value: 1,
		slide: function (event, ui) {
			$("#amount").val(ui.value);
			$("#area").html('Площадь ' + ui.value + 'м<sup>2</sup>');

			var price = calc_price_ceiling(ui.value);
			$('.calculator-price').text('от ' + price + ' zł.');

			var profile = profile_pvh(ui.value);
			$('.profile').text('Профиль ПВХ ' + profile + 'м');

			var tape = tape_hidden(ui.value);
			$('#tape').text('Лента маскировочная ' + tape + 'м');
		}
	});
	$("#amount").val($("#slider-range-max").slider("value"));


	/**
	 * Isotope-filter
	 */
	$('.grid').isotope({
		itemSelector: '.grid-item',
	});

	// filter items on button click
	$('.filter-button-group').on('click', 'li', function () {
		var filterValue = $(this).attr('data-filter');
		$('.grid').isotope({
			filter: filterValue
		});
		$('.filter-button-group li').removeClass('active');
		$(this).addClass('active');
	});


	/**
	 * Reviews slider main
	 */
	$('.reviews-content__slider').bxSlider({
		touchEnabled: false,
		nextText: '<img src="' + params.directory_uri + '/img/icons/arrow3.png"> Следующий',
		prevText: '<img src="' + params.directory_uri + '/img/icons/arrow3.png"> Предыдущий',
		infiniteLoop: false,
		hideControlOnEnd: true,
	});


	$('.photo-slider').each(function (index, el) {

		var el_id = $(el).attr('id');

		$('#' + el_id).bxSlider({
			infiniteLoop: false,
			pagerCustom: '.bx-pager',
			controls: false,
			easing: 'ease-in-out',
			adaptiveHeight: true,
			captions: true,
			minSlides: 1,
			maxSlides: 1,
			onSliderLoad: function () {
				if (checkBrowser() == 'Firefox') {
					$('ul.photo-slider li').width($('.reviews-slider').width());
				}
			}




		});
	});



	$('.lazy').Lazy({
		scrollDirection: 'vertical',
		effect: 'fadeIn',
	});



	/**
	 * manufacturers slider
	 */
	$('.manufacturers-content').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		centerMode: true,
		prevArrow: '<button class="btn-prev" type="button"><img src="' + params.directory_uri + '/img/icons/arrow4.png"></button>',
		nextArrow: '<button class="btn-next" type="button"><img src="' + params.directory_uri + '/img/icons/arrow4.png"></button>',
		responsive: [{
				breakpoint: 950,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 750,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true
				}
			}
		]
	});


	/**
	 * Reviews accordeon
	 */
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}


	/**
	 * Timer header
	 */
	// var countDownDate = new Date("Jan 11, 2020 00:00:00").getTime();
	// var x = setInterval(function() {
	//     var now = new Date().getTime();
	//     var distance = countDownDate - now;
	//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	//     document.getElementById("demo").innerHTML = days + "Дней " + hours + "Часов "
	//     + minutes + "Минут " + seconds + "Секунд ";
	//     if (distance < 0) {
	//         clearInterval(x);
	//         document.getElementById("demo").innerHTML = "EXPIRED";
	//     }
	// }, 1000);


	/**
	 * Mobile second click
	 */
	var touchHover = function () {
		$('[data-hover]').click(function (e) {
			e.preventDefault();
			var $this = $(this);
			var onHover = $this.attr('data-hover');
			var linkHref = $this.attr('href');
			if (linkHref && $this.hasClass(onHover)) {
				location.href = linkHref;
				return false;
			}
			$this.toggleClass(onHover);
		});
	};

	touchHover();

	/**
	 * Max height for blokcs
	 */
	var maxHeight = 0;
	$(".wedding-milestones__content").each(function () {
		if ($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		}
	});
	$(".wedding-milestones__content").height(maxHeight);

	/**
	 * Smooth scrolling
	 */
	$("a.scrollto").click(function () {
		var elementClick = $(this).attr("href")
		var destination = $(elementClick).offset().top;
		jQuery("html:not(:animated),body:not(:animated)").animate({
			scrollTop: destination
		}, 800);

		return false;
	});


	/**
	 * Mask input
	 */
	$('.header-input--tel, .form-block__tel, .popup-input--tel').mask('+375 (00) 000-00-00');


	/**
	 * Mobile menu
	 */
	$("#menutoggle").click(function () {
		$(".heade-nav__bottom").slideToggle(1000);
	});

	/**
	 * Show/hide popup
	 */

	$('.calculator-content__call-btn').click(function () {
		centerBox();
		$('.overlay').fadeIn(500);
		$('#popup').fadeIn(500);
		$('html').css('overflow', 'hidden');
	});

	$('.reviews-inform__btn').click(function () {
		centerBox();
		$('.overlay').fadeIn(500);
		$('#popup-reviews').fadeIn(500);
		$('html').css('overflow', 'hidden');
	});


	$('.installment-btn').click(function () {
		centerBox();
		$('.overlay').fadeIn(500);
		$('#popup-installment').fadeIn(500);
		$('html').css('overflow', 'hidden');
	});

	$('.warranty-btn').click(function () {
		centerBox();
		$('.overlay').fadeIn(500);
		$('#popup-download').fadeIn(500);
		$('html').css('overflow', 'hidden');
	});

	$('.popup-close, .overlay').click(function () {
		$('.overlay').fadeOut(500);
		$('.popup').fadeOut(500);
		$('html').css('overflow', 'auto');
		// Hide cf7 notification
		$('.wpcf7-response-output').fadeOut(500);
		$('span.wpcf7-not-valid-tip').fadeOut(500);
	});

	/**
	 * Popup center for vertical
	 */
	function centerBox() {

		var winHeight = $(document).height();
		var scrollPos = $(window).scrollTop();
		var disHeight = scrollPos + 100;
		$('#popup').css({
			'top': disHeight + 'px'
		});
		$('#popup-download').css({
			'top': disHeight + 'px'
		});
		$('#popup-installment').css({
			'top': disHeight + 'px'
		});
		$('#popup-reviews').css({
			'top': disHeight + 'px'
		});

		return false;
	}

	$(window).resize(centerBox);
	centerBox();



});


/**
 * Calculator values
 */

function calc_price_ceiling(area) {

	var price = 0;

	if (area >= 5 && area <= 7) {
		price = area * 18;
	} else if (area == 8) {
		price = area * 16;
	} else if (area == 9 || area == 10) {
		price = area * 15;
	} else if (area == 11) {
		price = area * 14.5;
	} else if (area == 12 || area == 13) {
		price = area * 14;
	} else if (area == 14 || area == 15) {
		price = area * 12.5;
	} else if (area >= 16 && area <= 20) {
		price = area * 12;
	} else if (area == 21) {
		price = area * 11.5;
	} else if (area >= 22 && area <= 30) {
		price = area * 11;
	} else if (area >= 31 && area <= 50) {
		price = area * 10;
	}

	return price;
}

function profile_pvh(area) {

	var result = Math.sqrt(area) * 4;

	return Math.ceil(result);
}

function tape_hidden(area) {

	var result = Math.sqrt(area) * 4;

	return Math.ceil(result);
}



/**
 * CountDown
 */
function getTimeRemaining(endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
		total: t,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds
	};
}

function initializeClock(id, endtime) {
	var clock = document.getElementById(id);
	var daysSpan = clock.querySelector(".days");
	var hoursSpan = clock.querySelector(".hours");
	var minutesSpan = clock.querySelector(".minutes");
	var secondsSpan = clock.querySelector(".seconds");

	function updateClock() {
		var t = getTimeRemaining(endtime);

		if (t.total <= 0) {
			clearInterval(timeinterval);
			var deadline = new Date(Date.parse(new Date()) + 5 * 1000);
			initializeClock('clockdiv', deadline);
		}

		daysSpan.innerHTML = t.days;
		hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
		minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
		secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}


function getCookie(name) {

	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	))
	return matches ? decodeURIComponent(matches[1]) : undefined
}


function setCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}



mounth = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
dateTo = Date.parse(new Date()) + 5 * 24 * 60 * 60 * 1000;

cookieDateTo = getCookie("cookieDateTo");

if (cookieDateTo == null) {
	setCookie('cookieDateTo', dateTo, 5);
} else {
	dateTo = parseInt(cookieDateTo);
}


var d = new Date(dateTo);
var mounthNumber = d.getMonth();
var day = d.getDate();

$('#digit-to').text(day + " " + mounth[mounthNumber]);


// var deadline = new Date( Date.parse( 'Thu Feb 21 2019 15:17:32 GMT+0300 (Москва, стандартное время)' ) + 5 * 24 * 60 * 60 * 1000 ); // for endless timer
var deadline = new Date(dateTo);

initializeClock('clockdiv', deadline);

$(function () {
	$(".youtube").each(function () {
		// Based on the YouTube ID, we can easily find the thumbnail image
		$(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

		// Overlay the Play icon to make it look like a video player
		$(this).append($('<div/>', {
			'class': 'play'
		}));

		$(document).delegate('#' + this.id, 'click', function () {
			// Create an iFrame with autoplay set to true
			var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1";
			if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

			// The height and width of the iFrame should be the same as parent
			var iframe = $('<iframe/>', {
				'frameborder': '0',
				'src': iframe_url,
				'width': $(this).width(),
				'height': $(this).height()
			})

			// Replace the YouTube thumbnail with YouTube HTML5 Player
			$(this).replaceWith(iframe);
		});
	});
});












document.addEventListener("DOMContentLoaded",
	function () {
		var div, n,
			v = document.getElementsByClassName("youtube-player");
		for (n = 0; n < v.length; n++) {
			div = document.createElement("div");
			div.setAttribute("data-id", v[n].dataset.id);
			div.innerHTML = labnolThumb(v[n].dataset.id);
			div.onmousedown = labnolIframe;
			v[n].appendChild(div);
		}






	});

function labnolThumb(id) {
	var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
		play = '<div class="play"></div>';
	return thumb.replace("ID", id) + play;
}

function labnolIframe() {
	var iframe = document.createElement("iframe");
	var embed = "https://www.youtube.com/embed/ID?autoplay=1";
	iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
	iframe.setAttribute("frameborder", "0");
	iframe.setAttribute("allowfullscreen", "1");
	this.parentNode.replaceChild(iframe, this);
}


$(window).resize(function () {
	$('ul.photo-slider li').width($('.reviews-slider').width());
});



function checkBrowser() {
	c = navigator.userAgent.search("Chrome");
	f = navigator.userAgent.search("Firefox");
	m8 = navigator.userAgent.search("MSIE 8.0");
	m9 = navigator.userAgent.search("MSIE 9.0");
	if (c > -1) {
		browser = "Chrome";
	} else if (f > -1) {
		browser = "Firefox";
	} else if (m9 > -1) {
		browser = "MSIE 9.0";
	} else if (m8 > -1) {
		browser = "MSIE 8.0";
	}
	return browser;
}