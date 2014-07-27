$(function () {
    /*-----------------------------------------------------------------------------------*/
    /*	01. PARALLAX SETTING
    /*-----------------------------------------------------------------------------------*/
    $(document).ready(function () {
        //.parallax(xPosition, speedFactor, outerHeight) options:
        //xPosition - Horizontal position of the element
        //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
        //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
        $('#header').parallax("50%", 0.8);
    })

    /*-----------------------------------------------------------------------------------*/
    /*	02. NAVBAR STICKY + SELECTED
    /*-----------------------------------------------------------------------------------*/
    var cbpAnimatedHeader = (function () {

        var docElem = document.documentElement,
            header = document.querySelector('.cbp-af-header'),
            didScroll = false,
            changeHeaderOn = 10;

        function init() {
            window.addEventListener('scroll', function (event) {
                if (!didScroll) {
                    didScroll = true;
                    setTimeout(scrollPage, 100);
                }
            }, false);
        }

        function scrollPage() {
            var sy = scrollY();
            if (sy >= changeHeaderOn) {
                classie.add(header, 'cbp-af-header-shrink');
            }
            else {
                classie.remove(header, 'cbp-af-header-shrink');
            }
            didScroll = false;
        }

        function scrollY() {
            return window.pageYOffset || docElem.scrollTop;
        }

        init();
    })();
    var sections = $("section");
    var navigation_links = $("nav a");

    sections.waypoint({
        handler: function (event, direction) {

            var active_section;
            active_section = $(this);
            if (direction === "up") active_section = active_section.prev();

            var active_link = $('nav a[href="#' + active_section.attr("id") + '"]');
            navigation_links.removeClass("selected");
            active_link.addClass("selected");
        },
        offset: '30'
    })
});

/*-----------------------------------------------------------------------------------*/
/*	03. SMOOTH SCROLLING
/*-----------------------------------------------------------------------------------*/
$('nav a:not(:last-child), .buttongo a').click(function (e) {
    $('html,body').scrollTo(this.hash, this.hash);
    e.preventDefault();
});

/*-----------------------------------------------------------------------------------*/
/*	04. ISOTOPE PROJECTS & FILTERS
/*-----------------------------------------------------------------------------------*/
jQuery(document).ready(function ($) {
    var $container = $('#projects_grid .items');

    $container.imagesLoaded(function () {
        $container.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows',
            filter: '*'
        });
    });

    $('.filter li a').click(function () {

        $('.filter li a').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector
        });

        return false;
    });
});

/*-----------------------------------------------------------------------------------*/
/*	05. PROJECTS PORTFOLIO HOVER
/*-----------------------------------------------------------------------------------*/
$(function () {
    $(' .items > li, .frame > a ').each(function () {
        $(this).hoverdir();
    });
});

/*-----------------------------------------------------------------------------------*/
/*	06. RESPONSIVE MENU
/*-----------------------------------------------------------------------------------*/
jQuery("#collapse").hide();
jQuery("#collapse-menu").on("click", function () {
    jQuery("#collapse").slideToggle(300);
    return false;
}, function () {
    jQuery("#collapse").slideToggle(300);
    return false;
});


/*-----------------------------------------------------------------------------------*/
/*	07. CUSTOM SCRIPTS
/*-----------------------------------------------------------------------------------*/
jQuery('document').ready(function () {
    jQuery('#current-year').text(new Date().getFullYear());
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    var submitButton = $("button[type=submit]");
    $(document).on('submit', '#contact-form', function (e) {
        e.preventDefault();
        submitButton.text('SEND...').prop('disabled', true);

        $.post("https://mandrillapp.com/api/1.0/messages/send.json", {
            key: "u1BHVgtF9CLbiN5e9BEQxQ",
            message: {
                from_email: $("input[name$='email']").val(),
                to: [
                    {email: "kamil@lelonek.me"}
                ],
                subject: "[Website Portfolio] " + $("input[name$='subject']").val(),
                text: "From: " + $("input[name$='name']").val() + ". Message: " + $("textarea[name$='comments']").val()
            }
        })
        .done(function () {
            toastr.success("Thank you " + $("input[name$='subject']").val() + ". Your message has been sent.");

            $('#contact-form').trigger('reset');
            submitButton.text('SEND').prop('disabled', false);
        });
    });
});
