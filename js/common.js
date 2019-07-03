jQuery(document).ready(function ($) {
    // форма
    $("form").not('.custom_valid').submit(function () { //Change
        var th = $(this);
        var $button=th.find('button');
        $button.prop('disabled', true);

        $.ajax({
            type: "POST",
            url: 'action.php', //Change
            data: th.serialize()
        }).success(function () {

            $button.prop('disabled', false);

            var time = $('[name="time"]:checked').val();

            var d = new Date(),
                h = d.getHours(),
                d = d.getDay();
            if ((h < 9 || h >= 18) || d === 0) {
                $('#block_2').removeClass('d-none')
                $('#block_1').addClass('d-none')
            } else {
                $('#block_1').find('.time-call').text(time);
                $('#block_2').addClass('d-none');
                $('#block_1').removeClass('d-none');
            }

            $('#thanks').modal('show');
            $('#modal-win').modal('hide');
            setTimeout(function () {
                th.trigger("reset");
            }, 4000);
            if(typeof dataLayer!=="undefined"){
                dataLayer.push({'event': 'ok'});
            }
        });
        return false;
    });
});
jQuery(document).ready(function ($) {
    // видео фон
    $("#video").YTPlayer();
    // для свг
    svg4everybody({});
    // Custom JS
    $(".s-video__item").click(function () {
        $("#modal-vid .modal-body").html($(this).find(".block-js").html());
    })
    // галерея
    $(".gal").each(function () {
        $(this).find("a").magnificPopup({
            type: 'image',
            closeOnContentClick: false,
            closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: {
                verticalFit: true,

            },
            gallery: {
                enabled: true
            }
        });
    })
// accordion
    $(".showhide").click(function () {
        $(".showhide-all").slideUp().parent().removeClass("active"), $(".showhide").removeClass("active"),
            $(this).next("div").filter(function () {
                return "block" == $(this).css("display")
            }).slideUp().parent().removeClass("active"),
            $(this).next("div").filter(function () {
                return "none" == $(this).css("display")
            }).slideDown().prev("div").addClass("active").parent().addClass("active")
    })
// адаптивные табы
    $('.tabs-block').easyResponsiveTabs();
    $(".s-about-accord .resp-tab-active").each(function () {
        $(this).next().find(".before").addClass("anim");
    })
    $(".s-about-accord .resp-tab-btn").click(function () {
        $(".before").removeClass("anim");
        $(".s-about-accord .resp-tab-active").next().find(".before").addClass("anim");
    })
    $(window).on("load", function () {
        var typed = new Typed('.typed-js', {
            strings: ["родинок", "папиллом", "бородавок", "кератом"],
            startDelay: 300,
            typeSpeed: 150,
            backSpeed: 100,
            startDelay: 5,
            backDelay: 450,
            showCursor: false,
            loop: true
        });
    })
// слайдер цвета в карточке
    var swiper4 = new Swiper('.slider-sr-js', {
        // slidesPerView: 5,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: "fade",
        loadPrevNext: true,
        shortSwipes: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            // dynamicBullets: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '"><span class="' + className + '__inner"></span></span>';
            },
        },
        preloadImages: false,
        // Enable lazy loading
        lazy: true

    });
    var swiper5 = new Swiper('.carusel-js', {
        // slidesPerView: 5,
        slidesPerView: 'auto',
        spaceBetween: 70,
        freeMode: true,
        // loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChangeTransitionStart: function () {
                $(".s-team__item").each(function () {
                    $(this).removeClass("active").find(".hidden-p").slideDown().next(".hidden-block").slideUp();
                })
            }
        },
        breakpoints: {
            1199: {
                spaceBetween: 20,
            },
            576: {
                // freeMode: false,
                spaceBetween: 20,
                // slidesPerView: 1,
            }
        }
    });

    $('.ba-slider').each(function () {

        $(this).beforeAfter();
    })
    // модальное окно
    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: true,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });
    $(".s-team__item").click(function () {
        $(this).toggleClass("active").find(".hidden-p").slideToggle().next(".hidden-block").slideToggle();
    })
    // форма
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({

        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
    // маска на инпут
    $("input[type='tel']").attr("pattern", "[+]38[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}").inputmask({"mask": "+38(999)999-99-99"});



    var swiper5 = new Swiper('.s-steps__slider', {
        // slidesPerView: 5,
        slidesPerView: 1,
        // spaceBetween: 70,
        // freeMode: true,
        // loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
			el: '.scr2__ind',
			type: 'custom',
			renderCustom: function (swiper, current, total) {
			 
					var progresText = '<div class="jsTestCounter">  0' + (current ) + '/ 0' + (total ) + '</div>'; 
				return   progresText;
			},
		},
 
    });
    
var counter = $('.swiper-counter');
var currentCount = $('<span class="count">1<span/>');
counter.append(currentCount);

function photos_change(swiper) {
  var index = swiper.activeIndex + 1,
      $current = $(".photo-slide").eq(index),
      dur = 0.8;

  var prevCount = $('.count');
  currentCount = $('<span class="count next">' + index + '<span/>');
  currentCount.appendTo(counter);
   
}
});

