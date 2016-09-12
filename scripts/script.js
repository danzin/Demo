(function($) {
    "use strict"; 

    //Offset for the navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    //Highligh over the navbar when there is a scrolling 
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    //Closing the menu on click
    $('.navbar-collapse ul li a').click(function(){ 
            $('.navbar-toggle:visible').click();
    });

    //Images for the doSlideshow() function
    var images = new Array('img/csms.jpg','img/nebula.jpg','img/space.jpg');
    var nextimage = 0;
    doSlideshow();

    //Slideshow 
    function doSlideshow(){
        if(nextimage>=images.length){nextimage=0;}
        $('header')
        .css('background-image','url("'+images[nextimage++]+'")')
        .fadeIn(200,function(){
            setTimeout(doSlideshow,1000);
        });
    }


    //Contact form script
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); 
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            $.ajax({
                url: "somecontactform.js",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },
                cache: false,
                success: function() {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append('Sorry ' + name + ', there is no connection to a server right now.');
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
            });
        },
    });
})(jQuery);