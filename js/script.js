//Выравнивание позиции Navbar и положения текста в блоке agrosila
document.addEventListener('DOMContentLoaded', nav);
function nav() {
    const burger = $('.header-burger')[0];
    const nav = $('.header-nav')[0];
    burger.addEventListener('click', () => {
        nav.classList.toggle('show');
        navTopChange();
    });
}

$(window).on('resize', () => {
    navTopChange();
    // agrosilaCaptionTopChange();
    // advantagesTextPaddingChange();
});

$(window).on("orientationchange", function(event) {
    navTopChange();
    // agrosilaCaptionTopChange();
    // advantagesTextPaddingChange();
});

$(document).ready(() => {
    navTopChange();
    // agrosilaCaptionTopChange();
    // setTimeout(() => {
    //     advantagesTextPaddingChange();
    // }, 1000);
});

function navTopChange() {
    //$('.header-nav ul').css('top', ($('header').height() + 40));
}

// function agrosilaCaptionTopChange() {
//     if ($(window).width() > 600) {
//         var top1 = $('.agrosila-picture').offset().top;
//         var top2 = $('.agrosila-header h1').offset().top;
//         var top2height = $('.agrosila-header h1').outerHeight();
//         var top2width = $('.agrosila-picture').outerWidth();
//         $('.agrosila-container').css('margin-top', top2-top1+top2height+40);
//         $('.agrosila-container').css('width', top2width-180);
//     }
//     else {
//         $('.agrosila-container').css('margin-top', '');
//         $('.agrosila-container').css('width', '');
//     }
// }

// function advantagesTextPaddingChange() {
//         if ($(window).width() > 600) {
//             var advBottom = $('.advantages-picture').offset().top + $('.advantages-picture').height();
//             var examplesTop = $('.examples').offset().top;
//             if (examplesTop < advBottom) {
//                 //$('.examples').css('margin-top', advBottom - examplesTop + 80);
//             }
//         }
//         else {
//             //$('.examples').css('margin-top', '');
//         }
// }

//Эффект параллакса на скролле
var lastScrollTop = 0;
$(window).on('scroll', () => {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop){
        $('.slider-picture-bg').css('margin-top', '-20px');
        $('.agrosila-picture-bg').css('margin-top', '-20px');
    } else {
        $('.slider-picture-bg').css('margin-top', '0');
        $('.agrosila-picture-bg').css('margin-top', '0');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});

//Скролл страницы по кнопке "Далее"
$(function() {
    $('a[href="#section2"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top + 100}, 500, 'linear');
    });
});

//Работа слайдера изображений
$('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;

    function move(newIndex) {
        var animateLeft, slideLeft;

        advance();

        if ($group.is(':animated') || currentIndex === newIndex) {
            return;
        }

        bulletArray[currentIndex].removeClass('active');
        bulletArray[newIndex].addClass('active');

        if (newIndex > currentIndex) {
            slideLeft = '100%';
            animateLeft = '-100%';
        } else {
            slideLeft = '-100%';
            animateLeft = '100%';
        }

        $slides.eq(newIndex).css({
            display: 'flex',
            left: slideLeft
        });
        $group.animate({
            left: animateLeft
        }, function() {
            $slides.eq(currentIndex).css({
                display: 'none'
            });
            $slides.eq(newIndex).css({
                left: 0
            });
            $group.css({
                left: 0
            });
            currentIndex = newIndex;
        });
    }

    function advance() {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
            } else {
                move(0);
            }
        }, 40000000);
    }

    $('.next_btn').on('click', function() {
        if (currentIndex < ($slides.length - 1)) {
            move(currentIndex + 1);
        } else {
            move(0);
        }
    });

    $('.previous_btn').on('click', function() {
        if (currentIndex !== 0) {
            move(currentIndex - 1);
        } else {
            move(3);
        }
    });

    $.each($slides, function(index) {
        var $button = $('<a class="slide_btn">&bull;</a>');

        if (index === currentIndex) {
            $button.addClass('active');
        }
        $button.on('click', function() {
            move(index);
        }).appendTo('.slide_buttons');
        bulletArray.push($button);
    });

    advance();
});

$(window).on('scroll', () => {
    if (window.pageYOffset > 200) {
        $('.scroll-button').css('filter', 'opacity(0)');
    } else {
        $('.scroll-button').css('filter', 'opacity(1)');
    }
});

$('.label-effect').on('input', (e) => {
    if ($(e)[0].currentTarget.value.length > 0) {
        $(e)[0].currentTarget.classList.add("has-content");
    } else {
        $(e)[0].currentTarget.classList.remove("has-content");
    }
});