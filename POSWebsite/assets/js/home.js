document.addEventListener("scroll", function () {
    const navbar = document.querySelector(".home_navbar");
    const navbarHeight = 20;

    const distanceFromTop = Math.abs(
        // window.pageYOffset + navbar.getBoundingClientRect().top
        document.body.getBoundingClientRect().top
        // document.querySelector(".wrapper").getBoundingClientRect().top
    );
    // console.log(distanceFromTop , navbarHeight);

    if (distanceFromTop >= navbarHeight) navbar.classList.add("fixed-top");
    else navbar.classList.remove("fixed-top");
});

// **** IMG ANIMATION ****
var $window = $(window);
var $animation_elements;

function check_if_in_view() {
    $animation_elements = $('.zz');
    check_if___($animation_elements, 'go-r');
    $animation_elements = $('#img1');
    check_if___($animation_elements, 'go-right');
    $animation_elements = $('#img2');
    check_if___($animation_elements, 'from-down');
    $animation_elements = $('#img3');
    check_if___($animation_elements, 'go-left');
}
function check_if___($animation_elements, clas) {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    
    $.each($animation_elements, function() {
        var $element = $(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);
    
        //check to see if this current container is within viewport
        if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
        $element.addClass(clas);
        }
        // else {
        // $element.removeClass('go-right');
        // }
    });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

       
// **** SMOOTH SCROLLING ****
// Select all links with hashes
// $('a[href*="#"]')
// // Remove links that don't actually link to anything
// .not('[href="#"]')
// .not('[href="#0"]')
// .click(function(event) {
//     // On-page links
//     if (
//     location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
//     && 
//     location.hostname == this.hostname
//     ) {
//     // Figure out element to scroll to
//     var target = $(this.hash);
//     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//     // Does a scroll target exist?
//     if (target.length) {
//         // Only prevent default if animation is actually gonna happen
//         event.preventDefault();
//         $('html, body').animate({
//         scrollTop: target.offset().top
//         }, 1000, function() {
//         // Callback after animation
//         // Must change focus!
//         var $target = $(target);
//         $target.focus();
//         if ($target.is(":focus")) { // Checking if the target was focused
//             return false;
//         } else {
//             $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
//             $target.focus(); // Set focus again
//         };
//         });
//     }
//     }
// });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// parallax
jQuery(window).trigger('resize').trigger('scroll');